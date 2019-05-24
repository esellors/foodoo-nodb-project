import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Menu from './components/Menu';
import MealList from './components/MealList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {},
      meal: {}
    }
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/menumeal")
      .then(res => {
        this.setState({
          menu: res.data.menu,
          meal: res.data.meal
        });
      })
      .catch(error => console.log(`Load initial menumeal object: ${error}`))
  }

  deleteMenuItem(evt) {
    evt.stopPropagation();
    let menuCopy = {...this.state.menu};
    const sectionName = evt.target.parentNode.parentNode.id;
    const menuCategory = evt.target.parentNode.className;
    const index = parseInt(evt.target.parentNode.getAttribute('data-key'));
    
    menuCopy[menuCategory].splice([index], 1);
    this.setState({[sectionName]: menuCopy})
  }

  moveItem(evt) {
 
  
    console.log('clicked item p')



  }


  render() {
    // console.log(this.state.menu.length);
    // console.log(this.state.meal);
    return (
      <div className="wrapper">
        <Header />
        <main>
          <Menu menu={this.state.menu} deleteMenuItem={this.deleteMenuItem} moveItem={this.moveItem} />
          <MealList meal={this.state.meal} />
        </main>
      </div>
    );
  }
}

export default App;
