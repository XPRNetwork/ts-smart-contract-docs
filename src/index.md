---
metaTitle: XPR Network Smart Contracts
description: Build XPR Network Smart Contracts with Typescript
navbar: false
sidebar: false
editLink: false
pageClass: frontpage
---

<div id="hero">
  <div id="logo">

  </div>
  <h1>Web3 SDKs for writing and interacting with XPR Network smart contracts.</h1>
  <p class="action">
    <a href="/getting-started/introduction.html#what-s-xpr-network" class="docs">
      Get Started
    </a>
    <a href="https://github.com/ProtonProtocol/proton-ts-contracts" target="_blank" rel="noopener" class="github">
      <svg viewBox="0 0 24 24"><path fill="#fff" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
      <span class="title">GitHub</span>
    </a>
    <!-- <a href="https://www.npmjs.com/package/proton" target="_blank" rel="noopener" class="npm">
      <svg viewBox="0 0 24 24"><path fill="#fff" d="M2 22h9.913V7.043h5.044V22H22V2H2z"/></svg>
      <span class="title">npm</span>
    </a> -->
  </p>
</div>

<div id="features">
  <div class="feature">
    <h2>Designed for WebAssembly</h2>
    <p>XPR Network smart contracts compile to WASM for maximum performance at 4000 TPS.</p>
  </div>
  <div class="feature">
    <h2>Familiar TypeScript syntax</h2>
    <p>Its similarity with TypeScript makes it easy to compile to WebAssembly without learning a new language.</p>
  </div>
  <div class="feature">
    <h2>Right at your fingertips</h2>
    <p>Integrates with the existing web ecosystem - no heavy toolchains to set up. Simply <code>npm install</code> it!</p>
  </div>
</div>

<Editor/>

<style scoped>
#hero {
  margin-top: 2rem;
  text-align: center;
  height: 400px;
  background: #020ECB;
}
#hero:before {
  content: '';
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 520px;
  background: #020ECB ;
  background-size: 1440px;
}
#hero > * {
  position: relative;
}
#hero h1 {
  color: #fff;
  margin: 1.3rem auto 1.8rem;
  font-size: 2rem;
  font-weight: 200;
}
#logo {
  display: inline-block;
  width: 640px;
}
#logo svg {
  width: 100%;
  height: 100%;
  max-height: 240px;
  fill: #fff;
}
@media only screen and (max-width: 740px) {
  #logo {
    width: 100%;
  }
  #logo svg {
    max-height: 213px;
  }
}
#features {
  padding: 1.2rem 0;
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}
#features .feature {
  flex-grow: 1;
  flex-basis: 30%;
  max-width: 30%;
}
#features h2 {
  font-size: 1.4rem;
  border-bottom: none;
  padding-bottom: 0;
  color: #3a5169;
}
.action {
  text-align: center;
  user-select: none;
}
.action a {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: #020ECB;
  padding: .8rem 1.6rem;
  border-radius: 4px;
  transition: background-color .1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #006eb8;
  text-decoration: none !important;
  margin: 0.1rem 0;
}
.action a:hover {
  background-color: #1a8ae7;
}
.action a svg {
  width: 2em;
  position: relative;
  left: -10px;
  float: left;
  height: 32px;
}
.action a.docs {
  color: #111;
  background: #fff;
  border-bottom-color: #aaa;
  margin-right: 10px;
}
.action a.docs:hover {
  background: #eee;
}
.action a.github {
  color: #fff;
  background: #24292e;
  border-bottom-color: #101214;
}
.action a.github:hover {
  background: #3e464f;
}
.action a.npm {
  color: #fff;
  background: #cb3837;
  border-bottom-color: #ba3232;
}
.action a.npm:hover {
  background: #eb3f3f;
}
@media only screen and (max-width: 720px) {
  .action a.github svg {
    float: none;
    left: 0;
    margin-bottom: -0.5rem;
  }
  .action a.npm {
    display: none;
  }
  .action a.github .title {
    display: none;
  }
  #features .feature {
    flex-basis: 100%;
    max-width: 100%;
  }
}
@media only screen and (max-width: 640px) {
  #try {
    display: none;
  }
}
#sponsors {
  margin-bottom: 2rem;
}
#community h2 svg {
  display: inline-block;
  height: 25px;
  position: relative;
  top: 3px;
}
</style>

<style>
.frontpage .page-edit {
  display: none;
}
</style>
