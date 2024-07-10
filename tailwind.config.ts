import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'dark-layer-1': 'rgb(40,40,40)',
        'dark-label-2': 'rgba(239, 241, 246, 0.75)',
        'dark-divider-border-2': 'rgb(61, 61, 61)',
        'dark-fill-2': 'hsla(0,0%,100%,.14)',
        'dark-fill-3': 'hsla(0,0%,100%,.1)',
        'dark-gray-6': 'rgb(138, 138, 138)',
        'dark-gray-7': 'rgb(179, 179, 179)',
        'gray-8': 'rgb(38, 38, 38)',
        'brand-purple': 'rgb(97, 12, 159)',
        'brand-purple-s': 'rgb(77, 7, 125)',
        'dark-green-s': 'rgb(44 187 93)',
        'sd-gray-50': 'hsl(var(--sd-gray-50))',
        'sd-gray-100': 'hsl(var(--sd-gray-100))',
        'sd-gray-200': 'hsl(var(--sd-gray-200))',
        'sd-gray-300': 'hsl(var(--sd-gray-300))',
        'sd-gray-400': 'hsl(var(--sd-gray-400))',
        'sd-gray-500': 'hsl(var(--sd-gray-500))',
        'sd-gray-600': 'hsl(var(--sd-gray-600))',
        'sd-gray-700': 'hsl(var(--sd-gray-700))',
        'sd-gray-800': 'hsl(var(--sd-gray-800))',
        'sd-gray-900': 'hsl(var(--sd-gray-900))',
        'sd-gray-950': 'hsl(var(--sd-gray-950))',
        'sd-red-50': 'hsl(var(--sd-red-50))',
        'sd-red-100': 'hsl(var(--sd-red-100))',
        'sd-red-200': 'hsl(var(--sd-red-200))',
        'sd-red-300': 'hsl(var(--sd-red-300))',
        'sd-red-400': 'hsl(var(--sd-red-400))',
        'sd-red-500': 'hsl(var(--sd-red-500))',
        'sd-red-600': 'hsl(var(--sd-red-600))',
        'sd-red-700': 'hsl(var(--sd-red-700))',
        'sd-red-800': 'hsl(var(--sd-red-800))',
        'sd-red-900': 'hsl(var(--sd-red-900))',
        'sd-red-950': 'hsl(var(--sd-red-950))',
        'sd-rose-50': 'hsl(var(--sd-rose-50))',
        'sd-rose-100': 'hsl(var(--sd-rose-100))',
        'sd-rose-200': 'hsl(var(--sd-rose-200))',
        'sd-rose-300': 'hsl(var(--sd-rose-300))',
        'sd-rose-400': 'hsl(var(--sd-rose-400))',
        'sd-rose-500': 'hsl(var(--sd-rose-500))',
        'sd-rose-600': 'hsl(var(--sd-rose-600))',
        'sd-rose-700': 'hsl(var(--sd-rose-700))',
        'sd-rose-800': 'hsl(var(--sd-rose-800))',
        'sd-rose-900': 'hsl(var(--sd-rose-900))',
        'sd-rose-950': 'hsl(var(--sd-rose-950))',
        'sd-purple-50': 'hsl(var(--sd-purple-50))',
        'sd-purple-100': 'hsl(var(--sd-purple-100))',
        'sd-purple-200': 'hsl(var(--sd-purple-200))',
        'sd-purple-300': 'hsl(var(--sd-purple-300))',
        'sd-purple-400': 'hsl(var(--sd-purple-400))',
        'sd-purple-500': 'hsl(var(--sd-purple-500))',
        'sd-purple-600': 'hsl(var(--sd-purple-600))',
        'sd-purple-700': 'hsl(var(--sd-purple-700))',
        'sd-purple-800': 'hsl(var(--sd-purple-800))',
        'sd-purple-900': 'hsl(var(--sd-purple-900))',
        'sd-purple-950': 'hsl(var(--sd-purple-950))',
        'sd-blue-50': 'hsl(var(--sd-blue-50))',
        'sd-blue-100': 'hsl(var(--sd-blue-100))',
        'sd-blue-200': 'hsl(var(--sd-blue-200))',
        'sd-blue-300': 'hsl(var(--sd-blue-300))',
        'sd-blue-400': 'hsl(var(--sd-blue-400))',
        'sd-blue-500': 'hsl(var(--sd-blue-500))',
        'sd-blue-600': 'hsl(var(--sd-blue-600))',
        'sd-blue-700': 'hsl(var(--sd-blue-700))',
        'sd-blue-800': 'hsl(var(--sd-blue-800))',
        'sd-blue-900': 'hsl(var(--sd-blue-900))',
        'sd-blue-950': 'hsl(var(--sd-blue-950))',
        'sd-teal-50': 'hsl(var(--sd-teal-50))',
        'sd-teal-100': 'hsl(var(--sd-teal-100))',
        'sd-teal-200': 'hsl(var(--sd-teal-200))',
        'sd-teal-300': 'hsl(var(--sd-teal-300))',
        'sd-teal-400': 'hsl(var(--sd-teal-400))',
        'sd-teal-500': 'hsl(var(--sd-teal-500))',
        'sd-teal-600': 'hsl(var(--sd-teal-600))',
        'sd-teal-700': 'hsl(var(--sd-teal-700))',
        'sd-teal-800': 'hsl(var(--sd-teal-800))',
        'sd-teal-900': 'hsl(var(--sd-teal-900))',
        'sd-teal-950': 'hsl(var(--sd-teal-950))',
        'sd-green-50': 'hsl(var(--sd-green-50))',
        'sd-green-100': 'hsl(var(--sd-green-100))',
        'sd-green-200': 'hsl(var(--sd-green-200))',
        'sd-green-300': 'hsl(var(--sd-green-300))',
        'sd-green-400': 'hsl(var(--sd-green-400))',
        'sd-green-500': 'hsl(var(--sd-green-500))',
        'sd-green-600': 'hsl(var(--sd-green-600))',
        'sd-green-700': 'hsl(var(--sd-green-700))',
        'sd-green-800': 'hsl(var(--sd-green-800))',
        'sd-green-900': 'hsl(var(--sd-green-900))',
        'sd-green-950': 'hsl(var(--sd-green-950))',
        'sd-yellow-50': 'hsl(var(--sd-yellow-50))',
        'sd-yellow-100': 'hsl(var(--sd-yellow-100))',
        'sd-yellow-200': 'hsl(var(--sd-yellow-200))',
        'sd-yellow-300': 'hsl(var(--sd-yellow-300))',
        'sd-yellow-400': 'hsl(var(--sd-yellow-400))',
        'sd-yellow-500': 'hsl(var(--sd-yellow-500))',
        'sd-yellow-600': 'hsl(var(--sd-yellow-600))',
        'sd-yellow-700': 'hsl(var(--sd-yellow-700))',
        'sd-yellow-800': 'hsl(var(--sd-yellow-800))',
        'sd-yellow-900': 'hsl(var(--sd-yellow-900))',
        'sd-yellow-950': 'hsl(var(--sd-yellow-950))',
        'sd-brand-lc-orange': 'hsl(var(--sd-brand-lc-orange))',
        'sd-brand-lc-gray': 'hsl(var(--sd-brand-lc-gray))',
        'sd-fixed-black': 'hsl(var(--sd-fixed-black))',
        'sd-fixed-white': 'hsl(var(--sd-fixed-white))',
        'sd-easy': 'hsl(var(--sd-easy))',
        'sd-medium': 'hsl(var(--sd-medium))',
        'sd-hard': 'hsl(var(--sd-hard))',
        'sd-background': 'hsl(var(--sd-background))',
        'sd-background-gray': 'hsl(var(--sd-background-gray))',
        'sd-foreground': 'hsl(var(--sd-foreground))',
        'sd-card': 'hsl(var(--sd-card))',
        'sd-card-foreground': 'hsl(var(--sd-card-foreground))',
        'sd-popover': 'hsl(var(--sd-popover))',
        'sd-popover-foreground': 'hsl(var(--sd-popover-foreground))',
        'sd-primary': 'hsl(var(--sd-primary))',
        'sd-primary-foreground': 'hsl(var(--sd-primary-foreground))',
        'sd-secondary': 'hsl(var(--sd-secondary))',
        'sd-secondary-foreground': 'hsl(var(--sd-secondary-foreground))',
        'sd-muted': 'hsl(var(--sd-muted))',
        'sd-muted-foreground': 'hsl(var(--sd-muted-foreground))',
        'sd-accent': 'hsl(var(--sd-accent))',
        'sd-accent-foreground': 'hsl(var(--sd-accent-foreground))',
        'sd-destructive': 'hsl(var(--sd-destructive))',
        'sd-destructive-foreground': 'hsl(var(--sd-destructive-foreground))',
        'sd-border': 'hsl(var(--sd-border))',
        'sd-input': 'hsl(var(--sd-input))',
        'sd-ring': 'hsl(var(--sd-ring))',
        'sd-danger': 'hsl(var(--sd-danger))',
        'sd-warning': 'hsl(var(--sd-warning))',
        'sd-info': 'hsl(var(--sd-info))',
        'sd-success': 'hsl(var(--sd-success))',
        'sd-radius': 'hsl(var(--sd-radius))',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        warn: {
          DEFAULT: 'hsl(var(--warn))',
          foreground: 'hsl(var(--warn-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
          sd: 'calc(var(--radius) - 6px)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
  },
  plugins: [nextui(), require('@tailwindcss/aspect-ratio'), require('tailwindcss-animate')],
} satisfies Config;

export default config;