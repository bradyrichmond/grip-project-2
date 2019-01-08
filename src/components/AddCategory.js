import React, { Component } from 'react';
import axios from 'axios';

class AddCategory extends Component {
  constructor(props) { 
    super(props);

    this.state = {
        categoryText: '',
        categories: []
    }
  }

  updateCategoryText = (e) => {
      this.setState({
          categoryText: e.target.value
      })
  }

  createCategory = () => {
      var cleanedCategoryText = this.state.categoryText.toLowerCase();
      axios.post('/api/categories', {text: cleanedCategoryText})
      .then((resp) => {
          console.log('post success', resp);
        })
      .catch((rej) => {console.log('post error', rej)});
  }

  render() {
    return (
      <div className="addCategoryContainer">
        <input type="text" value={this.state.categoryText} onChange={this.updateCategoryText}/>
        <input type="button" onClick={this.createCategory} value="Create Category"/>
      </div>
    );
  }
}

export default AddCategory;