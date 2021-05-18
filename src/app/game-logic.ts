import { Status } from "./gameStatus";

export class GameLogic {

    gameField: Array<number> = [];

    currentTurn: number;

    gameStatus: Status;

    winSituationsOne: Array<Array<number>> = [   //win situations for player 1
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0]
    ];

    winSituationsTwo: Array<Array<number>> = [  //win situations for player 2
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 2, 0, 0]
    ];

    public constructor(){
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn = this.randomPlayerStart();
        this.gameStatus = Status.STOP;
    }

    gameStart(): void{
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameStatus = Status.START;
        this.currentTurn = this.randomPlayerStart();
        console.log(this.currentTurn);
    }

    randomPlayerStart(): number{
        const startPlayer = Math.floor(Math.random() * 2) + 1; //get 1 or 2
        return startPlayer;
    }

    setField(position : number, value : number) : void{    //gets the clicked field to update its color in front end
        this.gameField[position] = value;
        console.log(this.gameField);
    }

    getPlayerColorClass() : String {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    changePlayer (): void{
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;  //changes player for front end
      }

      arrayEquals(a: Array<any>, b: Array<any> ): boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length == b.length && a.every((value, index) => value
        === b[index]);
      }

    async checkGameEndFull(): Promise<boolean>{
        let isFull = true;
        if(this.gameField.includes(0)){
            isFull = false;
        }
        if(isFull){
            console.log('Field is full!');
            this.gameEnd();
            return true;
        }
        else{
            return false;
        }
    }

    async checkGameEndWinner(): Promise<boolean>{
        let isWinner = false;

        const checkArray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;

        const currentArray = [];

        this.gameField.forEach( (subfield, index) => {
            if(subfield != this.currentTurn){
                currentArray[index] = 0;
            }
            else{
                
                currentArray[index] = subfield;
            }
        });

        checkArray.forEach((checkField, checkIndex) => {
            if(this.arrayEquals(checkField, currentArray)){
                isWinner = true;
            }
        });
        
        if(isWinner){
            console.log('Field is full!');
            this.gameEnd();
            return true;
        }
        else{
            return false;
        }
    }

    gameEnd(): void{
        this.gameStatus = Status.STOP;
    }
}
