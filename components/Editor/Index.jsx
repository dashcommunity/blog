import React from 'react'
import { RouteHandler, Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
  convertFromHTML,
} from 'draft-js'

import {
  Editor,
  createEditorState,
} from 'medium-draft'

import Octokat from 'octokat'

import 'medium-draft/lib/index.css'
import './style.css'

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    // code for gatsby develop only 
    // these lines throw errors with Gatsby build, because of this: https://github.com/facebook/draft-js/issues/586
    // can use them with gatsby develop for playing around
    // const sampleMarkup = '<b>Bold text</b>, <i>Italic text</i>, unstyled text<br/ ><a href="http://www.facebook.com">Example link</a>';
    // const blocksFromHTML = convertFromHTML(sampleMarkup);
    // const state = ContentState.createFromBlockArray(blocksFromHTML);

    // create empty state
    const state = EditorState.createEmpty();

    // code for gatsby develop only 
    // console.group("Initialization Data");    
    // console.info("sampleMarkup:", sampleMarkup);
    // console.info("state:", state);
    // console.info("blocksFromHTML:", blocksFromHTML);
    // console.groupEnd();
    
    // this.state = {editorState: EditorState.createWithContent(state)};
    this.state = {editorState: state};
    
    this.onChange = (editorState) => {
      this.setState({editorState});
      // this.logRawData();
    };

    this.logData = this.logData.bind(this);
    this.logRawData = this.logRawData.bind(this);
    this.loadFromGitHub = this.loadFromGitHub.bind(this);
    this.fetchFromGitHub = this.fetchFromGitHub.bind(this);
    this.saveToGitHub = this.saveToGitHub.bind(this);
    this.postToGitHub = this.postToGitHub.bind(this);
    this.createOnGitHub = this.createOnGitHub.bind(this);
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  logData(e) {
    console.group("Current State:");
    console.info("content:", this.state.editorState.getCurrentContent().toJS());
    console.info("selection:", this.state.editorState.getSelection().toJS());
    console.groupEnd()
    // window.ga('send', 'event', 'draftjs', 'log-data');
  }

  logRawData() {
    const currentContent = this.state.editorState.getCurrentContent();
    const rawContentState = window.rawContentState = convertToRaw(currentContent);
    console.info("raw state:", JSON.stringify(rawContentState));
  }

  createOnGitHub () {
    var octo = new Octokat({token: ''});
    var repo = octo.repos('riongull', 'blog');
    var author = "Rion Gull"
    var contents = `
      #Testing
      This is a new markdown file
      Author: ${author}
      \`this is some code\`
      1. this is a list
      2. with two items
      And here's the **final** sentence.  Okay just one more with a [link](www.example.com). 
    `
    var config = {
      message: 'Adding a file',
      // content: base64encode(contents),
      content: window.btoa(contents),
      // sha: '123456789abcdef', // add a blob SHA to update instead of create
      // branch: 'gh-pages'
    };

    repo.contents('testing.md').add(config)
    .then(function(info) {
      console.log('File Updated. new sha is ', info.commit.sha);
    });
  }

  saveToGitHub () {
    var octo = new Octokat({token: ''});
    var repo = octo.repos('riongull', 'blog');
    var path = 'pages/articles/drafts/somePost';
    var contents = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(contents);
    
    var config = {
      message: 'Uploaded Draftjs state from editor',
      content: window.btoa(contents),
      // sha: '1db8b7e399bbbb28048774420c331673d235ab0b',
    };

    repo.contents(`${path}/data2.json`).add(config)
    .then(function(info) {
      console.log('File updated. New sha: ', info.commit.sha);
    });
  }

  loadFromGitHub() {
    // window.ga('send', 'event', 'draftjs', 'load-data', 'ajax');
    this.setState({
      placeholder: 'Loading...',
    });
    
    const req = new XMLHttpRequest();
    req.open('GET', 'https://api.github.com/repos/riongull/blog/contents/pages/articles/data.json', true);
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        const responseText = req.responseText;
        const responseObj = JSON.parse(responseText);
        const base64content = responseObj.content;
        const content = JSON.parse(window.atob(base64content));
        
        console.group("Load Data")
        console.info("responseText:", responseText);
        console.info("responseObj:", responseObj);
        console.info("base64content:", base64content);
        console.info("content:", content);
        console.groupEnd();

        this.setState({
          editorState: createEditorState(content),
          placeholder: 'Write here...'
        }, () => {
          this.refs.editor.focus();
        });
        // window.ga('send', 'event', 'draftjs', 'data-success');
      }
    };
    req.send();
  }

  fetchFromGitHub (event) {
    event.preventDefault();

    const token = this.refs.fetch_token.value;
    const username = this.refs.fetch_user.value;
    const reponame = this.refs.fetch_repo.value;
    const foldername = this.refs.fetch_folder.value;
    const filename = this.refs.fetch_file.value;

    var octo = new Octokat({token: `${token}`});
    var repo = octo.repos(`${username}`, `${reponame}`);
    var path = `pages/articles/drafts/${foldername}`;

    console.group("Fetch Data")
    // console.info("this:", this)

    repo.contents(`${path}/${filename}`).fetch()    // `.read` to get raw file, `.fetch` to get JSON
    .then((res) => {                         
      const responseObj = res;
      const base64content = responseObj.content;
      const sha = responseObj.sha;
      const content = JSON.parse(window.atob(base64content));

      console.log("---after response---")
      console.info("responseObj:", responseObj);
      console.info("this:", this);
      // console.info("base64content:", base64content);
      // console.info("content:", content);
      // console.log(this);
      
      this.setState({
        editorState: createEditorState(content),
        sha: sha,
      });

      console.log("---after setState---")
      console.log("this.state.sha", this.state.sha)
      console.groupEnd();

    });
  }

  postToGitHub (event) {
    event.preventDefault();

    const token = this.refs.token.value;
    const username = this.refs.user.value;
    const reponame = this.refs.repo.value;
    const foldername = this.refs.folder.value;
    const filename = this.refs.file.value;
    const overwrite = this.refs.overwrite_checkbox.checked;  // checked: true; unchecked: falso

    var octo = new Octokat({token: `${token}`});
    var repo = octo.repos(`${username}`, `${reponame}`);
    var path = `pages/articles/drafts/${foldername}`;
    var contents = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        
    var newFileConfig = {
      message: 'Created new file from editor',
      content: window.btoa(contents),
    };

    var overwriteFileConfig = {
      message: 'Overwrote existing file from editor',
      content: window.btoa(contents),
      sha: this.state.sha,
    };

    const config = overwrite ? overwriteFileConfig : newFileConfig;

    console.group("Post Data")
    console.info("this:", this);
    console.info("overwrite:", overwrite);
    // console.info("event:", event);
    // console.info(contents);
    console.info("config:", config);

    repo.contents(`${path}/${filename}`).add(config)
    .then((res) => {
      const sha = res.content.sha;

      console.log("---after response---")
      console.info('old file sha:', this.state.sha);
      console.info('res:', res);
      console.info('File updated. Commit sha: ', res.commit.sha);
      console.info("new file sha:", sha);
      
      this.setState({
        sha: sha,
      });
      
      console.log('---after setState---')
      console.info('this:', this)
      console.groupEnd();
      
    });
  }

  render() {
    const { editorState } = this.state
    return (
      <div id="content">
        {/*<h3>Draft.js Editor</h3>*/}
        <div className="editor">
          <Editor
            ref="editor"
            editorState={editorState}
            onChange={this.onChange}
          />
        </div>
        <div className="editor-action">
          {/*<button onClick={this.logData}>Log Data</button><br/>*/}
          {/*<button onClick={this.logRawData}>Log Raw Data</button><br/>*/}
          {/*<button onClick={this.createOnGitHub}>Create on GitHub</button><br/>*/}
          {/*<button onClick={this.saveToGitHub}>Save to GitHub</button><br/>*/}
          {/*<button onClick={this.loadFromGitHub}>Load from GitHub</button><br/>*/}
          {/*<button onClick={this.fetchFromGitHub}>Fetch from GitHub</button><br/><br/>*/}

          <div>
            Load a draft entry from GitHub
            <form onSubmit={this.fetchFromGitHub} >
              <input type="text" placeholder="GitHub username" ref="fetch_user"></input><br/>
              <input type="password" placeholder="GitHuB access token" ref="fetch_token"></input><br/>
              <input type="text" placeholder="GitHub repository" ref="fetch_repo"></input><br/>
              <input type="text" placeholder="Folder name" ref="fetch_folder"></input><br/>
              <input type="text" placeholder="File name" ref="fetch_file"></input><br/>
              <button type="submit">Fetch from GitHub</button>
            </form>
          </div><br/>

          <div>
            Save your draft above to GitHub
            <form onSubmit={this.postToGitHub} >
              <input type="text" placeholder="GitHub username" ref="user"></input><br/>
              <input type="password" placeholder="GitHub access token" ref="token"></input><br/>
              <input type="text" placeholder="GitHub repository" ref="repo"></input><br/>
              <input type="text" placeholder="Folder name" ref="folder"></input><br/>
              <input type="text" placeholder="File name" ref="file"></input><br/>
              <input type="checkbox" id="cbox1" ref="overwrite_checkbox"></input><label for="cbox1">overwrite github file</label><br/>
              <button type="submit">Post to GitHub</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}


// never got this to work, use Octokat library instead.
  // createOnGitHub() {
  //   debugger
  //   // window.ga('send', 'event', 'draftjs', 'load-data', 'ajax');
  //   this.setState({
  //     placeholder: 'Saving...',
  //   });

  //   const endpoint = "https://api.github.com/repos/riongull/blog/contents/pages/articles/drafts/new.json"
  //   var params = {
  //     message: "creating a file", 
  //     content: "test text",
  //   }

  //   const url = endpoint + this.buildParams(params);

  //   const req = new XMLHttpRequest();
  //   req.open('PUT', url, true);
  //   req.setRequestHeader('Content-Type', 'application/json');
  //   req.onreadystatechange = () => {
  //     if (req.readyState === 4) {

  //       console.info("file written to GitHub"
  //     }
  //   };
  //   req.send();
  // }