const blocker = document.createElement('div')

blocker.style.position = 'absolute'
blocker.style.top = '180px'
blocker.style.height = '100vh'
blocker.style.width = '100%'
blocker.style.background = 'white'
blocker.style.textAlign = 'center'


const grid = document.createElement('div')
grid.className = 'board'
grid.style.display = 'none'
grid.style.height = '100vh'
grid.style.gridTemplateColumns = 'repeat(12, 1fr)'
grid.style.gridTemplateRows = 'repeat(5, 1fr)'



const blockerBtn = document.createElement('button')
blockerBtn.innerText ='start the game'
blockerBtn.style.margin = '30vh auto'
blockerBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    grid.style.display = 'grid'
    blocker.remove()
})

blocker.appendChild(blockerBtn)


const word = getRandomWord().toUpperCase()

//                    ///
// Place Word in grid ///
//                    ///

const choices = []
const length = word.length
let position = Math.ceil((12 - word.length) / 2) //Idk i just like this position

for(i = 0; i < length; i++){
    const div = document.createElement('div')
    div.style.textAlign = 'center'
    div.style.gridColumn =`${position + i}/${position + i + 1}` 
    div.style.gridRow ='3/4'

    const p = document.createElement('p')
    p.style.fontSize = '24px'

    if(i % 2 == 0){
        p.innerText = "\\_"
        p.id = `${choices.length}`
        choices.push(word[i])
    }
    else{
        p.innerText = word[i]
    }
    
    div.appendChild(p)
    grid.append(div)
}

//                    ///
// Make Form         ///
//                    ///


const form = document.createElement('form')
form.style.width = '25%'
form.style.margin = '20px auto'
form.style.textAlign = 'center'

const formTitle = document.createElement('h2')
formTitle.innerText = 'Enter 3 constanants and 1 vowel'

const error = document.createElement('h3')
error.innerText = 'Your input/s are not valid'
error.style.display = 'none'

form.appendChild(formTitle)
form.appendChild(error)

for(let i = 1; i < 5; i++) {
    const input = document.createElement('input')
    input.style.margin = '10px auto'
    if(i == 4){
    input.setAttribute('name', `v1`)
    input.setAttribute('placeholder', `Vowel`)
    input.id = 'final'
    }
    else{
    input.setAttribute('name', `c${i}`)
    input.setAttribute('placeholder', `Constanant ${i}`)
    }
    form.appendChild(input)
}

const formBtn = document.createElement('button')
formBtn.innerText = 'Submit'
formBtn.style.display = 'block'
formBtn.style.margin = 'auto'

//                      ///
// Form and answer Validation///
//                    ///

const submitFinalAnswer = (answers) => {
    answers.remove()
    const formFinal = document.createElement('form')
    formFinal.style.width = '25%'
    formFinal.style.margin = '20px auto'
    formFinal.style.textAlign = 'center'

    const response = document.createElement('h2')
    response.innerText = 'Guess the Word'

    const input = document.createElement('input')
    input.id = 'final' 

    const btn = document.createElement('button')
    btn.innerText = 'Submit'
    btn.style.display = 'block'
    btn.style.margin = 'auto'
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const finalAnswer = document.getElementById('final')
        btn.remove()
        input.remove()
        if(finalAnswer.value == word){
            response.innerText = 'That is correct!!'
        }
        else{
            response.innerText = `Well that's tragic...the word was ${word}`
            const restart = document.createElement('button')
            restart.innerText = 'Reset'
            restart.addEventListener('click', () => console.log('restart'))
        }
    })
    formFinal.appendChild(response)
    formFinal.appendChild(input)
    formFinal.appendChild(btn)
    document.body.appendChild(formFinal)


}


const checkAnswers = (answers) => {
    console.log(word)
    for(let i = 0; i < 4; i++) {
        const letter = answers[i].value.toUpperCase()
        if (choices.includes(letter)){
            let removal = choices.indexOf(letter)
            console.log(removal)
            document.getElementById(`${removal}`).innerText = letter
        }
        else {
            console.log(answers[i].value)
        }
    }
    submitFinalAnswer(answers)
}




formBtn.addEventListener('click', (e) =>{
    e.preventDefault()

    const form = e.path[1]
    const vowels = /[^aeiou]/
    let displayError = false

    for(i = 0; i < 4; i++){
        form[i].style.background ='white'
        if(i == 3 && vowels.test(form[i].value)){
            displayError = true
            form[i].style.background ='red'
        }
        else if(i > 3 && !vowels.test(form[i].value) || form[i].value > 1){
            displayError = true
            form[i].style.background ='red'
        }
    }
    if(displayError){
        error.style.display = 'block'
    }
    else{
        checkAnswers(form)
    }
})

form.appendChild(formBtn)



//                    ///
// Add to document body ///
//                    ///

document.body.appendChild(grid)
document.body.appendChild(form)
document.body.appendChild(blocker)