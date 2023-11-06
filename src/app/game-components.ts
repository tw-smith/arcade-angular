import {randomIntRange} from "./game-utilities";

export class GameParameters {
  p1Score: number = 0;
  p2Score: number = 0;
  gameOverFlag: boolean = false;
  renderRate: number;
  rampSpeed: number;

  constructor(renderRate: number, rampSpeed: number) {
    this.renderRate = renderRate;
    this.rampSpeed = rampSpeed;
  }

  increase_p1_score(score_increase: number) {
    this.p1Score += score_increase;
  }

  increase_p2_score(score_increase: number) {
    this.p2Score += score_increase
  }

  increase_speed() {
    this.renderRate += this.rampSpeed
  }

  gameOver() {
    this.gameOverFlag = true;
  }

}


export class GameElement {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  fillColour: string;
  TILE_SIZE: number = 20;

  constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    colour: string,
  ) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.fillColour = colour
  }

  drawElement(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillColour;
    ctx.fillRect(
      this.x * this.TILE_SIZE,
      this.y * this.TILE_SIZE,
      this.sizeX,
      this.sizeY,
    )
  }
}

export class Food extends GameElement {
  constructor() {
    super(randomIntRange(2,28), randomIntRange(2,28), 10, 10, 'blue');
  }

  public refresh() {
    this.x = randomIntRange(2, 28);
    this.y = randomIntRange(2, 28)
  }
}

export class Snake {
  segments: GameElement[];
  nextX: number;
  nextY: number;
  direction: string = 'right';
  SNAKE_COLOUR: string;
  SNAKE_SIZE: number = 20;
  hasCollided: boolean = false;
  //game: GameParameters;

  constructor(role: string) {
    const HOST_STARTING_POSITIONS = [
      {x: 10, y: 10},
      {x: 9, y: 10},
      {x: 8, y: 10},
    ];

    const CLIENT_STARTING_POSITIONS = [
      {x: 10, y: 20},
      {x: 9, y: 20},
      {x: 8, y: 20},
    ];
    this.hasCollided = false;
    this.segments = [];
    this.nextX = 1;
    this.nextY = 0;
    this.SNAKE_COLOUR = 'green'

    if (role == 'host') {
      this.SNAKE_COLOUR = 'blue'
      HOST_STARTING_POSITIONS.forEach((bodySegment: any) => {
        console.log(bodySegment)
        this.addSegment(bodySegment)
      })
      console.log(`initial host snake... ${this.segments}`)
    }
    if (role == 'client') {
      this.SNAKE_COLOUR = 'white'
      CLIENT_STARTING_POSITIONS.forEach((bodySegment: any) => {
        console.log(bodySegment)
        this.addSegment(bodySegment)
      })
      console.log(`initial client snake... ${this.segments}`)
    }
  }

  addSegment(position: {x: number, y: number}, colour: string = this.SNAKE_COLOUR) {
  let newSegment = new GameElement(
    position.x,
    position.y,
    this.SNAKE_SIZE,
    this.SNAKE_SIZE,
    colour
    );
  this.segments.push(newSegment)
  }

  changeDirection(direction: string) {
    switch (direction) {
      case "up":
        if (this.nextY != 1) {
          this.nextX = 0;
          this.nextY = -1;
          break
        }
        break
      case "down":
        if (this.nextY != -1) {
          this.nextX = 0;
          this.nextY = 1;
          break
        }
        break
      case "left":
        if (this.nextX != 1) {
          this.nextX = -1;
          this.nextY = 0;
          break
        }
        break
      case "right":
        if (this.nextX != -1) {
          this.nextX = 1;
          this.nextY = 0;
          break
        }
        break
    }
  }

  move() {
    this.segments.pop();
    let newHeadPos = {
      x: this.segments[0].x + this.nextX,
      y: this.segments[0].y + this.nextY,
    };
    let hasCollided = this.snakeCollisionCheck(newHeadPos)
    // this.hasCollided = this.snakeCollisionCheck(newHeadPos)
    this.segments.unshift(
      new GameElement(
        newHeadPos.x,
        newHeadPos.y,
        this.SNAKE_SIZE,
        this.SNAKE_SIZE,
        this.SNAKE_COLOUR
      )
    )
   // console.log(this.segments)
    return hasCollided
  }

  private snakeCollisionCheck(newHeadPos: {x: number, y: number}) {
    // check if we've hit our own tail
    for (let i = 0; i < this.segments.length; i++) {
      if (newHeadPos.x == this.segments[i].x && newHeadPos.y == this.segments[i].y) {
        console.log('TAIL COLLIDE')
        return true
      }
    }

    // check if we've hit the edge of the board
    if (
      this.segments[0].x >= 30 ||
      this.segments[0].x <= 0 ||
      this.segments[0].y >= 30 ||
      this.segments[0].y <= 0
    ) {
      console.log('BOARD EXCEED')
      return true
    }
    return false
  }


}
