import React from 'react';
import classes from './scoreboard.module.css'
const scoreboard = (props) => {
	return ( 
		<center className={classes.Scoreboard}>
			<span>Score: {props.score}</span>
			<span>Best: {props.best}</span>
			<div onClick={props.clicked}>New Game</div>
		</center>
	 );
}
 
export default scoreboard;