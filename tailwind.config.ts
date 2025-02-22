import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      maxWidth: {
        sm: '30rem', // sm:max-w-sm 클래스를 30rem으로 설정
      },
      colors: {
        foreground: 'hsl(var(--foreground))',
        background: 'hsl(var(--background))',
        warning: '#CC2E2E',
        'black-primary': '#202125',
        'white-primary': '#FAFAFA',
        'return-red': '#CC2E2E',
        'return-blue': '#5294FF',
        'main-primary': '#899FD8',
        'main-secondary': '#C0C9E0',
        'main-tertiary': '#ECF4FF',
        'gray-primary': '#37393C',
        'gray-secondary': '#898C8E',
        'gray-tertiary': '#F2F1F1',
        'gray-border': '#DCDDDE',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontSize: {
        'heading-1_M': [
          '24px',
          {
            lineHeight: '32px',
          },
        ],
        'heading-2_M': [
          '22px',
          {
            lineHeight: '30px',
          },
        ],
        'heading-3_M': [
          '20px',
          {
            lineHeight: '28px',
          },
        ],
        'heading-4_M': [
          '18px',
          {
            lineHeight: '26px',
          },
        ],
        'body-1-normal_semi': [
          '16px',
          {
            lineHeight: '24px',
          },
        ],
        'body-1-normal_medi': [
          '16px',
          {
            lineHeight: '24px',
          },
        ],
        'body-2-normal_semi': [
          '14px',
          {
            lineHeight: '20px',
          },
        ],
        'body-2-normal_medi': [
          '14px',
          {
            lineHeight: '20px',
          },
        ],
        'body-1-long': [
          '16px',
          {
            lineHeight: '26px',
          },
        ],
        'body-2-long': [
          '14px',
          {
            lineHeight: '22px',
          },
        ],
        'caption-1_semi': [
          '12px',
          {
            lineHeight: '18px',
          },
        ],
        'caption-1_midi': [
          '12px',
          {
            lineHeight: '18px',
          },
        ],
        'caption-2_semi': [
          '11px',
          {
            lineHeight: '16px',
          },
        ],
        'caption-2_midi': [
          '11px',
          {
            lineHeight: '16px',
          },
        ],
        'heading-1_D': [
          '40px',
          {
            lineHeight: '56px',
          },
        ],
        'heading-2_D': [
          '32px',
          {
            lineHeight: '40px',
          },
        ],
        'heading-3_D': [
          '24px',
          {
            lineHeight: '32px',
          },
        ],
        'heading-4_D': [
          '20px',
          {
            lineHeight: '28px',
          },
        ],
        text: [
          '18px',
          {
            lineHeight: '20px',
          },
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
