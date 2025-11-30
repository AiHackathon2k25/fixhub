# FixHub Design System

Inspired by minimalist, elegant e-commerce aesthetics with soft teal and cream color palettes.

## Color Palette

### Primary Colors (Soft Teal)
- `primary-500`: #7BA8A8 - Main brand color
- `primary-400`: #6EC4C4 - Lighter variant
- `primary-600`: #5A8B8B - Darker variant

### Background Colors (Cream)
- `cream-100`: #FAF7F4 - Main background
- `cream-200`: #F5F1ED - Card backgrounds
- `cream-300`: #F0EBE6 - Subtle backgrounds

### Text Colors (Slate)
- `slate-800`: #1E293B - Primary text
- `slate-600`: #475569 - Secondary text
- `slate-400`: #94A3B8 - Muted text

### Accent Colors
- `sage-500`: #6B8E6B - Green accent
- `emerald-*`: Success states
- `amber-*`: Warning states
- `rose-*`: Error states

## Typography

### Font Families
- **Display**: Playfair Display (headings)
- **Serif**: Merriweather (elegant body text)
- **Sans**: Inter (UI elements)

### Font Sizes
- `display-1`: 4.5rem - Hero headings
- `display-2`: 3.75rem - Section headings
- `display-3`: 3rem - Card headings

## Components

### Cards
```jsx
<div className="card">
  {/* Content */}
</div>
```
- Soft shadows with teal tint
- Rounded corners (1.5rem)
- Hover lift effect

### Buttons
```jsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-outline">Outline Action</button>
```

### Badges
```jsx
<span className="badge badge-primary">Status</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-error">Error</span>
```

### Input Fields
```jsx
<input className="input-field" placeholder="Enter text..." />
```

## Shadows
- `shadow-soft`: Subtle elevation
- `shadow-soft-lg`: Medium elevation
- `shadow-soft-xl`: High elevation

## Gradients
- `bg-gradient-soft`: Soft teal to cream
- `bg-gradient-primary`: Primary teal gradient
- `bg-gradient-cream`: Cream gradient

## Animations
- `animate-fade-in`: Fade in with slide up
- `animate-slide-in`: Slide in from left
- `animate-scale-in`: Scale in smoothly

## Usage Examples

### Hero Section
```jsx
<section className="bg-gradient-soft bg-grid-soft py-20">
  <h1 className="font-display text-display-1 text-slate-900">
    Elegant Headline
  </h1>
</section>
```

### Card with Shadow
```jsx
<div className="card p-6 hover:shadow-soft-lg">
  <h3 className="font-display text-2xl mb-4">Card Title</h3>
  <p className="text-slate-600">Card content...</p>
</div>
```

### Form Elements
```jsx
<form className="space-y-4">
  <input className="input-field" type="email" placeholder="Email" />
  <button className="btn-primary w-full">Submit</button>
</form>
```

