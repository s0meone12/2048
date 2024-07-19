import React from 'react';
import Cell from './cell/cell';
import classes from './board.module.css'
import _uniqueId from 'lodash/uniqueId';

const board = (props) =>{
	return(

	<div className={classes.Board} >
		{
			props.board.map((row)=>{
				return row.map((value)=>
					<Cell val={value} key={_uniqueId('cell_')} />
				)
			})
		}
		
	</div>
)}; 

export default board;