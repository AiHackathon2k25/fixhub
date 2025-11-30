/**
 * Detect if the user is on a mobile device
 * Combines user agent detection and screen size checks
 */
export function isMobileDevice(): boolean {
  // Check if window is defined (for SSR compatibility)
  if (typeof window === 'undefined') {
    return false;
  }

  // User agent detection
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  const isMobileUA = mobileRegex.test(userAgent.toLowerCase());

  // Screen size detection (phones and small tablets)
  const isSmallScreen = window.innerWidth <= 768;

  // Touch capability detection
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Consider it mobile if:
  // 1. Mobile user agent, OR
  // 2. Small screen AND touch capability
  return isMobileUA || (isSmallScreen && hasTouchScreen);
}

/**
 * Check if the device has camera capability
 */
export function hasCameraSupport(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
}

