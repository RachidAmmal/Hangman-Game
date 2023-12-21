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
   sport: ["Football ", "Basketball", "Cricket", "Hockey", "Tennis", "Volleyball", "Boxing", "Cycling", "Baseball", "Handball"]
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

//Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//Set Wrong Attempts
let wrongAttempts = 0

let level;
if (wrongAttempts <= 4) {
   level = 'Good'
} else if (wrongAttempts > 4 && wrongAttempts <= 8) {
   level = 'Medium'
} else if (wrongAttempts > 8 && wrongAttempts <= 10) {
   level = 'Low'
}

//Select The Draw Element
let theDraw = document.querySelector(".hangman-draw")

let arr = []

//New Game
document.querySelector('.btn').addEventListener('click', () => {
   window.location.reload();
})
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

      theChosenWord.forEach((wordLetter, wordIndex) => {
         //If the Clicked Letter Equal One Of The Chosen Word Letter
         if (theClickedLetter == wordLetter) {
            arr.push(theClickedLetter)
            // If The TheChosenWord Length = The Array Of TheClickedLetter
            if (arr.length === theChosenWord.length) {
               let level2;
               if (wrongAttempts <= 4) {
                  level2 = 'Good'
               } else if (wrongAttempts > 4 && wrongAttempts <= 8) {
                  level2 = 'Medium'
               } else if (wrongAttempts > 8 && wrongAttempts <= 10) {
                  level2 = 'Low'
               }
               Swal.fire({
                  icon: "success",
                  title: "Good Job",
                  text: `The number of your mistakes is : ${wrongAttempts} \n `,
                  footer: `Your level is : ${level2}`
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
      html: `The word is : ${randomValueValue} ` + `<div style= "padding-top: 15px;">The number of your mistakes is : ${wrongAttempts}</div>`,
      footer: `Your level is : ${level}`
      // footer: '<a href=${}>Why do I have this issue?</a>'
   }).then((result) => {
      if (result.isConfirmed) {
         setTimeout(() => {
            window.location.reload();
         }, 500)
      }
   })
}