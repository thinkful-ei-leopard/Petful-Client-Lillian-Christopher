import React from 'react'
import PetfulApiService from '../../services/petful-api-service'
//import './AdoptMain.css'

export default class AdoptMain extends React.Component {

  state = {
    error: null,
    dogs: [],
    cats: [],
    people: [],
  }

  componentDidMount(){
    this.setState({ error: null })
    //set dogs, cats, people
    PetfulApiService.getPets()
      .then(res => {
        this.setState({
          dogs: res.dogs,
          cats: res.cats,
        })
      })
      .catch(res => this.setState({ error: res.error }))
  
    PetfulApiService.getPeople()
      .then(res => this.setState({ people: res.people }))
      .catch(res => this.setState({ error: res.error }))
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
    const {dogs, cats, error} = this.state
    console.log(this.state)
    let content
    if (error) {
      content = <p className='red'>There was an error</p>
    } else if (dogs.length === 0 || cats.length === 0) {
      return <div className='loading'>loading...</div>
    } 
    return(
      <div className='adopt-main'>
        <h1>Adopt!</h1>

        {content}

        <div className='dog-container'>
          <img src={this.state.dogs[0].imageURL} alt={this.state.dogs[0].description}></img>
          <h2>{this.state.dogs[0].name}</h2>
          <p>{this.state.dogs[0].age} years old</p>
          <p>Gender: {this.state.dogs[0].gender}</p>
          <p>Breed: {this.state.dogs[0].breed}</p>
          <p>How I got here: {this.state.dogs[0].story}</p>
          {this.renderAdoptDogButton()}
        </div>

        <div className='cat-container'>
          <img src={this.state.cats[0].imageURL} alt={this.state.cats[0].description}></img>
          <h2>{this.state.cats[0].name}</h2>
          <p>{this.state.cats[0].age} years old</p>
          <p>Gender: {this.state.cats[0].gender}</p>
          <p>Breed: {this.state.cats[0].breed}</p>
          <p>How I got here: {this.state.cats[0].story}</p>
          {this.renderAdoptCatButton()}
        </div>

        <div className='queue-container'>
          {/* {this.renderPeople()} */}
        </div>

        <form className='add-name'>
          <label htmlFor='line'>Enter your name to get in line!</label>
          <input type='text' name='line' minLength='1' id='name-input'></input>
          <button type='submit'>Get in line to adopt!</button>
        </form>
      </div>
    )
  }
}