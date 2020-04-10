import config from '../config'

const PetfulApiService = {

  //gets only rn
  getPeople(){
    return fetch(`${config.API_ENDPOINT}/people`)
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  getPets(){
    return fetch(`${config.API_ENDPOINT}/pets`)
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  }
}