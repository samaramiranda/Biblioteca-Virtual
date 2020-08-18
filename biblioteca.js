let todosLivros = []
const campos = document.querySelectorAll("input")
const divLivros = document.querySelector("#todosLivros")
const nenhumLivro = document.querySelector("#nenhumLivro")
const modal = document.querySelector("#myModal")
const tituloModal = document.querySelector("#tituloModal")
const contentModel = document.querySelector("#contentModel")
const span = document.querySelector("#close")
const sinopse = document.querySelector("#sinop")
const txtSinopse = document.querySelector("#txtSinopse")

function buscarLivro() {
  return todosLivros.findIndex((elem) => elem.nomeLivro == (event.target.parentNode.className))
}

function limpar() {
  campos.forEach(function (elem) {
    elem.value = ""
  })
  sinopse.value = ""
}

function showSinopse(event) {
  if (event.target.id == "btn") {
    tituloModal.innerHTML = "Sinopse"
    txtSinopse.innerHTML = todosLivros[buscarLivro()].sinopse
    modal.style.display = "block"
  }
}

function showError(nomeLivro) {
  tituloModal.innerHTML = `Livro "${nomeLivro}" não encontrado!`
  txtSinopse.innerHTML = ""
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

function criarCard(cardLivro, nome, autor, editora, paginas, capa) {
  cardLivro.className = nome
  cardLivro.innerHTML = `
    Nome: ${nome}
    <br>Autor: ${autor}
    <br>Editora: ${editora}
    <br>Págs: ${paginas}
    <img src="${capa}"/>
    <button id="btn">Sinopse</button>
    <button id="btnRemove">Remover</button>
    `
}

function appendElements(divSelect, cardLivro) {
  divSelect.append(cardLivro)

  divSelect.addEventListener("click", showSinopse)
  span.addEventListener("click", closeModal)
  window.addEventListener("click", closeModalWindow)
}

function removeCard(parentDiv) {
  return function remove(event){
    if (event.target.id == "btnRemove") {
      parentDiv.removeChild(event.target.parentNode)
      if (todosLivros.splice(buscarLivro(), 1)) {
        alert(`Livro "${event.target.parentNode.className}" removido com sucesso!`)
      }
    }
  }
}

function cadastrar() {
  const nome = document.getElementById("nomelivro").value
  const autor = document.getElementById("autorlivro").value
  const editora = document.getElementById("editoralivro").value
  const paginas = Number(document.getElementById("qtepag").value)
  const capalivro = document.getElementById("capa").value

  event.preventDefault()

  todosLivros.push(
    {
      nomeLivro: nome,
      autorLivro: autor,
      editoraLivro: editora,
      paginasLivro: paginas,
      capaLivro: capalivro,
      sinopse: sinopse.value
    })

  nenhumLivro.remove()
  const cardLivro = document.createElement("div")
  const imgCapa = document.createElement("img")
  const btn = document.createElement("button")
  const btnRemove = document.createElement("button")

  criarCard(cardLivro, nome, autor, editora, paginas, capalivro)

  appendElements(divLivros, cardLivro)

  const remove = removeCard(divLivros)
  divLivros.addEventListener("click", remove)

  limpar()
}

function buscar() {
  const livro = document.getElementById("nomeBusca").value
  const divBusca = document.getElementById("busca")
  const resulBusca = document.getElementById("resulBusca")
  const cardLivro = document.createElement("div")

  resulBusca.innerHTML = ""
  divBusca.append(resulBusca)

  const findBook = todosLivros.filter(elem => elem.nomeLivro == livro)

  if(findBook.length != 0){
    findBook.forEach(elem => {
      criarCard(cardLivro, elem.nomeLivro, elem.autorLivro, elem.editoraLivro, elem.paginasLivro, elem.capaLivro)
      appendElements(resulBusca, cardLivro)
    })
  }else{
    showError(livro)
  }

  const remove = removeCard(resulBusca)
  divBusca.addEventListener("click", remove)

  limpar()
}