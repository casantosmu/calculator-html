const enteredValuesElement = document.querySelector(".js-entered-values");
const currentValueElement = document.querySelector(".js-current-value");
const keyboardElement = document.querySelector(".js-keyboard");

const calculator = {
    enteredValue: null,
    enteredOperation: null,
    clearCurrentValue: true,
    operations: [
        "division",
        "multiplication",
        "minus",
        "plus"
    ],
    operate: {
        division: argument => calculator.enteredValue / argument,
        multiplication: argument => calculator.enteredValue * argument,
        minus: argument => calculator.enteredValue - argument,
        plus: argument => calculator.enteredValue + argument
    }
}

keyboardElement.addEventListener("click", e => {
    const keyData = e.target.closest("[data-key]").dataset.key;
    const currentValueContent = currentValueElement.textContent;
    if (!isNaN(keyData)) {
        if (calculator.clearCurrentValue) {
            currentValueElement.textContent = keyData;
            calculator.clearCurrentValue = false;
        }
        else if (currentValueContent.length < 13) {
            currentValueElement.textContent += keyData;
        }
    }
    else if (keyData === "decimal" && !currentValueContent.includes(".")) {
        currentValueElement.textContent += ".";
    }
    else if (keyData === "clear" && !calculator.clearCurrentValue) {
        currentValueElement.textContent = currentValueContent.slice(0, -1);
    }
    else if (keyData === "equals") {
        enteredValuesElement.textContent += ` ${currentValueContent} =`;
    }
    else if (calculator.operations.includes(keyData)) {
        const operationSignEntered = e.target.textContent;
        if (!calculator.enteredValue) {
            enteredValuesElement.textContent = `${+currentValueContent} ${operationSignEntered}`;
            calculator.enteredValue = +currentValueContent;
            calculator.enteredOperation = keyData;
            calculator.clearCurrentValue = true;
        } else {
            const currentOperation = calculator.enteredOperation || keyData;
            const output = calculator.operate[currentOperation](+currentValueContent);
            enteredValuesElement.textContent = `${output} ${calculator.enteredOperation}`;
            enteredValuesElement.textContent = `${output} ${operationSignEntered}`;
            currentValueElement.textContent = output;
            calculator.enteredValue = output;
            calculator.enteredOperation = null;
            calculator.clearCurrentValue = true;
        }
    }
})