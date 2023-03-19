export default function initFadeInObserver() {
  // Options for intersection observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.75,
  };

  // Create intersection observer and do stuff
  const observer = new IntersectionObserver((entries, observer) => {
    Array.from(entries).forEach((entry) => {
      let delay = 0; // in miliseconds
      let dataDelay = parseInt(entry.dataset.fadeinDelay);
      if (typeof dataDelay == "number") {
        delay = dataDelay;
      }

      // create & run animation, then stop observing
      if (entry.isIntersecting) {
        if (delay === 0) {
          entry.target.classList.add("animation-fadein");
        } else {
          setTimeout(() => {
            entry.target.classList.add("animation-fadein");
          }, delay);
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Attach observer to every desired element
  const observedElements = document.querySelectorAll("[data-animation-fadein]");
  Array.from(observedElements).forEach((element) => {
    observer.observe(element);
  });
}
