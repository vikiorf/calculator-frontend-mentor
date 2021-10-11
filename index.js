// Theme elements
const bodyEl = document.body
const headerEl = document.querySelector('header')
const sectionEl = document.querySelector('section')
const mainEl = document.querySelector('main')
const allKeyEls = Array.from(document.querySelectorAll('.key'))
const allSpecialKeyEls = Array.from(
  document.querySelectorAll('.special-key-blue')
)
const equalKeyEl = document.querySelector('.equal-key-blue')

//Switch element
const rangeEl = document.querySelector('#theme-selector')

// Calculator elements
const allNumberEls = Array.from(document.querySelectorAll('[data-number]'))
const allOperatorEls = Array.from(document.querySelectorAll('[data-operator]'))

const outputEL = document.querySelector('#output')
const deleteEl = document.querySelector('#delete')

const resetEl = document.querySelector('#reset')
const equalsEl = document.querySelector('#equals')

let currentNumber = ''
let nextNumber = ''
let operator = ''

let outputText = ''

function setBlueTheme() {
  bodyEl.classList.add('body-blue-theme')
  bodyEl.classList.remove('body-white-theme')
  bodyEl.classList.remove('body-purple-theme')

  headerEl.classList.add('header-blue')
  headerEl.classList.remove('header-white')
  headerEl.classList.remove('header-purple')

  sectionEl.classList.add('section-blue')
  sectionEl.classList.remove('section-white')
  sectionEl.classList.remove('section-purple')

  mainEl.classList.add('main-blue')
  mainEl.classList.remove('main-white')
  mainEl.classList.remove('main-purple')

  allKeyEls.forEach(keyEl => {
    keyEl.classList.add('key-blue')
    keyEl.classList.remove('key-white')
    keyEl.classList.remove('key-purple')
  })

  allSpecialKeyEls.forEach(keyEl => {
    keyEl.classList.add('special-key-blue')
    keyEl.classList.remove('special-key-white')
    keyEl.classList.remove('special-key-purple')
  })

  equalKeyEl.classList.add('equal-key-blue')
  equalKeyEl.classList.remove('equal-key-white')
  equalKeyEl.classList.remove('equal-key-purple')

  rangeEl.classList.add('toggle-blue')
  rangeEl.classList.remove('toggle-white')
  rangeEl.classList.remove('toggle-purple')
}
function setWhiteTheme() {
  bodyEl.classList.add('body-white-theme')
  bodyEl.classList.remove('body-blue-theme')
  bodyEl.classList.remove('body-purple-theme')

  headerEl.classList.add('header-white')
  headerEl.classList.remove('header-blue')
  headerEl.classList.remove('header-purple')

  sectionEl.classList.add('section-white')
  sectionEl.classList.remove('section-blue')
  sectionEl.classList.remove('section-purple')

  mainEl.classList.add('main-white')
  mainEl.classList.remove('main-blue')
  mainEl.classList.remove('main-purple')

  allKeyEls.forEach(keyEl => {
    keyEl.classList.add('key-white')
    keyEl.classList.remove('key-blue')
    keyEl.classList.remove('key-purple')
  })

  allSpecialKeyEls.forEach(keyEl => {
    keyEl.classList.add('special-key-white')
    keyEl.classList.remove('special-key-blue')
    keyEl.classList.remove('special-key-purple')
  })

  equalKeyEl.classList.add('equal-key-white')
  equalKeyEl.classList.remove('equal-key-blue')
  equalKeyEl.classList.remove('equal-key-purple')

  rangeEl.classList.add('toggle-white')
  rangeEl.classList.remove('toggle-blue')
  rangeEl.classList.remove('toggle-purple')
}
function setPurpleTheme() {
  bodyEl.classList.add('body-purple-theme')
  bodyEl.classList.remove('body-blue-theme')
  bodyEl.classList.remove('body-white-theme')

  headerEl.classList.add('header-purple')
  headerEl.classList.remove('header-white')
  headerEl.classList.remove('header-blue')

  sectionEl.classList.add('section-purple')
  sectionEl.classList.remove('section-blue')
  sectionEl.classList.remove('section-white')

  mainEl.classList.add('main-purple')
  mainEl.classList.remove('main-blue')
  mainEl.classList.remove('main-white')

  allKeyEls.forEach(keyEl => {
    keyEl.classList.add('key-purple')
    keyEl.classList.remove('key-blue')
    keyEl.classList.remove('key-white')
  })

  allSpecialKeyEls.forEach(keyEl => {
    keyEl.classList.add('special-key-purple')
    keyEl.classList.remove('special-key-blue')
    keyEl.classList.remove('special-key-white')
  })

  equalKeyEl.classList.add('equal-key-purple')
  equalKeyEl.classList.remove('equal-key-blue')
  equalKeyEl.classList.remove('equal-key-white')

  rangeEl.classList.add('toggle-purple')
  rangeEl.classList.remove('toggle-blue')
  rangeEl.classList.remove('toggle-white')
}

