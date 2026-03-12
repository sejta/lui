import './styles.css'

export const stylesEntry = {
  name: 'lui-styles',
  status: 'ready',
  files: [
    'tokens.css',
    'themes.css',
    'base.css',
    'layout.css',
    'utilities.css',
    'motion.css',
  ],
  themes: ['light', 'dark'],
} as const
