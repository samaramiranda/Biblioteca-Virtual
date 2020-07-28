var todosLivros = []
var sinopse = document.getElementById("sinop")
var modal = document.getElementById("myModal")
var contentModel = document.getElementById("contentModel")
var span = document.getElementById("close")
var txtSinopse = document.getElementById("txtSinopse")
var campos = document.querySelectorAll("input")
var msgLivros = document.getElementById("msgLivros")
var tituloModal = document.getElementById("tituloModal")
var valueSinopse = ""

function limpar() {
  campos.forEach(function (elem) {
    elem.value = ""
  })
  sinopse.value = ""
}

function showSinopse(event) {
  if (event.target.id == "btn") {
    tituloModal.innerHTML = "Sinopse"
    txtSinopse.innerHTML = valueSinopse
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

function cadastrar() {
  let nome = document.getElementById("nomelivro").value
  let autor = document.getElementById("autorlivro").value
  let editora = document.getElementById("editoralivro").value
  let paginas = Number(document.getElementById("qtepag").value)
  let capalivro = document.getElementById("capa").value
  let divLivros = document.getElementById("todosLivros")

  valueSinopse = sinopse.value

  todosLivros.push(
    {
      nomeLivro: nome,
      autorLivro: autor,
      editoraLivro: editora,
      paginasLivro: paginas,
      capaLivro: capalivro,
      sinopse: sinopse
    })

  msgLivros.innerHTML = ""
  let cardLivro = document.createElement("div")
  let imgCapa = document.createElement("img")
  let btn = document.createElement("button")
  let btnRemove = document.createElement("button")

  cardLivro.innerHTML = `Nome: ${nome}
  <br>Autor: ${autor}
  <br>Editora: ${editora}
  <br>Págs: ${paginas} `

  cardLivro.id = todosLivros.length-1
  cardLivro.className = "cardLivro"

  console.log(nome)

  imgCapa.src = capalivro
  btn.innerHTML = "Sinopse"
  btn.id = "btn"

  btnRemove.innerHTML = "Remover"
  btnRemove.id = "btnRemove"

  divLivros.appendChild(cardLivro)
  cardLivro.appendChild(imgCapa)
  cardLivro.appendChild(btn)
  cardLivro.appendChild(btnRemove)

  function removerCard(event){
    if(event.target.id == "btnRemove"){
      // let livroClick = 
      divLivros.removeChild(event.target.parentNode)
      console.log(event.target.parentNode)
      console.log("clicou remover")
      console.log(btnRemove.parentNode.id)
      // console.log(document.querySelectorAll(".cardLivro")[btnRemove.parentNode.id])

    }
  }

  divLivros.addEventListener("click", removerCard)


  divLivros.addEventListener("click", showSinopse)
  span.addEventListener("click", closeModal)
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  console.log(todosLivros)
  // console.log(cardLivro)

  limpar()
}

function buscar() {
  let livro = document.getElementById("nomeBusca").value
  let divBusca = document.getElementById("busca")
  let resulBusca = document.getElementById("resulBusca")

  resulBusca.innerHTML = ""
  divBusca.appendChild(resulBusca)

  todosLivros.forEach(function (elem) {
    if (livro == elem.nomeLivro) {
      let cardLivro = document.createElement("div")
      let imgCapa = document.createElement("img")
      let btn = document.createElement("button")

      cardLivro.innerHTML = `Nome: ${elem.nomeLivro}
      <br>Autor: ${elem.autorLivro}
      <br>Editora: ${elem.editoraLivro}
      <br>Págs: ${elem.paginasLivro}`

      imgCapa.src = elem.capaLivro
      btn.innerHTML = "Sinopse"
      btn.id = "btn"

      resulBusca.appendChild(cardLivro)
      cardLivro.appendChild(imgCapa)
      cardLivro.appendChild(btn)
    } else {
      showError(livro)
    }
  })

  divBusca.addEventListener("click", showSinopse)
  span.addEventListener("click", closeModal)
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }

  limpar()
}