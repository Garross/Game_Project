const state = {
  //general Vars
  ctx: null,
  gameState: "menu",
  fps: 60,
  exit: false,
  keyPressed: false,
  quit: false,

  //tower
  blockHeight: 2057 * 0.03,
  blockWidth: 1995 * 0.03,
  tower1: {
    blockX: null,
    blockY: 0,
    blockSpeed: 0,
    size: 1,
    count: 0,
    towerFloor: null,
    towerSize: 1,
    animationFinished: false
  },
  tower2: {
    blockX: null,
    blockY: 0,
    blockSpeed: 0,
    count: 0,
    towerFloor: null,
    towerSize: 1,
    animationFinished: false
  },
  key: null,
  symbol: null,
  symbols: new Array(222),

  // Sprite Handling
  tower: new Image(),
  helmet: new Image(),
  player: new Image(),
  background: new Image(),
  menuBackground: new Image(),
  //Player Handling
  playerHeight: 184 * 0.6,
  playerWidth: 225 * 0.6,
  player1: {
    x: null,
    y: null
  },
  player2: {
    x: null,
    y: null
  },
  //Arrays
  questions: new Array(10),
  answers: new Array(10),
  max: 6,
  min: 0,
  //Audio
  towerNoise: new Audio('http://download1486.mediafire.com/glyl6md3sjrg/4wvh6zwqmb7ak6y/TowerThud.mp3'),
  music: new Audio('http://download942.mediafire.com/d9s92hwg7i5g/a8kcfwt9xben8he/LoRiderLong.mp3'),

  correct: new Audio('http://download752.mediafire.com/cdj1dv5xe5tg/txx86bglble720t/ding4Correct.mp3')
}

