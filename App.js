import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { HomeScreen } from './src/containers/HomeScreen'

const App = createStackNavigator({
  Home: HomeScreen,
})

export default createAppContainer(App)
