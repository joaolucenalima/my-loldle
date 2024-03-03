const modal = document.getElementsByTagName('dialog')[0]
const openModalButton = document.getElementById('open-modal')
const closeModalButton = document.getElementById('close-button')

openModalButton.addEventListener('click', () => {
  modal.showModal()
})

closeModalButton.addEventListener('click', () => {
  modal.close()
})

const input = document.querySelector("#guess-input")
const list = document.querySelector(".champion-list")

const champions = await fetch('https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json')
  .then(response => response.json())
  .then(objectResponse => Object.values(objectResponse.data))

champions.forEach(({ name, id, title }, index) => {
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${id}.png`

  const liElement = document.createElement("li")
  liElement.className = "option"
  liElement.innerHTML = `
    <input type="radio" data-name="${name}" name="${name}" disabled ${index == 0 && "defaultChecked"}>
    <img src="${imgUrl}" width="48px" height="48px"/>
    <div>
      <p>${name},</p>
      <p class="title">${title.replace(/^([a-z])/, (val) => val.toUpperCase())}</p>
    </div>`

  list.appendChild(liElement)
})

function clearList() {
  document.querySelectorAll("li>input:not(:disabled)").forEach(input => input.disabled = true)
}

input.addEventListener('input', (event) => {
  if (event.target.value == "") {
    return clearList()
  }

  champions.forEach(({ name }) => {
    const matches = name.toLowerCase().includes(event.target.value.toLowerCase())
    document.querySelector(`[data-name="${name}"]`).disabled = !matches
  })
})