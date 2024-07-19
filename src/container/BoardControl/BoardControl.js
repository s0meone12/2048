import React, { Component,Fragment } from 'react';
import Board from '../../component/Board/Board'
import Scoreboard from '../../component/scoreboard/scoreboard';
import emptyBoard from '../../utility/emptyboard';

class BoardControl extends Component {
	constructor(props){
		super(props);
		this.state = {
			Board:this.addNumber(emptyBoard()),
			score:0,
			best:0,
		}
	}
	// funtion to added 2/4 randomly on the board
	addNumber=(board)=>{
		let option=[];
		for(let i =0;i<4;i++){
			for(let k=0;k<4;k++){
				if(board[i][k]===0)
				option.push({x:i,y:k})	;
			}
		}
		const pick = option[Math.floor(Math.random()*option.length)];
		const newNumber = Math.random()>0.5?2:4;
		board[pick.x][pick.y]=newNumber;
		return board;
				
	}
	//function to check whether there is change in the board or not 
	check(oldBoard,newBoard){
		for(let i =0;i<4;i++){
			for(let k =0;k<4;k++){
				if(oldBoard[i][k]!==newBoard[i][k])
				return true;
			}
		}
		return false;
	}
	//function to move cell to right or left
	slide=(direction,board)=>{
		let newBoard=board;
		let newScore = this.state.score;
		newBoard=newBoard.map((row)=>{
			let newRow= row.filter((val)=>val);
			if(direction==='right')
			{
				// this combine the adj cell if equal
				for(let i =newRow.length;i>0;i--){
					if(newRow[i]===newRow[i-1])
					{
						newRow[i]=newRow[i]+newRow[i-1];
						newScore+=newRow[i];
						newRow[i-1]=0;
					}
				}
				//this removes the unwanted cell after merging
				newRow=newRow.filter((val)=>val);
				newRow.unshift(...Array(4-newRow.length).fill(0));
			}
			else
			{
				// this combine the adj cell if equal
				for(let i =0;i<newRow.length-1;i++){
					if(newRow[i]===newRow[i+1])
					{
						newRow[i]=newRow[i]+newRow[i+1];
						newScore+=newRow[i];
						newRow[i+1]=0;
					}
				}
				// this remove the extra cell after merging equal cell
				newRow=newRow.filter((val)=>val);
				newRow.push(...Array(4-newRow.length).fill(0));
			}
			return newRow;
		})
		// if nothing is moved in the board then new number will not be 
		// added
		if(this.check(board,newBoard))
		newBoard=this.addNumber(newBoard);
		return [newBoard,newScore];
	}
	//transpose of Board
	transpose=(board)=>{
		let newBoard=emptyBoard();
		for(let i =0;i<4;i++){
			for(let k =0;k<4;k++){
				newBoard[i][k]=board[k][i];
			}
		}
		return newBoard;
	}
	componentDidMount(){
		this.setState({Board:this.addNumber(this.state.Board)});
		window.addEventListener('keydown',this.keyDownHandler);
	}
	componentWillUnmount(){
		window.removeEventListener('keydown',this.keyDownHandler);
	}
	
	newGameHandler = ()=>{
		this.setState({Board:this.addNumber(this.addNumber(emptyBoard())),score:0})
	}
	keyDownHandler=(event)=>{
		let newBoard,newScore;
		if(event.keyCode===39)
		{
			[newBoard,newScore]=this.slide('right',this.state.Board)
		}
		else if (event.keyCode===37)
		{
			[newBoard,newScore]=this.slide('left',this.state.Board)
			
		}
		else if (event.keyCode===38)
		{
			// to move up every thing 
			// 1.transpose mat
			// 2. move everything left 
			// 3. transpose again
			newBoard = this.transpose(this.state.Board)	;
			[newBoard,newScore]=this.slide('left',newBoard);
			newBoard = this.transpose(newBoard)
		}
		else{
			// similar to up but the direction will be right
			newBoard = this.transpose(this.state.Board)	;
			[newBoard,newScore]=this.slide('right',newBoard);
			newBoard = this.transpose(newBoard)
		}
		this.setState({Board:newBoard,best:(newScore>this.state.best?newScore:this.state.best),score:newScore})	
		
		
	}
	render() { 
		return (
	<Fragment> 
	        <h1>2048</h1>
		<Scoreboard score={this.state.score}
		 best={this.state.best}
		  clicked={this.newGameHandler} 
		  />
		<Board board={this.state.Board} 
		/>
    	</Fragment> 
    );
	}
}
 
export default BoardControl;