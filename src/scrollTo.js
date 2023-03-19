export default function initScrollTo() {
  const components = document.querySelectorAll("[data-scroll-target-id]");

  Array.from(components).forEach((component) => {
    const targetId = component.dataset.scrollTargetId;
    const targetElement = document.querySelector(targetId);
    let offset = 0;

    if (component.hasAttribute("data-scroll-offset")) {
      let dataOffset = parseInt(component.dataset.offset);
      if (typeof dataOffset == "number") {
        offset = dataOffset;
      }
    }

    component.addEventListener("click", (event) => {
      event.preventDefault();

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
