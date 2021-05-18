import { GameLogic } from './../game-logic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameLogic]
})
export class GameComponent implements OnInit {

  constructor(public game : GameLogic) { }

  ngOnInit(): void {
  }

  startGame():void{
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');  //querySelector returns the first element that matches the given CSS selector
    information.innerHTML = currentPlayer; //updates <h1> to give player turn number
  }

  async clickSubfield(subfield: any) : Promise<void>{  //async -> reading proceeds to next line before finishing current task
    if(this.game.gameStatus === 1){
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);  //applies new color to given CSS class(current target)

      await this.game.checkGameEndWinner().then( (end: boolean) => {
        if(this.game.gameStatus === 0 && end){
          information.innerHTML = 'The winner is Player ' + this.game.currentTurn;
        }
      });

      await this.game.checkGameEndFull().then( (end: boolean) => {
        if(this.game.gameStatus === 0 && end){
          information.innerHTML = 'DRAW';
        }
      });

      this.game.changePlayer();  //changes player every time subfield is clicked

      if(this.game.gameStatus === 1){
        const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
        information.innerHTML = currentPlayer;
      }
    } 
  }
}