import React from 'react';
import { loadFromGitHub, saveToGitHub, publish } from '../gitHubHelpers';
import { loadFromLocalStorage, saveToLocalStorage } from '../localStorageHelpers';

export default (field) => {
    const propsi = { handleSubmit() {}, username: '', repo: '', path: '', file: '' };
    const { username, repo, path, file } = propsi;
    const refCb = (el) => { if (el) { el.focus(); el.blur(); } };

    const actions = [
        {
            name: 'blank',
            submitFn: () => {},
            title: 'Select an option',
            message: [],
            visibleFields: [],
        },
        {
            name: 'load-ls',
            submitFn: loadFromLocalStorage,
            title: 'Load from Local Storage',
            message: ['load', 'your browser\'s local storage', 'the editor above'],
            visibleFields: ['file', 'message', 'button'],
        },
        {
            name: 'load-gh',
            submitFn: loadFromGitHub,
            title: 'Load from GitHub',
            message: ['load', `github.com/${username}/${repo}/${path}/${file}`, 'the editor above'],
            visibleFields: ['username', 'repo', 'path', 'file', 'token', 'message', 'button'],
        },
        {
            name: 'save-ls',
            submitFn: saveToLocalStorage,
            title: 'Save Locally',
            message: ['save', 'the editor above', 'your browser\'s local storage'],
            visibleFields: ['file', 'overwrite', 'message', 'button'],
        },
        {
            name: 'save-gh',
            submitFn: saveToGitHub,
            title: 'Save to GitHub',
            message: ['save', 'the editor above', `github.com/${username}/${repo}/${path}/${file}`],
            visibleFields: [
                'username',
                'repo',
                'path',
                'file',
                'token',
                'overwrite',
                'message',
                'button',
            ],
        },
        {
            name: 'publish',
            submitFn: publish,
            title: 'Save to GitHub',
            message: ['save', 'the editor above', `github.com/${username}/${repo}/${path}/${file}`],
            visibleFields: [
                'author',
                'title',
                'excerpt',
                'token',
                'overwrite',
                'message',
                'button',
            ],
        },
    ];
    return (
      <div className="form-group row"> {/* pass in passContent here maybe? */}
        <label className="col-2 col-form-label" htmlFor="submit-compose">Action</label>
        <div className="col-10">
          <select {...field} {...field.input} className="form-control" name="submit-compose" ref={refCb}>
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
};
