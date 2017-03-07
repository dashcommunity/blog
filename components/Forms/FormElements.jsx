import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export const Select = (field) => {
  const refCb = (el) => {if (el) {findDOMNode(el).focus(); findDOMNode(el).blur();}}
  return (
    <div className="form-group row"> {/* pass in passContent here maybe? */}
      <label className="col-2 col-form-label" >Action</label>
      <div className="col-10">
        <select {...field} {...field.input} className="form-control" ref={refCb}>
          <option value="choose">Select an option</option>
          <option value="load-ls">Load from Local Storage</option>
          <option value="load-gh">Load from GitHub</option>
          <option value="save-ls">Save to Local Storage</option>
          <option value="save-gh">Save to GitHub</option>
          <option value="publish">Publish to Community Blog</option>
        </select>
      </div>
    </div>
  )
}

export const Input = (field) => {
  // console.log(field);
  return (
    <div className="form-group row">
      <label className="col-2 col-form-label" htmlFor={field.input.name}>
        {field.labelText}
      </label>
      <div className="col-10">
        <input className="form-control" {...field} {...field.input}/>
      </div>
    </div>
  )
}

export const Checkbox = (field) => {
  // console.log(field);
  return (
    <div className="form-group row">
      <label className="col-2" htmlFor={field.input.name}></label>
      <div className="col-10">
        <div className="form-check">
          <label className="form-check-label">
            <input className="form-check-input" {...field} {...field.input}/> {field.descText}
          </label>
        </div>
      </div>
    </div>
  )
}

export const TextArea = (field) => {
  // console.log(field);
  return (
    <div className="form-group row">
      <label className="col-2 col-form-label" htmlFor={field.input.name}>
        {field.labelText}
      </label>
      <div className="col-10">
        <textarea className="form-control" rows="3" {...field} {...field.input}></textarea>
      </div>
    </div>
  )
}