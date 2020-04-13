import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default class Landing extends React.Component {

  render() {
    return (
      <div className='Landing'>
        <section className='about'>
          <h1>The Petful Adoption Center</h1>
          <img src="https://image.freepik.com/free-vector/dog-cat-logo-template-veterinary_56473-127.jpg" alt="dog-cat-logo" id="logo"></img>
          <p>The Petful Aoption Center is the first strictly First in First out adoption center! We give a chance for EVERY pet to find their forever home without judgement based on looks.</p>
          <p className='question'>Why adopt First in First out?</p>
          <p>Many pets are passed up at traditional adoption centers for superficial reasons, for example, black cats have the lowest adoption rate and can end up at a shelter for years! ALL of our pets can make wonderful additions to your family so we give them an equal chance at adoption.</p>
          <p className='question'>Great! How do I adopt?</p>
          <p>Start by going to the <a href='/adopt'>adoption page</a> in the link below, then enter your name to get in line to adopt. Once you're at the front you can decide to adopt a cat or a dog! </p>
        </section>

        <section className='buttons'>
          <Link to='/adopt'>
            <button className='landing-adopt'>
              Adopt!
            </button>
          </Link>
        </section>

      </div>
    )
  }
}