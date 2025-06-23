/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0D0D0D',
        'panels-bg': '#1A1A1A',
        'cards-bg': '#1E1E1E',
        'cards-alt-bg': '#2A2A2A',
        'text-heading': '#FFFFFF',
        'text-body': '#A0A0A0',
        'text-emphasis': '#FF6F61',
        'border-outline': '#FFFFFF',
        'gradient-start': '#9148d9',
        'gradient-mid': '#c0a4db',
        'gradient-end': '#ff8067',
        'gradient-mid-light': '#dccdeb',
        'gradient-end-light': '#ffd4cb',
      },
      fontFamily: {
        'schibsted': ['"Schibsted Grotesk"', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'primary': '0 4px 20px rgba(145, 72, 217, 0.4)',
        'secondary': '0 4px 20px rgba(59, 130, 246, 0.4)',
        'white': '0 4px 20px rgba(255, 255, 255, 0.25)',
        'gradient-start': '0 4px 20px rgba(145, 72, 217, 0.4)',
        'gradient-end': '0 4px 20px rgba(255, 128, 103, 0.4)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(93.17deg, #9148d9 1.94%, #c0a4db 15.09%, #dccdeb 20.19%, #ffffff 26.52%, #ffffff 36.35%, #ffffff 61.89%, #ffffff 80.21%, #ffd4cb 89.94%, #ff8067 106.84%)',
        'gradient-primary-simple': 'linear-gradient(93.17deg, #9148d9 0%, #ff8067 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.8s ease-out',
        'slideInLeft': 'slideInFromLeft 0.8s ease-out',
        'slideInRight': 'slideInFromRight 0.8s ease-out',
        'pulse-custom': 'pulse 2s ease-in-out infinite',
        'gradientShift': 'gradientShift 5s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromLeft: {
          'from': { opacity: '0', transform: 'translateX(-50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          'from': { opacity: '0', transform: 'translateX(50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      transitionProperty: {
        'hover': 'transform, box-shadow, background',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
    },
  },
  plugins: [],
}
