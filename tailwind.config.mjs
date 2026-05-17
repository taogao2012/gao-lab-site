import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Source Serif Pro"', '"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#333333',
          soft: '#555555',
          muted: '#777777',
        },
        accent: {
          DEFAULT: '#CC0000',
          soft: '#D62828',
          deep: '#990000',
        },
        secondary: {
          DEFAULT: '#777777',
          soft: '#999999',
        },
        highlight: '#fbe6e6',
        paper: '#a8a8a8',
        rule: '#e0e0e0',
      },
      maxWidth: {
        prose: '68ch',
        page: '1180px',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.DEFAULT'),
            a: { color: theme('colors.accent.DEFAULT') },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
