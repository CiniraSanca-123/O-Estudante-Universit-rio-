// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyDDPtSEMNfVCIJVBqpUA1YZ0AuNXPZf1WY",
    authDomain: "o-estudante-universitario.firebaseapp.com",
    projectId: "o-estudante-universitario",
    storageBucket: "o-estudante-universitario.firebasestorage.app",
    messagingSenderId: "856688013207",
    appId: "1:856688013207:web:643511c537557905bc5ed2"
};

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