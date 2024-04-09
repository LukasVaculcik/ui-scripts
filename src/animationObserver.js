// Example
// <img data-animation="fadein" data-animation-delay="4000">

/**
 * Observes intersection of animatable elements with viewport
 */
export default function initAnimationObserver() {
  const observedElements = document.querySelectorAll("[data-animation]");

  if (observedElements.length === 0) {
    return;
  }
  // Options for intersection observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.75,
  };

  // Create intersection observer and do stuff
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const { animation, animationDelay } = entry.target.dataset;
      entry.target.style.animationDelay =
        typeof parseInt(animationDelay) == "number"
          ? `${animationDelay}ms`
          : null; // override global delay, in miliseconds

      // run animation, then stop observing to prevent reseting the animation
      const area = calculateArea(entry.rootBounds) - calculateArea(entry.boundingClientRect)
      if (entry.isIntersecting) {
        playAnimation(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Attach observer to every desired element
  observedElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Set "animation-play-state: running" on element
 * @param {HTMLElement} element
 */
function playAnimation(element) {
  element.style.animationPlayState = "running";
}

/**
 * Set "animation-play-state: paused" on element
 * @param {HTMLElement} element
 */
function pauseAnimation(element) {
  element.style.animationPlayState = "paused";
}

/**
 * Calculates area of {DOMRectReadOnly}
 * @param {DOMRectReadOnly} rectangle
 */
function calculateArea(rectangle) {
  return rectangle.width * rectangle.height
}
