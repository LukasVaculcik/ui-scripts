export default function initIntersectionObserver() {
  // Options for intersection observer
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0,
  };

  // Create intersection observer and do stuff
  const observer = new IntersectionObserver((entries, observer) => {
    Array.from(entries).forEach((element) => {
      if (element.isIntersecting) {
        // do stuff
      } else {
        // do different stuff
      }
    });
  }, observerOptions);

  // Attach observer to every desired element
  const observedElements = document.querySelectorAll(".element");
  Array.from(observedElements).forEach((element) => {
    observer.observe(element);
  });
}
