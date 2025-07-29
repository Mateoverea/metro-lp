import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      borderRadius: {
        '4xl': '2.4rem'
      },
      colors: {
        // Universidad Metropolitana Brand Colors
        'university': {
          'navy': '#003366',      // Color primario - azul marino
          'navy-dark': '#002244',  // Azul más oscuro para hover
          'navy-light': '#004477', // Azul más claro para variaciones
          'gold': '#FFD700',       // Dorado para acentos
          'silver': '#C0C0C0',     // Plata para detalles
          'academic': {
            50: '#f0f6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#003366',
          }
        }
      },
      fontFamily: {
        geistSans: ['var(--font-geist-sans)'],
        geistMono: ['var(--font-geist-mono)']
      },
      keyframes: {
        'logo-marquee-move': {
          '0%': {
            transform: 'translate3d(0, 0, 0)'
          },
          '100%': {
            transform: 'translate3d(-100%, 0, 0)'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 51, 102, 0.5)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 51, 102, 0.8)',
            transform: 'scale(1.02)'
          }
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        }
      },
      animation: {
        'logo-marquee': 'logo-marquee-move 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
        'pause': 'none',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("tailwindcss-animate")
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
};

export default config;