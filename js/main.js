const form = document.getElementById("novoItem"); // nesse caso aqui estou pegando a teg form

const lista = document.getElementById("lista"); // nesse caso aq1ui estou pegando a teg ul que contem minha lista

const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
  // nesse caso pego minha teg form dou um addeventlist para escutar um evento que no caso é meu submint

  evento.preventDefault(); // evento.preventDefault() utilizo para dar um stop no meu submint se não não consigo ve o que meu evento está trazendo

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = itens.find(elemento=>elemento.nome === nome.value)

  console.log(existe);

  const itemAtual = {
    // objeto armazena os dados que quero para o local storage pq vai ser mais de um dados
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    
  } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id+1 :0;

    criaElemento(itemAtual); //aqui chamo a função cria elementos já passando os dados no parametro

    itens.push(itemAtual); // agora coloco meu objeto dentro do arrey item pq se eu colocar só o objeto meu local storage vai sobreescrever e com o array não
  }
  
  localStorage.setItem("itens", JSON.stringify(itens)); // salvando meu array de objetos dentro do meu local storage o local storage só aceita string então transformo meu array de objetos em string
  //localStorage.setItem("nome",nome); // aqui estou salvando um dadono meu localStorade ex("chave_identifica o dado",dado)

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  //<li class="item"><strong>7</strong>Camisas</li> é padrão do form do meu html como está estruturado

  const novoItem = document.createElement("li"); // nessa parte estou criando uma nova teg dinamicamente

  novoItem.classList.add("item"); // agora estou adicionando uma classe a minha nova teg como está na estrutura do meu html

  const numeroItem = document.createElement("strong"); // nessa parte estou criando uma outra teg dinamicamente

  numeroItem.innerHTML = item.quantidade; // nessa parte o innerHTML serve para colocar um dado dentro da minha teg html

  numeroItem.dataset.id= item.id

  novoItem.appendChild(numeroItem); // para colocar uma teg dentro da outra utilizo  appendChild

  
  novoItem.innerHTML += item.nome; // aqui coloco o nome dentro da teg strong

  novoItem.appendChild(botaoDelete(item.id))

  lista.appendChild(novoItem); // agora pego minha li que já contem o strong e jogo dentro da minha lista
}


function atualizaElemento (item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
    
}


function botaoDelete(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerHTML = "x";

  elementoBotao.addEventListener("click", function() {
     deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}

function deletaElemento(tag,id) {
  tag.remove();

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
  localStorage.setItem("itens", JSON.stringify(itens));
  console.log(itens);
}