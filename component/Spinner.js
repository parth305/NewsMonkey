import React, { Component } from 'react'
import loading from "./Spinner-1s-257px.svg"

export default class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-5' src={loading} alt="loading" />
      </div>
    )
  }
}
