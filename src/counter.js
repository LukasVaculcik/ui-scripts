// Example
// <div data-counter data-counter-max="77" data-counter-rounding="100" data-counter-duration="5000" data-counter-unit=" km"></div>

import anime from "animejs";

const locale = document.querySelector("html").getAttribute("lang");
const unitRegex = new RegExp(/.*\d(.*)$/, "i");
const defaults = {
  min: 0,
  max: 0,
  rounding: 10,
  duration: 3000,
  unit: "",
};

export default function initCounter() {
  const observedElements = document.querySelectorAll(`[data-counter]`);

  if (observedElements.length === 0) {
    return;
  }
  // Options for intersection observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  // Create intersection observer and do stuff
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const { counterMax, counterRounding, counterDuration, counterUnit } =
        entry.target.dataset;

      const max =
        typeof parseFloat(counterMax) == "number"
          ? parseFloat(counterMax)
          : defaults.max;
      const unitString = unitRegex.exec(counterMax).pop();
      const rounding = Number.isInteger(parseInt(counterRounding))
        ? parseInt(counterRounding)
        : defaults.rounding;
      const duration = Number.isInteger(parseInt(counterDuration))
        ? parseInt(counterDuration)
        : defaults.duration;
      let unit = defaults.unit;

      // if counterMax is value with unit
      if (unitString.length > 0) {
        unit = unitString;
      }

      // if counterUnit is specified
      if (counterUnit.length > 0) {
        unit = counterUnit;
      }

      // create & run animation, then stop observing to prevent reseting the animation
      if (entry.isIntersecting) {
        counterAnimation(entry.target, max, rounding, duration, unit);
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
 * Returns animejs instance
 * @param {HTMLElement} element
 * @param {number} max
 * @param {number} rounding
 * @param {number} duration
 * @param {string} unit
 * @return {*}
 */
function counterAnimation(element, max, rounding, duration, unit) {
  return anime({
    targets: element,
    innerHTML: [0, max],
    easing: "linear",
    round: rounding,
    duration: duration,
    autoplay: true,
    loop: false,
    update(a) {
      const value = a.animations[0].currentValue;
      const number = locale
        ? new Intl.NumberFormat(locale).format(value)
        : value;
      element.innerHTML = `${number}${unit}`;
    },
  });
}
