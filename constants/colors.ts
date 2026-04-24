// Material Design 3 Color System — WTC Brand Palette
// Seed: Navy #1E3A8A  /  Gold #92702A

export const MD3 = {
  // Primary (WTC Navy)
  primary: '#1E3A8A',
  onPrimary: '#FFFFFF',
  primaryContainer: '#D8E2FF',
  onPrimaryContainer: '#001258',

  // Secondary (WTC Gold)
  secondary: '#785900',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#FFEFC7',
  onSecondaryContainer: '#271900',

  // Tertiary (Teal accent)
  tertiary: '#006874',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#97F0FF',
  onTertiaryContainer: '#001F24',

  // Error
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',

  // Surface & Background
  background: '#FEF9FF',
  onBackground: '#1B1B1F',
  surface: '#FEF9FF',
  onSurface: '#1B1B1F',
  surfaceVariant: '#E3E1EC',
  onSurfaceVariant: '#46464F',

  // Outline
  outline: '#777680',
  outlineVariant: '#C7C5D0',

  // Inverse
  inverseSurface: '#303034',
  inverseOnSurface: '#F3EFF4',
  inversePrimary: '#ADC6FF',

  // Tonal Surface Elevations (Surface + Primary tint)
  surfaceTonal1: '#F2F0FA',  // elevation 1
  surfaceTonal2: '#EAE8F5',  // elevation 2
  surfaceTonal3: '#E3E0F0',  // elevation 3

  // Scrim / Shadow
  scrim: '#000000',

  // Status
  success: '#1B6B32',
  successContainer: '#97F5AF',
  warning: '#785900',
  warningContainer: '#FFEFC7',

  // Notice categories (kept for semantic use)
  noticeOps: '#1E3A8A',
  noticeConstruction: '#785900',
  noticeUrgent: '#BA1A1A',

  // Parking
  parkingFree: '#1B6B32',
  parkingBusy: '#785900',
  parkingFull: '#BA1A1A',
};

// Shorthand alias for backward compat (maps to M3 roles)
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
