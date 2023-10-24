import {Component, ElementRef, ViewChild} from '@angular/core';
import { OnInit } from "@angular/core";
import { Snake, Food, GameParameters } from "../game-components";

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit{
  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D


  //ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
  food: Food = new Food()
  game: GameParameters = new GameParameters(3, 1)
  snake1: Snake = new Snake('host', this.game)



  ngOnInit() {
    this.canvas.nativeElement.width = 600;
    this.canvas.nativeElement.height = 600;
    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D
    this.renderCanvas()
    this.animateCanvas()
  }

  animateCanvas() {
      const i = setInterval(() => {
      this.snake1.move()
      this.renderCanvas()
        if (this.game.gameOverFlag) {
          clearInterval(i)
        }
    }, 200)
  }


  renderCanvas() {
    this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.food.drawElement(this.ctx)
    for (let i=0; i<this.snake1.segments.length; i++) {
      this.snake1.segments[i].drawElement(this.ctx)
    }
  }


}
