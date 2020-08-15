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
  let cardLivro = document.createElement("div")
  let imgCapa = document.createElement("img")
  let btn = document.createElement("button")
  let btnRemove = document.createElement("button")

  cardLivro.innerHTML = `Nome: ${nome}
  <br>Autor: ${autor}
  <br>Editora: ${editora}
  <br>Págs: ${paginas} `

  cardLivro.className = nome

  imgCapa.src = capalivro
  btn.innerHTML = "Sinopse"
  btn.id = "btn"

  btnRemove.innerHTML = "Remover"
  btnRemove.id = "btnRemove"

  divLivros.appendChild(cardLivro)
  cardLivro.appendChild(imgCapa)
  cardLivro.appendChild(btn)
  cardLivro.appendChild(btnRemove)

  divLivros.addEventListener("click", removerCard)

  divLivros.addEventListener("click", showSinopse)
  span.addEventListener("click", closeModal)
  window.addEventListener("click", closeModalWindow)
  
  limpar()
}

function buscar() {
  let livro = document.getElementById("nomeBusca").value
  let divBusca = document.getElementById("busca")
  let resulBusca = document.getElementById("resulBusca")
  let cardLivro = document.createElement("div")
  let imgCapa = document.createElement("img")
  let btn = document.createElement("button")

  resulBusca.innerHTML = ""
  divBusca.appendChild(resulBusca)

  var encontra = 0

  todosLivros.forEach(function (elem) {
    if (livro == elem.nomeLivro) {
      encontra = 1

      cardLivro.className = elem.nomeLivro
      cardLivro.innerHTML = `Nome: ${elem.nomeLivro}
      <br>Autor: ${elem.autorLivro}
      <br>Editora: ${elem.editoraLivro}
      <br>Págs: ${elem.paginasLivro}`

      imgCapa.src = elem.capaLivro
      btn.innerHTML = "Sinopse"
      btn.id = "btn"
    }
  })

  if (encontra == 1) {
    resulBusca.appendChild(cardLivro)
    cardLivro.appendChild(imgCapa)
    cardLivro.appendChild(btn)

    divBusca.addEventListener("click", showSinopse)
    span.addEventListener("click", closeModal)
    window.addEventListener("click", closeModalWindow)

  } else {
    showError(livro)
  }

  limpar()
}