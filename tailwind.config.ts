import type { Config } from 'tailwindcss';

export default {
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
      colors: {
        foreground: 'var(--foreground)',
        background: 'var(--background)',

        // 기본 색상 정의
        warning: '#CC2E2E',
        'black-primary': '#202125',
        'white-primary': '#FAFAFA',
        // background: '#F3F4F8',

        'return-red': '#CC2E2E',
        'return-blue': '#5294FF',

        'main-primary': '#2E5ACC',
        'main-secondary': '#899FD8',
        'main-tertiary': '#C0C9E0',

        'gray-primary': '#37393C',
        'gray-secondary': '#898C8E',
        'gray-tertiary': '#F2F1F1',
        'gray-border': '#DCDDDE',
      },
      fontSize: {
        'heading-1_M': ['24px', { lineHeight: '32px' }],
        'heading-2_M': ['22px', { lineHeight: '30px' }],
        'heading-3_M': ['20px', { lineHeight: '28px' }],
        'heading-4_M': ['18px', { lineHeight: '26px' }],
        'body-1-normal_semi': ['16px', { lineHeight: '24px' }],
        'body-1-normal_medi': ['16px', { lineHeight: '24px' }],
        'body-2-normal_semi': ['14px', { lineHeight: '20px' }],
        'body-2-normal_medi': ['14px', { lineHeight: '20px' }],
        'body-1-long': ['16px', { lineHeight: '26px' }],
        'body-2-long': ['14px', { lineHeight: '22px' }],
        'caption-1_semi': ['12px', { lineHeight: '18px' }],
        'caption-1_midi': ['12px', { lineHeight: '18px' }],
        'caption-2_semi': ['11px', { lineHeight: '16px' }],
        'caption-2_midi': ['11px', { lineHeight: '16px' }],
        'heading-1_D': ['40px', { lineHeight: '56px' }],
        'heading-2_D': ['32px', { lineHeight: '40px' }],
        'heading-3_D': ['24px', { lineHeight: '32px' }],
        'heading-4_D': ['20px', { lineHeight: '28px' }],
        text: ['18px', { lineHeight: '20px' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
