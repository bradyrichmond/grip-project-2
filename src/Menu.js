import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMenuItems, fetchCategories, deleteMenuItem, postCategory, deleteCategory } from './actions';
import AddMenuItem from './components/AddMenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';

class Menu extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      filteredMenuItems: [],
      selectedFilter: 'appetizers',
      cartItems: [],
      cartIsOverflowing: false,
      categoryTitle: '',
      isAddingCategory: false,
      isAddingMenuItem: false
    }

    this.scrollCart = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchMenuItems());
  }

  componentDidUpdate(prevProps){
    if(prevProps.menuItems !== this.props.menuItems){
      console.log(this.props.menuItems);
      this.filterItems();
    }
  }

  handleChange = (name) => event => {
    this.setState({ [name]: event.target.value });
  };

  addToCart = (menuItem) => {
    let newCart = this.state.cartItems;
    newCart.push({title: menuItem.title, price: menuItem.price});
    let cartIsOverflowing = this.checkCartOverflow();
    this.setState({
      cartItems: newCart,
      cartIsOverflowing,
    });
  }

  removeItemFromCart = (index) => {
    let newCart = this.state.cartItems;
    newCart.splice(index, 1);
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

  deleteCategory = (id) => {
    this.props.dispatch(deleteCategory(id))
  }

  checkCartOverflow = () => {
    return this.scrollCart.current.scrollHeight > this.scrollCart.current.clientHeight;
  }

  filterItems = (category="appetizers") => {
    let filteredMenuItems = this.props.menuItems.filter((menuItem) => {
      if (menuItem.category) {
        return menuItem.category.toLowerCase() === category.toLowerCase();
      } else {
        return false;
      }
    });

    this.setState({
      filteredMenuItems,
      selectedFilter: category
    });
  }

  createCategory = () => {
    let newCategory = {}
    newCategory.text = this.state.categoryTitle;
    this.props.dispatch(postCategory(newCategory));
    this.setState({
      categoryTitle: '',
      isAddingCategory: false
    })
  }

  render() {
    return (
      <div className="menu-view-container">
        <div className="menu-container">
          {
            this.props.categories.length > 0 &&
            <div className="menu-category-button-container">
              {this.props.categories.map(category => 
                {
                  return (
                    <div className="menu-category-button">
                      <Button key={category._id}  variant="outlined" onClick={() => {
                        this.filterItems(category.text)
                        }}>
                        {category.text}
                      </Button>
                      {this.props.isAdmin &&
                          <React.Fragment className="menu-category-admin">
                            <DeleteIcon onClick={() => {
                              this.deleteCategory(category._id);
                            }}/>
                            <Icon>edit_icon</Icon>
                          </React.Fragment>
                        }
                    </div>
                  )
                }
              )}
              {
                this.props.isAdmin &&
                <div className="menu-category-button">
                  <AddButton 
                  isAdding={this.state.isAddingCategory} 
                  open={() => {
                    this.setState({
                      isAddingCategory: true
                    });
                  }}
                  close={() => {
                    this.setState({
                      isAddingCategory: false
                    })
                  }}
                  >
                    <AddOrEditCategory title={this.state.categoryTitle} onChange={this.handleChange('categoryTitle')} buttonLabel="Add Category" submit={this.createCategory}/>
                  </AddButton>
                </div>
              }
            </div>
          }
          {
            this.state.filteredMenuItems.length > 0 &&
            this.state.filteredMenuItems.map((menuItem) => 
              <MenuItem 
                title={menuItem.title}
                description={menuItem.description}
                price={menuItem.price}
                userIsAdmin={this.props.isAdmin}
                toGo={menuItem.toGo}
                key={menuItem._id} 
                delete={() => {
                  this.deleteItem(menuItem._id);
                }}
                addItemToCart = {() => {
                  this.addToCart(menuItem);
                }}
              />
            )
          }
          {
            this.state.filteredMenuItems.length < 1 &&
            <p>No Menu Items</p>
          }
          {this.props.isAdmin && 
            <AddButton isAdding={this.state.isAddingMenuItem} 
            open={() => {
              this.setState({
                isAddingMenuItem: true
              });
            }}
            close={() => {
              this.setState({
                isAddingMenuItem: false
              })
            }}>
              <AddMenuItem />
            </AddButton>
          }

        </div>
        <div className="cart-container">
          <div className="cart-items-container-outer">
            <div className="cart-items-container-inner" ref={this.scrollCart}>
              {
              this.state.cartItems.length > 0 &&
                <div className="cart-items">
                  {this.state.cartItems.map((cartItem, index) => {
                    let title = cartItem.title || 'NoTitle';
                    return (<CartItem title={title} price={cartItem.price} key={index} delete={() => {
                      this.removeItemFromCart(index);
                    }}/>)
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
      <p className="remove"><DeleteIcon onClick={props.delete}/></p>
    </div>);
}

const MenuItem = (props) => {
  return (
    <div className="menu-item">
      <div className="menu-item-top">
        <p className="menu-item-title">{props.title}</p>
        <p>${props.price}</p>
      </div>
      <div className="menu-item-bottom">
        <p className="menu-item-description">{props.description}</p>
        {props.toGo && 
          <AddShoppingCartIcon onClick={props.addItemToCart}/>
        }
        {props.userIsAdmin &&
          <React.Fragment>
            <DeleteIcon onClick={props.delete}/>
            <Icon>edit_icon</Icon>
          </React.Fragment>
        }
      </div>
    </div>);
}

const AddButton = (props) => {
  return (
    <Button variant="outlined">
      {!props.isAdding && <AddIcon onClick={props.open}/>}
      {props.isAdding &&
        <React.Fragment>
          {props.children}
          <ClearIcon onClick={props.close}/>
        </React.Fragment>
      }
    </Button>
  )
}

const AddOrEditCategory = (props) => {
  return (
    <React.Fragment>
      <TextField
          required
          id="menu-category-title"
          label="Category Name"
          value={props.title}
          onChange={props.onChange}
          margin="normal"
      />
      <Button variant="outlined" onClick={props.submit}>
        {props.buttonLabel}
      </Button>
    </React.Fragment>
  )
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