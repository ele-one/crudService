import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import $ from 'jquery'

class FormUpdate extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange  = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.state = {
      afterUpdateView: false,
      inputData: null,
    }
  }


  handleChange(event) {
    this.setState({
      inputData: event.target.value
    })
  }

  handleClick(event) {
    debugger

    var self = this;
    $.ajax({
      url: 'updateioc',
      method: 'POST',
      data: {query: this.state.inputData},
      context: self,
      success: function(data) {
        this.setState({
          afterUpdateView: true,
         })
      },
      error: function(err) {

      }
    })
  }

  handleKeyPress(event) {

  }

  render() {
    var content;
    var button;

    if (!this.state.afterUpdateView) {
      button = <Button type='submit' id="submitButton" onClick={this.handleClick} >Submit</Button>
      content = <Form unstackable> <Form.Group widths={2}> <Form.Input onChange={this.handleChange}  control='textarea' rows='10' label='Update IOC' placeholder='{"newValue": {"ioc": "2.2.2.2"}, "where":  {"where": {"ioc" : "5.5.5.5"} }}' /> </Form.Group> {button} </Form>
    }


    if (this.state.afterUpdateView) {
      button = <Button type="submit" id="backButton" onClick={this.handleClick}> Back </Button>
      content = <div> <p> ioc has been updated </p> {button} </div>
    }

    return (
      <div> {content} </div>
      )
    }
  }




export default FormUpdate;