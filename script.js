// Letters
const letters = "abcdefghijklmnopqrstuvwxyz"

//Get Array From Letters
let lettersArray = Array.from(letters)

//Select Letters Container
let lettersContainer = document.querySelector(".letters")

//Generate Letters
lettersArray.forEach((letter) => {
   let span = document.createElement("span")
   let theLetter = document.createTextNode(letter)
   span.appendChild(theLetter)
   span.className = 'letter-box'
   lettersContainer.appendChild(span)
})

//Object Of Words + Categories
const words = {
   programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python", "C", "HTML", "Java", "MATLAB", "Css"],
   movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up", "The Godfather", "Fight Club", "The Dark Knight"],
   people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi", "Isaac Newton", "Benjamin Franklin", "Ludwig van Beethoven"],
   countries: ["Algeria", "Morocco", "Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar", "Tunisia", "Iraq", "Lebanon", "Oman", "Sudan"],
   animals: ["Bear", "Cat", "Lion", "Fish", "Crocodile", "Cow", "Camel", "Giraffe", "Tiger", "Zebra", "Snake", "Monkey", "Mouse", "Goat", "Duck"],
   sport: ["Football", "Basketball", "Cricket", "Hockey", "Tennis", "Volleyball", "Boxing", "Cycling", "Baseball", "Handball"]
}

//Get Random Property
let allKeys = Object.keys(words)
//Random Number Depend On keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length)
//Category
let randomPropName = allKeys[randomPropNumber]
//Category Words
let randomPropValue = words[randomPropName]
//Random Number Depend On Words Length
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)
//Random Word
let randomValueValue = randomPropValue[randomValueNumber]

//Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName

//Select Letters Guess Element
let lettersGuessContainer = document.querySelector('.letters-guess')

//Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue)

//Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
   //Create Empty Span
   let emptySpan = document.createElement("span")

   //If Letter Is Space
   if (letter === ' ') {
      //Add Class To The Span
      emptySpan.className = 'with-space'
   }
   //Append Spans To The Letters Guess Container
   lettersGuessContainer.appendChild(emptySpan)
})

//New Game
document.querySelector('.btn').addEventListener('click', () => {
   window.location.reload();
})

//Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//Set Wrong Attempts
let wrongAttempts = 0

//Select The Draw Element
let theDraw = document.querySelector(".hangman-draw")

let arr = []

//Handel Clicking On Letters
document.addEventListener("click", (e) => {
   //Set The Chose status
   let theStatus = false

   //Select Guess Spans
   if (e.target.className === 'letter-box') {
      e.target.classList.add("clicked")

      //Get Clicked Letter
      let theClickedLetter = e.target.innerHTML.toLowerCase()

      //The Chosen Word
      let theChosenWord = Array.from(randomValueValue.toLowerCase())
      let level2;
      let color;

      theChosenWord.forEach((wordLetter, wordIndex) => {
         //If the Clicked Letter Equal One Of The Chosen Word Letter
         if (theClickedLetter == wordLetter) {
            arr.push(theClickedLetter)
            // If The TheChosenWord Length = The Array Of TheClickedLetter
            if (arr.length === theChosenWord.length) {
               if (wrongAttempts <= 4) {
                  level2 = 'Good'
                  color = 'green'
               } else if (wrongAttempts > 4 && wrongAttempts <= 8) {
                  level2 = 'Medium'
                  color = 'orange'
               } else if (wrongAttempts > 8 && wrongAttempts <= 10) {
                  level2 = 'Low'
                  color = 'orangered'
               }
               Swal.fire({
                  icon: "success",
                  title: "Good Job",
                  html: `The number of your mistakes is : <span style= "font-weight: 600; color: ${color}">${wrongAttempts}</span> `,
                  footer: `Your level is : <span style= "font-weight: 600; color: ${color}">${level2}</span>`
                  // footer: '<a href=${}>Why do I have this issue?</a>'
               }).then((result) => {
                  if (result.isConfirmed) {
                     setTimeout(() => {
                        window.location.reload();
                     }, 500)
                  }
               })
            }
            //Set Status To Correct 
            theStatus = true;
            //Loop On All Guess Spans
            guessSpans.forEach((spanEl, spanInd) => {
               if (wordIndex === spanInd) {
                  spanEl.innerHTML = theClickedLetter
               }
            })
         }
      })

      //Outside Loop
      //If letter Is wrong
      if (theStatus !== true) {
         //Increase The Wrong Attempts
         wrongAttempts++;

         //Add Class Wrong The Draw Elements
         theDraw.classList.add(`wrong-${wrongAttempts}`)

         //Play Fail Sound
         document.getElementById("fail").play()
         if (wrongAttempts === 11) {
            level = 'Low'
            endGame()
            lettersContainer.classList.add("finished")
         }
      } else {
         //Play Succes Sound
         document.getElementById("success").play()
      }
   }
})

function endGame() {
   Swal.fire({
      icon: "error",
      title: "Game Over",
      html: `The word is : <span style="font-weight: 600; color: red">${randomValueValue} </span>` + `<div style= "padding-top: 15px;">The number of your mistakes is : <span style="font-weight: 600; color: red">${wrongAttempts}</span> </div>`,
      footer: `Your level is : <span style="font-weight: 700; color: red">Bad</span>`
      // footer: '<a href=${}>Why do I have this issue?</a>'
   }).then((result) => {
      if (result.isConfirmed) {
         setTimeout(() => {
            window.location.reload();
         }, 500)
      }
   })
}