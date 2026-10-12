/**
 * Type tokens for preview tenants. With `branding.typography: 'industrial'` the layout provides
 * --font-display (condensed) and --font-mono-field (monospace field labels); otherwise these fall
 * back to the page font, so every primitive works for every tenant.
 */
// `lo-display` lets a brand theme switch heading case (see the tenant layout); industrial tenants are unchanged.
export const DISPLAY = 'lo-display [font-family:var(--font-display,inherit)]';
export const FIELD = '[font-family:var(--font-mono-field,ui-monospace,monospace)] uppercase tracking-[0.12em]';
