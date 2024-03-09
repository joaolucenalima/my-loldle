lucide.createIcons()

const modal = document.getElementsByTagName('dialog')[0]
const openModalButton = document.getElementById('open-modal')
const closeModalButton = document.getElementById('close-button')

openModalButton.addEventListener('click', () => {
  modal.showModal()
})

closeModalButton.addEventListener('click', () => {
  modal.close()
})

const form = document.querySelector(".custom-input")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const champion = document.querySelector("input[type=radio]:checked")
  if (champion) {
    alert(`Você escolheu o campeão ${champion.dataset.name}`)
  }
})

const input = document.getElementById("guess-input")
const list = document.querySelector(".champion-list")

const champions = await fetch('https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json')
  .then(response => response.json())
  .then(objectResponse => Object.values(objectResponse.data))

champions.forEach(({ name, id, title }) => {
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${id}.png`

  const liElement = document.createElement("li")
  liElement.className = "option"
  liElement.innerHTML = `
    <input type="radio" data-name="${name}" name="champion" id="${id}" disabled >
    <img src="${imgUrl}" width="48px" height="48px"/>
    <div>
      <p>${name}</p>
      <p class="title">${title.replace(/^([a-z])/, (val) => val.toUpperCase())}</p>
    </div>`
  liElement.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      form.dispatchEvent(new Event('submit'))
    }
    if (event.key >= "a" && event.key <= "z" || event.key == "Backspace" || event.key == "Space") {
      input.focus()
    }
  })

  liElement.addEventListener('click', (event) => {
    if (event.pointerType === "mouse") {
      form.dispatchEvent(new Event('submit'))
    }
  })

  list.appendChild(liElement)
})

function clearList() {
  document.querySelectorAll("li>input:not(:disabled)").forEach(input => input.disabled = true)
}

let firstMatch

input.addEventListener('input', (event) => {
  if (event.target.value == "") {
    return clearList()
  }

  firstMatch = null

  champions.forEach(({ name }) => {
    const matches = name.toLowerCase().startsWith(event.target.value.toLowerCase())
    document.querySelector(`[data-name="${name}"]`).disabled = !matches
    if (matches && !firstMatch) {
      firstMatch = name
    }
  })

  if (firstMatch) {
    document.querySelector(`[data-name="${firstMatch}"]`).checked = true
  }
})

input.addEventListener('keydown', (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    document.querySelector(`[data-name="${firstMatch}"]`).focus()
  }
});