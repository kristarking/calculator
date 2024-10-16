document.addEventListener("DOMContentLoaded", function () {
    const previousOperandElement = document.getElementById("previous-operand");
    const currentOperandElement = document.getElementById("current-operand");
    const buttons = document.querySelectorAll("#keyboard button");
    let currentOperand = "";
    let previousOperand = "";
    let operation = undefined;
    let krystaMode = false;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            handleButtonClick(button.textContent);
        });
    });

    function handleButtonClick(value) {
        if (value === 'C') {
            clear();
        } else if (value === '←') {
            backspace();
        } else if (value === '%') {
            percentage();
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === '=') {
            compute();
        } else {
            appendNumber(value);
        }
        updateDisplay();
    }

    function clear() {
        currentOperand = "";
        previousOperand = "";
        operation = undefined;
        krystaMode = false;
    }

    function backspace() {
        currentOperand = currentOperand.toString().slice(0, -1);
    }

    function percentage() {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
    }

    function handleOperator(op) {
        if (currentOperand === "") return;
        if (previousOperand !== "") {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = "";
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Kristarking says: Division by zero is not allowed!");
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = "";
        checkKrystaMode();
    }

    function checkKrystaMode() {
        if (currentOperand === '777') {
            krystaMode = true;
            alert("Kristarking Mode Activated! 👑");
        }
    }

    function getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    function updateDisplay() {
        currentOperandElement.textContent = krystaMode ? 
            `👑 ${getDisplayNumber(currentOperand)}` : getDisplayNumber(currentOperand);
        if (operation != null) {
            previousOperandElement.textContent = `${getDisplayNumber(previousOperand)} ${operation}`;
        } else {
            previousOperandElement.textContent = '';
        }
    }
});
