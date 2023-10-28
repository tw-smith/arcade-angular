import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { OnInit } from "@angular/core";
import { Snake, Food, GameParameters } from "../game-components";
import {Socket} from "ngx-socket-io";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})

export class GameScreenComponent implements OnInit{
  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D
  food: Food = new Food()
  game: GameParameters = new GameParameters(3, 1)
  player_role: number = 0



  home_snake!: Snake
  away_snake!: Snake

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  lobbyPublicId: string | null = ''

  @HostListener('document:keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'a':
        this.home_snake.changeDirection('left')
        break
      case 'w':
        this.home_snake.changeDirection('up')
        break
      case 'd':
        this.home_snake.changeDirection('right')
        break
      case 's':
        this.home_snake.changeDirection('down')
        break
    }
  }

  ngOnInit() {
    this.game.gameOverFlag = false;
    console.log(this.game.gameOverFlag)
    this.canvas.nativeElement.width = 600;
    this.canvas.nativeElement.height = 600;
    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D


    this.lobbyPublicId = this.route.snapshot.paramMap.get('public_id')
    this.socket.ioSocket.io.opts.auth = {'token': window.sessionStorage.getItem('access_token')}
    this.socket.ioSocket.io.opts.extraHeaders = {'token': window.sessionStorage.getItem('access_token'),
                                                 'lobby_id': this.lobbyPublicId}
    console.log(this.socket.ioSocket.io.opts)
    this.socket.connect()

    // Set snakes
    this.socket.on('set_p1', () => {
      console.log('set_p1')
      this.player_role = 1
      this.home_snake = new Snake('host', this.game)
      this.away_snake = new Snake('client', this.game)
      this.socket.emit('set_initial_food', {x: this.food.x, y: this.food.y})

      this.sendSnakeUpdates()
      this.renderCanvas()
      this.animateCanvas()


    })

    this.socket.on('set_p2', () => {
      console.log('set_p2')
      this.player_role = 2
      this.home_snake = new Snake('client', this.game)
      this.away_snake = new Snake('host', this.game)
      this.socket.on('set_initial_food', (data: {x: number, y: number}) => {
        this.food.x = data.x
        this.food.y = data.y

        this.sendSnakeUpdates()
        this.renderCanvas()
        this.animateCanvas()
      })
    })



    this.socket.on('new_snake_parameters', (data: any) => {
      this.away_snake.segments = [];
      for (let i=0; i<data.away_snake.length; i++) {
        this.away_snake.addSegment({
          x: data.away_snake[i].x,
          y: data.away_snake[i].y,
          colour: data.away_snake[i].fillColour,
        })
      }
    })

    this.socket.on('new_food_parameters', (data: {x: number, y: number}) => {
      this.food.x = data.x
      this.food.y = data.y
    })

    this.socket.on('new_game_parameters', (data: {p1score: number, p2score: number, gameOver: boolean}) => {
      this.game.p1Score = data.p1score
      this.game.p2Score = data.p2score
      this.game.gameOverFlag = data.gameOver
    })

    // this.sendGameUpdates()
    //
    // this.renderCanvas()
    // this.animateCanvas()

  }

  sendSnakeUpdates() {
    const gameUpdateLoop = setInterval(() => {
      const packet = {
        'away_snake': this.home_snake.segments
      }
      this.socket.emit('snake_update', packet)
      if (this.game.gameOverFlag) {
        this.sendGameParamsUpdate()
        clearInterval(gameUpdateLoop)
      }
    }, 50)
  }

  sendFoodUpdate(x: number, y: number) {
    const packet = {
      x: x,
      y: y
    }
    this.socket.emit('food_update', packet)
  }

  sendGameParamsUpdate() {
    const packet = {
      p1score: this.game.p1Score,
      p2score: this.game.p2Score,
      gameOver: this.game.gameOverFlag
    }
    this.socket.emit('game_params_update', packet)
  }






  animateCanvas() {
    const i = setInterval(() => {
    this.home_snake.move()
    this.checkFoodCollision()
    this.renderCanvas()
      if (this.game.gameOverFlag) {
        this.sendGameParamsUpdate()
        clearInterval(i)
      }
  }, 200)
  }


  renderCanvas() {
    this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.food.drawElement(this.ctx)
    for (let i=0; i<this.home_snake.segments.length; i++) {
      this.home_snake.segments[i].drawElement(this.ctx)
    }

    for (let i=0; i<this.away_snake.segments.length; i++) {
      this.away_snake.segments[i].drawElement(this.ctx)
    }
  }

  checkFoodCollision() {
    if (this.home_snake.segments[0].x == this.food.x && this.home_snake.segments[0].y == this.food.y) {
      this.food.refresh();
      this.home_snake.addSegment({
        x: this.home_snake.segments[this.home_snake.segments.length-1].x,
        y: this.home_snake.segments[this.home_snake.segments.length-1].y,
      })
      if (this.player_role == 1) {
        this.game.increase_p1_score(1)
      }
      if (this.player_role == 2) {
        this.game.increase_p2_score(1)
      }
      this.sendFoodUpdate(this.food.x, this.food.y)
      this.sendGameParamsUpdate()
    }
  }

  leaveGame() {
    this.socket.disconnect()
    this.router.navigateByUrl("/lobbies")
  }

}
