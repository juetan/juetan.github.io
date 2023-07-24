'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const path = require('path');
const utils = require('@ruabick/utils');
const fsExtra = require('fs-extra');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const fsExtra__default = /*#__PURE__*/_interopDefaultLegacy(fsExtra);

const FenceDemoTag = "vue:demo";
const DemoTag = "demo";

const scriptRE = /<\/script>/;
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/;
let index = 1;
function getDemoComponent(md, env, { title, desc, path, code }) {
  const componentName = `DemoComponent${index++}`;
  path = normalizePath(path);
  injectImportStatement(env, componentName, path);
  const highlightedCode = md.options.highlight(code, "vue", "");
  return `
    <${DemoTag}
      code="${encodeURIComponent(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      src="${path}"
      title="${title ?? ""}"
      desc="${desc ?? ""}"
    >
        <${componentName}></${componentName}>
    </${DemoTag}>
  `.trim();
}
let fenceIndex = 1;
const codeFileMap = {};
function genDemoByCode(md, env, path$1, code) {
  let { demoName = "", demoPath = "" } = codeFileMap[code] ?? {};
  if (!codeFileMap[code]) {
    while (true) {
      demoName = `demo-${fenceIndex++}.vue`;
      demoPath = path.join(path.dirname(path$1), "dist", demoName);
      if (!fsExtra__default.existsSync(demoPath)) {
        break;
      }
    }
    fsExtra__default.createFileSync(demoPath);
    fsExtra__default.writeFileSync(demoPath, code);
    codeFileMap[code] = {
      demoName,
      demoPath
    };
  }
  return getDemoComponent(md, env, {
    path: demoPath,
    code
  });
}
function injectImportStatement(env, componentName, path) {
  const componentRegistStatement = `import ${componentName} from '${path}'`.trim();
  if (!env.sfcBlocks.scripts) {
    env.sfcBlocks.scripts = [];
  }
  const tags = env.sfcBlocks.scripts;
  const isUsingTS = tags.findIndex((tag) => scriptLangTsRE.test(tag.content)) > -1;
  const existingSetupScriptIndex = tags?.findIndex((tag) => {
    return scriptRE.test(tag.content) && scriptSetupRE.test(tag.content) && !scriptClientRE.test(tag.content);
  });
  if (existingSetupScriptIndex > -1) {
    const tagSrc = tags[existingSetupScriptIndex];
    tags[existingSetupScriptIndex].content = tagSrc.content.replace(
      scriptRE,
      `${componentRegistStatement}

      <\/script>`
    );
  } else {
    tags.unshift({
      content: `
        <script ${isUsingTS ? 'lang="ts"' : ""} setup >
          ${componentRegistStatement}
        <\/script>
      `.trim()
    });
  }
}
function normalizePath(path$1) {
  return path$1.split(path.sep).join("/");
}

function demoBlockPlugin(md) {
  const addRenderRule = (type) => {
    const defaultRender = md.renderer.rules[type];
    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const content = token.content.trim();
      if (!content.match(new RegExp(`^<${DemoTag}\\s`))) {
        return defaultRender(tokens, idx, options, env, self);
      }
      const { path: path$1 } = env;
      const props = utils.parseProps(content);
      if (!props.src) {
        console.error(`miss src props in ${path$1} demo.`);
        return defaultRender(tokens, idx, options, env, self);
      }
      const frontmatter = env.frontmatter;
      if(!(frontmatter.realPath ?? path$1)) {
        return defaultRender(tokens, idx, options, env, self);
      }
      const mdDir = path.dirname(frontmatter.realPath ?? path$1);
      const srcPath = path.resolve(mdDir, props.src);
      const code = fsExtra__default.readFileSync(srcPath, "utf-8");
      const demoScripts = getDemoComponent(md, env, {
        title: props.title,
        desc: props.desc,
        path: srcPath,
        code
      });
      return demoScripts;
    };
  };
  addRenderRule("html_block");
  addRenderRule("html_inline");
}

function fencePlugin(md) {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() !== FenceDemoTag) {
      return defaultRender(tokens, idx, options, env, self);
    }
    const content = token.content;
    const path = env.path;
    const demoScripts = genDemoByCode(md, env, path, content);
    return demoScripts;
  };
}

function applyPlugins(md) {
  md.use(fencePlugin);
  md.use(demoBlockPlugin);
}

exports.DemoTag = DemoTag;
exports.FenceDemoTag = FenceDemoTag;
exports.applyPlugins = applyPlugins;
