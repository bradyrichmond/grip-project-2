import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchMenuItems, fetchCategories, deleteMenuItem } from './actions';
import AddMenuItem from './components/AddMenuItem';

class Menu extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      filteredMenuItems: [],
      selectedFilter: 'appetizers',
      cartItems: [],
      cartIsOverflowing: false
    }

    this.scrollCart = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchMenuItems());
  }

  componentDidUpdate(prevProps){
    if(prevProps.menuItems !== this.props.menuItems){ 
      this.filterItems();
    }
 }

  addToCart = () => {
    let newCart = this.state.cartItems;
    newCart.push({title: "This is a cart Item", price:"8.95"});
    let cartIsOverflowing = this.checkCartOverflow();
    this.setState({
      cartItems: newCart,
      cartIsOverflowing,
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

  deleteItem = (id) => {
    this.props.dispatch(deleteMenuItem(id));
  }

  checkCartOverflow = () => {
    return this.scrollCart.current.scrollHeight > this.scrollCart.current.clientHeight;
  }

  filterItems = (e) => {
    let filterString = e ? e.target.title : this.state.selectedFilter;
    let filteredMenuItems = this.props.menuItems ? this.props.menuItems.filter((menuItem) => {
      if (menuItem.category) {
        console.log(menuItem.category, filterString)
        return menuItem.category.toLowerCase() === 'appetizer';
      } else {
        return false;
      }
    }) : [];

    this.setState({
      filteredMenuItems: this.props.menuItems,
      selectedFilter: filterString
    })
  }

  render() {
    return (
      <div className="menu-view-container">
        <div className="menu-container">
          {
            this.props.categories.length > 0 &&
            <div className="menu-category-button-container">
              {this.props.categories.map(category => <p key={category.id} className="menu-category-button" onClick={this.addToCart}>{category.text}</p>)}
            </div>
          }
          {
            this.state.filteredMenuItems.length > 0 &&
            this.state.filteredMenuItems.map((menuItem) => 
              <MenuItem title={menuItem.title} key={menuItem._id} userIsAdmin={this.props.isAdmin} delete={() => {
                this.deleteItem(menuItem._id);
              }}/>
            )
          }
          {
            this.state.filteredMenuItems.length < 1 &&
            <p>No Menu Items</p>
          }
          {this.props.isAdmin && <AddMenuItem />}

        </div>
        <div className="cart-container">
          <div className="cart-items-container-outer">
            <div className="cart-items-container-inner" ref={this.scrollCart}>
              {
              this.state.cartItems.length > 0 &&
                <div className="cart-items">
                  {this.state.cartItems.map((cartItem) => {
                    let title = cartItem.title || 'NoTitle';
                    return (<CartItem title={title} price={cartItem.price} />)
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
      Item: {props.title}
      {props.userIsAdmin && <span onClick={props.delete} className="delete-menu-item">x</span>}
    </div>);
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.grip.loggedIn,
    isAdmin: state.grip.isAdmin,
    menuItems: state.grip.menuItems,
    categories: state.grip.categories
  }
}

export default connect(mapStateToProps)(Menu);