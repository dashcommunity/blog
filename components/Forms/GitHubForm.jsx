import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import 'bootstrap/dist/css/bootstrap.css'
import { Select, Input, Checkbox, TextArea } from './FormElements'
import { loadFromGitHub, saveToGitHub, publish } from './gitHubHelpers'
import { loadFromLocalStorage, saveToLocalStorage } from './localStorageHelpers'
import { auth } from '../Auth';

let GitHubForm = (props) => {
    let { username } = props;
    const { handleSubmit, action, repo, path, file } = props;

    username = username || auth.getUsername();

    let submitFn = () => {};
    let submitText = '';
    let message = ['action', 'from', 'to'];
    const show = {};
    const formFields = [
        'username',
        'repo',
        'path',
        'file',
        'token',
        'author',
        'title',
        'excerpt',
        'overwrite',
    ];
    const showFields = (formFieldNames, ...fields) => {
        formFields.forEach(field => { show[field] = false });

        fields.forEach(field => {
            show[field] = true
        });
    };

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
            message = ['load', `github.com/${username}/${repo}/${path}/${file}`, 'the editor above']
            showFields(formFields, 'username', 'repo', 'path', 'file', 'message', 'button')
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
            message = [
                'save',
                'the editor above',
                `github.com/${username}/${repo}/${path}/${file}`,
            ];
            showFields(
                formFields,
                'username',
                'repo',
                'path',
                'file',
                'overwrite',
                'message',
                'button');
            break;

        case 'publish':
            submitFn = publish;
            submitText = 'Publish';
            message = ['send a request to publish', 'the editor above', 'the Dash Community Blog']
            showFields(formFields,
                'author',
                'title',
                'excerpt',
                'overwrite',
                'message',
                'button')
            break;

        default:
            console.log('no valid action in switch');
    }

    const availableFields = [
        {
            component: Input,
            type: 'text',
            labelText: 'User',
            name: 'username',
            placeholder: 'Your GitHub User or Org name (e.g. "riongull", "dashcommunity")',
            value: username,
        },
        {
            component: Input,
            type: 'text',
            labelText: 'Repository',
            name: 'repo',
            placeholder: 'The repository to store your draft (e.g. "blog")',
        },
        {
            component: Input,
            type: 'text',
            labelText: 'Path',
            name: 'path',
            placeholder: 'The path in the repo where you want to save the draft',
        },
        {
            component: Input,
            type: 'text',
            labelText: 'Author',
            name: 'author',
            placeholder: 'Your name (e.g. "Satoshi Nakamoto")',
        },
        {
            component: Input,
            type: 'text',
            labelText: 'Title',
            name: 'title',
            placeholder: 'Article title (e.g. "Why I love Dash")',
        },
        {
            component: TextArea,
            type: 'text',
            labelText: 'Excerpt',
            name: 'excerpt',
            placeholder: 'Excerpt from the article (e.g., the first paragraph)',
        },
        {
            component: Input,
            type: 'text',
            labelText: 'File',
            name: 'file',
            placeholder: 'The name of the draft',
        },
        {
            component: Input,
            type: 'text',
            labelText: 'GitHub Token',
            name: 'token',
            placeholder: 'Your personal GitHub access token',
        },
        {
            component: Checkbox,
            type: 'checkbox',
            name: 'overwrite',
            descText: 'Overwrite contents',
            id: 'overwrite',
        },
    ];

    const shownFields = availableFields
            .filter(field => show[field.name])
            .map(field => <Field {...field} />);

    if (show.message) {
        shownFields.push(
          <p>
              Clicking below will { message[0] } the contents from { message[1] } to { message[2] }
          </p>
        )
    }

    if (show.button) {
        shownFields.push(
          <button type="submit" name="button" className="btn btn-primary">
            { submitText }
          </button>
        )
    }
    return (
      <div>
        <form onSubmit={handleSubmit(submitFn)}>
          <Field component={Select} name="action" />
          { shownFields }
        </form>
      </div>
    );
}

GitHubForm.propTypes = {
    handleSubmit: React.PropTypes.func,
    action: React.PropTypes.any,
    username: React.PropTypes.string,
    repo: React.PropTypes.string,
    path: React.PropTypes.string,
    file: React.PropTypes.string,
};

GitHubForm = reduxForm({
    form: 'gitHubForm',
    // onSubmit: submitFn
})(GitHubForm);

export default GitHubForm = connect((state) => {
    // const { initialValues } = state
    const formValues = formValueSelector('gitHubForm')(
            state,
            'action',
            'username',
            'token',
            'repo',
            'path',
            'file',
            'overwrite'
        );

    const { action, username, token, repo, path, file, overwrite } = formValues;
    // add initialValues when initialValues reducer has been set up

    return { action, username, token, repo, path, file, overwrite };
})(GitHubForm);
