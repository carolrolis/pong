let buttonContainer;

let yBarra1 = 150;
let yBarra2 = 150;

let xBola = 200;
let yBola = 80;
let dx = 5;
let dy = 5;

let jogar = false;
let multi = false;
let botao;
let botaoMulti;

let jogador1 = 0;
let jogador2 = 0;

let vencedor1 = false;
let vencedor2 = false;

// ===============================

function setup() {
  noStroke();
  
  let container = createDiv();
  container.id('canvas-div');
  let canvas = createCanvas(400, 400);
  canvas.parent(container);
  
  buttonContainer = createDiv();
  buttonContainer.id('button-div');
  buttonContainer.parent(container);
  buttonContainer.position(width / 2 - 70, height / 2 - 60);

  botoes();
}

function draw() {
  background(0);
  bastoes();

  if (jogar) {
    bola();
  }
  if (multi) {
    jogarMulti();
  }
  if (multi == false && (xBola <= 10 || xBola >= 380)) {
    reiniciarJogo();
  }

  if (vencedor1) {
    fill(40, 225, 34);
    text("O jogador 1 venceu!", 95, 100);
  } else if (vencedor2) {
    fill(40, 225, 34);
    text("O jogador 2 venceu!", 95, 100);
  }
}

function bastoes() {
  fill(144, 37, 190);
  rect(30, yBarra1, 10, 80);
  rect(360, yBarra2, 10, 80);
  if (multi == false) {
    if (keyIsDown(DOWN_ARROW) && yBarra1 <= height - 80) {
      yBarra1 += 7;
      yBarra2 += 7;
    }
    if (keyIsDown(UP_ARROW) && yBarra1 > 0) {
      yBarra1 -= 7;
      yBarra2 -= 7;
    }
  } else {
    // === TECLA W ===
    if (keyIsDown(87) && yBarra1 > 0) {
      yBarra1 -= 7;
    }
    // === TECLA S ===
    if (keyIsDown(83) && yBarra1 <= height - 100) {
      yBarra1 += 7;
    }

    // === TECLA SETA PRA BAIXO ===
    if (keyIsDown(DOWN_ARROW) && yBarra2 <= height - 100) {
      yBarra2 += 7;
    }
    // === TECLA SETA PRA CIMA ===
    if (keyIsDown(UP_ARROW) && yBarra2 > 0) {
      yBarra2 -= 7;
    }
  }
}

function bola() {
  fill(40, 225, 34);
  circle(xBola, yBola, 15);

  xBola += dx;
  yBola += dy;

  // === COLISÃO BARRA ESQUERDA ===
  if (xBola <= 40 && yBola >= yBarra1 && yBola <= yBarra1 + 100) {
    dx = abs(dx);
  }

  // === COLISÃO BARRA DIREITA ===
  if (xBola >= 360 && yBola >= yBarra2 && yBola <= yBarra2 + 100) {
    dx = -abs(dx);
  }

  // === COLISÕES PAREDES SUPERIOR E INFERIOR ===
  if (yBola >= height || yBola <= 0) {
    dy = -dy;
  }
}

function botoes() {
  botao = createButton("JOGAR");
  botao.mousePressed(() => {
    vencedor1 = false;
    vencedor2 = false;
    jogar = true;
    botao.hide();
    botaoMulti.hide();
  });

  botaoMulti = createButton("DOIS JOGADORES");
  botaoMulti.mousePressed(() => {
    vencedor1 = false;
    vencedor2 = false;
    jogar = true;
    multi = true;
    botao.hide();
    botaoMulti.hide();
  });
  
  botao.parent(buttonContainer);
  botaoMulti.parent(buttonContainer);
}

function jogarMulti() {
  textSize(24);
  text(jogador1 + " x " + jogador2, 180, 30);

  if (xBola <= 10) {
    reiniciarPartida();
    jogador2++;
  } else if (xBola >= 380) {
    reiniciarPartida();
    jogador1++;
  } else if (jogador1 - jogador2 >= 5) {
    vencedor1 = true;
    reiniciarJogo();
  } else if (jogador2 - jogador1 >= 5) {
    vencedor2 = true;
    reiniciarJogo();
  }
}

function reiniciarPartida() {
  xBola = 200;
  yBola = 80;
  dx = 5;
  dy = 5;
  yBarra1 = 150;
  yBarra2 = 150;
}

function reiniciarJogo() {
  jogar = false;
  multi = false;
  jogador1 = 0;
  jogador2 = 0;
  botao.show();
  botaoMulti.show();
  xBola = 200;
  yBola = 80;
  dx = 5;
  dy = 5;
  yBarra1 = 150;
  yBarra2 = 150;
}
