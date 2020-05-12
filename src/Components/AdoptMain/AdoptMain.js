import React from 'react'
import PetfulApiService from '../../services/petful-api-service'
import './AdoptMain.css'

export default class AdoptMain extends React.Component {

  state = {
    error: null,
    dogs: [],
    cats: [],
    people: [],
    currentUser: ''
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

  handleAddName(e) {
    e.preventDefault()
    const { name } = e.target
    PetfulApiService.postPerson(name.value)
      .then( res => {
        name.value = ''
        this.setState({
          people: [...this.state.people, res],
          currentUser: res
        })
      })
      .catch(res => this.setState({ error: res.error }))

    this.timeout = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * 2) + 1
      
      if(randomNumber === 1) {
        PetfulApiService.deletePetAndPerson('dog')
          .then( res => {
            PetfulApiService.getPets()
              .then(res => this.setState({ dogs: res.dogs }))
              .catch(res => this.setState({ error: res.error }))
            PetfulApiService.getPeople()
              .then(res => this.setState({ people: res }))
              .catch(res => this.setState({ error: res.error }))
          })
          .catch(res => this.setState({ error: res.error }))
      } else {
        PetfulApiService.deletePetAndPerson('cat')
          .then( res => {
            PetfulApiService.getPets()
              .then(res => this.setState({ cats: res.cats }))
              .catch(res => this.setState({ error: res.error }))
            PetfulApiService.getPeople()
              .then(res => this.setState({ people: res }))
              .catch(res => this.setState({ error: res.error }))
          })
          .catch(res => this.setState({ error: res.error }))
      }
    }, 5000);
  }

  handleAdoptDog(e) {
    e.preventDefault()
    PetfulApiService.deletePetAndPerson('dog')
      .then( res => {
        PetfulApiService.getPets()
          .then(res => this.setState({ dogs: res.dogs }))
          .catch(res => this.setState({ error: res.error }))
        PetfulApiService.getPeople()
          .then(res => this.setState({ people: res }))
          .catch(res => this.setState({ error: res.error }))
      })
      .catch(res => this.setState({ error: res.error }))
  }

  handleAdoptCat(e) {
    e.preventDefault()
    PetfulApiService.deletePetAndPerson('cat')
      .then( res => {
        PetfulApiService.getPets()
          .then(res => this.setState({ cats: res.cats }))
          .catch(res => this.setState({ error: res.error }))
        PetfulApiService.getPeople()
          .then(res => this.setState({ people: res }))
          .catch(res => this.setState({ error: res.error }))
      })
      .catch(res => this.setState({ error: res.error }))
  }

  renderAdoptDogButton(name) {
    let button
    if(this.state.currentUser === this.state.people[0]){
      button = <button onClick={e => this.handleAdoptDog(e)}>
        Adopt Me!
      </button>
    }
    return button
  }

  renderAdoptCatButton(name) {
    let button
    if(this.state.currentUser === this.state.people[0]){
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

  peopleInterval() {
      let addPeople = setTimeout(() => {
        console.log(this.state.people)
        if(this.state.people){
          clearTimeout(addPeople)
        }

        const firstNames = ['Kit', 'Adam', 'Keke', 'Emma', 'Howie', 'Donald']
        const lastNames = ['Harington', 'Driver', 'Palmer', 'Roberts', 'Mandel', 'Glover']

        const getRandomName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`

        if(this.state.people.length < 6) {
            PetfulApiService.postPerson(getRandomName())
              .then( res => {
                this.setState({
                  people: [...this.state.people, res],
                })
              })
              .catch(res => this.setState({ error: res.error }))
        }

        }, 3000);
    //clearTimeout(addPeople)
  }


  render() {
    const {dogs, cats, people, error} = this.state
    let content
    if (error) {
      content = <p className='red'>There was an error</p>
    } else if (dogs.length === 0 || cats.length === 0) {
      return <div className='loading'>No pets left to adopt!!!</div>
    } else if (people) {
      this.peopleInterval() 
    } else if (people.length === 5) {
      clearInterval(this.addPeople)
    }
    return(
      <div className='adopt-main'>
        <h1>Adopt!</h1>

        {content}

        <div className='adoption-container'>
          <div className='dog-container'>
            <img className='pet-img' src={this.state.dogs[0].imageURL} alt={this.state.dogs[0].description}></img>
            <h2>{this.state.dogs[0].name}</h2>
            <p>{this.state.dogs[0].age} years old</p>
            <p>Gender: {this.state.dogs[0].gender}</p>
            <p>Breed: {this.state.dogs[0].breed}</p>
            <p>How I got here: {this.state.dogs[0].story}</p>
            {this.renderAdoptDogButton()}
          </div>

          <div className='cat-container'>
            <img className='pet-img' src={this.state.cats[0].imageURL} alt={this.state.cats[0].description}></img>
            <h2>{this.state.cats[0].name}</h2>
            <p>{this.state.cats[0].age} years old</p>
            <p>Gender: {this.state.cats[0].gender}</p>
            <p>Breed: {this.state.cats[0].breed}</p>
            <p>How I got here: {this.state.cats[0].story}</p>
            {this.renderAdoptCatButton()}
          </div>
        </div>

        <div className='queue-container'>
          {this.renderPeople()}
        </div>

        <form className='add-name' onSubmit={e => this.handleAddName(e)}>
          <label htmlFor='name'>Enter your name to get in line!</label>
          <input type='text' name='name' minLength='1' id='name-input'></input>
          <button type='submit'>Get in line to adopt!</button>
        </form>
      </div>
    )
  }
}