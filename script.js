const modal = document.getElementsByTagName('dialog')[0]
const openModalButton = document.getElementById('open-modal')
const closeModalButton = document.getElementById('close-button')

openModalButton.addEventListener('click', () => {
  modal.showModal()
})

closeModalButton.addEventListener('click', () => {
  modal.close()
})

const input = document.querySelector(".guess-input")
const list = document.querySelector(".champion-list")

const champions = await fetch('https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json')
  .then(response => response.json())
  .then(objetctResponse => Object.keys(objetctResponse.data))
  .then(champList => {
    champList.forEach((champion) => {
      const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${champion}.png`

      const liElement = document.createElement("li")
      liElement.className = "option"
      liElement.innerHTML = `
        <input type="radio" name="${champion}" id="${champion}" disabled>
        <img src="${imgUrl}" width="48px" height="48px"/>
        <p>${champion}</p>`

      list.appendChild(liElement)
    })

    return champList
  })

console.log(champions)

input.addEventListener('input', (event) => {
  if (event.target.value == "") return

  champions.forEach((champion) => {
    const matches = champion.toLowerCase().includes(event.target.value.toLowerCase())
    document.querySelector(`#${champion}`).disabled = !matches
  })
})