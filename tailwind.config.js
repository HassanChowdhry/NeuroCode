const designTokens = require('./design-tokens.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  safelist: [
    'btn-primary',
    'btn-secondary',
    'btn-ghost',
    'btn-outline',
    'rounded-base',
    'rounded-lg',
    'shadow-base',
    'shadow-lg',
    'text-primary-500',
    'text-primary-600',
    'text-gray-900',
    'text-gray-700',
    'bg-white',
    'bg-gray-50',
    'border-gray-100',
    'border-primary-100',
    'border-primary-200',
    'text-success-500',
    'text-secondary-500',
    'bg-primary-500',
    'bg-primary-600',
    'bg-primary-700',
    'bg-muted',
    'text-muted-foreground',
    'bg-card',
    'text-foreground',
    'bg-background',
    'text-muted-foreground',
    'border',
    'border-t',
    'border-b',
    'border-l',
    'border-r',
    'border-gray-200',
    'border-gray-300',
    'border-gray-400',
    'border-gray-500',
    'border-gray-600',
    'border-gray-700',
    'border-gray-800',
    'border-gray-900',
    'border-primary-500',
    'border-primary-600',
    'border-primary-700',
    'border-primary-800',
    'border-primary-900',
    'border-success-500',
    'border-secondary-500',
    'bg-success-500',
    'bg-secondary-500',
    'bg-muted',
    'bg-card',
    'bg-background',
    'bg-primary-100',
    'bg-primary-200',
    'bg-primary-300',
    'bg-primary-400',
    'bg-primary-50',
    'bg-primary-900',
    'bg-primary-950',
    'bg-neutral-50',
    'bg-neutral-100',
    'bg-neutral-200',
    'bg-neutral-300',
    'bg-neutral-400',
    'bg-neutral-500',
    'bg-neutral-600',
    'bg-neutral-700',
    'bg-neutral-800',
    'bg-neutral-900',
    'bg-neutral-950',
  ],
  theme: {
    extend: {
      colors: {
        primary: designTokens.colors.primary,
        neutral: designTokens.colors.neutral,
        success: designTokens.colors.success,
        warning: designTokens.colors.warning,
        error: designTokens.colors.error,
        info: designTokens.colors.info,
        // Dark theme colors for programmatic access
        'dark-primary': designTokens.colors.dark.primary,
        'dark-neutral': designTokens.colors.dark.neutral,
        'dark-success': designTokens.colors.dark.success,
        'dark-warning': designTokens.colors.dark.warning,
        'dark-error': designTokens.colors.dark.error,
        'dark-info': designTokens.colors.dark.info,
      },
      fontFamily: {
        sans: designTokens.fontFamily.sans,
        mono: designTokens.fontFamily.mono,
        display: designTokens.fontFamily.display,
      },
      fontSize: designTokens.fontSize,
      fontWeight: designTokens.fontWeight,
      lineHeight: designTokens.lineHeight,
      spacing: designTokens.spacing,
      borderRadius: designTokens.borderRadius,
      boxShadow: designTokens.boxShadow,
      // Custom focus utilities
      outline: {
        'focus': designTokens.focus.outline,
        'focus-offset': designTokens.focus.offset,
        'focus-high-contrast': designTokens.focus['high-contrast-outline'],
        'focus-high-contrast-offset': designTokens.focus['high-contrast-offset'],
      },
      // Animation utilities
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      // Custom utilities for code editor integration
      backgroundColor: {
        'monaco-light': designTokens.monaco.light.background,
        'monaco-dark': designTokens.monaco.dark.background,
      },
      textColor: {
        'monaco-light': designTokens.monaco.light.foreground,
        'monaco-dark': designTokens.monaco.dark.foreground,
      },
      borderColor: {
        'monaco-light': designTokens.monaco.light.lineNumbers,
        'monaco-dark': designTokens.monaco.dark.lineNumbers,
      },
    },
  },
  plugins: [
    // Custom plugin for focus utilities
    function({ addUtilities, theme }) {
      const focusUtilities = {
        '.focus-visible': {
          outline: theme('outline.focus'),
          outlineOffset: theme('outline.focus-offset'),
        },
        '.focus-visible-high-contrast': {
          outline: theme('outline.focus-high-contrast'),
          outlineOffset: theme('outline.focus-high-contrast-offset'),
        },
        // Reduced motion utilities
        '@media (prefers-reduced-motion: reduce)': {
          '.motion-reduce\\:animate-none': {
            animation: 'none',
          },
          '.motion-reduce\\:transition-none': {
            transition: 'none',
          },
        },
        // High contrast mode utilities
        '@media (prefers-contrast: high)': {
          '.contrast-high\\:focus-visible': {
            outline: theme('outline.focus-high-contrast'),
            outlineOffset: theme('outline.focus-high-contrast-offset'),
          },
        },
      };
      addUtilities(focusUtilities);
    },
    // Custom plugin for component utilities
    function({ addComponents, theme }) {
      const components = {
        // Button components
        '.btn-primary': {
          backgroundColor: theme('colors.primary.500'),
          color: 'white',
          border: 'none',
          padding: theme('spacing.3') + ' ' + theme('spacing.6'),
          borderRadius: theme('borderRadius.base'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.body[0]'),
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
          },
          '&:active': {
            backgroundColor: theme('colors.primary.700'),
          },
          '&:focus-visible': {
            outline: theme('outline.focus'),
            outlineOffset: theme('outline.focus-offset'),
          },
          '&:disabled': {
            backgroundColor: theme('colors.neutral.300'),
            color: theme('colors.neutral.500'),
            cursor: 'not-allowed',
          },
        },
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.primary.600'),
          border: '1px solid ' + theme('colors.primary.200'),
          padding: theme('spacing.3') + ' ' + theme('spacing.6'),
          borderRadius: theme('borderRadius.base'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.body[0]'),
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme('colors.primary.50'),
          },
          '&:active': {
            backgroundColor: theme('colors.primary.100'),
          },
          '&:focus-visible': {
            outline: theme('outline.focus'),
            outlineOffset: theme('outline.focus-offset'),
          },
          '&:disabled': {
            backgroundColor: theme('colors.neutral.100'),
            color: theme('colors.neutral.400'),
            cursor: 'not-allowed',
          },
        },
        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.neutral.700'),
          border: 'none',
          padding: theme('spacing.3') + ' ' + theme('spacing.6'),
          borderRadius: theme('borderRadius.base'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.body[0]'),
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme('colors.neutral.100'),
          },
          '&:active': {
            backgroundColor: theme('colors.neutral.200'),
          },
          '&:focus-visible': {
            outline: theme('outline.focus'),
            outlineOffset: theme('outline.focus-offset'),
          },
          '&:disabled': {
            color: theme('colors.neutral.400'),
            cursor: 'not-allowed',
          },
        },
        // Input components
        '.input-text': {
          backgroundColor: 'white',
          border: '1px solid ' + theme('colors.neutral.300'),
          borderRadius: theme('borderRadius.base'),
          padding: theme('spacing.3') + ' ' + theme('spacing.4'),
          fontSize: theme('fontSize.body[0]'),
          transition: 'border-color 0.2s ease-in-out',
          '&:focus': {
            borderColor: theme('colors.primary.500'),
            outline: 'none',
          },
          '&:focus-visible': {
            outline: theme('outline.focus'),
            outlineOffset: theme('outline.focus-offset'),
          },
          '&.error': {
            borderColor: theme('colors.error.500'),
          },
          '&:disabled': {
            backgroundColor: theme('colors.neutral.100'),
            color: theme('colors.neutral.400'),
            cursor: 'not-allowed',
          },
        },
        '.input-textarea': {
          backgroundColor: 'white',
          border: '1px solid ' + theme('colors.neutral.300'),
          borderRadius: theme('borderRadius.base'),
          padding: theme('spacing.3') + ' ' + theme('spacing.4'),
          fontSize: theme('fontSize.body[0]'),
          fontFamily: theme('fontFamily.sans').join(', '),
          minHeight: '6rem',
          resize: 'vertical',
          transition: 'border-color 0.2s ease-in-out',
          '&:focus': {
            borderColor: theme('colors.primary.500'),
            outline: 'none',
          },
          '&:focus-visible': {
            outline: theme('outline.focus'),
            outlineOffset: theme('outline.focus-offset'),
          },
        },
        // Card components
        '.card': {
          backgroundColor: 'white',
          border: '1px solid ' + theme('colors.neutral.200'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.base'),
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme('boxShadow.md'),
          },
        },
        '.card-elevated': {
          backgroundColor: 'white',
          border: 'none',
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.md'),
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme('boxShadow.lg'),
          },
        },
        // Code components
        '.code-inline': {
          backgroundColor: theme('colors.neutral.100'),
          color: theme('colors.neutral.900'),
          fontFamily: theme('fontFamily.mono').join(', '),
          fontSize: theme('fontSize.code-small[0]'),
          padding: theme('spacing.1') + ' ' + theme('spacing.2'),
          borderRadius: theme('borderRadius.sm'),
        },
        '.code-block': {
          backgroundColor: theme('colors.neutral.50'),
          border: '1px solid ' + theme('colors.neutral.200'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.4'),
          fontFamily: theme('fontFamily.mono').join(', '),
          fontSize: theme('fontSize.code[0]'),
          lineHeight: theme('lineHeight.loose'),
          overflow: 'auto',
        },
        // Dark mode variants
        '.dark .input-text': {
          backgroundColor: theme('colors.neutral.100'),
          borderColor: theme('colors.neutral.700'),
          color: theme('colors.neutral.900'),
        },
        '.dark .input-textarea': {
          backgroundColor: theme('colors.neutral.100'),
          borderColor: theme('colors.neutral.700'),
          color: theme('colors.neutral.900'),
        },
        '.dark .card': {
          backgroundColor: theme('colors.neutral.100'),
          borderColor: theme('colors.neutral.800'),
        },
        '.dark .card-elevated': {
          backgroundColor: theme('colors.neutral.100'),
        },
        '.dark .code-inline': {
          backgroundColor: theme('colors.neutral.800'),
          color: theme('colors.neutral.100'),
        },
        '.dark .code-block': {
          backgroundColor: theme('colors.neutral.900'),
          borderColor: theme('colors.neutral.800'),
        },
      };
      addComponents(components);
    },
  ],
}; 