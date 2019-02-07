import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import { postMenuItem } from '../actions';

class AddMenuItem extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            title: '',
            description: '',
            price: '',
            category: 'appetizer',
            spiceLevel: 0,
            bottle: false,
            addOn: false,
            toGo: false
        }
    }

    handleChange = (name) => event => {
        this.setState({ [name]: event.target.value });
    };

    handleToggle = (name) => event => {
        this.setState({ [name]: event.target.checked });
    };

    addMenuItem = () => {
        var newMenuItem = {};
        newMenuItem.title = this.state.title;
        newMenuItem.description = this.state.description;
        newMenuItem.price = this.state.price;
        newMenuItem.category = this.state.category;
        newMenuItem.spiceLevel = this.state.spiceLevel;
        newMenuItem.bottle = this.state.bottle;
        newMenuItem.addOn = this.state.addOn;
        newMenuItem.toGo = this.state.toGo;
        
        this.props.dispatch(postMenuItem(newMenuItem));
    }

    render() {
        return (
        <div className="addMenuItemContainer">
            <TextField
                required
                id="menu-item-title"
                label="Title"
                // className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
            /><br />
            <TextField
                required
                id="menu-item-description"
                label="Description"
                // className={classes.textField}
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
            /><br />
            <TextField
                required
                id="menu-item-price"
                label="Price"
                // className={classes.textField}
                value={this.state.price}
                onChange={this.handleChange('price')}
                margin="normal"
            /><br />
            <FormControl required>
                <Select
                    value={this.state.category}
                    onChange={this.handleChange('category')}
                    inputProps={{
                        name: 'category',
                        id: 'menu-item-category',
                    }}
                >
                    <MenuItem value="" disabled>
                        None
                    </MenuItem>
                    {
                        this.props.categories.length > 0 &&
                        this.props.categories.map((category) => {
                            return (<MenuItem value={category.text}>{category.text.toUpperCase()}</MenuItem>);
                        })
                    }
                </Select>
                <FormHelperText>Category</FormHelperText>
            </FormControl><br />
            <FormControl required>
                <Select
                    value={this.state.spiceLevel}
                    onChange={this.handleChange('spiceLevel')}
                    inputProps={{
                        name: 'spiceLevel',
                        id: 'menu-item-spiceLevel',
                    }}
                >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                </Select>
                <FormHelperText>Spice Level</FormHelperText><br />
            </FormControl><br />
            <FormControlLabel
                control={
                    <Switch
                    checked={this.state.bottle}
                    onChange={this.handleToggle('bottle')}
                    value="bottle"
                    />
                }
                label="Bottle?"
            /><br />
            <FormControlLabel
                control={
                    <Switch
                    checked={this.state.addOn}
                    onChange={this.handleToggle('addOn')}
                    value="addOn"
                    />
                }
                label="Add On?"
            /><br />
            <FormControlLabel
                control={
                    <Switch
                    checked={this.state.toGo}
                    onChange={this.handleToggle('toGo')}
                    value="toGo"
                    />
                }
                label="To Go?"
            /><br />
             <Button variant="outlined" onClick={this.addMenuItem}>
                Add Menu Item
            </Button>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.grip.menuItems,
        categories: state.grip.categories
    }
}

export default connect(mapStateToProps)(AddMenuItem);