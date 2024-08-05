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
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  // Create intersection observer and do stuff
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const { animation, animationDelay } = entry.target.dataset;
      entry.target.style.animationDelay =
        typeof parseInt(animationDelay) == "number"
          ? `${animationDelay}ms`
          : null; // override global delay, in miliseconds

      if (entry.isIntersecting) {
        // Every animation has different conditions of execution
        if (animation === 'abc' && entry.intersectionRatio >= 0.90) {
          playAnimation(observer, entry)
        } else {
          playAnimation(observer, entry)
        }
      }
    });
  }, observerOptions);

  // Attach observer to every desired element
  observedElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Run animation, then stop observing to prevent reseting the animation
 * @param {IntersectionObserver} observer
 * @param {IntersectionObserverEntry} entry
 */
function playAnimation(observer, entry) {
  entry.target.style.animationPlayState = "running"
  observer.unobserve(entry.target)
}

/**
 * Pause animation
 * @param {HTMLElement} element
 */
function pauseAnimation(element) {
  element.style.animationPlayState = "paused";
}

/**
 * Checks if entry element's height is lower than limit
 * @param {HTMLElement} element
 * @param {number} limitHeight
 * @return {boolean}
 */
function isElementLowerThanLimit(element, limitHeight) {
  return element.getBoundingClientRect().height < limitHeight;
}

/**
 * Checks if entry element's height is higher than limit
 * @param {HTMLElement} element
 * @param {number} limitHeight
 * @return {boolean}
 */
function isElementHigherThanLimit(element, limitHeight) {
  return element.getBoundingClientRect().height > limitHeight;
}
