import React from 'react'
import { convertToRaw } from 'draft-js'

export const loadFromLocalStorage = (values, dispatch, props) => {
  // console.log('props in loadFromLocalStorage:', props)
  const { passContent } = props
  const localStorageContent = JSON.parse(localStorage.getItem('rawEditorContent'));
  console.log('localStorageContent:', localStorageContent)
  passContent(localStorageContent)
}

export const saveToLocalStorage = (values, dispatch, props) => {
  console.log('props in saveToLocalStorage:', props)
  // const rawEditorContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
  // localStorage.setItem('rawEditorContent',rawEditorContent);
}