import React, {Component} from 'react';

import Aux from '../../hoc/Auxilery';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
            
    //     }
    // }

    state = {
       ingredients: {
           salad: 0,
           bacon: 0,
           cheese: 0,
           meat: 0
       },
       totalPrice: 4,
       purchaseable: false
    }

    updatePurchaseState  (ingredients) {
        //const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];    
            })
            .reduce((sum,el) => {return sum+el},0);
        this.setState({purchaseable: (sum>0)});
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngridients = {...this.state.ingredients};
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({ingredients: updatedIngridients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngridients);
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount>0) {
            const updatedCount = oldCount-1;
            const updatedIngridients = {...this.state.ingredients};
            updatedIngridients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice - priceDeduction;
            this.setState({ingredients: updatedIngridients,totalPrice:newPrice});
            this.updatePurchaseState(updatedIngridients);
        }
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key]= (disabledInfo[key]<=0);
        }
        return (
            <Aux>
                <Modal />
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngridientHandler}
                    ingredientRemoved={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;