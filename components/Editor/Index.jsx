import React from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'medium-draft';
import 'medium-draft/lib/index.css';
import './style.css';

export default class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        this.propTypes = {
            editorContent: React.PropTypes.any,
        };

        const state = EditorState.createWithContent(convertFromRaw(this.props.editorContent));
        this.state = { editorState: state };

        this.onChange = (editorState) => {
            this.setState({ editorState });
            const rawEditorContent = JSON
                .stringify(convertToRaw(this.state.editorState.getCurrentContent()));
            localStorage.setItem('rawEditorContent', rawEditorContent);
            this.logData();
        };

        this.logData = this.logData.bind(this);
    }

    componentDidMount() {
        // this.refs.editor.focus();
    }

    componentWillReceiveProps(props) {
        console.log('props:', props);
        const editorStateFromPassedProps = EditorState
            .createWithContent(convertFromRaw(props.editorContent));
        console.log('editorStateFromPassedProps:', editorStateFromPassedProps);
        this.setState({ editorState: editorStateFromPassedProps });
    }

    logData() {
        console.group('Current Data:');
        console.info('selection:', this.state.editorState.getSelection().toJS());
        console.info('editor content - object:', this.state.editorState.getCurrentContent().toJS());
        console.info('editor content - raw:',
                     JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
        console.groupEnd();
        // window.ga('send', 'event', 'draftjs', 'log-data');
    }

    render() {
        return (
          <div id="content">
            <div className="editor">
              <Editor
                ref={(editor) => { this.editor = editor }}
                editorState={this.state.editorState}
                onChange={this.onChange} />
            </div>
          </div>
        );
    }
}

MyEditor.propTypes = {
    editorContent: React.PropTypes.any,
};

// was in constructor
    // code for gatsby develop only
    // these lines throw errors with Gatsby build, because of this: https://github.com/facebook/draft-js/issues/586
    // can use them with gatsby develop for playing around
    // const sampleMarkup = '<b>Bold text</b>, <i>Italic text</i>, unstyled text<br/ ><a href="http://www.facebook.com">Example link</a>';
    // const blocksFromHTML = convertFromHTML(sampleMarkup);
    // const state = ContentState.createFromBlockArray(blocksFromHTML);
    // this.state = {editorState: EditorState.createWithContent(state)};

    // console.group("Constructor Data");
    // console.info("sampleMarkup:", sampleMarkup);
    // console.info("blocksFromHTML:", blocksFromHTML);
    // console.info("state:", state);
    // console.groupEnd();

    // this.loadFromGitHub = this.loadFromGitHub.bind(this);
    // this.saveToGitHub = this.saveToGitHub.bind(this);
    // this.createOnGitHub = this.createOnGitHub.bind(this);
// end was in constructor

  // loadFromGitHub() {
  //   // window.ga('send', 'event', 'draftjs', 'load-data', 'ajax');
  //   this.setState({
  //     placeholder: 'Loading...',
  //   });

  //   const req = new XMLHttpRequest();
  //   req.open('GET', 'https://api.github.com/repos/riongull/blog/contents/pages/articles/data.json', true);
  //   req.onreadystatechange = () => {
  //     if (req.readyState === 4) {
  //       const responseText = req.responseText;
  //       const responseObj = JSON.parse(responseText);
  //       const base64content = responseObj.content;
  //       const content = JSON.parse(window.atob(base64content));

  //       console.group("Load Data")
  //       console.info("responseText:", responseText);
  //       console.info("responseObj:", responseObj);
  //       console.info("base64content:", base64content);
  //       console.info("content:", content);
  //       console.groupEnd();

  //       this.setState({
  //         editorState: createEditorState(content),
  //         placeholder: 'Write here...'
  //       }, () => {
  //         this.refs.editor.focus();
  //       });
  //       // window.ga('send', 'event', 'draftjs', 'data-success');
  //     }
  //   };
  //   req.send();
  // }

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

  // createOnGitHub () {
  //   var octo = new Octokat({token: ''});
  //   var repo = octo.repos('riongull', 'blog');
  //   var author = "Rion Gull"
  //   var contents = `
  //     #Testing
  //     This is a new markdown file
  //     Author: ${author}
  //     \`this is some code\`
  //     1. this is a list
  //     2. with two items
  //     And here's the **final** sentence.  Okay just one more with a [link](www.example.com).
  //   `
  //   var config = {
  //     message: 'Adding a file',
  //     // content: base64encode(contents),
  //     content: window.btoa(contents),
  //     // sha: '123456789abcdef', // add a blob SHA to update instead of create
  //     // branch: 'gh-pages'
  //   };

  //   repo.contents('testing.md').add(config)
  //   .then(function(info) {
  //     console.log('File Updated. new sha is ', info.commit.sha);
  //   });
  // }

  // saveToGitHub () {
  //   var octo = new Octokat({token: ''});
  //   var repo = octo.repos('riongull', 'blog');
  //   var path = 'pages/articles/drafts/somePost';
  //   var contents = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
  //   console.log(contents);

  //   var config = {
  //     message: 'Uploaded Draftjs state from editor',
  //     content: window.btoa(contents),
  //     // sha: '1db8b7e399bbbb28048774420c331673d235ab0b',
  //   };

  //   repo.contents(`${path}/data2.json`).add(config)
  //   .then(function(info) {
  //     console.log('File updated. New sha: ', info.commit.sha);
  //   });
  // }


        // <div className="editor-action">
        //   {/*<button onClick={this.logData}>Log Data</button><br/>*/}
        //   {/*<button onClick={this.createOnGitHub}>Create on GitHub</button><br/>*/}
        //   {/*<button onClick={this.saveToGitHub}>Save to GitHub</button><br/>*/}
        //   {/*<button onClick={this.loadFromGitHub}>Load from GitHub</button><br/>*/}
        //   {/*<button onClick={this.fetchFromGitHub}>Fetch from GitHub</button><br/><br/>*/}
        // </div>

          // <div>
          //   Load a draft entry from GitHub
          //   <form onSubmit={this.fetchFromGitHub} >
          //     <input type="text" placeholder="GitHub username" ref="fetch_user"></input><br/>
          //     <input type="password" placeholder="GitHuB access token" ref="fetch_token" /><br/>
          //     <input type="text" placeholder="GitHub repository" ref="fetch_repo"></input><br/>
          //     <input type="text" placeholder="Folder name" ref="fetch_folder"></input><br/>
          //     <input type="text" placeholder="File name" ref="fetch_file"></input><br/>
          //     <button type="submit">Fetch from GitHub</button>
          //   </form>
          // </div><br/>

          // <div>
          //   Save your draft above to GitHub
          //   <form onSubmit={this.postToGitHub} >
          //     <input type="text" placeholder="GitHub username" ref="user"></input><br/>
          //     <input type="password" placeholder="GitHub access token" ref="token"></input><br/>
          //     <input type="text" placeholder="GitHub repository" ref="repo"></input><br/>
          //     <input type="text" placeholder="Folder name" ref="folder"></input><br/>
          //     <input type="text" placeholder="File name" ref="file"></input><br/>
          //     <input type="checkbox" id="cbox1" ref="overwrite_checkbox" />
          //     <label for="cbox1">overwrite github file</label><br/>
          //     <button type="submit">Post to GitHub</button>
          //   </form>
          // </div>
