
import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Display from './src/components/Display';
import Button from './src/components/Button';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}


export default class App extends Component {
  state = { ...initialState }

  addDigit = n => {
    console.debug(typeof this.state.displayValue)
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay
    
    if (n === '.' && !clearDisplay 
      && this.state.displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }


  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='

      const values = [...this.state.values]

      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`, operation: equals ? null : operation, current: equals ? 0 : 1, clearDisplay: !equals, values
      })
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <Display value={this.state.displayValue}></Display>
        <SafeAreaView style={styles.Buttons}>
          <Button label='AC' triple onClick={this.clearMemory}/>
          <Button label='/' operation onClick={this.setOperation}/>
          <Button label='7'onClick={this.addDigit}/>
          <Button label='8'onClick={this.addDigit}/>
          <Button label='9'onClick={this.addDigit}/>
          <Button label='*' operation onClick={this.setOperation}/>
          <Button label='4'onClick={this.addDigit}/>
          <Button label='5' onClick={this.addDigit}/>
          <Button label='6' onClick={this.addDigit}/>
          <Button label='-' operation onClick={this.setOperation}/>
          <Button label='1'onClick={this.addDigit}/>
          <Button label='2'onClick={this.addDigit}/>
          <Button label='3' onClick={this.addDigit}/>
          <Button label='+' operation onClick={this.setOperation}/>
          <Button label='0' double onClick={this.addDigit}/>
          <Button label='.' onClick={this.addDigit}/>
          <Button label='=' operation onClick={this.setOperation}/>
        </SafeAreaView>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})