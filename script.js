const textos = [
    { id: 'p1', texto: 'Tu és um estudante universitário em busca de conhecimento e experiências inesquecíveis. Mas algo deu errado.' },
    { id: 'p2', texto: 'Numa noite qualquer, após mais um dia de aulas, percebeste que todos os portões da UNINOVE foram fechados. Os corredores estão vazios, mas não silenciosos. Sombras estranhas percorrem os blocos. Livros sussurram segredos antigos na biblioteca. E há algo — ou alguém — à tua espreita.' },
    { id: 'p3', texto: 'Para conseguires escapar, precisarás enfrentar as 4 regiões da universidade:' },
    { id: 'p4', texto: 'Resolve os enigmas. Elimina os teus inimigos. Demonstra que és um verdadeiro estudante determinado.' },
    { id: 'pfinal', texto: 'O teu futuro começa agora. A fuga é só o primeiro passo.' }
];

let indiceAtual = 0;
let slideAtual = 0;
let temporizador;

function digitarTexto(elementoId, texto, callback) {
    const el = document.getElementById(elementoId);
    if (!el) { callback(); return; }
    el.classList.add('visivel');
    el.innerHTML = '';
    let i = 0;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);

    const intervalo = setInterval(() => {
        if (i < texto.length) {
            el.insertBefore(document.createTextNode(texto[i]), cursor);
            i++;
        } else {
            clearInterval(intervalo);
            cursor.remove();
            setTimeout(callback, 400);
        }
    }, 28);
}

function mostrarProximo() {
    if (indiceAtual >= textos.length) {
        mostrarFase2();
        return;
    }
    const atual = textos[indiceAtual];
    indiceAtual++;
    digitarTexto(atual.id, atual.texto, mostrarProximo);
}

function mostrarFase2() {
    const fase2 = document.getElementById('fase2');
    if (!fase2) return;
    setTimeout(function() {
        fase2.style.display = 'flex';
    }, 1000);
}

function mostrarSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const contador = document.getElementById('contador');
    if (!slides.length) return;
    slides[slideAtual].classList.remove('ativo');
    slideAtual = (n + slides.length) % slides.length;
    slides[slideAtual].classList.add('ativo');
    if (contador) contador.textContent = (slideAtual + 1) + ' / ' + slides.length;
}

function mudarSlide(direcao) {
    mostrarSlide(slideAtual + direcao);
}

function entrar() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    if (usuario === 'estudante' && senha === '1234') {
        window.location.href = 'index_inicial.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

if (document.querySelectorAll('.slide').length > 0) {
    temporizador = setInterval(() => mostrarSlide(slideAtual + 1), 5000);
}

window.addEventListener('load', () => {
    setTimeout(mostrarProximo, 600);
});

function mudarSlide(direcao) {
    const slides = document.querySelectorAll('.slide');
    const contador = document.getElementById('contador');
    if (!slides.length) return;

    slides[slideAtual].classList.remove('ativo');
    slideAtual = (direcao + slides.length) % slides.length;
    slides[slideAtual].classList.add('ativo');
    if (contador) contador.textContent = (slideAtual + 1) + ' / ' + slides.length;
}

function entrar() {
    window.location.href = 'index_inicial.html';
}

function entrar() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario === 'estudante' && senha === '1234') {
        window.location.href = 'index_inicial.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}