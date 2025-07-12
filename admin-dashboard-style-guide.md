# Admin Dashboard Style Guide - GemScope AI

## 📋 Overview
This style guide defines the visual design system for the GemScope AI admin dashboard, maintaining the Certano folder structure while implementing the new color scheme and gradients provided.

---

## 🎨 Color Palette

### Primary Colors
- **Background Dark**: `#0D0D0D` (Main background)
- **Panel Background**: `#1A1A1A` (Sidebar background)
- **Card Background**: `#1E1E1E` (Main content cards)
- **Card Alt Background**: `#2A2A2A` (Secondary cards)

### Text Colors
- **Primary Text**: `#FFFFFF` (Headings, primary content)
- **Secondary Text**: `#A0A0A0` (Descriptions, secondary content)
- **Muted Text**: `#666666` (Timestamps, subtle information)

### Accent Colors
- **Success Green**: `#10B981`
- **Warning Yellow**: `#F59E0B`
- **Error Red**: `#EF4444`
- **Info Blue**: `#3B82F6`

---

## 🌈 Gradients

### Button Gradient (Primary CTA)
```css
background: linear-gradient(99.45deg, #6E09D3 -14.89%, #DDCBF0 21.92%, #F2F2F2 47.17%, #F0DBED 71.06%, #FF6CFB 115.33%);
```

### Plan Gradients

#### Free Plan
```css
background: linear-gradient(360deg, #F5DBE0 -21.35%, #C32388 104.32%);
```

#### Pro Plan
```css
background: linear-gradient(180deg, #7F00CE -4.81%, #EED4FF 125.36%);
```

#### Enterprise Plan
```css
background: linear-gradient(180.57deg, #0808FF -4.69%, #C9C9FF 130.44%);
```

#### Lifetime Plan
```css
background: linear-gradient(182.23deg, #C4A502 34.28%, #FBFFCC 106.48%);
```

### Dashboard Card Gradients
```css
/* Statistics Cards - Purple to Blue */
.stats-card-gradient {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
}

/* Earnings Card - Purple to Pink */
.earnings-card-gradient {
  background: linear-gradient(135deg, #A855F7 0%, #EC4899 100%);
}

/* New Users Card - Blue to Cyan */
.new-users-card-gradient {
  background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
}
```

---

## 🖼️ Typography

### Font Families
- **Primary**: "Schibsted Grotesk", sans-serif (Headings, UI elements)
- **Secondary**: "Lato", sans-serif (Body text, descriptions)

### Font Weights & Sizes
```css
/* Headings */
.text-hero { font-size: 2.5rem; font-weight: 700; } /* Welcome back! */
.text-h1 { font-size: 2rem; font-weight: 600; }
.text-h2 { font-size: 1.5rem; font-weight: 600; }
.text-h3 { font-size: 1.25rem; font-weight: 500; }

/* Body Text */
.text-body-lg { font-size: 1.125rem; font-weight: 400; }
.text-body { font-size: 1rem; font-weight: 400; }
.text-body-sm { font-size: 0.875rem; font-weight: 400; }
.text-caption { font-size: 0.75rem; font-weight: 400; }

/* Stats Numbers */
.text-stat-primary { font-size: 3rem; font-weight: 700; } /* 4,322 */
.text-stat-secondary { font-size: 2rem; font-weight: 600; } /* $182,350 */
```

---

## 🎯 Components

### 1. Sidebar Navigation

#### Structure
```
src/components/layout/Sidebar.jsx
src/assets/styles/components/sidebar.css
```

#### Active State
- **Background**: Gradient overlay with inverted text/icon colors
- **Text Color**: `#FFFFFF` (inverted)
- **Icon Color**: `#FFFFFF` (inverted)
- **Border**: Left border with gradient accent

#### Hover State
- **Background**: `rgba(255, 255, 255, 0.05)`
- **Transition**: `all 0.3s ease`

#### Navigation Items
```css
.sidebar-nav-item {
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.sidebar-nav-item.active {
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  color: #FFFFFF;
}

.sidebar-nav-item:hover:not(.active) {
  background: rgba(255, 255, 255, 0.05);
}
```

### 2. Dashboard Cards

#### Statistics Cards
```css
.stats-card {
  background: #1E1E1E;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
  opacity: 0.1;
  z-index: 1;
}

.stats-card-content {
  position: relative;
  z-index: 2;
}
```

