// Material Design 3 Color System — WTC Brand Palette (Purple/Lavender)
// Seed: Soft Purple #6C63D8

export const MD3 = {
  // Primary (Light Blue)
  primary: '#4A9EC4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EBF7FF',
  onPrimaryContainer: '#0C4661',

  // Secondary (Sky Blue)
  secondary: '#7CBAD9',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#EAF4FA',
  onSecondaryContainer: '#1F536E',

  // Tertiary (Cool Blue)
  tertiary: '#6EA4BD',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#E6F3FA',
  onTertiaryContainer: '#18495F',

  // Error
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',

  // Surface & Background
  background: '#F7FCFF',
  onBackground: '#1C1B2E',
  surface: '#FFFFFF',
  onSurface: '#192C36',
  surfaceVariant: '#E6EFF4',
  onSurfaceVariant: '#435158',

  // Outline
  outline: '#79758C',
  outlineVariant: '#C9C4DC',

  // Inverse
  inverseSurface: '#2F363D',
  inverseOnSurface: '#F1F5F9',
  inversePrimary: '#A6D4FA',

  // Tonal Surface Elevations
  surfaceTonal1: '#F4FAFF',
  surfaceTonal2: '#EBF4FA',
  surfaceTonal3: '#E1EFF7',

  // Scrim / Shadow
  scrim: '#000000',

  // Status
  success: '#1B6B32',
  successContainer: '#97F5AF',
  warning: '#7B5800',
  warningContainer: '#FFEFC7',

  // Notice categories
  noticeOps: '#4A9EC4',
  noticeConstruction: '#7B5800',
  noticeUrgent: '#BA1A1A',

  // Parking
  parkingFree: '#1B6B32',
  parkingBusy: '#7B5800',
  parkingFull: '#BA1A1A',
};

export const Colors = {
  primary: MD3.primary,
  secondary: MD3.tertiary,
  accent: MD3.secondary,
  accentBlue: MD3.primary,
  white: '#FFFFFF',
  background: MD3.background,
  cardBg: MD3.surface,
  textPrimary: MD3.onSurface,
  textSecondary: MD3.onSurfaceVariant,
  textLight: MD3.outline,
  border: MD3.outlineVariant,
  success: MD3.success,
  warning: MD3.warning,
  danger: MD3.error,
  urgent: MD3.error,
  tabBar: MD3.surface,
  tabActive: MD3.primary,
  tabInactive: MD3.onSurfaceVariant,
  noticeOps: MD3.noticeOps,
  noticeConstruction: MD3.noticeConstruction,
  noticeUrgent: MD3.noticeUrgent,
  parkingFree: MD3.parkingFree,
  parkingBusy: MD3.parkingBusy,
  parkingFull: MD3.parkingFull,
};
