import React, { Component } from 'react'
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import Bookmarks from '../components/Bookmarks'
import Login from '../components/Login'

export class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookmarks: null,
      email: '',
      isLoggedIn: false,
      password: '',
      url: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleOpenedByUrl = this.handleOpenedByUrl.bind(this)
    this.handleSaveBookmark = this.handleSaveBookmark.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenedByUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenedByUrl);
  }

  handleLogin() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    fetch('https://shortcut.io/api/sessions', {
      body: JSON.stringify(data),
      'cache-control': 'no-cache',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        this.setState({
          isLoggedIn: true,
        })
        console.log(response)
        fetch('https://shortcut.io/api/shortcuts', {
          'cache-control': 'no-cache',
          credentials: 'include',
          method: 'GET',
        })
          .then((response) => {
            console.log(response)
            return response.json()
          })
          .then((json) => {
            console.log(json)
            this.setState({
              bookmarks: json,
            })
          })
          .catch((error) => (
            console.log(error)
          ))
      })
      .catch((error) => (
        console.log(error)
      ))
  }

  handleOpenedByUrl(event) {
    if (event.url) {
      this.setState({
        url: event.url,
      })
    }
  }

  handleSaveBookmark() {
    const data = {
      description: '',
      title: this.state.url,
      url: this.state.url,
      tags: [],
    }
    fetch('https://shortcut.io/api/shortcuts', {
      body: JSON.stringify(data),
      'cache-control': 'no-cache',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
    .then((response) => {
        console.log(response)
        fetch('https://shortcut.io/api/shortcuts', {
          'cache-control': 'no-cache',
          credentials: 'include',
          method: 'GET',
        })
          .then((response) => {
            console.log(response)
            return response.json()
          })
          .then((json) => {
            console.log(json)
            this.setState({
              bookmarks: json,
            })
          })
          .catch((error) => (
            console.log(error)
          ))
      })
      .catch((error) => (
        console.log(error)
      ))

  }

  onChangeEmail(text) {
    this.setState({
      email: text,
    })
  }

  onChangePassword(text) {
    this.setState({
      password: text,
    })
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.body}>
            { this.state.url !== '' &&
              <View>
                <Text>Opened by URL: {this.state.url}</Text>
                <TouchableOpacity
                  onPress={this.handleSaveBookmark}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.button}>Save Shortcut</Text>
                </TouchableOpacity>
              </View>
            }
            </View>
            { !this.state.isLoggedIn &&
              <Login
                email={this.state.email}
                handleLogin={this.handleLogin}
                onChangeEmail={this.onChangeEmail}
                onChangePassword={this.onChangePassword}
                password={this.state.password}
              />
            }
            { (this.state.bookmarks && this.state.bookmarks.length && this.state.bookmarks.length > 0) &&
              <Bookmarks
                bookmarks={this.state.bookmarks}
              />
            }
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderRadius: 4,
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  scrollView: {
    backgroundColor: 'white',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
})

export default connect()(HomeScreen)