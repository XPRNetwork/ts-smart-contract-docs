const {description} = require("../../package");

module.exports = {
  base: "/",
  dest: "./dist",
  locales: {
    "/": {
      lang: "en-US",
      title: "XPRNetwork Developer Documentation",
      description: "Writing blockchain smart contracts using TS/AS semantics",
    },
  },

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "XPRNetwork Developer Documentation",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicons/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png",
      },
    ],
    ["link", {rel: "manifest", href: "/site.webmanifest"}],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/favicons/safari-pinned-tab.svg",
        color: "#020ECB",
      },
    ],
    ["link", {rel: "shortcut icon", href: "/favicon.ico"}],
    ["link", {rel: "preconnect", href: "https://cdn.jsdelivr.net"}],
    ["meta", {name: "msapplication-TileColor", content: "#ffffff"}],
    ["meta", {name: "msapplication-config", content: "/browserconfig.xml"}],
    ["meta", {name: "theme-color", content: "#ffffff"}],
    [
      "meta",
      {name: "viewport", content: "width=device-width, initial-scale=1"},
    ],
  ],
  theme: ".vuepress/theme",

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: "/images/icon.svg",
    nav: require("./nav"),
    sidebar: require("./sidebar"),
    sidebarDepth: 1,
    displayAllHeaders: false,
    docsRepo: "ProtonProtocol/proton-ts-sc-docs",
    docsDir: "src",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    // algolia: {
    //   apiKey: '5055511efcf6b0b257029437f9544075',
    //   appId: 'IA5GQP2FPD',
    //   indexName: 'proton'
    // }
  },
  extraWatchFiles: [".vuepress/nav.js", ".vuepress/sidebar.js"],

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    [
      "check-md",
      {
        ignore: "**/cli",
      },
    ],
    "@proton/vuepress-plugin-graphviz",
    "@vuepress/plugin-html-redirect",
    [
      "vuepress-plugin-sitemap",
      {
        hostname: "https://www.docs.protonchain.com",
        exclude: ["/404.html"],
      },
    ],
  ],
  markdown: {
    extendMarkdown,
  },
};

function extendMarkdown(md) {
  const prism = require("prismjs");

  // Extend TypeScript grammar

  require("prismjs/components/prism-typescript");
  prism.languages.typescript.builtin = new RegExp(
    "\\b(?:" +
      [
        // Common types
        "string",
        "number",
        "boolean",
        "symbol",
        "void",

        // Common names
        "ArrayBuffer",
        "Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Float64Array",
        "DataView",
        "String",
        "Map",
        "Set",
        "Promise",
        "Math",
        "Number",
        "Boolean",
        "Error",
        "Date",

        // XPR Network types
        "i8",
        "i16",
        "i32",
        "i64",
        "isize",
        "u8",
        "u16",
        "u32",
        "u64",
        "usize",
        "bool",
        "f32",
        "f64",
        "v128",
        "externref",
        "auto",

        // XPR Network names
        "heap",
        "memory",
        "table",
        "atomic",
        "i8x16",
        "i16x8",
        "i32x4",
        "i64x2",
        "f32x4",
        "f64x2",
        "v32x2",
        "Int64Array",
        "Uint64Array",
        "Mathf",
        "Bool",
        "I8",
        "I16",
        "I32",
        "I64",
        "U8",
        "U16",
        "U32",
        "U64",
        "F32",
        "F64",
        "idof",
        "sizeof",
        "alignof",
        "offsetof",
        "nameof",
      ].join("|") +
      ")\\b"
  );
}
