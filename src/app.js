export class App {
  configureRouter(config, router) {
    config.title = 'GitHub browser';
    
    config.map([
      { route: '', name: 'github-browser', moduleId: './github-browser', nav: true, title: 'Github Browser' }
    ]);

    this.router = router;
  }
}
