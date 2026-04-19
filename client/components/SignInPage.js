import React from 'react'
import {Login} from './AuthForm'

export class SignInPage extends React.Component {
  constructor() {
    super()
    this.state = {
      isSignInFormVisible: false,
    }
    this.isSignInFormVisibleToggle = this.isSignInFormVisibleToggle.bind(this)
  }

  componentDidMount() {
    console.log(React.version);
  }

  isSignInFormVisibleToggle() {
    this.setState({ isSignInFormVisible: false })
  }

  handleClick(e) {
    e.preventDefault()
  }

  // componentDidUpdate() {
  //   console.log("this", this);
  //   console.log("state", this.state);
  //   console.log("props", this.props);
  // }

  render() {
    return (
    <div className='signInContainer'>
        <h1 style={{ margin: '50px 0 150px 0' }}>Sign-in as...</h1>
        <div className='signInButtonContainer'>
          {this.state.isSignInFormVisible ? (
            (<button
              type="button"
              className="blueButton"
              onClick={() => this.setState({ isSignInFormVisible: false })}
            >
              Assembly Technician
            </button>)
            &&
            (<Login
              isSignInFormVisible={this.isSignInFormVisibleToggle}
            />)
          ) : (
            <button
              type="button"
              className="blueButton"
              onClick={() => this.setState({ isSignInFormVisible: true })}
            >
              Assembly Technician
            </button>
          )}
          <button className='blueButton'>Production Leader</button>
          <button className='blueButton'>TV</button>
        </div>
    </div>
  )
  }
}

export default SignInPage;