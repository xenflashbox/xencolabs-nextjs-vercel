# BlogCraft & Xenco Labs — Unified Design System

## Overview

This document defines the shared design tokens, color palette, typography, and component patterns used across all Xenco Labs properties. Two visual modes exist: **Light Mode** (public marketing sites) and **Dark Mode** (authenticated app dashboard). Both share the same semantic color tokens with different surface values.

---

## Color Palette

### Brand Colors (Derived from Quillie mascot palette)

```css
:root {
  /* Primary — Quillie Purple (the brand signature) */
  --brand-primary: #7B6BA6;        /* Quillie's body purple */
  --brand-primary-light: #9B8EC0;  /* Lighter variant */
  --brand-primary-dark: #5C4F82;   /* Darker variant */
  --brand-primary-50: #F3F0F8;     /* Tint for backgrounds */
  --brand-primary-100: #E6E0F0;
  --brand-primary-200: #C9BDE0;
  --brand-primary-500: #7B6BA6;
  --brand-primary-600: #6558A0;
  --brand-primary-700: #5C4F82;
  --brand-primary-900: #2D2445;

  /* Secondary — Warm Cream (from Quillie's belly) */
  --brand-cream: #F5ECD7;
  --brand-cream-light: #FBF8F0;

  /* Accent — Quillie's Beak Orange (CTA highlight) */
  --brand-accent: #E8A84C;
  --brand-accent-hover: #D4952F;

  /* Navy — Trust/Authority (Xenco Labs corporate) */
  --brand-navy: #1B2A4A;
  --brand-navy-light: #2A3F6B;

  /* CTA Purple — Vibrant action color */
  --cta-primary: #8B5CF6;          /* Bright purple for buttons */
  --cta-primary-hover: #7C3AED;
  --cta-secondary: #6D28D9;
}
```

### Light Mode (Marketing Sites — blogcraft.app, xencolabs.com)

```css
[data-theme="light"] {
  /* Surfaces */
  --surface-primary: #FFFFFF;
  --surface-secondary: #F9F8FC;     /* Faint purple tint */
  --surface-tertiary: #F3F0F8;      /* brand-primary-50 */
  --surface-elevated: #FFFFFF;

  /* Text */
  --text-primary: #1A1A2E;          /* Near-black with blue undertone */
  --text-secondary: #4A4A68;
  --text-tertiary: #8585A3;
  --text-inverse: #FFFFFF;

  /* Borders */
  --border-default: #E6E0F0;
  --border-subtle: #F0ECF5;
  --border-strong: #C9BDE0;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(123, 107, 166, 0.06);
  --shadow-md: 0 4px 12px rgba(123, 107, 166, 0.08);
  --shadow-lg: 0 12px 32px rgba(123, 107, 166, 0.12);
  --shadow-xl: 0 24px 48px rgba(27, 42, 74, 0.14);

  /* Status */
  --status-success: #059669;
  --status-warning: #D97706;
  --status-error: #DC2626;
  --status-info: #7B6BA6;
}
```

### Dark Mode (Authenticated Dashboard — app.blogcraft.app)

```css
[data-theme="dark"] {
  /* Surfaces — keep existing dark theme, shift accent from pink to purple */
  --surface-primary: #0F0F14;
  --surface-secondary: #1A1A24;
  --surface-tertiary: #242432;
  --surface-elevated: #2A2A3C;

  /* Text */
  --text-primary: #F0ECF5;
  --text-secondary: #A8A3B8;
  --text-tertiary: #6B6680;

  /* Accent shift: replace hot pink/magenta with Quillie purple */
  --accent-primary: #9B8EC0;       /* Was hot pink — now Quillie purple */
  --accent-glow: rgba(155, 142, 192, 0.3);

  /* CTA buttons stay vibrant purple */
  --cta-primary: #8B5CF6;
  --cta-primary-hover: #A78BFA;
}
```

---

## Typography

### Font Stack

```css
:root {
  /* Display — used for hero headlines, section titles */
  --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;

  /* Body — used for paragraphs, descriptions, UI text */
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* Mono — used for code, technical labels, pricing */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale (Marketing Sites)

```css
.hero-headline     { font: 800 3.5rem/1.1 var(--font-display); letter-spacing: -0.03em; }
.section-headline  { font: 700 2.25rem/1.2 var(--font-display); letter-spacing: -0.02em; }
.subsection-title  { font: 600 1.5rem/1.3 var(--font-display); letter-spacing: -0.01em; }
.body-large        { font: 400 1.125rem/1.6 var(--font-body); }
.body-default      { font: 400 1rem/1.6 var(--font-body); }
.body-small        { font: 400 0.875rem/1.5 var(--font-body); }
.label             { font: 500 0.75rem/1.4 var(--font-body); letter-spacing: 0.05em; text-transform: uppercase; }
.metric-value      { font: 700 2rem/1 var(--font-mono); }
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

---

## Component Patterns

### Buttons

```css
/* Primary CTA */
.btn-primary {
  background: var(--cta-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font: 600 0.9375rem/1 var(--font-body);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}
.btn-primary:hover {
  background: var(--cta-primary-hover);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
  transform: translateY(-1px);
}

/* Secondary CTA */
.btn-secondary {
  background: transparent;
  color: var(--brand-primary);
  border: 1.5px solid var(--border-strong);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font: 600 0.9375rem/1 var(--font-body);
}

/* Ghost (for light text on dark sections) */
.btn-ghost {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
}
```

### Cards

```css
.card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
}
.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-default);
  transform: translateY(-2px);
}
```

### Section Patterns

```css
/* Alternating section backgrounds for visual rhythm */
.section-light { background: var(--surface-primary); }
.section-tinted { background: var(--surface-secondary); }
.section-purple {
  background: linear-gradient(135deg, var(--brand-primary-900) 0%, var(--brand-navy) 100%);
  color: var(--text-inverse);
}
```

---

## Quillie Usage Rules

| Context | Show Quillie? | Pose |
|---------|--------------|------|
| Self-serve marketing hero | Yes, small | General wave |
| Module showcase cards | Yes, per module | Contextual pose |
| Managed services pages | **NO** | — |
| Xenco Labs corporate | **NO** | — |
| Dashboard onboarding | Yes | Contextual |
| Empty states | Yes | General or contextual |
| Loading/generation | Yes, animated | Content Writing |
| Success states | Yes | General wave |
| Error states | Yes, sympathetic | General |
| Pricing page (self-serve) | Yes, small | General |
| B2B outbound / Upwork | **NO** | — |

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1440px;

/* Content max-width */
--content-max: 1200px;
--content-narrow: 720px;
```
