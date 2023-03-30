const canvas = document.querySelector("#stage")
const ctx = canvas.getContext("2d")
const width = canvas.width
const height = canvas.height

const length = 25

let score = 0
let speed = 3
let direction = null

let x_snake = width / 2
let y_snake = height / 2

let x_apple = Math.floor(Math.random() * (width - length))
let y_apple = Math.floor(Math.random() * (height - length))

function reset() {
    score = 0
    speed = 3
    direction = null
    x_snake = width / 2
    y_snake = height / 2
}

function drawScreen() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height)
}

function drawSnake() {
    ctx.fillStyle = "green"
    ctx.fillRect(x_snake, y_snake, length, length)
}

function move() {
    if (direction === "up") y_snake -= speed
    if (direction === "down") y_snake += speed
    if (direction === "left") x_snake -= speed
    if (direction === "right") x_snake += speed
}

function drawApple() {
    ctx.fillStyle = "red"
    ctx.fillRect(x_apple, y_apple, length, length)
}

function collision() {
    if (x_apple <= x_snake + length && x_apple + length >= x_snake && y_apple + length >= y_snake && y_apple <= y_snake + length) {
        x_apple = Math.floor(Math.random() * (width - length))
        y_apple = Math.floor(Math.random() * (height - length))
        score++
        speed += 0.5
    }

    if (x_snake + length > width) reset()
    if (x_snake < 0) reset()
    if (y_snake < 0) reset()
    if (y_snake + length > height) reset()
}

function textFormater() {
    ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "right"
    ctx.fillText(`SCORE : ${score}`, width - 30, 40)
}

//definir direção
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== "down") direction = "up"
    if (event.key === 'ArrowDown' && direction !== "up") direction = "down"
    if (event.key === 'ArrowLeft' && direction !== "right") direction = "left"
    if (event.key === 'ArrowRight' && direction !== "left") direction = "right"
})

function game() {

    //desenhar tela
    drawScreen()

    //desenhar cobra
    drawSnake()

    //mover cobra
    move()

    //desenhar maçã
    drawApple()

    //verificar colisão
    collision()

    //formatar texto
    textFormater()

}

setInterval(game, 1000 / 60)