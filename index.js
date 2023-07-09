// Game Constants & Variables

const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
// Game Constants & Variables
var lastPaintTime = 0;
const EXPENTION_AMOUNT = 1;
     let SNAKE_SPEED = 2;
     
     let inputDirection = {
        x: 0,
        y: 0
     }
     let lastInputDirection = inputDirection;
     let gameOver = false;
     
     
     var score = 0;
     const snakeBody = [{
           x: 8,
           y: 8
        },
     ];
     //let food = getFoodrandomPosition();
     let food = {x:14, y:13}
     const gameBoard = document.querySelector(".game-board");
     const scoreBox = document.getElementById("score");
     
     function paint(currentTime) {

        var TimeSeconds = (currentTime - lastPaintTime) / 1000;
        requestAnimationFrame(paint);
        if (TimeSeconds < 1 / SNAKE_SPEED) return;
        lastPaintTime = currentTime;
     
        if (gameOver != true) {
          update();
           draw();
        }
     }
    
     
     window.requestAnimationFrame(paint);
     
     function draw() {
        drawSnake();
        drawFood();
     }
     
     function update() {
        gameBoard.innerHTML = "";
       snakeMove();
        snakeEatFood();
     }
     
     function drawSnake() {
      snakeBody.forEach((segment, index) => {
         var snakeElement = document.createElement("div");
         snakeElement.style.gridColumnStart = segment.x;
         snakeElement.style.gridRowStart = segment.y;
         // snakeElement.innerHTML = index;
         snakeElement.style.transform = "rotate(0deg)";
         if (index == 0) {
            snakeElement.classList.add("head");
   
            if (inputDirection.x == 1) {
               snakeElement.style.transform = "rotate(-90deg)";
            } else if (inputDirection.x == -1) {
               snakeElement.style.transform = "rotate(90deg)";
            } else if (inputDirection.y == -1) {
               snakeElement.style.transform = "rotate(180deg)";
            } else if (inputDirection.y == 1) {
               snakeElement.style.transform = "rotate(0deg)";
            }
         } else {
            snakeElement.classList.add("snake");
         }
         gameBoard.appendChild(snakeElement);
   
      });
   }
     function drawFood() {
      var foodElement = document.createElement("div");
      foodElement.style.gridColumnStart = food.x;
      foodElement.style.gridRowStart = food.y;
      foodElement.classList.add("food");
      gameBoard.appendChild(foodElement);
      
   }
   
   musicSound.play();



   function snakeMove() {
      inputDirection = getInputDirection();
   
      for (i = snakeBody.length - 2; i >= 0; i--) {
         snakeBody[i + 1] = {
            ...snakeBody[i] 
         }
      }
      snakeBody[0].x += inputDirection.x;
      snakeBody[0].y += inputDirection.y;
      checkGameOver();
   }




   function getInputDirection(){
      window.addEventListener("keydown",e =>{
         moveSound.play()
         switch(e.key){
            case  "ArrowUp" :
               if(lastInputDirection.y ==1) break;
               inputDirection = {
                  x : 0 ,
                  y : -1
               }
               break;
               case  "ArrowDown" :
                  if(lastInputDirection.y == -1) break;
               inputDirection = {
                  x : 0 ,
                  y : 1
               }
               break ;
               case  "ArrowRight" :
                  if(lastInputDirection.x == -1) break;
               inputDirection = {
                  x : 1 ,
                  y : 0
               }
               break;
               case  "ArrowLeft" :
                  if(lastInputDirection.x ==1) break;
               inputDirection = {
                  x : -1 ,
                  y : 0
               }
               break;
               default :
               inputDirection = {
                  x : 0 ,
                  y : 0
               }
         }
      })
      lastInputDirection = inputDirection
      return inputDirection;


   }
   function snakeEatFood() {
      if (isEat()) {
         score += 10;
         scoreBox.innerHTML = score;
         console.log("eated")
         food = getFoodrandomPosition();
         SNAKE_SPEED++;
         foodSound.play()
         expendSnake();
      }
   }
   function isEat() {
return snakeBody[0].x === food.x && snakeBody[0].y === food.y ;


   }
 
    function getFoodrandomPosition() {

      let a, b, myCondition = true;
      while (myCondition) {
         a = Math.ceil(Math.random() * 16);
         b = Math.ceil(Math.random() * 16);
   
         myCondition = snakeBody.some(segment => {
            return segment.x === a && segment.y === b;
         })
      }
      return {
         x: a,
         y: b
      };
   }
    



    
    function expendSnake (){
      for (i = 0 ; i< EXPENTION_AMOUNT ; i++){
         snakeBody.push(snakeBody[snakeBody.length-1])

      }
    }
    // alternate code 
// function expendSnake() {
//    for (let i = 0; i < EXPENTION_AMOUNT; i++) {
//       const lastSegment = snakeBody[snakeBody.length - 1];
//       snakeBody.push({ x: lastSegment.x, y: lastSegment.y });
//    }
// }

function checkGameOver() {
   if (snakeOutOfGrid() || snakeIntersection()) {
      musicSound.pause()
      gameOverSound.play()
      alert("Game Over : bye bye xd");
      musicSound.play()
      gameOver = true;
      location.reload();
   }
}

function snakeOutOfGrid() {
   return snakeBody[0].x < 0 || snakeBody[0].x > 16 || snakeBody[0].y < 0 || snakeBody[0].y > 16;
}

function snakeIntersection() {
   for (i = 1; i < snakeBody.length; i++) {
      if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
         return true;
      }
   }
} 
