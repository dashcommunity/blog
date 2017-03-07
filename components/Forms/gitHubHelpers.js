import React from 'react'
import Octokat from 'octokat'
import { convertToRaw, convertFromRaw } from 'draft-js'
import { stateToMarkdown } from 'draft-js-export-markdown'
import { stateFromMarkdown } from 'draft-js-import-markdown'
import moment from 'moment'


export const publish = (values) => {
  const { token, author, title, sample, overwrite } = values;
  const username = `dashcommunity`; // `riongull` for testing, dashcommunity` for production
  const repo = `blog`;
  const date = moment().format('YYYY-MM-DD');
  const time = moment().format("HH:mm:ss.SSS");
  const spinalTitle = title.replace(/\s+/g, '-').toLowerCase();
  const path = `${date}-${spinalTitle}`;
  const markdownFrontMatter = 
`---
author: "${author}"
title: "${title}"
date: "${date}T${time}Z"
layout: post
path: "/${path}/"
description: "${sample}"
---
`;
  const rawEditorContent = localStorage.getItem('rawEditorContent');
  const contentState = convertFromRaw(JSON.parse(rawEditorContent));
  const markdownBody = stateToMarkdown(contentState);
  const markdown = `${markdownFrontMatter}${markdownBody}`

  console.group('publish data:')
  console.info('values-publish:', values)
  console.info('rawEditorContent:', rawEditorContent);
  console.info('contentState:', contentState);
  console.info('markdown:', markdown);
  console.groupEnd()

  const b64EditorContent = window.btoa(markdown);
  const config = {
    message: overwrite ? `Updated post: ${title}, by ${author}`: `New post: ${title}, by ${author}`,
    content: b64EditorContent,
    sha: overwrite ? localStorage.getItem('shaOfGitHubFile') : null
  };

  const ghRequest = new Octokat({token: `${token}`});
  ghRequest.repos(`${username}`, `${repo}`).contents(`pages/articles/${path}/index.md`).add(config)
  .then((res) => {
    console.info('ghRes-save:', res);
    localStorage.setItem('shaOfGitHubFile',res.content.sha);
  });
}

export const saveToGitHub = (values) => {
  const { username, token, repo, path, file, overwrite } = values;
  const isMarkdown = file.slice(-3) === '.md' ? true : false
  const rawEditorContent = localStorage.getItem('rawEditorContent')
  const contentToSend = isMarkdown ? stateToMarkdown(convertFromRaw(JSON.parse(rawEditorContent))) : rawEditorContent
  console.group('saveToGitHub data:')
  console.info('values:', values)
  console.info('rawEditorContent:', rawEditorContent)
  console.info('contentToSend:', contentToSend)
  console.groupEnd()
  const b64EditorContent = window.btoa(contentToSend)
  const config = {
    message: overwrite ? 'Overwrote existing file from editor' : 'Created new file from editor',
    content: b64EditorContent,
    sha: overwrite ? localStorage.getItem('shaOfGitHubFile') : null
  };

  const ghRequest = new Octokat({token: `${token}`});  
  ghRequest.repos(`${username}`, `${repo}`).contents(`${path}/${file}`).add(config)
  .then((res) => {
    console.info('ghRes-save:', res);
    localStorage.setItem('shaOfGitHubFile',res.content.sha);
  });
}

export const loadFromGitHub = (values, dispatch, props) => {
  // console.log('values-load:', values)
  // console.log('dispatch-load:', dispatch)
  // console.log('props-load:', props)
  
  const { username, token, repo, path, file } = values;
  const { passContent } = props;
  
  const ghRequest = new Octokat({token: `${token}`});  
  ghRequest.repos(`${username}`, `${repo}`).contents(`${path}/${file}`).fetch() // `.read` for raw file, `.fetch` for JSON
  .then((res) => {
    const isMarkdown = res.name.slice(-3) === '.md' ? true : false
    const contentString = window.atob(res.content)
    const content = isMarkdown ? convertToRaw(stateFromMarkdown(contentString)) : JSON.parse(contentString)
    console.group('loadFromGitHub data:')
    console.info('ghRes-load:', res)
    console.info('isMarkdown:', isMarkdown)
    console.info('contentString:', contentString)
    console.info('content:', content)
    console.groupEnd()
    passContent(content)
    // localStorage.setItem('rawEditorContent', window.atob(res.content));
    // localStorage.setItem('shaOfGitHubFile', `${res.sha}`);
  });
}