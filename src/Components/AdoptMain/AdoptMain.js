import React from 'react'

export default class AdoptMain extends React.Component {

  state = {
    error: null,
    dogs: [],
    cats: [],
    people: [],
  }

  handleAddName(e) {
    //add name to q 
  }

  handleAdoptDog() {
    //dequeue person and dog
  }

  handleAdoptCat() {
    //dequeue person and cat
  }

  componentDidMount(){
    //set dogs, cats, people
    
    //maybe have a function here that calls a few things to have people q and dequeue and pets q and deq
  }

  renderAdoptDogButton() {
    //shows the adopt button based on if the 'active person' === submitted name
  }

  renderAdoptCatButton() {

  }

  renderPeople() {
    //loops through people q and displays them with a <p> 
    //people.first needs to be larger (<h3>?)
  }


  render() {
    return(
      <div className='adopt-main'>
        <h1>Adopt!</h1>

        <div className='dog-container'>
          {/* not sure yet how the dogs/cats queue  will be accessed */}
          <img src={this.state.dogs.first.imageURL} alt={this.state.dogs.first.description}></img>
          <h2>{this.state.dogs.first.name}</h2>
          <p>{this.state.dogs.first.age} years old</p>
          <p>Gender: {this.state.dogs.first.gender}</p>
          <p>Breed: {this.state.dogs.first.breed}</p>
          <p>How I got here: {this.state.dogs.first.story}</p>
          {this.renderAdoptDogButton()}
        </div>

        <div className='cat-container'>
          <img src={this.state.cats.first.imageURL} alt={this.state.cats.first.description}></img>
          <h2>{this.state.cats.first.name}</h2>
          <p>{this.state.cats.first.age} years old</p>
          <p>Gender: {this.state.cats.first.gender}</p>
          <p>Breed: {this.state.cats.first.breed}</p>
          <p>How I got here: {this.state.cats.first.story}</p>
          {this.renderAdoptCatButton()}
        </div>

        <div className='queue-container'>
          {this.renderPeople()}
        </div>

        <form className='add-name'>
          <label for='line'>Enter your name to get in line!</label>
          <input type='text' name='line' minlength='1' id='name-input'></input>
          <button type='submit'>Get in line to adopt!</button>
        </form>
      </div>
    )
  }
}