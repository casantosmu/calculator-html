const enteredValuesElement = document.querySelector(".js-entered-values");
const currentValueElement = document.querySelector(".js-current-value");
const keyboardElement = document.querySelector(".js-keyboard");

keyboardElement.addEventListener("click", e => {
    const keyData = e.target.closest("[data-key]").dataset.key;
    const enteredValuesContent = enteredValuesElement.textContent;
    const currentValueContent = currentValueElement.textContent;
    if (!isNaN(keyData)) {
        if (enteredValuesContent || +currentValueContent) {
            currentValueElement.textContent += keyData;
        } else {
            currentValueElement.textContent = keyData;
        }
    }
    if (keyData === "decimal" && !currentValueContent.includes(".")) currentValueElement.textContent += ".";
    if (keyData === "clear") currentValueElement.textContent = currentValueContent.slice(0, -1);
})