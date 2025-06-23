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
