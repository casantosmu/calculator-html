const enteredValuesElement = document.querySelector(".js-entered-values");
const currentValueElement = document.querySelector(".js-current-value");
const keyboardElement = document.querySelector(".js-keyboard");

keyboardElement.addEventListener("click", e => {
    const keyData = e.target.closest("[data-key]").dataset.key;
    // const enteredValuesContent = enteredValuesElement.textContent;
    const currentValueContent = currentValueElement.textContent;
    if (!isNaN(keyData)) {
        if (currentValueContent === "0" && !currentValueContent.includes(".")) {
            currentValueElement.textContent = keyData;
        }
        else if (currentValueContent.length < 13) {
            currentValueElement.textContent += keyData;
        }
    }
    else if (keyData === "decimal" && !currentValueContent.includes(".")) {
        currentValueElement.textContent += ".";
    }
    else if (keyData === "clear") {
        currentValueElement.textContent = currentValueContent.slice(0, -1);
        if (currentValueElement.textContent === "") currentValueElement.textContent = 0;
    }
})