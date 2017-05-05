import React from 'react';
import SiteSidebar from '../SiteSidebar';
import { rawDefaultEditorContent } from '../Editor/defaultEditorContent';
import GitHubForm from '../Forms/GitHubForm';
import MyEditor from '../Editor';
import { LoginButton } from '../Forms/ComposeFormElements';
import { auth } from '../Auth';

export default class ComposePage extends React.Component {
    constructor () {
        super();
        this.state = {
            editorContent: rawDefaultEditorContent,
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoggedIn: !!auth.getUser() });
    }

    render () {
        const passEditorContent = (editorContent) => { // https://www.youtube.com/watch?v=5Xew--ycx0o&list=PL55RiY5tL51oyA8euSROLjMFZbXaV7skS&index=4#t=165.980087
            console.log('editorContent in ComposePage:', editorContent);
            this.setState({ editorContent });
        };
        const login = () => {
            this.setState({
                isLoggedIn: true,
            });
        };
        let form;
        if (this.state.isLoggedIn) {
            form = <GitHubForm passContent={passEditorContent} />
        } else {
            form = <LoginButton onSubmit={login} />
        }
        return (
          <div>
            <SiteSidebar {...this.props} />
            <div className="content">
              <div className="main">
                <div className="main-inner">
                  <MyEditor editorContent={this.state.editorContent} />
                  { form }
                </div>
              </div>
            </div>
          </div>
        );
    }
}
