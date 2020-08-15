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

function removerCard(event) {
  if (event.target.id == "btnRemove") {
    divLivros.removeChild(event.target.parentNode)
    if (todosLivros.splice(buscarLivro(), 1)) {
      alert(`Livro removido!`)
    }
  }
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

function criarCard(cardLivro, imgCapa, btn, nome, autor, editora, paginas, capa) {
  cardLivro.className = nome
  cardLivro.innerHTML = `
    Nome: ${nome}
    <br>Autor: ${autor}
    <br>Editora: ${editora}
    <br>Págs: ${paginas}
    `
  imgCapa.src = capa
  btn.innerHTML = "Sinopse"
  btn.id = "btn"
}

function appendElements(divSelect, cardLivro, imgCapa, btn) {
  divSelect.appendChild(cardLivro)
  cardLivro.appendChild(imgCapa)
  cardLivro.appendChild(btn)

  divSelect.addEventListener("click", showSinopse)
  span.addEventListener("click", closeModal)
  window.addEventListener("click", closeModalWindow)
}


function cadastrar() {
  const nome = document.getElementById("nomelivro").value
  const autor = document.getElementById("autorlivro").value
  const editora = document.getElementById("editoralivro").value
  const paginas = Number(document.getElementById("qtepag").value)
  const capalivro = document.getElementById("capa").value

  todosLivros.push(
    {
      nomeLivro: nome,
      autorLivro: autor,
      editoraLivro: editora,
      paginasLivro: paginas,
      capaLivro: capalivro,
      sinopse: sinopse.value
    })

  nenhumLivro.innerHTML = ""
  const cardLivro = document.createElement("div")
  const imgCapa = document.createElement("img")
  const btn = document.createElement("button")
  const btnRemove = document.createElement("button")

  criarCard(cardLivro, imgCapa, btn, nome, autor, editora, paginas, capalivro)

  btnRemove.innerHTML = "Remover"
  btnRemove.id = "btnRemove"

  appendElements(divLivros, cardLivro, imgCapa, btn)

  cardLivro.appendChild(btnRemove)

  divLivros.addEventListener("click", removerCard)
  limpar()
}

function buscar() {
  const livro = document.getElementById("nomeBusca").value
  const divBusca = document.getElementById("busca")
  const resulBusca = document.getElementById("resulBusca")
  const cardLivro = document.createElement("div")
  const imgCapa = document.createElement("img")
  const btn = document.createElement("button")

  resulBusca.innerHTML = ""
  divBusca.appendChild(resulBusca)

  var encontra = 0

  todosLivros.forEach(function (elem) {
    if (livro == elem.nomeLivro) {
      encontra = 1
      criarCard(cardLivro, imgCapa, btn, elem.nomeLivro, elem.autorLivro, elem.editoraLivro, elem.paginasLivro, elem.capaLivro)
    }
  })

  if (encontra == 1) {
    appendElements(resulBusca, cardLivro, imgCapa, btn)
  } else {
    showError(livro)
  }

  limpar()
}