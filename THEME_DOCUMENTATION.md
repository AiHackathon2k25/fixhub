# 🎨 FixHub Theme Documentation

**Complete Design System & Theme Guide**

---

## 📋 Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Styles](#component-styles)
5. [Gradients](#gradients)
6. [Shadows & Elevation](#shadows--elevation)
7. [Borders & Radius](#borders--radius)
8. [Animations & Transitions](#animations--transitions)
9. [Design Tokens](#design-tokens)
10. [Usage Examples](#usage-examples)

---

## 🎨 Color Palette

### Primary Colors

#### Slate Gray (Main Background & Text)
```css
slate-50   #F8FAFC  /* Light page backgrounds */
slate-100  #F1F5F9  /* Hover states */
slate-200  #E2E8F0  /* Card borders */
slate-300  #CBD5E1  /* Input borders */
slate-400  #94A3B8  /* Muted text */
slate-500  #64748B  /* Secondary text */
slate-600  #475569  /* Medium text */
slate-700  #334155  /* Dark backgrounds */
slate-800  #1E293B  /* Primary dark (nav, headers) */
slate-900  #0F172A  /* Deepest dark */
```

**Usage:**
- `slate-50` - Page backgrounds, card backgrounds
- `slate-200` - Card borders, dividers
- `slate-300` - Input field borders
- `slate-700` - Secondary dark sections
- `slate-800` - Navigation bar, headers, primary dark elements
- `slate-900` - Deepest dark (rarely used)

#### Teal (Primary Accent)
```css
teal-50   #F0FDFA  /* Light backgrounds */
teal-100  #CCFBF1  /* Light accent backgrounds */
teal-200  #99F6E4  /* Subtle accents */
teal-300  #5EEAD4  /* Light accents */
teal-400  #2DD4BF  /* Medium accents */
teal-500  #14B8A6  /* Standard accent */
teal-600  #0D9488  /* PRIMARY - Buttons, links, active states */
teal-700  #0F766E  /* Hover states */
teal-800  #115E59  /* Dark accents */
teal-900  #134E4A  /* Deepest teal */
```

**Usage:**
- `teal-600` - Primary buttons, active links, focus rings
- `teal-400` - Light accents, badges
- `teal-700` - Button hover states
- `teal-50` - Light accent backgrounds

#### Cyan (Secondary Accent)
```css
cyan-50   #ECFEFF  /* Light backgrounds */
cyan-100  #CFFAFE  /* Light accents */
cyan-200  #A5F3FC  /* Subtle accents */
cyan-300  #67E8F9  /* Light accents */
cyan-400  #22D3EE  /* Medium accents */
cyan-500  #06B6D4  /* SECONDARY - Gradients, highlights */
cyan-600  #0891B2  /* Dark accents */
cyan-700  #0E7490  /* Deep accents */
```

**Usage:**
- `cyan-500` - Gradient stops, highlights
- `cyan-600` - Secondary buttons
- `cyan-50` - Light accent backgrounds

### Semantic Colors

#### Success (Green)
```css
green-50   #F0FDF4  /* Success backgrounds */
green-500  #22C55E  /* Success borders */
green-700  #15803D  /* Success text */
```

**Usage:**
- Success messages, completed states, checkmarks

#### Error (Red)
```css
red-50    #FEF2F2  /* Error backgrounds */
red-400   #F87171  /* Error text (light) */
red-500   #EF4444  /* Error borders */
red-700   #B91C1C  /* Error text (dark) */
```

**Usage:**
- Error messages, validation failures, delete actions

#### Warning (Yellow)
```css
yellow-50   #FEFCE8  /* Warning backgrounds */
yellow-100  #FEF9C3  /* Light warning */
yellow-500  #EAB308  /* Warning accents */
```

**Usage:**
- Warning messages, pending states, alerts

#### Info (Blue)
```css
blue-50   #EFF6FF  /* Info backgrounds */
blue-100  #DBEAFE  /* Light info */
blue-500  #3B82F6  /* Info accents */
```

**Usage:**
- Information messages, stats, data visualization

---

## 📝 Typography

### Font Families
```css
/* Default (System Font Stack) */
font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
           "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Font Sizes
```css
text-xs    /* 0.75rem / 12px  - Small labels, captions */
text-sm    /* 0.875rem / 14px - Body small, form labels */
text-base  /* 1rem / 16px     - Body text (default) */
text-lg    /* 1.125rem / 18px - Large body, subheadings */
text-xl    /* 1.25rem / 20px  - Section titles */
text-2xl   /* 1.5rem / 24px   - Card titles */
text-3xl   /* 1.875rem / 30px - Page titles */
text-4xl   /* 2.25rem / 36px  - Hero titles */
text-5xl   /* 3rem / 48px     - Large hero titles */
text-6xl   /* 3.75rem / 60px  - Extra large hero */
```

### Font Weights
```css
font-normal   /* 400 - Body text */
font-medium   /* 500 - Emphasis, labels */
font-semibold /* 600 - Headings, buttons */
font-bold     /* 700 - Strong emphasis, titles */
```

### Line Heights
```css
leading-tight   /* 1.25 - Headings */
leading-normal  /* 1.5  - Body text */
leading-relaxed /* 1.625 - Comfortable reading */
```

### Typography Scale Examples

#### Headings
```css
/* H1 - Page Titles */
text-4xl font-bold text-slate-800

/* H2 - Section Titles */
text-3xl font-bold text-slate-800

/* H3 - Card Titles */
text-2xl font-semibold text-slate-800

/* H4 - Subsection Titles */
text-xl font-semibold text-slate-700
```

#### Body Text
```css
/* Primary Body */
text-base text-slate-700

/* Secondary Body */
text-sm text-slate-600

/* Muted Text */
text-sm text-slate-500
```

#### Labels
```css
/* Form Labels */
text-sm font-medium text-slate-700

/* Small Labels */
text-xs font-medium text-slate-600
```

---

## 📏 Spacing System

### Base Unit: 4px (0.25rem)

```css
/* Spacing Scale */
p-1    /* 0.25rem / 4px   */
p-2    /* 0.5rem / 8px    */
p-3    /* 0.75rem / 12px  */
p-4    /* 1rem / 16px     */
p-6    /* 1.5rem / 24px   */
p-8    /* 2rem / 32px     */
p-12   /* 3rem / 48px     */
p-16   /* 4rem / 64px     */
p-20   /* 5rem / 80px     */
```

### Common Spacing Patterns

#### Padding
```css
/* Cards */
p-6        /* 24px - Standard card padding */

/* Sections */
py-8       /* 32px vertical - Section spacing */
px-4       /* 16px horizontal - Mobile padding */
px-8       /* 32px horizontal - Desktop padding */

/* Buttons */
py-3 px-4  /* 12px vertical, 16px horizontal */
py-4 px-8  /* 16px vertical, 32px horizontal */
```

#### Margins
```css
/* Between Elements */
mb-4       /* 16px - Small gap */
mb-6       /* 24px - Medium gap */
mb-8       /* 32px - Large gap */

/* Between Sections */
my-8       /* 32px - Section spacing */
my-12      /* 48px - Large section spacing */
my-20      /* 80px - Hero section spacing */
```

#### Gaps (Flexbox/Grid)
```css
gap-2      /* 8px - Tight spacing */
gap-3      /* 12px - Close spacing */
gap-4      /* 16px - Standard spacing */
gap-6      /* 24px - Comfortable spacing */
gap-8      /* 32px - Large spacing */
```

---

## 🧩 Component Styles

### Buttons

#### Primary Button (Teal Gradient)
```css
bg-gradient-to-r from-teal-600 to-cyan-600
hover:from-teal-700 hover:to-cyan-700
text-white
font-semibold
py-3 px-4
rounded-lg
transition-all duration-200
focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
shadow-md hover:shadow-lg
transform hover:-translate-y-0.5
```

#### Secondary Button (Slate)
```css
bg-slate-700
hover:bg-slate-800
text-white
font-semibold
py-3 px-4
rounded-lg
transition-colors duration-200
focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
shadow-md hover:shadow-lg
```

#### Outline Button
```css
bg-transparent
border-2 border-slate-300
text-slate-700
hover:bg-slate-50
font-semibold
py-3 px-4
rounded-lg
transition-colors duration-200
```

### Cards

#### Standard Card
```css
bg-white
rounded-xl
shadow-md
p-6
border border-slate-200
```

#### Elevated Card
```css
bg-white
rounded-xl
shadow-lg
p-6
border border-slate-200
hover:shadow-xl
transition-shadow duration-200
```

#### Dark Card
```css
bg-slate-800
rounded-xl
shadow-lg
p-6
border border-slate-700
text-white
```

### Input Fields

#### Text Input
```css
w-full
px-3 py-2
border-2 border-slate-300
rounded-lg
bg-slate-50
text-slate-900
focus:outline-none
focus:ring-2 focus:ring-teal-500
focus:border-teal-500
transition-colors
```

#### Textarea
```css
w-full
px-3 py-2
border-2 border-slate-300
rounded-lg
bg-slate-50
text-slate-900
focus:outline-none
focus:ring-2 focus:ring-teal-500
focus:border-teal-500
transition-colors
resize-none
```

### Navigation

#### Nav Link (Default)
```css
px-4 py-2
rounded-lg
text-sm font-medium
text-slate-300
hover:text-white
hover:bg-slate-700
transition-all duration-200
```

#### Nav Link (Active)
```css
px-4 py-2
rounded-lg
text-sm font-medium
bg-slate-700
text-teal-400
```

### Badges

#### Status Badge (Success)
```css
bg-green-100
text-green-700
px-3 py-1
rounded-full
text-sm font-medium
```

#### Status Badge (Warning)
```css
bg-yellow-100
text-yellow-700
px-3 py-1
rounded-full
text-sm font-medium
```

#### Status Badge (Error)
```css
bg-red-100
text-red-700
px-3 py-1
rounded-full
text-sm font-medium
```

### Alerts

#### Success Alert
```css
bg-green-50
border-l-4 border-green-500
text-green-700
px-4 py-3
rounded-lg
shadow-md
```

#### Error Alert
```css
bg-red-50
border-l-4 border-red-500
text-red-700
px-4 py-3
rounded-lg
shadow-md
```

#### Info Alert
```css
bg-blue-50
border-l-4 border-blue-500
text-blue-700
px-4 py-3
rounded-lg
shadow-md
```

---

## 🌈 Gradients

### Primary Gradient (Teal to Cyan)
```css
bg-gradient-to-r from-teal-600 to-cyan-600
/* Used for: Primary buttons, CTAs, logo background */
```

### Dark Gradient (Slate)
```css
bg-gradient-to-r from-slate-800 to-slate-700
/* Used for: Headers, hero sections, dark backgrounds */
```

### Light Accent Gradient
```css
bg-gradient-to-br from-teal-50 to-cyan-50
/* Used for: Light accent cards, highlights */
```

### Hero Gradient
```css
bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900
/* Used for: Hero sections, landing page backgrounds */
```

### Logo Gradient
```css
/* SVG Gradient */
linearGradient: #0D9488 → #06B6D4
/* Used for: Logo background circle */
```

---

## 🎭 Shadows & Elevation

### Shadow Scale
```css
shadow-sm    /* Subtle shadow - Small elements */
shadow-md    /* Standard shadow - Cards, buttons */
shadow-lg    /* Large shadow - Elevated cards, modals */
shadow-xl    /* Extra large - Important modals, dropdowns */
shadow-2xl   /* Maximum shadow - Hero elements */
```

### Common Shadow Patterns

#### Card Shadow
```css
shadow-md
hover:shadow-lg
transition-shadow duration-200
```

#### Button Shadow
```css
shadow-md
hover:shadow-lg
```

#### Modal Shadow
```css
shadow-xl
```

#### Navigation Shadow
```css
shadow-lg
```

### Shadow Colors
- Default: `rgba(0, 0, 0, 0.1)` - Standard black shadow
- Dark: `rgba(0, 0, 0, 0.2)` - Deeper shadows for dark backgrounds

---

## 🔲 Borders & Radius

### Border Width
```css
border       /* 1px */
border-2     /* 2px - Standard for inputs, cards */
border-4     /* 4px - Thick borders */
```

### Border Colors
```css
border-slate-200  /* Card borders */
border-slate-300  /* Input borders */
border-slate-700  /* Dark section borders */
border-teal-500   /* Focus borders, active states */
```

### Border Radius
```css
rounded      /* 0.25rem / 4px   - Small radius */
rounded-lg   /* 0.5rem / 8px    - Standard (buttons, inputs) */
rounded-xl   /* 0.75rem / 12px  - Cards, large elements */
rounded-2xl  /* 1rem / 16px     - Hero sections, banners */
rounded-full /* 9999px          - Pills, avatars, badges */
```

### Common Border Patterns

#### Card Border
```css
border border-slate-200
rounded-xl
```

#### Input Border
```css
border-2 border-slate-300
rounded-lg
focus:border-teal-500
```

#### Active Border
```css
border-l-4 border-teal-500
/* Left border for active states, alerts */
```

---

## ✨ Animations & Transitions

### Transition Durations
```css
transition-none      /* 0ms */
transition-all       /* 150ms - All properties */
duration-75          /* 75ms - Very fast */
duration-100         /* 100ms - Fast */
duration-150         /* 150ms - Standard */
duration-200         /* 200ms - Smooth (most common) */
duration-300         /* 300ms - Slower */
duration-500         /* 500ms - Slow */
```

### Transition Properties
```css
transition-colors    /* Color changes */
transition-all       /* All properties */
transition-shadow    /* Shadow changes */
transition-transform /* Transform changes */
```

### Common Animations

#### Fade In
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
animate-fade-in
```

#### Hover Lift
```css
transform hover:-translate-y-0.5
transition-transform duration-200
```

#### Button Press
```css
active:scale-95
transition-transform duration-100
```

#### Loading Spinner
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
animate-spin
```

### Custom Animations (globals.css)
```css
/* Fade In */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Bounce */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
```

---

## 🎯 Design Tokens

### Color Tokens
```javascript
const colors = {
  primary: {
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    teal: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488', // PRIMARY
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
    },
    cyan: {
      50: '#ECFEFF',
      100: '#CFFAFE',
      200: '#A5F3FC',
      300: '#67E8F9',
      400: '#22D3EE',
      500: '#06B6D4', // SECONDARY
      600: '#0891B2',
      700: '#0E7490',
    },
  },
  semantic: {
    success: '#22C55E',
    error: '#EF4444',
    warning: '#EAB308',
    info: '#3B82F6',
  },
};
```

### Spacing Tokens
```javascript
const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};
```

### Typography Tokens
```javascript
const typography = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
```

---

## 📐 Usage Examples

### Complete Button Example
```tsx
<button className="
  bg-gradient-to-r from-teal-600 to-cyan-600
  hover:from-teal-700 hover:to-cyan-700
  text-white
  font-semibold
  py-3 px-4
  rounded-lg
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
  shadow-md hover:shadow-lg
  transform hover:-translate-y-0.5
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Click Me
</button>
```

### Complete Card Example
```tsx
<div className="
  bg-white
  rounded-xl
  shadow-md
  p-6
  border border-slate-200
  hover:shadow-lg
  transition-shadow duration-200
">
  <h3 className="text-xl font-semibold text-slate-800 mb-2">
    Card Title
  </h3>
  <p className="text-slate-600">
    Card content goes here...
  </p>
</div>
```

### Complete Input Example
```tsx
<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Email Address
  </label>
  <input
    type="email"
    className="
      w-full
      px-3 py-2
      border-2 border-slate-300
      rounded-lg
      bg-slate-50
      text-slate-900
      focus:outline-none
      focus:ring-2 focus:ring-teal-500
      focus:border-teal-500
      transition-colors
    "
    placeholder="Enter your email"
  />
</div>
```

### Complete Navigation Link Example
```tsx
<Link
  href="/dashboard"
  className={`
    px-4 py-2
    rounded-lg
    text-sm font-medium
    transition-all duration-200
    ${
      isActive
        ? 'bg-slate-700 text-teal-400'
        : 'text-slate-300 hover:text-white hover:bg-slate-700'
    }
  `}
>
  Dashboard
</Link>
```

### Complete Alert Example
```tsx
<div className="
  bg-green-50
  border-l-4 border-green-500
  text-green-700
  px-4 py-3
  rounded-lg
  shadow-md
  animate-fade-in
">
  <div className="flex items-center gap-2">
    <span className="text-2xl">✅</span>
    <div>
      <p className="font-bold">Success!</p>
      <p>Your action was completed successfully.</p>
    </div>
  </div>
</div>
```

---

## 🎨 Theme Summary

### Color Philosophy
- **Primary**: Slate Gray (#1E293B) - Professional, trustworthy
- **Accent**: Teal (#0D9488) - Modern, tech-forward
- **Secondary**: Cyan (#06B6D4) - Fresh, energetic
- **Semantic**: Green (success), Red (error), Yellow (warning), Blue (info)

### Design Principles
1. **Professional** - Enterprise-grade appearance
2. **Consistent** - Unified design system
3. **Accessible** - High contrast, readable
4. **Modern** - Contemporary gradients and shadows
5. **Clean** - Minimal, focused design

### Key Characteristics
- ✅ Dark navigation (slate-800)
- ✅ Teal accent colors throughout
- ✅ Smooth transitions (200ms standard)
- ✅ Consistent spacing (4px base unit)
- ✅ Professional typography (system fonts)
- ✅ Subtle shadows (md/lg)
- ✅ Rounded corners (lg/xl)
- ✅ Gradient buttons (teal → cyan)

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices (phones) */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

### Common Responsive Patterns
```css
/* Mobile First */
text-base          /* Default: 16px */
md:text-lg         /* Medium+: 18px */
lg:text-xl         /* Large+: 20px */

/* Grid Layouts */
grid-cols-1         /* Mobile: 1 column */
md:grid-cols-2      /* Medium+: 2 columns */
lg:grid-cols-3      /* Large+: 3 columns */

/* Spacing */
px-4               /* Mobile: 16px */
md:px-8            /* Medium+: 32px */
lg:px-12            /* Large+: 48px */
```

---

## 🎯 Quick Reference

### Most Used Colors
- `slate-800` - Dark backgrounds, navigation
- `slate-700` - Secondary dark, hover states
- `slate-200` - Borders, dividers
- `teal-600` - Primary buttons, active states
- `cyan-500` - Gradient stops, highlights

### Most Used Spacing
- `p-6` - Card padding
- `gap-4` - Standard gap
- `mb-8` - Section spacing
- `py-3 px-4` - Button padding

### Most Used Shadows
- `shadow-md` - Cards, buttons
- `shadow-lg` - Elevated elements
- `shadow-xl` - Modals, dropdowns

### Most Used Radius
- `rounded-lg` - Buttons, inputs
- `rounded-xl` - Cards
- `rounded-2xl` - Hero sections

---

**Theme Version:** 2.0.0  
**Last Updated:** November 29, 2024  
**Design System:** Tailwind CSS + Custom  
**Color Scheme:** Slate Gray + Teal Professional

---

*This theme creates a professional, enterprise-grade appearance perfect for SaaS applications, insurance platforms, and B2B services.*

