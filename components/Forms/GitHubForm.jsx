import React, { Component } from 'react'
import { RouteHandler, Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Select, Input, Checkbox, TextArea } from './FormElements'
import { loadFromGitHub, saveToGitHub, publish } from './gitHubHelpers'
import { loadFromLocalStorage, saveToLocalStorage } from './localStorageHelpers'
import 'bootstrap/dist/css/bootstrap.css'

let GitHubForm = (props) => {
  const { passContent, handleSubmit, action, username, token, repo, path, file, overwrite } = props
  console.log('action:', action)
  
  var submitFn = () => {}
  var submitText = ''
  var message = ['action', 'from', 'to']
  var show = {}
  var formFields = ['username', 'repo', 'path', 'file', 'token', 'author', 'title', 'excerpt', 'overwrite']
  var showFields = (formFields, ...fields) => {
  formFields.forEach(field => { show[field] = false })
    console.log('fields', fields)
    fields.forEach(field => {
      show[field] = true
      console.log('show:', show)
    })
  }

  switch (action) {
    case 'load-ls':
      submitFn = loadFromLocalStorage;
      submitText = 'Load from Local Storage';
      message = ['load', 'your browser\'s local storage', 'the editor above']
      showFields(formFields, 'file', 'message', 'button')
      break;
    case 'load-gh':
      submitFn = loadFromGitHub;
      submitText = 'Load from GitHub';
      message = ['load',`github.com/${username}/${repo}/${path}/${file}`, 'the editor above']
      showFields(formFields, 'username', 'repo', 'path', 'file', 'token', 'message', 'button')
      break;
    case 'save-ls':
      submitFn = saveToLocalStorage;
      submitText = 'Save to Local Storage';
      message = ['save', 'the editor above', 'your broswer\'s local storage']
      showFields(formFields, 'file', 'overwrite', 'message', 'button')
      break;
    case 'save-gh':
      submitFn = saveToGitHub;
      submitText = 'Save to GitHub';
      message = ['save', 'the editor above', `github.com/${username}/${repo}/${path}/${file}`]
      showFields(formFields, 'username', 'repo', 'path', 'file', 'token', 'overwrite', 'message', 'button')
      break;
    case 'publish':
      submitFn = publish;
      submitText = 'Publish';
      message = ['send a request to publish', 'the editor above', 'the Dash Community Blog']
      showFields(formFields, 'author', 'title', 'excerpt', 'token', 'overwrite', 'message', 'button')
      break;
    default:
      console.log('no valid action in switch');
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitFn)}>
        <Field component={Select} name="action"/>
        {(show.username)&&<Field component={Input} type="text" labelText="User" name="username" placeholder="GitHub user/org (e.g. riongull, dashcommunity)"/>}
        {(show.repo)&&<Field component={Input} type="text" labelText="Repo" name="repo" placeholder="GitHub repository to store data (e.g. blog)"/>}
        {(show.path)&&<Field component={Input} type="text" labelText="Path" name="path" placeholder="GitHub file path (e.g. drafts/todo)"/>}
        {(show.author)&&<Field component={Input} type="text" labelText="Author" name="author" placeholder="Article author (e.g. Satoshi Nakamoto)"/>}
        {(show.title)&&<Field component={Input} type="text" labelText="Title" name="title" placeholder="Article title (e.g. Why I love Dash)"/>}
        {/*(show.tags)&&<Field component={Input} type="text" labelText="Tags" name="tags" placeholder="Tags (e.g. merchants, economics)"/>*/}
        {(show.excerpt)&&<Field component={TextArea} labelText="Excerpt" name="excerpt" placeholder="Excerpt from article (e.g. First bit of your article)"/>}
        {(show.file)&&<Field component={Input} type="text" labelText="File" name="file" placeholder="Name of file to load or save (e.g. rev2)"/>}
        {(show.token)&&<Field component={Input} type="text" labelText="Token" name="token" placeholder="Your GitHub personal access token"/>}
        {(show.overwrite)&&<Field component={Checkbox} type="checkbox" descText="Overwrite contents" name="overwrite" id="overwrite"/>}
        {(show.message)&&<p>Clicking below will {message[0]} the contents from {message[1]} to {message[2]}</p>}
        {(show.button)&&<button type="submit" className="btn btn-primary">{submitText}</button>}
      </form>
    </div>
  );
}

GitHubForm = reduxForm({
  form: 'gitHubForm',
  // onSubmit: submitFn
})(GitHubForm);

export default GitHubForm = connect((state) => {
  // const { initialValues } = state
  const { action, username, token, repo, path, file, overwrite } = formValueSelector('gitHubForm')(state, 'action', 'username', 'token', 'repo', 'path', 'file', 'overwrite')
  return { action, username, token, repo, path, file, overwrite } // add initialValues when initialValues reducer has been set up
})(GitHubForm);