/**
 * Get filename with extension from <input type="file">
 * @param {Event} event
 * @return {string|void}
 */
export function fileNameWithExt(event) {
  if (
    !event ||
    !event.target ||
    !event.target.files ||
    event.target.files.length === 0
  ) {
    return;
  }

  const { name } = event.target.files[0];
  const lastDot = name.lastIndexOf(".");

  const fileName = name.substring(0, lastDot);
  const ext = name.substring(lastDot + 1);

  return `${fileName}.${ext}`;
}

/**
 * Converts string to boolean
 * @param {string} someString
 * @return {boolean}
 */
export function strToBool(someString) {
  return someString === "true";
}

/**
 * Debounce executes function only once per wait time
 * @param {function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {(function(...[*]): void)|*}
 */
export function debounce(func, wait = 100, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
