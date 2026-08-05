/**
 * Animation Configuration & Helpers (Web Animations API)
 */

// Keyframes definitions
const VERTICAL_FLIP_KEYFRAMES = [
  { transform: 'perspective(600px) rotateX(0deg)' },
  { transform: 'perspective(600px) rotateX(180deg)' },
  { transform: 'perspective(600px) rotateX(360deg)' },
];

// Default timing configuration
const DEFAULT_FLIP_TIMING = {
  duration: 1200,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  iterations: 1,
};

/**
 * Animates a cell container with a 3D vertical flip effect.
 *
 * @param {HTMLElement} element - The target DOM element (or cell input).
 * @param {number} [index=0] - Multiplier for staggered delay effect.
 * @param {number} [staggerDelay=80] - Delay in milliseconds per index.
 */
export function animateCellFlip(element, index = 0, staggerDelay = 80) {
  if (!element) return;

  // Retrieve closest parent container or fallback to target element
  const parentCell = element.closest('.cell') || element;

  parentCell.animate(VERTICAL_FLIP_KEYFRAMES, {
    ...DEFAULT_FLIP_TIMING,
    delay: index * staggerDelay,
  });
}
