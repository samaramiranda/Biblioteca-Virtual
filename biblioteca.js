let todosLivros = []
const fields = document.querySelectorAll("input")
const divLivros = document.querySelector("#todosLivros")
const nenhumLivro = document.querySelector("#nenhumLivro")
const modal = document.querySelector("#myModal")
const modalTitle = document.querySelector("#modalTitle")
const contentModel = document.querySelector("#contentModel")
const close = document.querySelector("#close")
const synopsis = document.querySelector("#synopsis")
const txtSynopsis = document.querySelector("#txtSynopsis")

function buscarLivro() {
  return todosLivros.findIndex((elem) => elem.bookName == (event.target.parentNode.className))
}

function limpar() {
  fields.forEach(function (elem) {
    elem.value = ""
  })
  synopsis.value = ""
}

function showSynopsis(event) {
  if (event.target.id == "btn") {
    modalTitle.innerHTML = `Sinopse do livro "${todosLivros[buscarLivro()].bookName}"`
    txtSynopsis.innerHTML = todosLivros[buscarLivro()].synopsis
    modal.style.display = "block"
  }
}

function showError(bookName) {
  modalTitle.innerHTML = `Livro "${bookName}" não encontrado!`
  txtSynopsis.innerHTML = ""
  contentModel.style.width = "50%"
  modal.style.display = "block"
}

function closeModal(event) {
  modal.style.display = "none"
}

function closeModalWindow(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function criarCard(cardLivro, bookName, bookAuthor, bookPublisher, numberOfPages, bookCover) {
  cardLivro.className = bookName
  cardLivro.innerHTML = `
    Nome: ${bookName}
    <br>Autor: ${bookAuthor}
    <br>Editora: ${bookPublisher}
    <br>Págs: ${numberOfPages}
    <img src="${bookCover}"/>
    <button id="btn">Sinopse</button>
    <button id="btnRemove">Remover</button>
    `
}

function appendElements(divSelect, cardLivro) {
  divSelect.append(cardLivro)

  divSelect.addEventListener("click", showSynopsis)
  close.addEventListener("click", closeModal)
  window.addEventListener("click", closeModalWindow)
}

function removeCard(parentDiv) {
  return function remove(event) {
    if (event.target.id == "btnRemove") {
      parentDiv.removeChild(event.target.parentNode)
      if (todosLivros.splice(buscarLivro(), 1)) {
        alert(`Livro "${event.target.parentNode.className}" removido com sucesso!`)
      }
    }
  }
}

function cadastrar() {
  const bookName = document.getElementById("bookName").value
  const bookAuthor = document.getElementById("bookAuthor").value
  const bookPublisher = document.getElementById("bookPublisher").value
  const numberOfPages = Number(document.getElementById("numberOfPages").value)
  const bookCover = document.getElementById("bookCover").value

  event.preventDefault()

  todosLivros.push(
    {
      bookName,
      bookAuthor,
      bookPublisher,
      numberOfPages,
      bookCover,
      synopsis: synopsis.value
    })

  nenhumLivro.remove()
  const cardLivro = document.createElement("div")

  criarCard(cardLivro, bookName, bookAuthor, bookPublisher, numberOfPages, bookCover)

  appendElements(divLivros, cardLivro)

  const remove = removeCard(divLivros)
  divLivros.addEventListener("click", remove)

  limpar()
}

function buscar() {
  const searchName = document.getElementById("searchName").value
  const divBusca = document.getElementById("busca")
  const resulBusca = document.getElementById("resulBusca")
  const cardLivro = document.createElement("div")

  resulBusca.innerHTML = ""
  divBusca.append(resulBusca)

  // ESTÁ RETORNANDO SÓ UM LIVRO E NÃO TODOS DO MESMO NOME
  const findBook = todosLivros.filter(elem => elem.bookName == searchName)

  console.log(findBook)

  if (findBook.length != 0) {
    findBook.forEach(elem => {
      criarCard(cardLivro, elem.bookName, elem.bookAuthor, elem.bookPublisher, elem.numberOfPages, elem.bookCover)
      appendElements(resulBusca, cardLivro)
    })
  } else {
    showError(searchName)
  }

  const remove = removeCard(resulBusca)
  divBusca.addEventListener("click", remove)

  limpar()
}