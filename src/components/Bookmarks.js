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

class Bookmarks extends Component {
  render() {
    return (
      <View>
        { this.props.bookmarks.map((bookmark) =>
          <View key={bookmark.id}>
            <Text>{bookmark.title}</Text>
            <Text>{bookmark.description}</Text>
            <Text>{bookmark.url}</Text>
          </View>
        )}
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

export default Bookmarks