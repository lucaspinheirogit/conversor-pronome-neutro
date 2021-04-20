const copyButton = document.querySelector("#copy-button")

copyButton.addEventListener("click", handleCopy)

function handleCopy(){
  resultTextarea.select();
  document.execCommand('copy');
}

const form = document.querySelector("form")
const mainTextarea = document.querySelector("#main-textarea")
const resultTextarea = document.querySelector("#result-textarea")
const resultDiv = document.querySelector(".result")

const neutralPronounsMap = {
  ele: "elu",
  eles: "elus",
  ela: "elu",
  elas: "elus",
  todo: "tod@",
  todos: "tod@s",
  toda: "tod@",
  todas: "tod@s",
  dele: "delu",
  deles: "delus",
  dela: "delu",
  delas: "delus",
  aquele: "aquel@",
  aqueles: "aquel@s",
  aquela: "aquel@",
  aquelas: "aquel@s",
  seu: "sue",
  seus: "sues",
  sua: "sue",
  suas: "sues",
  teu: "tue",
  teus: "tues",
  tua: "tue",
  tuas: "tues",
  nosso: "nosse",
  nossos: "nosses",
  nossa: "nosse",
  nossas: "nosses",
  vosso: "vosse",
  vossos: "vosses",
  vossa: "vosse",
  vossas: "vosses",
}
const neutralPronounsKeys = Object.keys(neutralPronounsMap)

function onFormSubmit(e) {
  e.preventDefault()

  convertTextToNeutral(mainTextarea.value)

  if (!resultDiv.classList.contains("d-block")) {
    resultDiv.classList.toggle("d-block")
  }
}

function convertTextToNeutral(text, keyIndex = 0) {
  if (keyIndex === neutralPronounsKeys.length) {
    resultTextarea.textContent = text
    return
  }

  const key = neutralPronounsKeys[keyIndex]
  const newWord = neutralPronounsMap[key]

  const pattern = String.raw`\b${key}\b`
  const regex = new RegExp(pattern, "g")
  const newText = text.replace(regex, newWord)

  convertTextToNeutral(newText, ++keyIndex)
}

form.addEventListener("submit", onFormSubmit)
