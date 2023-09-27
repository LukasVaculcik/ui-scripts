// Example
// <img data-animation="fadein" data-animation-delay="4000">

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
          ? parseInt(animationDelay)
          : null; // override global delay, in miliseconds

      // run animation, then stop observing to prevent reseting the animation
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

function playAnimation(element) {
  element.style.animationPlayState = "running";
}

function pauseAnimation(element) {
  element.style.animationPlayState = "paused";
}
