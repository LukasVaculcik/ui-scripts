// https://blog.nette.org/cs/zavisle-selectboxy-elegantne-v-nette-a-cistem-javascriptu
export default function dependentSelectbox() {
  const selectBoxes = document.querySelectorAll("select[data-depends]")
  selectBoxes.forEach((childSelect) => {
    const parent = childSelect.form[childSelect.dataset.depends]
    const items = JSON.parse(childSelect.dataset.items || "null")
    if (parent instanceof RadioNodeList) {
      parent.forEach((parentItem) => {
        addChangeListener(parentItem, childSelect, items)
      })
    } else {
      addChangeListener(parent, childSelect, items)
    }
  })
}

/**
 * @param {HTMLElement} select
 * @param {Object} items
 */
function updateSelectbox(select, items) {
  select.innerHTML = ""
  select.disabled = items === undefined
  const promptText = select.dataset.prompt
  if (promptText) {
    const promptNode = document.createElement("option")
    promptNode.setAttribute("value", "")
    promptNode.innerText = promptText
    select.appendChild(promptNode)
  }
  for (const id in items) {
    const el = document.createElement("option")
    el.setAttribute("value", id)
    el.innerText = items[id]
    select.appendChild(el)
  }
}

/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} childSelect
 * @param {Object} items
 */
function addChangeListener(parent, childSelect, items) {
  parent.addEventListener("change", () => {
    if (items) {
      updateSelectbox(childSelect, items[parent.value])
    }
  })
}
