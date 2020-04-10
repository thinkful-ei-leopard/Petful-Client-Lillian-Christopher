import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default class Landing extends React.Component {

  render() {
    return (
      <div className='Landing'>
        <section className='about'>
          <h1>The Petful Adoption Center</h1>
          <p>The Petful Aoption Center is the first strictly First in First out adoption center! We give a chance for EVERY pet to find their forever home without judgement based on looks.</p>
          <p className='question'>Why adopt First in First out?</p>
          <p>Many pets are passed up at traditional adoption centers for superficial reasons, black cats for example have the lowest adoption rate and can end up at a shelter for years! ALL of our pets can make wonderful additions to your family so we give them an equal chance at adoption.</p>
          <p className='question'>Great! How do I adopt?</p>
          <p>Start by <a href='/signup'>signing up</a> in the link below, then wait for your name to come up in the <a href='/adopt'>adoption page!</a></p>
        </section>

        <section className='buttons'>
          <Link to='/signup'>
            <button className='sign-up'>
              Sign up to adopt
            </button>
          </Link>

          <Link to='/adopt'>
            <button className='landing-adopt'>
              Go to adoption page
            </button>
          </Link>
        </section>

      </div>
    )
  }
}