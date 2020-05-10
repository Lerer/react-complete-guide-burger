import React from 'react';

import classes from './Burger.module.css';
import BurgetIngridient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])]
                .map((_,i) => {
                    return <BurgetIngridient key={igKey + i} type={igKey} />
                });
        })
        .reduce((arr,el) => {
            return arr.concat(el);
        },[])
    console.log(transformedIngredients);
    if (transformedIngredients.length===0){
        transformedIngredients = <p>Please start adding ingridients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgetIngridient type="bread-top"/>
            {transformedIngredients}
            <BurgetIngridient type="bread-bottom"/>

        </div>
    );
};

export default burger;