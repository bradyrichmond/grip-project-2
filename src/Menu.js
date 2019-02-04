import React, { Component } from 'react';
import axios from 'axios';

class Menu extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      categories: [],
      menuItems: [],
      cartItems: [],
      cartIsOverflowing: false
    }

    this.scrollCart = React.createRef();
  }

  componentDidMount() {
    axios.get('/api/categories').then((response) => {
      let categories = response.data.map(category => {
          return {
            text: category.text,
            id: category._id
          };
      });
      categories = categories.filter(category => !!category.text)
      this.setState({categories});
    });

    axios.get('/api/menuitems').then((response) => {
      this.setState({
        menuItems: response.data
      });
    })
  }

  addToCart = () => {
    let newCart = this.state.cartItems;
    newCart.push({title: "This is a cart Item", price:"8.95"});
    let cartIsOverflowing = this.checkCartOverflow();
    this.setState({
      cartItems: newCart,
      cartIsOverflowing
    });
  }

  subTotalReducer = (total, next) => {
    return total + next;
  }

  calculateSubTotal = () => {
    let priceList = this.state.cartItems.map((cartItem) => {
      return parseFloat(cartItem.price);
    });
    return priceList.reduce(this.subTotalReducer).toFixed(2);
  }

  checkCartOverflow = () => {
    return this.scrollCart.current.scrollHeight > this.scrollCart.current.clientHeight;
  }

  render() {
    return (
      <div className="menu-view-container">
        <div className="menu-container">
          {
            this.state.categories.length > 0 &&
            <div className="menu-category-button-container">
              {this.state.categories.map(category => <p key={category.id} className="menu-category-button" onClick={this.addToCart}>{category.text}</p>)}
            </div>
          }
          {
            this.state.menuItems.length > 0 &&
            this.state.menuItems.map((menuItem) => 
              <MenuItem title={menuItem.title} key={menuItem._id} />
            )
          }
        </div>
        <div className="cart-container">
          <div className="cart-items-container-outer">
            <div className="cart-items-container-inner" ref={this.scrollCart}>
              {
              this.state.cartItems.length > 0 &&
                <div className="cart-items">
                  {this.state.cartItems.map((cartItem) => {
                    return (<CartItem title={cartItem.title} price={cartItem.price} />)
                  })}
                </div>
              }
            </div>
          </div>
          {
            this.state.cartIsOverflowing &&
            <div className="more-items">Scroll for more Items</div>
          }
          <div className="sub-total">
            Sub-Total: ${this.state.cartItems.length > 0 ? this.calculateSubTotal() : 0.00}
          </div>
        </div>
      </div>
    );
  }
}

const CartItem = (props) => {
  return (
    <div className="cart-item">
      <p className="title">{props.title}</p>
      <p className="price">${props.price}</p>
    </div>);
}

const MenuItem = (props) => {
  return (
    <div className="menu-item">
      {props.title}
    </div>);
}

export default Menu;