import React, {Component} from 'react';
import {Menu, Modal, Form, Button} from 'semantic-ui-react'

export default class Navbar extends Component {
  state = {
    userId: 0,
    username: '', 
    password: '',
    location: '', 
    open: false,
    loginState: true,
    signupState: false,
    user: false
  }

  loginHandleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            username: this.state.username,
            location: "Unknown"
        })
    })
    .then(res => res.json())
    .then(user => this.setState({userId: user.id, loginState: false, signupState: true}))
}

  signupFormSubmit = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${this.state.userId}`, {
        method: "PATCH",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            location: this.state.location
        })
    })
    this.handleClick()
}

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleChange = e => {
    let {name, value} = e.target
        this.setState({
            [name]: value
        })
  }

  

  render(){
    return (
      <Menu size='large' attached>
        <Menu.Item 
        name = "search" active = {this.props.activeItem === 'search'}
        onClick = {this.props.handleClick}
        >
          Search
        </Menu.Item>
        <Menu.Item 
        name = "history" active = {this.props.activeItem === 'history'}
        onClick = {this.props.handleClick}
        >
          History
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item 
            name = "sign in" active = {this.props.activeItem === 'sign in'}
            onClick = {this.handleClick}
            >
            Sign In
            </Menu.Item>
        </Menu.Menu>
        <Modal size = 'tiny' closeIcon onClose = {this.handleClick} open = {this.state.open}>
         {this.state.loginState ? <Modal.Content>
            <Modal.Header>Log In</Modal.Header>
            <Form onSubmit={event => this.loginHandleSubmit(event)}>
              <Form.Input onChange = {event => this.handleChange(event)} label = 'Username' placeholder='Username' name = "username" value = {this.state.username}/>
              <Form.Input onChange = {event => this.handleChange(event)} label = 'Password' placeholder = 'Disabled' disabled name = "password" value = {this.state.password}/>
              <Button type='submit' value="Submit">Submit</Button>
            </Form>
          </Modal.Content> : null}
          {this.state.signupState ? <Modal.Content>
            <Modal.Header>Sign up</Modal.Header>
            <Form onSubmit={event => this.signupFormSubmit(event)}>
              <Form.Input onChange={event => this.handleChange(event)} name="location" label="location" placeholder="location" value={this.state.location}/>
              <Button type="submit" value="Submit">Submit</Button>
            </Form>
            </Modal.Content> : null}
        </Modal>
      </Menu>
    )
  }
}