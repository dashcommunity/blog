import React from 'react'
import ReactDOM from 'react-dom'
import Octokat from 'octokat'

// import { 
//   Form,
//   FormGroup,
//   Col,
//   ControlLabel, 
//   FormControl,
//   Checkbox,
//   Button, 
// } from 'react-bootstrap'

import { convertToRaw } from 'draft-js'

import 'bootstrap/dist/css/bootstrap.css'

export default class SaveForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: props.editorState,
      testText: 'default text',
      username: 'rion',
      checkbox: 'unchecked?'
    };

    this.fetchFromGitHub = this.fetchFromGitHub.bind(this);
    this.postToGitHub = this.postToGitHub.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    // this.onFieldUsernameChange = this.onFieldUsernameChange.bind(this);

  }

  fetchFromGitHub (e) {
    event.preventDefault();

    const token = this.refs.fetch_token.value;
    const username = this.refs.fetch_user.value;
    const repo = this.refs.fetch_repo.value;
    const folder = this.refs.fetch_folder.value;
    const file = this.refs.fetch_file.value;

    var octo = new Octokat({token: `${token}`});
    var repository = octo.repos(`${username}`, `${repo}`);
    var path = `pages/articles/drafts/${folder}`;

    console.group("Fetch Data")
    // console.info("this:", this)

    repository.contents(`${path}/${file}`).fetch()    // `.read` to get raw file, `.fetch` to get JSON
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

  // onFieldUsernameChange (e) {
  //   console.log(e);
  //   this.setState({username: e.target.value})
  // }
  
  postToGitHub (e) {
    e.preventDefault();

    // const b64EditorContent = "change me";
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const token = ReactDOM.findDOMNode(this.refs.token).value;
    const repo = ReactDOM.findDOMNode(this.refs.repo).value;
    const folder = ReactDOM.findDOMNode(this.refs.folder).value;
    const file = ReactDOM.findDOMNode(this.refs.file).value;
    const overwrite = ReactDOM.findDOMNode(this.refs.overwrite).checked;  // checked: true; unchecked: falso
    // const overwrite2 = ReactDOM.findDOMNode.querySelector('input');

    const octo = new Octokat({token: `${token}`});
    const repository = octo.repos(`${username}`, `${repo}`);
    const path = `pages/articles/drafts/${folder}`;
    const b64EditorContent = window.btoa(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
        
    const newFileConfig = {
      message: 'Created new file from editor',
      content: b64EditorContent,
    };

    const overwriteFileConfig = {
      message: 'Overwrote existing file from editor',
      content: b64EditorContent,
      // sha: this.state.sha,
    };

    const config = overwrite ? overwriteFileConfig : newFileConfig;

    console.group("Post Data")
    // console.info("this:", this);
    // console.info("e",e);
    console.info("file:", file);
    console.info("overwrite:", overwrite);
    // console.info("overwrite2:", overwrite2);
    console.info("config:", config);

    repository.contents(`${path}/${file}`).add(config)
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

  // render () {
  //   return (
  //     <div>
  //       <h5>Save your draft above to GitHub!</h5><br/>
  //       <Form horizontal onChange={console.log("hi from Form")/*this.onFormChange.bind(this)*/} onSubmit={this.postToGitHub.bind(this)}>

  //         <input onChange={(event) => {
  //           console.log(event);
  //           this.setState({testText: event.target.value});
  //         }}/>
  //         Test Text: {this.state.testText}

  //         <FormGroup controlId="formUsername">
  //           <Col componentClass={ControlLabel} sm={2}>
  //             User
  //           </Col>
  //           <Col sm={10}>
  //             <FormControl onChange={event => this.setState({username: event.target.value})} type="text" ref="username" defaultValue='riongull' placeholder="Your GitHub username (e.g. riongull)" />
  //             Username: {this.state.username}
  //           </Col>
  //         </FormGroup>

  //         <FormGroup controlId="formToken">
  //           <Col componentClass={ControlLabel} sm={2}>
  //             Token
  //           </Col>
  //           <Col sm={10}>
  //             <FormControl type="text" ref="token" placeholder="Your GitHub personal access token (e.g. ajkl203t4n2njk2d)" />
  //           </Col>
  //         </FormGroup>

  //         <FormGroup controlId="formRepo">
  //           <Col componentClass={ControlLabel} sm={2}>
  //             Repo
  //           </Col>
  //           <Col sm={10}>
  //             <FormControl type="text" ref="repo" placeholder="GitHub repository to store data (e.g. blog)" />
  //           </Col>
  //         </FormGroup>

  //         <FormGroup controlId="formFolder">
  //           <Col componentClass={ControlLabel} sm={2}>
  //             Folder
  //           </Col>
  //           <Col sm={10}>
  //             <FormControl type="text" ref="folder" placeholder="Folder under repo to store draft (e.g. todo)" />
  //           </Col>
  //         </FormGroup>

  //         <FormGroup controlId="formFile">
  //           <Col componentClass={ControlLabel} sm={2}>
  //             File
  //           </Col>
  //           <Col sm={10}>
  //             <FormControl type="text" ref="file" placeholder="Name to give to draft contents (e.g. rev2)" />
  //           </Col>
  //         </FormGroup>

  //         <FormGroup controlId="test-something">
  //           <Col smOffset={2} sm={10}>
  //             <Checkbox onChange={event => this.setState({checkbox: event.target.value})} ref="overwrite">Overwrite file</Checkbox>
  //             Checkbox value: {this.state.checkbox}
  //           </Col>
  //         </FormGroup>

  //         <FormGroup>
  //           <Col smOffset={2} sm={10}>
  //             <Button type="submit">
  //               Save draft
  //             </Button>
  //           </Col>
  //         </FormGroup>

  //       </Form>
  //     </div>
  //   );
  // }
}