// FAZER VERIFICAÇÃO DE TAREFAS IGUAIS. USAR ARRAY: arrayTarefa
var btn = document.getElementById("btn");
var inputText = document.getElementById("input-valor");
var pErro = document.getElementById("error");
var lista = document.querySelector(".lista");
var body = document.getElementById("body");
var arrayTarefa = [];

function criarItem() {

    if (inputText.value == "" || inputText.value == null || inputText.value.length > 50) {
        inputText.style.border= "1px solid red"
        pErro.innerText = "Tarefa muito grande ou inexistente!"
        return;
    }

    // Criando elementos da lista
    var lista = document.querySelector(".lista");
    var divItem = document.createElement("div");
    divItem.className = "item";
    
    var confirma = document.createElement("div");
    confirma.className = "confirma";
    
    var checkbox = document.createElement("input")  
    checkbox.type = "checkbox";
    checkbox.id = "confirma";
    checkbox.setAttribute("onchange", "verificarSelecao(this)");
    
    var content = document.createElement("div");
    content.className = "content";
    content.id = "content";
    
    var p = document.createElement("p");
    p.id = "content-text";
    p.textContent = inputText.value;
    
    confirma.appendChild(checkbox);
    divItem.appendChild(confirma);  
    content.appendChild(p);
    divItem.appendChild(content);
    lista.appendChild(divItem);
    
    inputText.style.border = "1px solid black";
    pErro.innerText = ""

    var tamanhoAtual = lista.clientHeight;
    lista.style.height = (tamanhoAtual + 98) + "px";

}   

// Verifica se a caixa foi marcada 
function verificarSelecao(checkbox) {
    var texto = checkbox.closest('.item')

    if (checkbox.checked == true) {
        texto.style.textDecoration = "line-through"
    } else {
        texto.style.textDecoration = "none"
    }
}

btn.addEventListener("click", criarItem);