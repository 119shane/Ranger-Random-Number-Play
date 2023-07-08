const firstNumber = document.getElementById("1st_number")
const secondNumber = document.getElementById("2nd_number")
const doItBtn = document.getElementById("do_it_btn")

const table = document.getElementById("table")
const error = document.getElementById("error")


doItBtn.addEventListener('click', (e)=> {
    e.preventDefault
    numberGenerator(firstNumber.value, secondNumber.value)

})

function numberGenerator (a, b) {
    const difference = b-a

    randomlyGeneratedNumArr = []

    if (difference === 50 || difference > 50) {
        
        for(let i = 0; i < 50; i++){
            let randomNumber = Number(a) + Number(Math.floor(Math.random() * difference))
            const button = document.createElement("button")
            button.classList.add("numbers")
            button.setAttribute("id", i)
            button.setAttribute("value", randomNumber)
            button.setAttribute("name", randomNumber)
            randomlyGeneratedNumArr.push(button)
            randomlyGeneratedNumArr.map(item => table.appendChild(item))
            error.textContent = ''
            doItBtn.disabled = true
            doItBtn.style.cursor = "notAllowed"
        }
    } 
    else {
        error.textContent = "please enter numbers in correct range"
    }
}



