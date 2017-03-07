import React from 'react'
import { convertToRaw } from 'draft-js'

export const loadFromLocalStorage = (values, dispatch, props) => {
  console.group('loadFromLocalStorage data:')
  const localStorageObj = Object.keys(localStorage).reduce(function(obj, str) { 
    obj[str] = localStorage.getItem(str)
    return obj
  }, {})
  
  const { passContent } = props
  const { file } = values
  const localStorageContent = JSON.parse(localStorageObj[file])
  passContent(localStorageContent)
  console.info('localStorageContent:', localStorageContent)
  console.groupEnd()
}

export const saveToLocalStorage = (values, dispatch, props) => {
  console.group('saveToLocalStorage data:')
  const localStorageObj = Object.keys(localStorage).reduce(function(obj, str) { 
    obj[str] = localStorage.getItem(str)
    return obj
  }, {})  
  console.info('localStorageObj:', localStorageObj)

  const { file, overwrite } = values
  const realTimeEditorContent = localStorage.getItem('rawEditorContent')
  const localStorageContentOfFile = localStorage.getItem(`${file}`)
  console.info('file:', file)
  console.info('overwrite:', overwrite)
  console.info('realTimeEditorContent:', realTimeEditorContent)
  console.info('localStorageContentOfFile:', localStorageContentOfFile)
  localStorage.setItem(`${file}`,realTimeEditorContent)
  console.groupEnd()
}