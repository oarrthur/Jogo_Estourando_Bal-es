var timeId = null; //var que armazena o valor chamado na função

function iniciaJogo() {

    var url = window.location.search;

    var nivel_jogo = url.replace("?","");

    var tempo_segundos = 0;

    if(nivel_jogo == 1){
        tempo_segundos = 120;
    }
    if(nivel_jogo == 2){
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3){
        tempo_segundos = 30;
    }

    //Inserção dos segundos no cronomêtro
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //quantidade de balões
    var qt_Baloes = 80;

    cria_Baloes(qt_Baloes);

    //Imprimir qtde_baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML = qt_Baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);
}

function reiniciaJogo() {
    var restart = document.getElementById('restart').innerHTML;
    restart.onclick = window.location.href = 'index.html'
}
function game_over() {
    remove_eventos_baloes();
    alert('Perdeu otário!');
}

function contagem_tempo(segundos) {

    segundos = segundos - 1;

    if (segundos == -1){
        clearTimeout(timeId); //para a execução do setOut
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timeId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function cria_Baloes(qtde_baloes) {
    for(var i = 1; i <= qtde_baloes; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b'+i;
        balao.onclick = function(){estourar(this);};

        document.getElementById("cenario").appendChild(balao);
    }
}

function estourar(e) {
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");

    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

    pontuacao(-1);
}

function pontuacao(acao) {
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
    if(baloes_inteiros == 0){
        alert('AEEE CARALHO TU GANHOU MEU IRMÃO!!');
        parar_jogo();
    }
}

function parar_jogo() {
    clearTimeout(timeId);
}

function remove_eventos_baloes() {
    var i=1;

    while (document.getElementById('b'+i)) {
        document.getElementById('b'+i).onclick = '';
        i++;
    }
}