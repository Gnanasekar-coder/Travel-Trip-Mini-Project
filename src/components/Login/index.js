import {Component} from 'react'
import {BiShow, BiHide} from 'react-icons/bi'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    isSubmitError: false,
    errorMessage: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({
      isShowPassword: !prevState.isShowPassword,
    }))
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const loginApiUrl = 'https://apis.ccbp.in/login'

    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }

    const response = await fetch(loginApiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const jwtToken = fetchedData.jwt_token

      Cookies.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props
      history.replace('/')
    } else {
      const fetchedData = await response.json()

      this.setState({
        isSubmitError: true,
        errorMessage: fetchedData.error_msg,
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {
      username,
      password,
      isShowPassword,
      errorMessage,
      isSubmitError,
    } = this.state

    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-website-logo">Travel Trip</h1>
          <form onSubmit={this.onSubmitLoginForm}>
            <div className="username-input-container">
              <label className="label" htmlFor="username">
                Username
              </label>
              <br />
              <input
                type="text"
                id="username"
                className="username-input"
                placeholder="Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="password-input-container">
              <label className="label" htmlFor="password">
                Password
              </label>
              <br />
              <div className="password-show-hide-container">
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  id="password"
                  className="password-input"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={this.onToggleShowPassword}
                  data-testid="show-password"
                >
                  {isShowPassword ? (
                    <BiHide size="20" color="#647488" />
                  ) : (
                    <BiShow size="20" color="#647488" />
                  )}
                </button>
              </div>
            </div>
            {isSubmitError && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
