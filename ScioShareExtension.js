import React, { Component } from 'react'
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import ShareExtension from 'rn-extensions-share'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 5,
    marginTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  url: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
  },
  wrapper: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    width: '90%',
  },
})
// const type = ''
// const value = ''

class ScioShareExtension extends Component {
  constructor(props) {
    super(props)
    this.state= {
      type: '',
      value: '',
    }
    this.handleSaveInApp = this.handleSaveInApp.bind(this)
  }
  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      await this.setState({
        type: type,
        value: value,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async handleSaveInApp() {
    await ShareExtension.openURL(`scio://url:${this.state.value}`)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Save URL</Text>
          <Text style={styles.url}>{this.state.value}</Text>
          <TouchableOpacity
            onPress={this.handleSaveInApp}
            style={styles.buttonContainer}
          >
            <Text style={styles.button}>Save in App</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default ScioShareExtension
