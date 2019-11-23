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

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBookmarks } from '../actions/BookmarkActions'
import { login, setEmail, setPassword } from '../actions/SessionActions'
import { getEmail, getPassword, getSessionState } from '../reducers'

import Bookmarks from '../components/Bookmarks'
import Login from '../components/Login'

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

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookmarks: null,
      email: '',
      isLoggedIn: false,
      password: '',
      url: '',
    }
    this.handleOpenedByUrl = this.handleOpenedByUrl.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenedByUrl)
    // check if user data is in async storage and try to log in
    if (
      this.props.email &&
      this.props.email !== '' &&
      this.props.password &&
      this.props.password !== ''
    ) {
      this.props.handleLogin(this.props.email, this.props.password)
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenedByUrl)
  }

  handleLogin() {
    this.props.handleLogin(this.props.email, this.props.password)
  }

  handleOpenedByUrl(event) {
    if (event.url) {
      this.setState({
        url: event.url,
      })
    }
  }

  onChangeEmail(text) {
    this.props.handleSetEmail(text)
  }

  onChangePassword(text) {
    this.props.handleSetPassword(text)
  }

  render() {
    const {
      bookmarks,
      email,
      handleSetEmail,
      handleSetPassword,
      password,
      sessionState,
    } = this.props

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
            { sessionState !== 'LOGGED_IN' &&
              <Login
                email={email}
                handleLogin={this.handleLogin}
                onChangeEmail={this.onChangeEmail}
                onChangePassword={this.onChangePassword}
                password={password}
              />
            }
            { (bookmarks && bookmarks.length && bookmarks.length > 0 && sessionState === 'LOGGED_IN') &&
              <Bookmarks
                bookmarks={bookmarks}
              />
            }
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

HomeScreen.propTypes = {
  bookmarks: PropTypes.array,
  email: PropTypes.string,
  getBookmarks: PropTypes.func,
  handleLogin: PropTypes.func,
  handleSetEmail: PropTypes.func,
  handleSetPassword: PropTypes.func,
  password: PropTypes.string,
  sessionState: PropTypes.string,
}

HomeScreen.defaultProps = {
  bookmarks: null,
  email: null,
  getBookmarks: null,
  handleLogin: null,
  handleSetEmail: null,
  handleSetPassword: null,
  password: null,
  sessionState: null,
}

const mapDispatchToProps = (dispatch) => ({
  getBookmarks: () => {
    dispatch(getBookmarks())
  },
  handleLogin: (email, password) => {
    dispatch(login(email, password))
  },
  handleSetEmail: (email) => {
    dispatch(setEmail(email))
  },
  handleSetPassword: (password) => {
    dispatch(setPassword(password))
  },
})

const mapStateToProps = (store) => ({
  bookmarks: store.BOOKMARKS.bookmarks,
  email: store.SESSION.email,
  password: store.SESSION.password,
  sessionState: store.SESSION.sessionState,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)