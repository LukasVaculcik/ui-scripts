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

export function strToBool(someString) {
  return someString === "true";
}

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
