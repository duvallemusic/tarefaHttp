const API_URL = "https://crudcrud.com/api/6b2e81a6900542a4ae5dda4a32d79336/usuarios";

const usuariosLista = document.getElementById("listadeclientes");
const formulario = document.getElementById("formulario");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");

// Carrega os usuários ao iniciar
window.addEventListener("DOMContentLoaded", carregarUsuarios);

// Evita reload e cadastra novo usuário
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  if (!nome || !email) return;

  const novoUsuario = { nome, email };

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoUsuario)
    });

    const usuarioCriado = await resposta.json();
    adicionarUsuarioNaLista(usuarioCriado);
    formulario.reset();
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
  }
});

// Carrega os usuários existentes do CRUDCRUD
async function carregarUsuarios() {
  try {
    const resposta = await fetch(API_URL);
    const usuarios = await resposta.json();
    usuariosLista.innerHTML = ""; // evita duplicação
    usuarios.forEach(adicionarUsuarioNaLista);
  } catch (erro) {
    console.error("Erro ao carregar usuários:", erro);
  }
}

// Adiciona um usuário na lista
function adicionarUsuarioNaLista(usuario) {
  const li = document.createElement("li");
  li.textContent = `${usuario.nome} (${usuario.email}) `;

  const botao = document.createElement("button");
  botao.textContent = "x";
  botao.style.marginLeft = "10px";

  botao.addEventListener("click", async () => {
    try {
      await fetch(`${API_URL}/${usuario._id}`, {
        method: "DELETE"
      });
      li.remove();
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
    }
  });

  li.appendChild(botao);
  usuariosLista.appendChild(li);
}