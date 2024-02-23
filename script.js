const modal = document.getElementsByTagName('dialog')[0]
const openModalButton = document.getElementById('open-modal')
const closeModalButton = document.getElementById('close-button')

openModalButton.addEventListener('click', () => {
  modal.showModal()
})

closeModalButton.addEventListener('click', () => {
  modal.close()
})