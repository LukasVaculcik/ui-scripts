// Example
// <button data-scroll-target="targetId" data-scroll-offset="100"></button>
// <div id="targetId"></div>

export default function initScrollTo() {
  const components = document.querySelectorAll("[data-scroll-target]");

  components.forEach((component) => {
    const { scrollTarget, scrollOffset } = component.dataset;
    const targetElement = document.querySelector(`#${scrollTarget}`);
    const offset =
      typeof parseInt(scrollOffset) == "number" ? parseInt(scrollOffset) : 0;

    component.addEventListener("click", (event) => {
      event.preventDefault(); // disables <a> tag from redirecting

      window.scrollTo({
        top:
          targetElement.getBoundingClientRect().top +
          window.pageYOffset +
          offset,
        behavior: "smooth",
      });
    });
  });
}
