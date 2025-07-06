const tituloInput = document.querySelector("#tituloInput");
const btnAdd = document.querySelector("#btnAdd");
const dados = document.querySelector("#dados");

// Carregar tarefas salvas ao abrir a página
CarregarTarefas();

function LimparInput() {
  tituloInput.value = "";
  tituloInput.focus();
}

function CriarTarefa(tarefaTexto) {
  const div = document.createElement("div");
  div.classList.add("nova-tarefa");

  const texto = document.createElement("span");
  texto.innerText = tarefaTexto;

  const botao = document.createElement("button");
  botao.classList.add("btn-fechar");
  botao.innerText = "X";

  div.appendChild(texto);
  div.appendChild(botao);
  dados.appendChild(div);
}

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  if (!tituloInput.value) return;

  CriarTarefa(tituloInput.value);
  SalvarTarefas(); // Salvar depois de adicionar
  LimparInput();
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("btn-fechar")) {
    el.parentElement.remove();
    SalvarTarefas(); // Atualiza o localStorage depois de excluir
  }
});

function SalvarTarefas() {
  const tarefas = document.querySelectorAll(".nova-tarefa span");
  const listaTarefas = [];

  tarefas.forEach((tarefa) => {
    listaTarefas.push(tarefa.innerText);
  });

  localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
}

function CarregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas"));

  if (tarefas && tarefas.length > 0) {
    tarefas.forEach((tarefa) => {
      CriarTarefa(tarefa); // Cria a tarefa com o texto certo
    });
  }
}
