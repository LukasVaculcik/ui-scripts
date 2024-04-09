// Example
// <button data-scroll-target="targetId" data-scroll-offset="100"></button>
// <div id="targetId"></div>

const defaults = {
  offset: 0,
}

/**
 * Initializes smooth scrolling to target
 */
export default function initScrollTo() {
  const components = document.querySelectorAll("[data-scroll-target]")

  components.forEach((component) => {
    const { scrollTarget, scrollOffset } = component.dataset
    const targetElement = document.querySelector(`#${scrollTarget}`)
    const offset = typeof scrollOffset === "number" && parseInt(scrollOffset) ? parseInt(scrollOffset) : defaults.offset

    component.addEventListener("click", (event) => {
      // disables <a> tag from redirecting
      event.preventDefault()

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY + offset,
        behavior: "smooth",
      })
    })
  })
}