#### Chart Container
```css
.chart-container {
  background: #202020;
  border-radius: 12px;
  padding: 24px;
  height: 400px;
}
```

### 3. Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(99.45deg, #6E09D3 -14.89%, #DDCBF0 21.92%, #F2F2F2 47.17%, #F0DBED 71.06%, #FF6CFB 115.33%);
  color: #000000; /* Black text as specified */
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(110, 9, 211, 0.3);
}
```

#### Toggle Buttons (Monthly/Yearly)
```css
.toggle-button {
  background: #2A2A2A;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 8px 16px;
  color: #A0A0A0;
  transition: all 0.3s ease;
}

.toggle-button.active {
  background: linear-gradient(99.45deg, #6E09D3 -14.89%, #DDCBF0 21.92%, #F2F2F2 47.17%, #F0DBED 71.06%, #FF6CFB 115.33%);
  color: #000000;
}
```

### 4. Plan Pills

#### Free Plan Pill
```css
.pill-free {
  background: linear-gradient(360deg, #F5DBE0 -21.35%, #C32388 104.32%);
  color: #FFFFFF;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
```

#### Pro Plan Pill
```css
.pill-pro {
  background: linear-gradient(180deg, #7F00CE -4.81%, #EED4FF 125.36%);
  color: #FFFFFF;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
```

#### Enterprise Plan Pill
```css
.pill-enterprise {
  background: linear-gradient(180.57deg, #0808FF -4.69%, #C9C9FF 130.44%);
  color: #FFFFFF;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
```

#### Lifetime Plan Pill
```css
.pill-lifetime {
  background: linear-gradient(182.23deg, #C4A502 34.28%, #FBFFCC 106.48%);
  color: #000000;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
```

### 5. User Avatar & Profile
use this link for the avatar picture inside a circle shape:
https://www.freepik.com/free-photo/look-there-happy-attractive-young-man-with-stubble-posing-against-blank-blue-studio-wall_11528363.htm#fromView=image_search&page=1&position=2&uuid=b0d19fa7-722c-4569-95a2-8d780795315b&query=Handsome
```css
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.05);
}
```

### 6. Data Tables

#### Recent Customers & AI Searches
```css
.data-table {
  background: #202020;
  border-radius: 12px;
  padding: 24px;
}

.data-table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table-row:last-child {
  border-bottom: none;
}

.user-initials {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2A2A2A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #FFFFFF;
}
```

---

## 📱 Layout Structure

### Main Layout (Certano Structure)
```
src/
├── components/
│   ├── layout/
│   │   ├── MainLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── dashboard/
│   │   ├── Stats.jsx
│   │   ├── EarningsChart.jsx
│   │   ├── RecentCustomers.jsx
│   │   └── RecentAISearches.jsx
│   └── common/
│       ├── Button.jsx
│       ├── Card.jsx
│       └── StatusBadge.jsx
├── assets/
│   ├── gem-assets/ (Replace with new assets)
│   │   ├── icons/
│   │   └── logos/
│   └── styles/
│       └── components/
├── pages/
│   ├── Dashboard.jsx
│   ├── UserManagement.jsx
│   ├── Reporting.jsx
│   └── Settings.jsx
└── utils/
    └── constants/
        └── navigation.js
```

### Grid Layout
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.dashboard-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-section {
    grid-template-columns: 1fr;
  }
}
```

---

## 🎬 Animations & Transitions

### Hover Effects
```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
```

### Loading States
```css
.skeleton {
  background: linear-gradient(90deg, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 📊 Chart Styling

### Earnings Overview Chart
```css
.chart-gradient-line {
  stroke: url(#chartGradient);
  stroke-width: 3;
  fill: none;
}

.chart-gradient-area {
  fill: url(#chartAreaGradient);
}
```

### SVG Gradients
```html
<defs>
  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
  </linearGradient>
  <linearGradient id="chartAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.3" />
    <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.1" />
  </linearGradient>
</defs>
```

---

## 🔧 Asset Replacement Guidelines

### Icons (from gem-assets)
- Replace all existing icons in `src/assets/icons/` with icons from `gem-assets`
- Maintain SVG format for scalability
- Use consistent sizing: 20px for navigation, 16px for buttons, 24px for cards

### Logo
- Replace GemScope AI logo in header
- Maintain aspect ratio
- Optimize for both light and dark backgrounds

### Patterns & Backgrounds
- Update background patterns in `src/assets/images/patterns/`
- Ensure patterns complement the new gradient scheme

---

## 📋 Implementation Checklist

### Phase 1: Core Structure
- [ ] Update color variables in `tailwind.config.js`
- [ ] Replace button gradients in `src/assets/styles/components/button.css`
- [ ] Update sidebar active states in `src/assets/styles/components/sidebar.css`
- [ ] Implement plan pill components

### Phase 2: Dashboard Components
- [ ] Create statistics cards with new gradients
- [ ] Implement earnings chart with gradient styling
- [ ] Update user management tables
- [ ] Add recent AI searches component

### Phase 3: Assets & Polish
- [ ] Replace all icons with gem-assets
- [ ] Update logo and branding
- [ ] Implement hover animations
- [ ] Add responsive breakpoints

### Phase 4: Testing
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] Performance optimization

---

## 📝 Notes

1. **Dark Theme Toggle**: The bottom-left toggle should maintain the light/dark functionality while using the new gradient for the light state.

2. **Notification Badge**: The notification icon in the header should use a red badge (#EF4444) for unread notifications.

3. **Responsive Design**: Ensure all gradients and components scale properly across different screen sizes.

4. **Performance**: Optimize gradient rendering for better performance, especially on lower-end devices.

5. **Accessibility**: Maintain proper contrast ratios even with gradient backgrounds. Test with screen readers.
6. I want the folder structure src/components/respective module(folder) and pages folder should have a single file that imports that functional components 

plus i need sidebar curved from the bottom and in the topbar i want the same subtle logo with a subtle around the icon with respective page name and a 
notification icon with gray (#202020) bg with a dot at the bg with the mock user image (url) that i gave 
7. use tailwind for styling framer for animations and hero icons for icons extras and vite react install eslint for linting  
---

*This style guide should be updated as the design evolves. Always refer to this document for consistency across the admin dashboard.*

# Certano Admin Dashboard Style Guide

This style guide documents the design system used in the Certano Admin Dashboard to ensure consistency across the platform.

## 1. Brand Colors & Theme

### Primary Color Palette

| Color Name           | Hex Code  | Description                      | Usage                       |
| -------------------- | --------- | -------------------------------- | --------------------------- |
| Primary Background   | `#0D0D0D` | Dark background color            | Main application background |
| Panels Background    | `#1A1A1A` | Slightly lighter dark background | Panel containers            |
| Cards Background     | `#1E1E1E` | Card background color            | Content cards               |
| Cards Alt Background | `#2A2A2A` | Alternative card background      | Secondary cards             |
| Text Headings        | `#FFFFFF` | Pure white                       | Headers and titles          |
| Text Body            | `#A0A0A0` | Light gray                       | Body text and paragraphs    |
| Text Emphasis        | `#FF6F61` | Coral accent                     | Highlighting important text |
| Border Outline       | `#FFFFFF` | White                            | Borders and outlines        |

### Gradients

The primary gradient used throughout the application:

```css
--gradient-primary: linear-gradient(
  93.17deg,
  #9148d9 1.94%,
  #c0a4db 15.09%,
  #dccdeb 20.19%,
  #ffffff 26.52%,
  #ffffff 36.35%,
  #ffffff 61.89%,
  #ffffff 80.21%,
  #ffd4cb 89.94%,
  #ff8067 106.84%
);
```

This gradient is used for highlighted elements, active states, and brand accents.

### Shadow Variables

```css
--shadow-color-primary: rgba(145, 72, 217, 0.4);
--shadow-color-secondary: rgba(59, 130, 246, 0.4);
--shadow-color-white: rgba(255, 255, 255, 0.25);
```

## 2. Typography

### Font Families

The application uses a combination of two primary fonts:

1. **Schibsted Grotesk** - Primary font for headings and important UI elements

   ```css
   font-family: "Schibsted Grotesk", sans-serif;
   ```

2. **Lato** - Secondary font for body text and smaller UI elements
   ```css
   font-family: "Lato", sans-serif;
   ```

### Font Sizes and Weights

Default body text:

- Font size: 20px
- Font weight: 400
- Line height: 100%
- Letter spacing: -3%

Use these classes to apply the correct font family:

```css
.font-schibsted {
  font-family: "Schibsted Grotesk", sans-serif;
}
.font-lato {
  font-family: "Lato", sans-serif;
}
```

## 3. Button Styles

### Button Variables

```css
--hover-scale: 1.04;
--hover-y-offset: -2px;
--transition-duration: 0.3s;
--transition-timing: cubic-bezier(0.33, 1, 0.68, 1);
```

### Button Types

1. **Primary Button**

   - Gradient background
   - White text
   - Glowing shadow on hover

2. **Secondary Button**

   - Solid background
   - Custom hover animation

3. **White Button**
   - White background
   - Dark text
   - Subtle hover effect

### Button Hover Effects

All buttons have a consistent hover animation that:

- Scales the button slightly (1.04x)
- Lifts the button up (-2px)
- Adds a glowing shadow
- Animates a gradient overlay

Example button HTML structure:

```html
<button class="btn-hover btn-primary">
  <span class="btn-content">Button Text</span>
  <div class="btn-gradient-overlay"></div>
  <div class="btn-glow"></div>
</button>
```

### Button Active State

When pressed, buttons scale down slightly to create a tactile feedback effect:

```css
.btn-hover:active {
  transform: scale(0.98);
}
```

## 4. Sidebar Navigation

### Sidebar Appearance

The sidebar uses a gradient background with an animation effect:

```css
.sidebar-gradient-active {
  background: linear-gradient(135deg, #cba7ff 0%, #ffc7aa 100%);
  background-size: 200% 200%;
  animation: gradientShift 5s ease infinite;
}
```

### Navigation Item Styling

Sidebar navigation items have a subtle hover effect:

```css
.sidebar-item-hover:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}
```

### Active State

The active navigation item should:

- Have a slightly brighter background
- Include a left border accent in the primary gradient color
- Use white text instead of gray

## 5. Layout & Spacing

### Container Structure

The admin dashboard follows a hierarchical container structure:

1. Main container - full width and height
2. Panel containers - flexible width based on content
3. Card components - consistent padding and margins

### Spacing System

Use consistent spacing throughout the interface:

- Extra small: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- Extra large: 32px
- 2x Extra large: 48px

### Card Styling

Cards should use the `--cards-bg` or `--cards-alt-bg` variables and include:

- Consistent border radius (8px recommended)
- Optional border using `--border-outline` with 5% opacity
- Consistent internal padding (16px or 24px)

## 6. Animations & Transitions

### Transition Defaults

All interactive elements should use smooth transitions:

```css
.smooth-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Animation Keyframes

Several predefined animations are available:

1. **Float Animation**

   ```css
   @keyframes float {
     0%,
     100% {
       transform: translateY(0px);
     }
     50% {
       transform: translateY(-10px);
     }
   }
   ```

2. **Fade In**

   ```css
   @keyframes fadeIn {
     from {
       opacity: 0;
       transform: translateY(30px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ```

3. **Slide In From Left/Right**

   ```css
   @keyframes slideInFromLeft {
     from {
       opacity: 0;
       transform: translateX(-50px);
     }
     to {
       opacity: 1;
       transform: translateX(0);
     }
   }
   ```

4. **Pulse Animation**

   ```css
   @keyframes pulse {
     0%,
     100% {
       transform: scale(1);
     }
     50% {
       transform: scale(1.05);
     }
   }
   ```

5. **Gradient Shift Animation** (for sidebar)
   ```css
   @keyframes gradientShift {
     0% {
       background-position: 0% 50%;
     }
     50% {
       background-position: 100% 50%;
     }
     100% {
       background-position: 0% 50%;
     }
   }
   ```

### Animation Classes

Apply animations using these utility classes:

```css
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}
.animate-slideInLeft {
  animation: slideInFromLeft 0.8s ease-out;
}
.animate-slideInRight {
  animation: slideInFromRight 0.8s ease-out;
}
.animate-pulse-custom {
  animation: pulse 2s ease-in-out infinite;
}
```

## Implementation Notes

1. Always use CSS variables for colors and gradients to maintain consistency
2. Follow the button structure exactly as documented for proper hover effects
3. Use the appropriate font for each UI element (Schibsted for headings, Lato for body)
4. Apply animation classes sparingly to avoid overwhelming the user
5. Maintain consistent spacing using the defined spacing system