const mutations = {


  update(state) {
    var canvas = document.getElementById('gameCanvas')



    //state.music.play();


    //In the menu section of the game
    if (state.gameState === "menu") {
      state.ctx.drawImage(state.menuBackground, 0, 0, canvas.width, canvas.height);
      mutations.drawMenuMessage(state, canvas);

      //If space is pressed :
      if (state.key === 32 || state.key === 13) {
        state.gameState = 'play';
      }
    }
    //The active part of the game
    if (state.gameState == 'play') {
      //Clearing the background before drawing background and players ontop of it.
      state.ctx.clearRect(0, 0, canvas.width, canvas.height);
      state.ctx.drawImage(state.background, 0, 0, canvas.width, canvas.height);
      state.ctx.drawImage(state.player, state.player1.x, state.player1.y, state.playerWidth, state.playerHeight);
      state.ctx.drawImage(state.player, state.player2.x, state.player2.y, state.playerWidth, state.playerHeight);


      //If the last tower has already landed
      if (state.tower1.animationFinished == true) {

        if(state.quit ===false){
        mutations.askQuestion(state);
        }
        state.tower1.animationFinished = false;
        //state.tower2.animationFinished = false;

      }




      //Sets symbol value to that member of the array corresponding to the keyboard key value
      state.symbol = state.symbols[state.key];

      //draws Answer box taking into consideration the inputted symbol
      mutations.drawAnswer(state, state.symbol);

      //If block is not yet "touching the ground" keep on accelerating downwards as if under the force of gravity

      if (state.tower1.blockY < state.tower1.towerFloor - state.blockHeight - state.tower1.blockSpeed) {



        //Moving the tower block by addind it's speed to its current position.
        state.tower1.blockY = state.tower1.blockY + state.tower1.blockSpeed;

        //Measuring fall time of the tower block
        state.tower1.count = state.tower1.count + 0.001;

        //Gravity accelerating the tower block
        state.tower1.blockSpeed = state.tower1.blockSpeed + 9.8 * state.tower1.count;

      } else {

        state.tower1.blockY = (state.tower1.towerFloor - state.blockHeight) + 10 * (state.tower1.towerSize);
        //count variable may need to be renamed later(can be confused for actual counting)
        state.tower1.count = 0;
        state.tower1.blockSpeed = 0;
        //state.towerNoise.play();

        state.tower1.animationFinished = true;
        //state.tower2.animationFinished = true;


      }

      //after all calculations/checks are done the Tower is finally drawn.
      mutations.drawTower(state, canvas, state.tower1.blockX, state.tower1.blockY);
    }
  },
  //this mutation is called from canvas.vue
  redraw() {
    var canvas = document.getElementById('gameCanvas');

    var widthToHeight = 1.25;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    if (newWidth > 960) {
      newWidth = 960;
    }
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      canvas.style.height = newHeight + 'px';
      canvas.style.width = newWidth + 'px';
    } else {
      newHeight = newWidth / widthToHeight;
      canvas.style.width = newWidth + 'px';
      canvas.style.height = newHeight + 'px';
    }
    canvas.style.marginTop = (-newHeight / 2) + 'px';
    canvas.style.marginLeft = (-newWidth / 2) + 'px';
  },
  //Ask the User the question everytime the towerdrop animation is over.
  askQuestion(state) {
    var random = Math.floor(Math.random() * (state.max - state.min)) + state.min;
    mutations.drawQuestion(state, state.questions[random]);
    // var answer = prompt(state.questions[random], "Please enter a century e.g 13");
    //
    // if (answer == null || answer == "") {
    //   alert("User cancelled the prompt.");
    //   if (confirm('Would you like to quit the game?')) {
    //
    //     state.quit = true;
    //     //how do I stop the update function?
    //
    //   }
    //
    //
    // } else if (answer == state.answers[random]) {
    //
    //   alert("Correct!");
    //   state.tower1.towerSize = state.tower1.towerSize + 1;
    //   state.tower1.towerFloor = state.tower1.towerFloor - state.blockHeight;
    //   state.tower1.blockY = -40;
    //
    //
    // } else {
    //   alert("Incorrect!");
    //
    // }

  },
  keyDownHandler(state, e) {
    // state.keyPressed = true;
    //console.log(state.keyPressed);
    //space or enter
    state.key = e.keyCode;
  },
  drawTowerBlock(state, x, y) {
    state.ctx.drawImage(state.tower, x, y, state.blockHeight, state.blockWidth);
  },
  drawTower(state, canvas, x, y) {
    //the for loop moves top to bottom to set z index higher for towers that are closer to the bottom so that the bases of the tower above are behind the ramparts of the tower below(this looks better)
    mutations.drawTowerBlock(state, x, y);

    for (var c = state.tower1.towerSize - 1; c > 0; c--) {
      //draws Sprite by sprite away from canvas.height padding for sprite overlap
      mutations.drawTowerBlock(state, state.tower1.blockX, (canvas.height - c * state.blockHeight) + c * 10);
      //mutations.drawTowerBlock(state, state.tower2.blockX, (canvas.height - c * state.blockHeight) + c * 10);
    }
  },
  drawMenuMessage(state, canvas) {
    state.ctx.font = 'bold 16px Arial';
    state.ctx.fillStyle = "white";
    state.ctx.textAlign = "center";
    state.ctx.fillText("Welcome to Tower PvP, press space to start", canvas.width / 2, canvas.height / 2);
  },
  drawAnswer(state, symbol) {
    //console.log(symbol);
    state.ctx.font = 'bold 12px Arial';
    state.ctx.fillStyle = "black";
    state.ctx.textAlign = "center";
    state.ctx.fillText(symbol + "th Century", state.tower1.blockX + 20, state.tower2.towerFloor - state.blockHeight - 10);
  },
  drawQuestion(state, question) {
    console.log("Herro!");
    state.ctx.font = 'bold 16px Arial';
    state.ctx.fillStyle = "black";
    state.ctx.textAlign = "center";
    state.ctx.fillText(question, 250, 40);
  },
  setImages(state) {
    state.background.src = "http://www.mediafire.com/convkey/2130/n1912eho9c1i5b9zg.jpg"
    state.helmet.src = "http://www.mediafire.com/convkey/2c41/9ercbqpd6c0zl9dzg.jpg";
    state.player.src = "http://www.mediafire.com/convkey/a794/9vav1bjde66inhnzg.jpg"
    state.tower.src = "http://www.mediafire.com/convkey/0d9a/z393jjgxfiazjmrzg.jpg";
    state.menuBackground.src = "https://www.mediafire.com/convkey/dcc0/575j8nk4sawapifzg.jpg"
  },
  setSymbols(state) {
    state.symbols[48] = "0";
    state.symbols[49] = "1";
    state.symbols[50] = "2";
    state.symbols[51] = "3";
    state.symbols[52] = "4";
    state.symbols[53] = "5";
    state.symbols[54] = "6";
    state.symbols[55] = "7";
    state.symbols[56] = "8";
    state.symbols[57] = "9";
  },
  setQuestions(state) {
    state.questions[0] = "In what century was the first telephone invented"; // 1876
    state.questions[1] = "In what century was the first Islamic Caliphate founded";
    state.questions[2] = "In what century did Napoleon Bonoparte invade Russia";
    state.questions[3] = "In what century was the Irish War of Indepenance ";
    state.questions[4] = "In what century was the first Crusade"; //1096-99
    state.questions[5] = "In what century did the Mongol Invasions of Japan occur"; //1274-81
    state.questions[6] = "In what century did Alexander the Great begin his invasion of Persia"; //4th Century BC
  },
  setAnswers(state) {
    state.answers[0] = "19";
    state.answers[1] = "7";
    state.answers[2] = "19";
    state.answers[3] = "20";
    state.answers[4] = "11";
    state.answers[5] = "13";
    state.answers[6] = "4";
    state.answers[7] = "4";
  },
  initializeValues(state, canvas) {
    state.ctx = canvas.getContext("2d")
    state.tower1.blockX = 0.25 * canvas.width
    state.tower1.towerFloor = canvas.height
    state.tower2.towerFloor = canvas.height
    state.tower2.blockX = 0.75 * canvas.width - state.blockHeight,
      state.player1.x = canvas.height / 100
    state.player1.y = canvas.height - state.playerHeight
    state.player2.x = canvas.width - state.playerWidth - canvas.width / 100
    state.player2.y = canvas.height - state.playerHeight
  }
}

const actions = {}

const getters = {
  getFps: state => {
    return state.fps
  },
  getMusic: state => {
    return state.music
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
