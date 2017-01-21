import React from 'react'
import Octokat from 'octokat'
import { convertToRaw, convertFromRaw } from 'draft-js'
import { stateToMarkdown } from 'draft-js-export-markdown'


export const publish = (values) => {
  const { token, author, title, sample, overwrite } = values;
  const username = `riongull`; // `dashcommunity` when ready (after testing)
  const repo = `blog`;
  const date = `2017-01-20`;
  const path = title.replace(/\s+/g, '-').toLowerCase();
  const folder = `${date}-${path}`;
  const markdownFrontMatter = 
`---
author: "${author}"
title: "${title}"
date: "${date}T14:30:00.000Z"
layout: post
path: "/${path}/"
description: "${sample}"
---
`;
  const rawEditorContent = JSON.parse(localStorage.getItem('rawEditorContent'));
  const contentState = convertFromRaw(rawEditorContent);
  const markdownBody = stateToMarkdown(contentState);
  const markdown = `${markdownFrontMatter}${markdownBody}`
  
  console.info('values-publish:', values)
  console.info('rawEditorContent:', rawEditorContent);
  console.info('contentState:', contentState);
  console.info('markdown:', markdown);

  const b64EditorContent = window.btoa(markdown);
  const config = {
    message: overwrite ? `Updated post: ${title}, by ${author}`: `New post: ${title}, by ${author}`,
    content: b64EditorContent,
    sha: overwrite ? localStorage.getItem('shaOfGitHubFile') : null
  };

  const ghRequest = new Octokat({token: `${token}`});
  ghRequest.repos(`${username}`, `${repo}`).contents(`pages/articles/${folder}/index.md`).add(config)
  .then((res) => {
    console.info('ghRes-save:', res);
    localStorage.setItem('shaOfGitHubFile',res.content.sha);
  });
}

export const saveToGitHub = (values) => {
  console.log('values-save:', values)
  const { username, token, repo, folder, file, overwrite } = values;
  const b64EditorContent = window.btoa(localStorage.getItem('rawEditorContent'));
  const config = {
    message: overwrite ? 'Overwrote existing file from editor' : 'Created new file from editor',
    content: b64EditorContent,
    sha: overwrite ? localStorage.getItem('shaOfGitHubFile') : null
  };

  const ghRequest = new Octokat({token: `${token}`});  
  ghRequest.repos(`${username}`, `${repo}`).contents(`pages/articles/drafts/${folder}/${file}`).add(config)
  .then((res) => {
    console.info('ghRes-save:', res);
    localStorage.setItem('shaOfGitHubFile',res.content.sha);
  });
}

export const loadFromGitHub = (values, dispatch, props) => {
  console.log('values-load:', values)
  console.log('dispatch-load:', dispatch)
  console.log('props-load:', props)
  
  const { username, token, repo, folder, file } = values;
  const { passContent } = props;
  
  const ghRequest = new Octokat({token: `${token}`});  
  ghRequest.repos(`${username}`, `${repo}`).contents(`pages/articles/drafts/${folder}/${file}`).fetch() // `.read` for raw file, `.fetch` for JSON
  .then((res) => {
    console.info('ghRes-load:', res)
    passContent(JSON.parse(window.atob(res.content)))
    // localStorage.setItem('rawEditorContent', window.atob(res.content));
    // localStorage.setItem('shaOfGitHubFile', `${res.sha}`);
  });
}