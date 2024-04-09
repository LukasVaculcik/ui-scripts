/**
 * Observes DOM changes
 */
export default function mutationObserver() {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector("#snippet--element");
  if (!targetNode) {
    return;
  }

  // Options for the observer (which mutations to observe)
  const observerOptions = { childList: true };

  // Callback function to execute when mutations are observed
  const callback = function () {};

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, observerOptions);
}
