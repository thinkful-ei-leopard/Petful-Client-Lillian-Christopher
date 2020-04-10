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
    
    PetfulApiService.getPets()
      .then(res => {
        this.setState({
          dogs: res.dogs,
          cats: res.cats,
        })
      })
      .catch(res => this.setState({ error: res.error }))
  
    PetfulApiService.getPeople()
      .then(res => this.setState({ people: res }))
      .catch(res => this.setState({ error: res.error }))

    
  }

  incrementPerson() {
    console.log('increment');
    let randomNumber = Math.floor(Math.random() * 2) + 1
    console.log(randomNumber);
    let petType = ''
    
    if(randomNumber === 1) {
      petType = 'dog'
    } else {
      petType = 'cat'
    }

    setInterval(() => {
      PetfulApiService.deletePetAndPerson(petType)
    }, 5000);
  }

  handleAddName(e) {
    e.preventDefault()
    const name = e.target.line.value
    PetfulApiService.postPerson(name)
      .then(
        PetfulApiService.getPeople()
          .then(res => this.setState({ people: res }))
          .catch(res => this.setState({ error: res.error }))
      )
      .catch(res => this.setState({ error: res.error }))

    this.renderAdoptDogButton(name)
    this.renderAdoptCatButton(name)
  }

  handleAdoptDog(e) {
    e.preventDefault()
    PetfulApiService.deletePetAndPerson('dog')
    alert('Adopted a dog! Congrats!')
  }

  handleAdoptCat(e) {
    e.preventDefault()
    PetfulApiService.deletePetAndPerson('cat')
    alert('Adopted a cat! Congrats!')
  }

  renderAdoptDogButton(name) {
    let button
    if(name === this.state.people[0]){
      button = <button onClick={e => this.handleAdoptDog(e)}>
        Adopt Me!
      </button>
    }
    return button
  }

  renderAdoptCatButton(name) {
    let button
    if(name === this.state.people[0]){
      button = <button onClick={e => this.handleAdoptCat(e)}>
        Adopt Me!
      </button>
    }
    return button
  }

  renderPeople() {
    let line = []
    for(let i = 0; i < this.state.people.length; i++) {
      if(i === 0) {
        line.push(<h3 id={i}>{this.state.people[0]}</h3>)
      } else {
        line.push(<p id={i}>{this.state.people[i]}</p>)
      }
    }
    return line
  }


  render() {
    const {dogs, cats, people, error} = this.state
    console.log(this.state)
    let content
    if (error) {
      content = <p className='red'>There was an error</p>
    } else if (dogs.length === 0 || cats.length === 0) {
      return <div className='loading'>loading...</div>
    } else if (people.length !== 0) {
      this.incrementPerson()
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
          {this.renderPeople()}
        </div>

        <form className='add-name' onSubmit={e => this.handleAddName(e)}>
          <label htmlFor='line'>Enter your name to get in line!</label>
          <input type='text' name='line' minLength='1' id='name-input'></input>
          <button type='submit'>Get in line to adopt!</button>
        </form>
      </div>
    )
  }
}