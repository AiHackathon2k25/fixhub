# 🎨 FixHub Theme - Quick Reference Card

## 🎯 Primary Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Slate-800** | `#1E293B` | Navigation bar, headers, dark backgrounds |
| **Slate-700** | `#334155` | Secondary dark, hover states |
| **Slate-200** | `#E2E8F0` | Card borders, dividers |
| **Teal-600** | `#0D9488` | Primary buttons, active links, focus rings |
| **Cyan-500** | `#06B6D4` | Gradient stops, highlights |

## 🎨 Color Palette

### Slate Gray (Main)
```
slate-50   → Light backgrounds
slate-200  → Borders
slate-300  → Input borders
slate-700  → Secondary dark
slate-800  → PRIMARY DARK (nav, headers)
```

### Teal (Primary Accent)
```
teal-400   → Light accents
teal-600   → PRIMARY (buttons, links)
teal-700   → Hover states
```

### Cyan (Secondary Accent)
```
cyan-500   → SECONDARY (gradients)
cyan-600   → Dark accents
```

## 📝 Typography

### Headings
```css
H1: text-4xl font-bold text-slate-800
H2: text-3xl font-bold text-slate-800
H3: text-2xl font-semibold text-slate-800
H4: text-xl font-semibold text-slate-700
```

### Body Text
```css
Primary:   text-base text-slate-700
Secondary: text-sm text-slate-600
Muted:     text-sm text-slate-500
```

## 🔘 Buttons

### Primary Button
```css
bg-gradient-to-r from-teal-600 to-cyan-600
hover:from-teal-700 hover:to-cyan-700
text-white font-semibold py-3 px-4 rounded-lg
shadow-md hover:shadow-lg
```

### Secondary Button
```css
bg-slate-700 hover:bg-slate-800
text-white font-semibold py-3 px-4 rounded-lg
```

## 📦 Cards

### Standard Card
```css
bg-white rounded-xl shadow-md p-6 border border-slate-200
```

### Dark Card
```css
bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 text-white
```

## 📝 Inputs

### Text Input
```css
w-full px-3 py-2 border-2 border-slate-300 rounded-lg bg-slate-50
focus:ring-2 focus:ring-teal-500 focus:border-teal-500
```

## 🎨 Gradients

### Primary Gradient
```css
bg-gradient-to-r from-teal-600 to-cyan-600
```

### Dark Gradient
```css
bg-gradient-to-r from-slate-800 to-slate-700
```

## 📏 Spacing

### Common Padding
```css
p-6    → Cards (24px)
py-8   → Sections (32px vertical)
px-4   → Mobile (16px horizontal)
px-8   → Desktop (32px horizontal)
```

### Common Gaps
```css
gap-4  → Standard (16px)
gap-6  → Comfortable (24px)
gap-8  → Large (32px)
```

## 🎭 Shadows

```css
shadow-md  → Cards, buttons
shadow-lg  → Elevated elements
shadow-xl  → Modals, dropdowns
```

## 🔲 Borders & Radius

```css
border-2 border-slate-200  → Card borders
border-2 border-slate-300  → Input borders
rounded-lg                 → Buttons, inputs
rounded-xl                 → Cards
```

## ✨ Transitions

```css
transition-all duration-200  → Standard (most common)
transition-colors duration-200  → Color changes
```

## 🎯 Quick Copy-Paste

### Primary Button
```tsx
className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
```

### Card
```tsx
className="bg-white rounded-xl shadow-md p-6 border border-slate-200"
```

### Input
```tsx
className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
```

### Nav Link (Active)
```tsx
className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 text-teal-400"
```

### Nav Link (Default)
```tsx
className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
```

---

**Theme:** Slate Gray + Teal Professional  
**Version:** 2.0.0

