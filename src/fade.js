export function fadeOut(element) {
  element.style.opacity = 1;
  function fade() {
    if ((element.style.opacity -= 0.1) < 0) {
      element.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  }
  fade();
}

export function fadeIn(element, display) {
  element.style.opacity = 0;
  element.style.display = display || "block";
  function fade() {
    let val = parseFloat(element.style.opacity);
    if (!((val += 0.1) > 1)) {
      element.style.opacity = val;
      requestAnimationFrame(fade);
    }
  }
  fade();
}
