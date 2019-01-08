import React, { Component } from 'react';
import axios from 'axios';

class AddMenuItem extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            categories: [],
            title: '',
            description: '',
            price: '',
            spcieLevel: 0,
            bottle: false,
            addOn: false,
            menuItems: []
        }
    }

    getCategories = () => {
        axios.get('/api/categories')
        .then(
            (resp) => {
                this.setState({categories: resp.data});
                console.log('get success', resp)
            }
        )
        .catch(
            (rej) => {
                console.log('get error', rej)
            }
        )
    }

    getMenuItems = () => {
        axios.get('/api/menuitems')
        .then(
            (resp) => {
                this.setState({menuItems: resp.data});
                console.log('get success', resp)
            }
        )
        .catch(
            (rej) => {
                console.log('get error', rej)
            }
        )
    }

    componentDidMount = () => {
        this.getCategories();
        this.getMenuItems();
    }

    updateTitle = (e) => {
        this.setState({title: e.target.value});
    }

    updateDescription = (e) => {
        this.setState({description: e.target.value});
    }

    updatePrice = (e) => {
        this.setState({price: e.target.value});
    }

    addMenuItem = () => {
        var newMenuItem = {};
        newMenuItem.title = this.state.title;
        newMenuItem.description = this.state.description;
        newMenuItem.price = this.state.price;
        newMenuItem.category = "Appetizer";
        newMenuItem.spiceLevel = 0;
        newMenuItem.bottle = false;
        newMenuItem.addOn = false;

        console.log(JSON.stringify(newMenuItem));

        axios.post('/api/menuitems', newMenuItem)
        .then(
            (resp) => {
                this.getMenuItems();
                console.log('post success', resp);
            })
        .catch(
            (rej) => {
                console.log('post error', rej)
            });
    }

    render() {
        return (
        <div className="addMenuItemContainer">
            Title: <input type="text" value={this.state.title} onChange={this.updateTitle} /><br />
            Description: <input type="text" value={this.state.description} onChange={this.updateDescription} /><br />
            Price: <input type="text" value={this.state.price} onChange={this.updatePrice} /><br />
            <input type="button" value="Add menu Item" onClick={this.addMenuItem}/>
            {
                this.state.menuItems.length > 0 &&
                this.state.menuItems.map(menuItem => {
                    return (<p key={menuItem._id}>{menuItem.title}</p>)
                })
            }
        </div>
        );
    }
}

export default AddMenuItem;

// var MenuItemsSchema = new Schema({
//     title: String,
//     description: String,
//     price: String,
//     spiceLevel: Number,
//     bottle: Boolean,
//     addOn: Boolean
// });