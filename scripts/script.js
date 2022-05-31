const btnsNum = document.querySelectorAll(".numbers")
const keysNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const btnDec = document.getElementById("dec")
const btnDel = document.getElementById("del")
const btnEqual = document.getElementById("equal")
const btnAdd = document.getElementById("addition")
const btnSub = document.getElementById("subtraction")
const btnMult = document.getElementById("multiplication")
const btnDiv = document.getElementById("division")

const input = document.getElementById("input")

const operators = ["+", "-", "×", "÷"]

// controls
let hasDecimal = false
let hasOperator = false
let isSolved = false

function handleOperations(wantedOperator) {
    let lastDigit = input.textContent.charAt(input.textContent.length - 1)

    // checks if input is empty. returns if true
    if (lastDigit == "") {
        return
    }
    
    // checks if last digit is already an operator. if true, replaces it for the wanted operator
    for (let op of operators) {
        if (lastDigit == op) {
            return input.textContent = input.textContent.replace(lastDigit, wantedOperator)
        }
    }

    hasOperator = true
    checkSolved(wantedOperator)
    return input.textContent += wantedOperator
}

function solve() {
    let lastDigit = input.textContent.charAt(input.textContent.length - 1)
    
    // checks if expression has at least one operator and if the last digit is valid. returns if false
    if (!keysNum.includes(parseInt(lastDigit)) || !hasOperator) {
        return
    }
    
    hasDecimal = false // resets decimals and operators controls
    hasOperator = false
    let expression = input.textContent.replace("×", "*").replace("÷", "/")
    let result = eval(expression)
    input.textContent = result
    isSolved = true
}

function checkSolved(wantedDigit) { // checks if the expression has been solved
    // if true and the user inputs a number or ".", resets the expression and the solved control
    if (isSolved && typeof(wantedDigit) == "number" || isSolved && wantedDigit == ".") {
        isSolved = false
        return input.textContent = ""
    }

    // if false (user inputs an operator), continues the expression
    isSolved = false
    return
}

// EventListener to all number buttons
btnsNum.forEach((btn) => {
    btn.addEventListener("click", () => {
        checkSolved(parseInt(btn.textContent))
        input.textContent += btn.textContent
    })
})

// EventListener to all number keys
keysNum.forEach((key) => {
    document.addEventListener("keydown", (e) => {
        if (e.key == key) {
            checkSolved(key)
            input.textContent += key
        }
    })
})

// EventListener to "." button and key
btnDec.addEventListener("click", () => {
    if (hasDecimal == false) {
        input.textContent += "."
        hasDecimal = true
    }
})
document.addEventListener("keydown", (e) => {
    if (e.key == "." && hasDecimal == false) {
        checkSolved(e.key)
        input.textContent += "."
        hasDecimal = true
    }
})

// EventListener to Delete button ("C"), Delete key and Backspace key
btnDel.addEventListener("click", () => {
    input.textContent = ""
    hasDecimal = false
    hasOperator = false
})
document.addEventListener("keydown", (e) => {
    if (e.key == "Delete") {
        input.textContent = ""
        hasDecimal = false
        hasOperator = false
        isSolved = false
    }
})
document.addEventListener("keydown", (e) => { // Backspace
    if (e.key == "Backspace") {
        let erasedDigit = input.textContent.charAt(input.textContent.length - 1)
        
        if (isSolved) { // resets the expression and all controls if pressed directly after solving
            input.textContent = ""
            isSolved = false
            hasDecimal = false
            hasOperator = false
        }

        if (erasedDigit == ".") {
            hasDecimal = false // resets decimal control if "." was the erased digit
        } else if (operators.includes(erasedDigit)) {
            hasOperator = false // resets operator control if any operator was the erased digit
        }

        input.textContent = input.textContent.slice(0, -1) // assigns 
    }
})

// EventListener to addition button and key
btnAdd.addEventListener("click", () => {
    handleOperations("+")
    hasDecimal = false
})
document.addEventListener("keydown", (e) => {
    if (e.key == "+") {
        handleOperations("+")
        hasDecimal = false
    }
})

// EventListener to subtraction button and key
btnSub.addEventListener("click", () => {
    handleOperations("-")
    hasDecimal = false
})
document.addEventListener("keydown", (e) => {
    if (e.key == "-") {
        handleOperations("-")
        hasDecimal = false
    }
})

// EventListener to multiplication button and key
btnMult.addEventListener("click", () => {
    handleOperations("×")
    hasDecimal = false
})
document.addEventListener("keydown", (e) => {
    if (e.key == "*") {
        handleOperations("×")
        hasDecimal = false
    }
})

// EventListener to division button and key
btnDiv.addEventListener("click", () => {
    handleOperations("÷")
    hasDecimal = false
})
document.addEventListener("keydown", (e) => {
    if (e.key == "/") {
        handleOperations("÷")
        hasDecimal = false
    }
})

// EventListener to equal/solve button and key
btnEqual.addEventListener("click", solve)
document.addEventListener("keydown", (e) => {
    if (e.key == "=" || e.key == "Enter") {
        solve()
    }
})