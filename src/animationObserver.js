// Example of DOM element
// <div data-animation="fadein" data-animation-delay="4000"></div>

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
      const { animation, animationDelay } = entry.dataset;
      entry.target.style.animationDelay =
        typeof parseInt(animationDelay) == "number"
          ? parseInt(animationDelay)
          : null; // override global delay, in miliseconds

      // run animation, then stop observing
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
