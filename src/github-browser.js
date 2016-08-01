import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

@inject(Lazy.of(HttpClient))
export class GitHubBrowser {
  
  heading = 'Github Browser';
  orgName = 'aurelia';

  accessToken = null; // add your own access token here for higher API rate limits

  constructor(getHttpClient) {
    this.getHttpClient = getHttpClient;
  }

  async activate() {
    await this.orgChanged();
  }

  async orgChanged() {
    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    var url = 'orgs/' + this.orgName + '/repos';
    if(this.accessToken) {
      url += '?access_token=' + this.accessToken;
    }

    const response = await http.fetch(url);
    this.repositories = await response.json();
  }
}
