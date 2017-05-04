import React, { Component } from 'react'
import { Form, Field } from './form'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      model: {
        title: 'title',
        category: 'category',
        books: {
          selected: ''
        }
      },
      selected: {}
    }
  }
  render() {
    const { model, selected } = this.state
    return (
      <div>
        <h1>React form lite</h1>
        <h3>Enter values and press submit.</h3>
        <Form model={model} onChange={model => this.setState({model})} onSubmit={model => this.setState({selected: model})}>
          <Field name="title" label="Title"/>
          <Field name="category" label="Category"/>
          <Field name="books.selected" type="select" label="Book">
            <option value="">Select....</option>
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
          </Field>
          <button type="submit">Submit</button>
        </Form>
        <h4>Model (onChange):</h4>
        <pre>{JSON.stringify(model)}</pre>        
        <h4>Model (onSubmit):</h4>
        <pre>{JSON.stringify(selected)}</pre>
      </div>
    )
  }
}
