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
    }
  }
}

export default Login
