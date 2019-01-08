import React, { Component } from 'react';

import AddMenuItem from './components/AddMenuItem';
import AddCategory from './components/AddCategory';

class Menu extends Component {
  constructor(props) { 
    super(props);
  }

  render() {
    return (
      <div className="menuContainer">
        <AddCategory />
      </div>
    );
  }
}

export default Menu;