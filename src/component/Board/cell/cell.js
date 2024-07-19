import React from 'react';
import classes from './cell.module.css'
const cell  = (props) => {
	let background=['rgba(255,255,255,0.3)','#9600ff','#f0145a','#ffc91b',
	'#0ed145','#0095d6','#ce007b','#ff5518','#29d7a5','#b83dba','#ff0024'
	,'#5f069b'];
	return ( 
		<div className={classes.Cell} 
		style={{backgroundColor: background[props.val?Math.log2(props.val):props.val]}}>
			{props.val}</div>
	);
}
 
export default cell ;