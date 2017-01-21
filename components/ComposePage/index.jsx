import React from 'react'
import DocumentTitle from 'react-document-title'
import { RouteHandler, Link } from 'react-router'
import SiteSidebar from '../SiteSidebar'
import { config } from 'config'
import { rawDefaultEditorContent } from '../Editor/defaultEditorContent'
import { ContentState, convertToRaw } from 'draft-js'
import GitHubForm from '../Forms/GitHubForm'
import MyEditor from '../Editor'

export default class ComposePage extends React.Component {
  constructor () {
    super()
    this.state = {editorContent: rawDefaultEditorContent};
  }

  render () {
    const passEditorContent = (editorContent) => {// https://www.youtube.com/watch?v=5Xew--ycx0o&list=PL55RiY5tL51oyA8euSROLjMFZbXaV7skS&index=4#t=165.980087
      console.log('editorContent in ComposePage:', editorContent)
      this.setState({editorContent: editorContent})
    }
    return (
      <div>
        <SiteSidebar {...this.props}/>
        <div className='content'>
          <div className='main'>
            <div className='main-inner'>
              <MyEditor editorContent={this.state.editorContent}/>
              <GitHubForm passContent={passEditorContent.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}