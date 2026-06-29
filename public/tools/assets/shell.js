// tools/assets/shell.js — v3
// NOTE: optional "Dev Maestro" tool-shell (header/sidebar/footer + promos).
// Not loaded by any page after the xencolabs.com migration; kept valid for
// future opt-in. Re-add `<script src="/tools/assets/shell.js" defer>` to a
// tool's <head> (outside <style>) to enable it.
(() => {
  const BRAND = {
    name: "Dev Maestro",
    homeHref: "/tools/",
    nav: [
      {label:"Tools Home", href:"/tools/"},
      {label:"Docs", href:"/"},
      {label:"Free Trial", href:"/"},
    ],
    promos: [
      {title:"Dev Maestro", copy:"Your AI coding sidekick (Claude-powered).", cta:"Start free trial", href:"/", tag:"IDE Companion"},
      {title:"Craft Prompt Marketer", copy:"Test, version, and ship prompts.", cta:"Get started", href:"/", tag:"Prompt Ops"},
      {title:"Launch Craft", copy:"Ship marketing pages faster.", cta:"Explore", href:"/", tag:"Growth"},
      {title:"Landing Craft", copy:"Beautiful, fast LPs with AI.", cta:"Try it", href:"/", tag:"No-code"},
      {title:"Hey Blog", copy:"AI-assisted blogging for teams.", cta:"Write now", href:"/", tag:"Content"},
    ]
  };

  const M = window.TOOL_META || {};
  const title = M.title || document.title || "Dev Maestro Tools";
  const desc  = M.description || document.querySelector('meta[name="description"]')?.content || "Free, client-side developer tools by Dev Maestro.";
  const url   = M.canonical || (location.origin + location.pathname);

  function setMeta() {
    const findOrCreate = (sel, name, val) => {
      let el = document.querySelector(`${sel}[${name}="${val}"]`);
      if (!el) { el = document.createElement(sel); el.setAttribute(name, val); document.head.appendChild(el); }
      return el;
    };
    findOrCreate('meta','name','description').setAttribute('content', desc);
    findOrCreate('link','rel','canonical').setAttribute('href', url);
    [['og:title',title],['og:description',desc],['og:url',url],['og:type','website']].forEach(([p,v]) => {
      findOrCreate('meta','property',p).setAttribute('content', v);
    });
    document.title = title;
    const ld = document.createElement('script');
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name": title,"applicationCategory":"DeveloperApplication","operatingSystem":"Any","url": url,"description": desc,"provider":{"@type":"Organization","name":"Dev Maestro"}});
    document.head.appendChild(ld);
  }

  function buildShell() {
    // move original body nodes into a fragment
    const frag = document.createDocumentFragment();
    [...document.body.childNodes].forEach(n => frag.appendChild(n));

    // shell
    const shell = document.createElement('div');
    shell.className = 'dm-shell';
    shell.innerHTML = `
      <div class="dm-header" role="banner">
        <div class="dm-logo"><a href="${BRAND.homeHref}">Dev Maestro</a></div>
        <nav class="dm-nav">
          ${BRAND.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join('')}
        </nav>
      </div>
      <div class="dm-wrap">
        <main class="dm-main">
          <div class="dm-tool-frame" id="dm-tool-frame"></div>
        </main>
        <aside class="dm-sidebar" id="dm-sidebar"></aside>
      </div>
      <div class="dm-footer">© ${new Date().getFullYear()} Dev Maestro • All tools run locally in your browser.</div>
    `;

    document.body.innerHTML = '';
    document.body.appendChild(shell);

    // drop the page content inside the neutral frame
    document.getElementById('dm-tool-frame').appendChild(frag);

    // promos
    const sb = document.getElementById('dm-sidebar');
    const picks = [...BRAND.promos].sort(()=>Math.random()-0.5).slice(0,3);
    picks.forEach(p => {
      const a = document.createElement('a');
      a.className = 'dm-ad';
      a.href = p.href;
      a.innerHTML = `<span class="dm-badge">${p.tag||'Featured'}</span><h4>${p.title}</h4><p>${p.copy}</p><span>${p.cta} →</span>`;
      sb.appendChild(a);
    });
  }

  setMeta();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildShell);
  else buildShell();
})();