function setTheme(themeValue) {
  if (parseInt(themeValue) === 1) {
    setBlueTheme()
  } else if (parseInt(themeValue) === 2) {
    setWhiteTheme()
  } else if (parseInt(themeValue) === 3) {
    setPurpleTheme()
  }
  localStorage.setItem('theme-preference', rangeEl.value)
}

// Adds a number to currentNumber first, then, after there is an operator, add number to nextnumber
function addNumber(number) {
  if (!operator) {
    currentNumber += number
  } else {
    nextNumber += number
  }
  addToScreen(number)
}

function addOperator(_operator) {
  operator = _operator
  addToScreen(_operator)
}

function addToScreen(number) {
  outputText += number.toString()
  outputEL.textContent = outputText
}

function clearScreen() {
  outputText = ''
  outputEL.textContent = outputText
}

function reset() {
  clearScreen()
  currentNumber = ''
  nextNumber = ''
  operator = ''
}

// removes the last entered value
function deleteOne() {
  if (nextNumber) {
    let tempArr = Array.from(nextNumber)
    tempArr.splice(tempArr.length - 1, 1)
    nextNumber = ''
    tempArr.forEach(item => {
      nextNumber += item
    })
    clearScreen()
    addToScreen(currentNumber)
    addToScreen(operator)
    addToScreen(nextNumber)
  } else if (!nextNumber && operator) {
    operator = ''
    clearScreen()
    addToScreen(currentNumber)
  } else if (!nextNumber && !operator) {
    let tempArr = Array.from(currentNumber)
    tempArr.splice(tempArr.length - 1, 1)
    currentNumber = ''
    tempArr.forEach(item => {
      currentNumber += item
    })
    clearScreen()
    addToScreen(currentNumber)
  }
}

function calculate() {
  let result
  switch (operator) {
    case '+':
      result = parseFloat(currentNumber) + parseFloat(nextNumber)
      break
    case '-':
      result = parseFloat(currentNumber) - parseFloat(nextNumber)
      break
    case '/':
      result = parseFloat(currentNumber) / parseFloat(nextNumber)
      break
    case 'x':
      result = parseFloat(currentNumber) * parseFloat(nextNumber)
      break
    case '*':
      result = parseFloat(currentNumber) * parseFloat(nextNumber)
      break
    default:
      result = currentNumber
  }
  currentNumber = result
  nextNumber = ''
  operator = ''
  clearScreen()
  addToScreen(result)
  result = ''
}

allNumberEls.forEach(numberEl => {
  numberEl.addEventListener('click', event => {
    addNumber(event.target.textContent)
  })
})

allOperatorEls.forEach(operatorEl => {
  operatorEl.addEventListener('click', event => {
    addOperator(event.target.textContent)
  })
})

deleteEl.addEventListener('click', deleteOne)
equalsEl.addEventListener('click', calculate)
resetEl.addEventListener('click', reset)
rangeEl.addEventListener('change', event => {
  setTheme(event.target.value)
})

// setting saved theme if there is one
window.addEventListener('load', () => {
  let themePreference = localStorage.getItem('theme-preference')
  if (themePreference) {
    setTheme(themePreference)
    rangeEl.value = themePreference
  }
})

// Key listener, had to be keydown because of firefox quick find
window.addEventListener('keydown', event => {
  if (event.key === '/') {
    event.preventDefault()
  }
  let isnum = /^\d+$/.test(parseInt(event.key))
  let isOperator = /^[+\-\/\x\*]$/.test(event.key)
  if (isnum) {
    addNumber(event.key)
  }
  if (isOperator) {
    addOperator(event.key)
  }

  if (event.key === 'Backspace' || event.key === 'Delete') {
    deleteOne()
  }
  if (event.key === 'Escape') {
    reset()
  }
  if (event.key === 'Enter') {
    calculate()
  }
})
