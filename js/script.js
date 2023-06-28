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
        this.listName = "tarefas";
        
        this.criarItem = (text, autosave = true) => {
            if (this.lista.includes(text)) {
                erroInput()
                return;
            }

            if (text == "" || text == null || text.length > 25) {
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
            p.textContent = text;

            confirma.appendChild(checkbox);
            divItem.appendChild(confirma);  
            content.appendChild(p);
            divItem.appendChild(content);
            listaElement.appendChild(divItem);

            normalInput();

            this.lista.push(text);
            inputText.value = "";

            if (autosave) this.bakeCookieList();
        }

        this.deletarItem = (id) => {
            let itemDelete = document.getElementById(id.toString());
            itemDelete.remove();
            this.lista.splice(id, 1);
            let elementsOnList = document.getElementsByClassName('item');
            for (let i=0; i<elementsOnList.length; i++) {
                elementsOnList.item(i).id = i;
            }
            this.bakeCookieList();
        }
        
        this.bulkDeletarItem = (ids) => {
            for (let i=0;i<ids.length;i++) {
                let itemDelete = document.getElementById(ids[i].toString());
                itemDelete.remove();
                this.lista.splice(ids[i], 1);
            }
            let elementsOnList = document.getElementsByClassName('item');
            for (let j=0; j<elementsOnList.length; j++) {
                elementsOnList.item(j).id = j;
            }
            this.bakeCookieList();
        }

        this.clearItens = () => {
            let elementsOnList = document.getElementsByClassName('item');
            for (let i=0; i<elementsOnList.length; i++) {
                elementsOnList.item(i).remove();
            }
            this.lista = [];
            this.bakeCookieList();
        }

        this.readListAsArray = () => {
            let listArray = []
            let string = "";
            for (let i=0; i<this.lista.length; i++) {
                string = document.getElementById(i).getElementsByClassName('content').item(0).children.item(0).innerHTML;
                listArray.push(string);
            }
            return listArray;
        }

        this.bakeCookieList = () => {
            var cookie = [this.listName, '=', JSON.stringify(this.readListAsArray()), '; SameSite=Lax; path=/;'].join('');
            document.cookie = cookie;
        }

        this.readCookie = (custom = '') => {
            var result = document.cookie.match(new RegExp(this.listName + '=([^;]+)'));
            if (custom != '') result = custom;
            result && (result = JSON.parse(result[1]));
            return result;
        }

        this.retakeList = () => {
            let listRetaken = this.readCookie();
            if (listRetaken == '' || !listRetaken) return;
            this.clearItens();
            for (let i=0; i<listRetaken.length; i++) {
                this.criarItem(listRetaken[i], true);
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

function deleteSelect() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    let checked = [];
    for (let i = 0; i < checkboxes.length; i++) { checked.push(checkboxes.item(i).parentElement.parentElement.id) }
    tarefas.bulkDeletarItem(checked);
}

// var erro = document.getElementById("btnErro");
// erro.addEventListener("click", tarefas.deletarItem(divItem.id))
// btn.addEventListener("click", tarefas.criarItem(inputText.value));

tarefas.retakeList();
btnExcluir.addEventListener("click", deleteSelect);
