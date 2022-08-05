import React from 'react';
import classes from './Input.css'
const input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementtype){
        case('input'):
            inputElement=<input  name={props.name} onChange={props.changed}  className={inputClasses.join(' ')} {...props.elementconfig} value={props.value}  />;
            break;
        case('textarea'):
            inputElement = <textarea name={props.name} onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementconfig} value={props.value} />;
            break;
        case('select'):
            inputElement = (
                    <select name={props.name} className={classes.InputElement} value={props.value} onChange={props.changed}>
                        {props.elementconfig.options.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
                    </select>
                );
            break;
        default:
            inputElement = <input {...props} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}
export default input;