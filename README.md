Proton Smart Contract Docs
========================

The site is built with [VuePress](https://vuepress.vuejs.org/) and reuses its default theme to ease upgrading to newer versions.

The more important files are:

* [src/**/*.md](./src)<br />
  Documentation and site contents, i.e. what one would typically modify when extending the documentation.
* [src/.vuepress/sidebar.js](./src/.vuepress/sidebar.js)<br />
  Sidebar contents.
* [src/.vuepress/nav.js](./src/.vuepress/nav.js)<br />
  Top-navigation contents.
* [src/.vuepress/redirects](./src/.vuepress/redirects)<br />
  Redirect map of (re)moved pages to new locations.
* [src/.vuepress/public/](./src/.vuepress/public)<br />
  Assets folder for images etc.

Building
--------

To work on the site locally, install the dependencies and start a development server serving at [localhost:8080](http://localhost:8080/):

```sh
npm install
npm start
```

To build the site to `dist`, i.e. to verify that it works as expected:

```sh
npm run build
```

Serve distribution files with:

```sh
npm run serve
```


Credits
--------
Initially forked from [AssemblyScript](https://github.com/AssemblyScript/website)