const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {},
    actions: {}
};

state.values = {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: Number(state.view.lives.textContent) || 3,
};

state.actions = {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
};

function loseLife() {
    state.values.lives--;
    state.view.lives.textContent = state.values.lives;

    if (state.values.lives <= 0) {
        alert("Game Over! Suas vidas acabaram. O seu resultado foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
    } else {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

        state.values.currentTime = 60;
        state.view.timeLeft.textContent = state.values.currentTime;

        state.actions.countDownTimerId = setInterval(countDown, 1000);
        state.actions.timerId = setInterval(randomSquare, 1000);
        state.values.hitPosition = null;
    }
}


function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        loseLife();
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

function randomSquare () {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                playSound("hit");
            }
        })
    })
}

function initialize() {
    addListenerHitBox();
}

initialize();
