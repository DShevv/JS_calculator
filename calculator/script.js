class Calculator{
    constructor(displayImpt){
        this.displayImpt = displayImpt
        this.clear()
        this.prevOperand = ""
        this.newNumber = false
    }

    clear(){
        this.displayImpt.value = "0"
        this.operation = undefined
        this.prevOperand = ""
    }

    appendNum(number){
        if (this.newNumber){
            this.displayImpt.value = "0"
            this.newNumber = false 
        }                 
        if (this.displayImpt.value == "0" && number.toString() != ".")
            this.displayImpt.value = number.toString()
        else
            if ((this.displayImpt.value.includes(".") && number.toString() == ".")) {
                return
            }
            else
                this.displayImpt.value = this.displayImpt.value.toString() + number.toString()
            
    }

    chooseOp(operation){
        if (this.newNumber && operation == "-"){
            this.displayImpt.value = "0"
            this.newNumber = false 
        }  
        if (this.prevOperand != "" && this.displayImpt.value != "0") {
            
            this.compute()

        }
        
        if (this.operation != undefined && operation == "-") {
            this.displayImpt.value = "-"
            this.newNumber = false
            return
        }
        if (operation == "√") {
            this.prevOperand = this.displayImpt.value.toString()
            this.operation = operation
            this.compute()
            operation = undefined
        }
        this.operation = operation
        this.prevOperand = this.displayImpt.value.toString()
        this.newNumber = true
    }

    compute(){
        let computatoin
        let P = 1000000000000000
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.displayImpt.value)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case "+":
                computatoin = Math.round((prev + curr)*P)/P
                break;
            case "-":
                computatoin = Math.round((prev - curr)*P)/P
                break;
            case "*":
                computatoin = Math.round((prev * curr)*P)/P
                break;    
            case "/":
                computatoin = Math.round((prev / curr)*P)/P
                break;    
            case "^":
                computatoin = Math.round(Math.pow(prev,curr)*P)/P
                break;  
            case "√":
                if (curr < 0)
                    computatoin = "Error"
                else
                    computatoin = Math.round(Math.sqrt(curr)*P)/P
                break;  
            default:
                return 
        }
        this.displayImpt.value = computatoin.toString()
        this.operation = undefined
        this.prevOperand = ""
        this.newNumber = true 
    }
}

const numberBtn = document.getElementsByClassName("number")
const operationBtn = document.querySelectorAll(".operator")
const sqrt = document.querySelector(".operator-sqrt")  
const clearBtn = document.querySelectorAll(".clear-btn")
const equalBtn = document.querySelector("#result")
const displayImpt = document.getElementById("display")
const calculator = new Calculator(displayImpt)

for (let i = 0; i < numberBtn.length; i++) {
    numberBtn[i].addEventListener("click", () =>{
        calculator.appendNum(numberBtn[i].innerText)
    })
}

for (let i = 0; i < operationBtn.length; i++) {
    operationBtn[i].addEventListener("click", () =>{
        calculator.chooseOp(operationBtn[i].innerText)
    })
}

equalBtn.addEventListener("click", () => {
    calculator.compute()
})

for (let i = 0; i < clearBtn.length; i++) {
    clearBtn[i].addEventListener("click", () =>{
        calculator.clear()
    })
}

sqrt.addEventListener("click", () => {
    calculator.chooseOp(sqrt.innerText)
})
