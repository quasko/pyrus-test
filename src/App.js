import React from "react";
import cn from 'classnames';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const keyEnter = 13;
const keyDown = 40;
const keyUp = 38;

class App extends React.Component {
  
  constructor() {
    const  animals = ["Слон", "Жираф", "Лошадь", "Енот", "Заяц", "Удав"];
    super();
    this.state = {
      animals,
      filteredAnimals: animals,
      input: "",
      showList: true,
      selectedIndex: false,
      maxSelectedIndex: animals.length,
    }
  }

  onChange = e => {
    const { value } = e.target;
    const { animals } = this.state;
   
    const filteredAnimals = value === '' ? animals : animals.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    this.setState({
      input: value,
      showList: true,
      selectedIndex: false,
      filteredAnimals,
      maxSelectedIndex: filteredAnimals.length,
    });
  };

  onClick = e => {
    this.setState({
      input: e.target.textContent,
      showList: false
    });
  };

  onKeyDown = e => {
    const {filteredAnimals, selectedIndex, maxSelectedIndex} = this.state;
 
    const {keyCode} = e;

    switch(keyCode) {
      case keyEnter: 
        this.setState({
          showList: false,
          input: filteredAnimals[selectedIndex - 1],
          filteredAnimals: null,
        });
        break;
      case keyUp:
        this.setState({
          selectedIndex: selectedIndex === 0 ? 0 : selectedIndex - 1 
        });
        break;
      case keyDown:
        this.setState({
          selectedIndex: selectedIndex === maxSelectedIndex ? maxSelectedIndex : selectedIndex + 1
        });
        break;
      default:
        break;
    }
  }

  renderList() {
    const { showList, filteredAnimals, selectedIndex } = this.state;
    
    return (
      <div className="list-group">
        {showList &&
          filteredAnimals
            .map((item, index) => {
              const seletedClass = cn({
                active: index === selectedIndex - 1,
                'list-group-item': true,
                'list-group-item-action': true,
                'pointer': true,
               }); 
              return(
                <p key={index} className = {seletedClass} onClick={this.onClick}>
                  {item}
                </p>
              );
            })}
      </div>
    );
  }
  render() {
    const { input } = this.state;

    return (
      <div onKeyDown = {this.onKeyDown} className="container mt-2">
        <input type="text" className="form-control" value={input} onChange={this.onChange} />
        {this.renderList()}
      </div>
    );
  }
}

export default App;
