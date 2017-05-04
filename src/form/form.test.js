import test from 'tape'
import React from 'react'
import { mount } from 'enzyme'
import { Form, Field }  from './'

test('form', t => {
  let model = {}
  const wrapper = mount(
    <Form onSubmit={m => (model = m)}>
      <Field name="title" label="Title" />
      <Field name="category" label="Category" />
      <Field name="books.selected" type="select" label="Book">
        <option value="">Select....</option>
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
      </Field>
      <button type="submit">Submit</button>
    </Form>    
  )
  const inputs = wrapper.find('input')
  inputs.at(0).simulate('change', {target: {value: 'title'}})
  inputs.at(1).simulate('change', {target: {value: 'category'}})
  wrapper.find('select').first().simulate('change', {target: {value: 'one'}})
  wrapper.find('form').simulate('submit')

  t.equal(model.title, 'title')
  t.equal(model.category, 'category')
  t.equal(model.books.selected, 'one')  
  t.end()
})