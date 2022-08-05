import React from 'react';
import classes from './order.css'
const order = props => {
    let ingredients =[];
    for (let ingreName in props.ingredients){
        ingredients.push({name:ingreName,amount:props.ingredients[ingreName]});
    }
    let ingreOutPut = ingredients.map(ig => <span 
                                                style={{display:'inline-block',margin:'0 8px',textTransform:'capitalize',border:'1px solid #ccc',padding:'5px',background:'#eee'}} 
                                                key={ig.name}> {ig.name} ({ig.amount}) </span>)
return (
    <div className={classes.Order}>
        <p>Ingredient: {ingreOutPut}</p>
        <p>Price:<strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
);}
export default order;