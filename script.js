// **** Web Deployment of Windows 10 Desktop Calculator ****

const enteredValuesElement = document.querySelector(".js-entered-values");
const currentValueElement = document.querySelector(".js-current-value");
const keyboardElement = document.querySelector(".js-keyboard");

const roundTo = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

const calculator = {
    enteredValue: null,
    enteredOperation: null,
    finished: true, // Check if operation is done
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

// KEYDATA
// Includes values like:
// * All numbers (1,2,3,4,5,6,7,8,9,0.)
// * Operations included in calculator.operations.
// * Clear and delete

keyboardElement.addEventListener("click", e => {
    const keyData = e.target.closest("[data-key]").dataset.key;
    const currentValueContent = currentValueElement.textContent;
    if (!isNaN(keyData)) {
        if (calculator.finished || currentValueContent === "0") {
            currentValueElement.textContent = keyData;
            calculator.finished = false;
        }
        else if (currentValueContent.length < 13) {
            currentValueElement.textContent += keyData;
        }
        if (calculator.enteredValue === null) enteredValuesElement.textContent = "";
    }
    else if (keyData === "decimal" && !currentValueContent.includes(".")) {
        currentValueElement.textContent += ".";
    }
    else if (keyData === "clear") {
        if (!calculator.finished) {
            currentValueElement.textContent = currentValueContent.slice(0, -1);
        } else if (calculator.enteredValue === null) {
            enteredValuesElement.textContent = "";
        }
    }
    else if (keyData === "delete") {
        currentValueElement.textContent = "0";
    }
    else if (keyData === "equals") {
        if (calculator.enteredValue === null) {
            enteredValuesElement.textContent = ` ${+currentValueContent} =`;
            calculator.finished = true;
        }
        else {
            const currentOperation = calculator.enteredOperation;
            const output = roundTo(calculator.operate[currentOperation](+currentValueContent), 3);
            if (isNaN(output)) {
                enteredValuesElement.textContent = 'No se puede calcular';
                calculator.enteredValue = null;
                calculator.enteredOperation = null;
            } else {
                enteredValuesElement.textContent += ` ${+currentValueContent} =`;
                currentValueElement.textContent = output;
                calculator.enteredValue = null;
            }
            calculator.finished = true;
        }
    }
    else if (calculator.operations.includes(keyData)) {
        const operationSignEntered = e.target.textContent;
        if (calculator.enteredValue === null) {
            enteredValuesElement.textContent = `${+currentValueContent} ${operationSignEntered}`;
            calculator.enteredValue = +currentValueContent;
            calculator.enteredOperation = keyData;
            calculator.finished = true;
        }
        else if (calculator.finished) {
            enteredValuesElement.textContent = `${+currentValueContent} ${operationSignEntered}`;
            calculator.enteredOperation = keyData;
        }
        else {
            const currentOperation = calculator.enteredOperation;
            const output = roundTo(calculator.operate[currentOperation](+currentValueContent), 3);
            if (isNaN(output)) {
                enteredValuesElement.textContent = 'No se puede calcular';
                calculator.enteredValue = null;
                calculator.enteredOperation = null;
            } else {
                enteredValuesElement.textContent = `${output} ${operationSignEntered}`;
                currentValueElement.textContent = output;
                calculator.enteredValue = output;
            }
            calculator.enteredOperation = keyData;
            calculator.finished = true;
        }
    }
    // console.log(calculator) // Uncomment if you want to see the state of calculator object :)
})