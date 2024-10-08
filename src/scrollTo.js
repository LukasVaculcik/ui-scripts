// Example
// <button data-scroll-target="targetId" data-scroll-offset="100"></button>
// <div id="targetId"></div>

const defaults = {
    offset: 0,
    preventDefault: 1,
}

/**
 * Initializes smooth scrolling to target
 */
export default function initScrollTo() {
    const components = document.querySelectorAll("[data-scroll-target]")

    components.forEach((component) => {
        const { scrollTarget, scrollOffset, scrollPreventDefault } = component.dataset
        const targetElement = document.getElementById(scrollTarget)
        const offset = typeof scrollOffset === "undefined" ? defaults.offset : parseInt(scrollOffset)
        const preventDefault = typeof scrollPreventDefault === "undefined" ? defaults.preventDefault : parseInt(scrollPreventDefault)

        component.addEventListener("click", (event) => {
            // disables <a> tag from redirecting
            if (targetElement && preventDefault) {
                event.preventDefault()
            }

            window.scrollTo({
                top: targetElement.getBoundingClientRect().top + window.scrollY + offset,
                behavior: "smooth",
            })
        })
    })
}
