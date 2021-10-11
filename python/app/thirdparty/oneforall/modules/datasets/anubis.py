from app.thirdparty.oneforall.common.query import Query


class Anubis(Query):
    def __init__(self, domain):
        Query.__init__(self)
        self.domain = domain
        self.module = 'Dataset'
        self.source = 'AnubisQuery'
        self.addr = 'https://jldc.me/anubis/subdomains/'

    def query(self):
        """
        向接口查询子域并做子域匹配
        """
        self.header = self.get_header()
        self.proxy = self.get_proxy(self.source)
        self.addr = self.addr + self.domain
        resp = self.get(self.addr)
        self.subdomains = self.collect_subdomains(resp)

    def run(self):
        """
        类执行入口
        """
        self.begin()
        self.query()
        self.finish()
        self.save_json()
        self.gen_result()
        self.save_db()


def run(domain):
    """
    类统一调用入口

    :param str domain: 域名
    """
    query = Anubis(domain)
    query.run()


if __name__ == '__main__':
    run('hackerone.com')