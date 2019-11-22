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

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Email address:</Text>
        <TextInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          autoFocus={true}
          blurOnSubmit={true}
          keyboardType="email-address"
          placeholder="buffy.summers@sunnydale-high.com"
          textContentType="emailAddress"
          style={styles.input}
          onChangeText={text => this.props.onChangeEmail(text)}
          value={this.props.email}
        />
        <Text>Password:</Text>
        <TextInput
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          blurOnSubmit={true}
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          secureTextEntry={true}
          textContentType="password"
          style={styles.input}
          onChangeText={text => this.props.onChangePassword(text)}
          value={this.props.password}
        />
        <TouchableOpacity
          onPress={this.props.handleLogin}
          style={styles.buttonContainer}
        >
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
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
  container: {
    alignItems: 'flex-start',
    display: 'flex',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    height: 40,
    width: '100%',
  },
})

export default Login