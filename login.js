// Sua configuração do Firebase (CORRETA)
const firebaseConfig = {
    apiKey: "AIzaSyDDPtSEMNfVCIJVBqpUA1YZ0AuNXPZf1WY",
    authDomain: "o-estudante-universitario.firebaseapp.com",
    projectId: "o-estudante-universitario",
    storageBucket: "o-estudante-universitario.firebasestorage.app",
    messagingSenderId: "856688013207",
    appId: "1:856688013207:web:643511c537557905bc5ed2"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elementos da tela
const formLogin = document.getElementById('formLogin');
const formCadastro = document.getElementById('formCadastro');
const btnLogin = document.getElementById('btnLogin');
const btnCadastro = document.getElementById('btnCadastro');
const botaoEntrar = document.getElementById('botaoEntrar');
const botaoCriar = document.getElementById('botaoCriar');
const mensagem = document.getElementById('mensagem');

// Mostrar formulário de Login
btnLogin.onclick = () => {
    btnLogin.classList.add('ativo');
    btnCadastro.classList.remove('ativo');
    formLogin.style.display = 'block';
    formCadastro.style.display = 'none';
};

// Mostrar formulário de Cadastro
btnCadastro.onclick = () => {
    btnCadastro.classList.add('ativo');
    btnLogin.classList.remove('ativo');
    formLogin.style.display = 'none';
    formCadastro.style.display = 'block';
};

// Função de Cadastro
botaoCriar.onclick = () => {
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;

    if (senha.length < 6) {
        mensagem.innerText = '❌ Senha precisa ter 6 ou mais caracteres';
        mensagem.style.color = 'red';
        return;
    }

    auth.createUserWithEmailAndPassword(email, senha)
    .then(() => {
        mensagem.innerText = '✅ Conta criada! Redirecionando...';
        mensagem.style.color = 'green';
        setTimeout(() => {
            window.location.href = 'bem-vindo.html';
        }, 1500);
    })
        .catch((erro) => {
            if (erro.code === 'auth/email-already-in-use') {
                mensagem.innerText = '❌ Este e-mail já está cadastrado';
            } else if (erro.code === 'auth/invalid-email') {
                mensagem.innerText = '❌ E-mail inválido';
            } else {
                mensagem.innerText = '❌ Erro: ' + erro.message;
            }
            mensagem.style.color = 'red';
        });
};

// Função de Login
botaoEntrar.onclick = () => {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
            mensagem.innerText = '✅ Login realizado com sucesso! Redirecionando...';
            mensagem.style.color = 'green';
            // 👇 REDIRECIONAMENTO PARA A PÁGINA PRINCIPAL
            setTimeout(() => {
                window.location.href = 'index_inicial.html'; 
            }, 1500);
        })
        
        .catch((erro) => {
            if (erro.code === 'auth/user-not-found') {
                mensagem.innerText = '❌ Usuário não encontrado. Crie uma conta.';
            } else if (erro.code === 'auth/wrong-password') {
                mensagem.innerText = '❌ Senha incorreta';
            } else if (erro.code === 'auth/invalid-email') {
                mensagem.innerText = '❌ E-mail inválido';
            } else {
                mensagem.innerText = '❌ Erro: ' + erro.message;
            }
            mensagem.style.color = 'red';
        });
};

document.body.style.backgroundImage = "url('image/fundo_2.jpeg')";