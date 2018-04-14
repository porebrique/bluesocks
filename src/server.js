import socks from 'socksv5';
import * as lodash from 'lodash';

export default class Server {

  constructor(settings) {
    this.server = socks.createServer((info, accept, deny) => {
      accept();
    });
    this.settings = settings;
  }

  isUserAuthorized({ username, password}) {
    const { users } = this.settings;
    const match = lodash.find(users, { username, password });
    return !!match;
  }

  start() {
    const { port, host } = this.settings.server;

    this.server.listen(port, host, () => {
      console.log(`SOCKS server listening on ${host}, port ${port}`);
    });

    this.server.useAuth(socks.auth.UserPassword((user, password, cb) => {
      const isAuthorized = this.isUserAuthorized({ username: user, password });
      cb(isAuthorized);
    }));
  }
}