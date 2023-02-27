// 1. selecionar os nossos elementos
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

// 4. Cria LI

function criaLi(){
    const li = document.createElement('li');
    return li;
}

// 5. fazendo com o que o enter adicione tarefas

inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

// 6. Limpar o input

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

// 7. Criando o botao de apagar as tarefas

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

// 3. criando a funcao CriaTarefa

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvaTarefas();
}

// 2. capturando o click no botao

btnTarefa.addEventListener('click', function(){
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

//8. Removendo a tarefa e o botao tudo junto

document.addEventListener('click', function(e){
    const el = e.target;
    
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvaTarefas();
    }
})

// 9. Salvando os textos tarefas:

function salvaTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = []; // cria o array para pegar os textos que estao na li

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // pra nao vir o texto 'apagar'
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // arquivo que depois eu posso pegar de volta e transformar num array
    localStorage.setItem('tarefas', tarefasJSON);
}

// Ler tarefas e jogar na ul

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); // converteu o JSON pra tarefas de novo

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

addTarefasSalvas();