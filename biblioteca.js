var todosLivros = []

function cadastrar() {
  let nome = document.getElementById("nomelivro").value
  let autor = document.getElementById("autorlivro").value
  let editora = document.getElementById("editoralivro").value
  let paginas = Number(document.getElementById("qtepag").value)
  let capalivro = document.getElementById("capa").value
  let divLivros = document.getElementById("todosLivros")

  todosLivros.push(
    livro = {
      nomeLivro: nome,
      autorLivro: autor,
      editoraLivro: editora,
      paginasLivro: paginas,
      capaLivro: capalivro
    })

  let cardLivro = document.createElement("div")
  let imgCapa = document.createElement("img")

  cardLivro.innerHTML = `${nome}
  <br>${autor}
  <br>${editora}
  <br>${paginas} págs.`

  imgCapa.src = capalivro

  divLivros.appendChild(cardLivro)
  cardLivro.appendChild(imgCapa)

  let campos = document.querySelectorAll("input")
  campos.forEach(function (elem) {
    elem.value = ""
  })

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

      cardLivro.innerHTML = `Nome: ${elem.nomeLivro}
      <br>Autor: ${elem.autorLivro}
      <br>Editora: ${elem.editoraLivro}
      <br>Páginas: ${elem.paginasLivro}`

      imgCapa.src = elem.capaLivro

      resulBusca.appendChild(cardLivro)
      cardLivro.appendChild(imgCapa)
    }
  })

  let campos = document.querySelectorAll("input")
  campos.forEach(function (elem) {
    elem.value = ""
  })
}