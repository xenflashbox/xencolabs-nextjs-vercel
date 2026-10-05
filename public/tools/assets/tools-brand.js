// tools/assets/tools-brand.js — Xenco Labs brand shell for the dev tools.
// Non-destructive: injects the Inter webfont, sets SEO meta/JSON-LD, and
// prepends a slim branded top bar. Does NOT rebuild the page body, so each
// tool's own scripts and event handlers keep working untouched.
(() => {
  const M = window.TOOL_META || {};
  const title = M.title || document.title || 'Xenco Labs Tools';
  const desc =
    M.description ||
    document.querySelector('meta[name="description"]')?.content ||
    'Free, client-side developer tools by Xenco Labs. Runs locally in your browser.';
  const url = M.canonical || location.origin + location.pathname;

  // Inter webfont
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(font);

  // SEO meta
  const set = (sel, attr, val) => {
    let el = document.querySelector(`${sel}[${attr}="${val}"]`);
    if (!el) { el = document.createElement(sel); el.setAttribute(attr, val); document.head.appendChild(el); }
    return el;
  };
  set('meta', 'name', 'description').setAttribute('content', desc);
  set('link', 'rel', 'canonical').setAttribute('href', url);
  [['og:title', title], ['og:description', desc], ['og:url', url], ['og:type', 'website']].forEach(([p, v]) =>
    set('meta', 'property', p).setAttribute('content', v));
  document.title = title;
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: title,
    applicationCategory: 'DeveloperApplication', operatingSystem: 'Any', url, description: desc,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@type': 'Organization', name: 'Xenco Labs', url: 'https://xencolabs.com' },
  });
  document.head.appendChild(ld);

  // Slim branded top bar (prepend — non-destructive)
  function bar() {
    if (document.querySelector('.xeno-topbar')) return;
    const el = document.createElement('div');
    el.className = 'xeno-topbar';
    el.innerHTML =
      '<a class="xeno-brand" href="/"><img class="xeno-logo" src="/brand/xencolabs-on-light.svg" alt="Xenco Labs"></a>' +
      '<nav class="xeno-nav">' +
      '<a href="/tools">Free Tools</a><a href="/apps">Products</a><a href="/services">Services</a><a href="/growth">Growth</a>' +
      '</nav>';
    document.body.insertBefore(el, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bar);
  else bar();
})();
