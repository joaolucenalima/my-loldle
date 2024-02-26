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

fetch('https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json')
  .then(response => response.json())
  .then(object => {
    let champions = Object.keys(object.data)

    input.addEventListener('input', (event) => {
      list.innerHTML = ""

      if (event.target.value == "") return

      const filteredChampions = champions.filter(champion => champion.toLowerCase().includes(event.target.value))

      filteredChampions.forEach((champion) => {

        const imgUrl = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${champion}.png`

        list.innerHTML += `
          <li class="option">
            <input type="radio" name="teste" id="teste">
            <img src="${imgUrl}" width="48px" height="48px"/>
            <p>${champion}</p>
          </li>
        `
      })
    })
  })