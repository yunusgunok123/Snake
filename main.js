const width = 500;
const height = 500;

const scale = 10;
const fr = 5;

const snake = new Snake();
const food = new Food();

function setup(){
    createCanvas(width, height);
    frameRate(fr);
}

function draw(){
    background(0);

    snake.update();
    snake.show();
    snake.check();

    food.show();
    food.check();
}

function keyPressed(){
    const dy = keyCode == 87 ? -1 
        : keyCode == 83 ? 1
        : 0;
    const dx = keyCode == 68 ? 1
        : keyCode == 65 ? -1
        : 0;

    dx == 0 && dy == 0 ? null : snake.dir = [dx, dy];
}

function Snake(){
    this.x = 100;
    this.y = 100;
    this.len = 2;
    this.pos = [];

    this.dir = [1, 0];

    this.show = () => {
        noStroke();
        fill(255);
        this.pos.forEach(n => rect(n[0], n[1], scale, scale))
    }

    this.update = () => {
        this.x += this.dir[0] * scale;
        this.y += this.dir[1] * scale;

        this.pos.unshift([this.x, this.y]);
        this.pos.length > this.len ? this.pos.pop() : null;
    }

    this.check = () => {
        let crashed = false;
        this.pos.forEach((n, i) => i != 0 && n[0] == this.x && n[1] == this.y ? crashed = true : null)
        crashed ? this.dir = [0, 0] : null;
    }
}

function Food(){
    this.x = 0;
    this.y = 0;

    this.show = () => {
        noStroke();
        fill(255, 0, 0);
        rect(this.x, this.y, scale, scale)
    }

    this.teleport = () => {
        this.x = Math.floor(Math.random() * width / 10) * 10;
        this.y = Math.floor(Math.random() * height / 10) * 10;
    }

    this.check = () => this.x == snake.x && this.y == snake.y ? (snake.len++, this.teleport()) : null;

    this.teleport();
}