class Calculator {    // template for a Calculator object, Class is the simplest way to implement memory function
    constructor(previousOperandText, currentOperandText) { // initializes these properties
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear() // sets start point and initial states of current and previous Operand
    };
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined // so there are no operations selected when we clar things
    };
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return; // eliminates posibility of successive dots
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) { // due to upper/ lower display feature
        if (this.currentOperand === '') return; // successive operation clicks don't execute
        if (this.previousOperand !== '') { // in this case, calculate
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
                case '÷':
                computation = prev / current
                break;        
            default: return;
        }
        this.currentOperand = computation;
        this.operation = '';
        this.previousOperand ='';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]); // [0] indicates first part, before '.' 
        const decimalDigits = stringNumber.split('.')[1]; // [1] indicates 2nd part, after '.'
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay ='';
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // getDisplayNumber(number) { -> in this case, we would have problems when firstly typing '.' or '.' and '0s' and so on...
    //     const floatNumber = parseFloat(number); -> so the idea is to split the number into integer part and decimal part!
    //     if (isNaN(floatNumber)) return '';
    //     return floatNumber.toLocaleString('en'); 
    // }


    updateDisplay() {
        this.currentOperandText.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
        this.previousOperandText.innerText =
            `${this.getDisplayNumber(this.previousOperand)}${this.operation}`;
        } else {
            this.previousOperandText.innerText ='';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]'); // data selectors need to be in brackets
const operationButtons = document.querySelectorAll('[data-operation]');// returns a Node list
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator (previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText); 
        calculator.updateDisplay();
    })});

operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        })});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});



