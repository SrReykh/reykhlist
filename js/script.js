var btn = document.getElementById("btn");
var btnRemove = document.getElementById("btnRemove");
var btnExcluir = document.getElementById("btnExcluir");
var inputText = document.getElementById("input-valor");
var pErro = document.getElementById("error");
var pAviso = document.getElementById("aviso");
var listaElement = document.querySelector(".lista");
var body = document.getElementById("body");


class Tarefas {
    constructor() {
        this.lista = [];
        this.criarItem = () => { 
            if (this.lista.includes(inputText.value)) {
                erroInput()
                return;
            }

            if (inputText.value == "" || inputText.value == null || inputText.value.length > 25) {
                erroInput()
                return;
            }

            // Criando elementos da lista
            let divItem = document.createElement("div");
            divItem.className = "item";
            divItem.id = this.lista.length;
            
            let confirma = document.createElement("div");
            confirma.className = "confirma";
            
            let checkbox = document.createElement("input")  
            checkbox.type = "checkbox";
            checkbox.id = "confirma";
            checkbox.setAttribute("onchange", "verificarSelecao(this)");
            
            let content = document.createElement("div");
            content.className = "content";
            content.id = "content";
            content.style.width = "500px";
            content.style.height = "60px";
            
            let p = document.createElement("p");
            p.id = "content-text";
            p.textContent = inputText.value;

            confirma.appendChild(checkbox);
            divItem.appendChild(confirma);  
            content.appendChild(p);
            divItem.appendChild(content);
            listaElement.appendChild(divItem);

            normalInput();

            this.lista.push(inputText.value);
            inputText.value = "";
        }

        this.deletarItem = (id) => {
            let itemDelete = document.getElementById(id.toString());
            itemDelete.remove();
            this.lista.splice(id, 1);
            let elementsOnList = document.getElementsByClassName('item');
            for (let i=0; i<elementsOnList.length; i++) {
                elementsOnList.item(i).id = i;
            }
        }
    }
}

var tarefas = new Tarefas;

// Verifica se a caixa foi marcada 
function verificarSelecao(checkbox) {
    var texto = checkbox.closest('.item');
    checkbox.checked == true ? texto.style.textDecoration = "line-through" : texto.style.textDecoration = "none";
}

function erroInput() {
    inputText.style.border= "1px solid red";
    pErro.innerText = "Tarefa muito grande ou já existente!";
    pAviso.innerText = "Limite de caracteres: 30";
}

function normalInput() {
    inputText.style.border = "1px solid black";
    pErro.innerText = "";
    pAviso.innerText = "";
}

function exclusao() {
    if (btnExcluir.style.display == "block") {
        btnExcluir.style.display = "none";
        btnRemove.style.backgroundColor = "black";
        btnRemove.value = "Remover"
    } else {
        btnExcluir.style.display = "block";
        btnRemove.style.backgroundColor = "#000000d0";
        btnRemove.value = "Cancelar"
    }

    
}

// var erro = document.getElementById("btnErro");

// erro.addEventListener("click", tarefas.deletarItem(divItem.id))

btn.addEventListener("click", tarefas.criarItem);
