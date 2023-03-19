// Transition HTML DOM element height from/to CSS "height: auto".

export function expandElement(element) {
  // get the height of the element's inner content, regardless of its actual size
  let height = element.scrollHeight;

  // have the element transition to the height of its inner content
  element.style.height = height + "px";

  // when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener("transitionend", function (e) {
    // remove this event listener so it only gets triggered once
    element.removeEventListener("transitionend", () => {});

    // remove "height" from the element's inline styles, so it can return to its initial value
    element.style.removeProperty("height");
  });

  element.setAttribute("data-collapsed", "false");
}

export function collapseElement(element) {
  // get the height of the element's inner content, regardless of its actual size
  let height = element.scrollHeight;

  // temporarily disable all css transitions
  let transition = element.style.transition;
  element.style.transition = "";

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function () {
    element.style.height = height + "px";
    element.style.transition = transition;

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0
    requestAnimationFrame(function () {
      element.style.height = 0 + "px";
    });
  });

  element.addEventListener("transitionend", function (e) {
    // remove this event listener so it only gets triggered once
    element.removeEventListener("transitionend", () => {});
    element.style.height = 0 + "px";
  });

  element.setAttribute("data-collapsed", "true");
}
