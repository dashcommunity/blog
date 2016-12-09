import React from 'react'
import { RouteHandler, Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import {Editor, createEditorState} from 'medium-draft'
import 'medium-draft/lib/index.css'
import './style.css'

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {editorState: createEditorState()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const { editorState } = this.state
    return (
      <div id="content">
        <h3>Draft.js Editor</h3>
        <div className="editor">
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}