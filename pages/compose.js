import React from 'react'
import DocumentTitle from 'react-document-title'
import { RouteHandler, Link } from 'react-router'
import SiteSidebar from '../components/SiteSidebar'
import MyEditor from '../components/Editor'
import { config } from 'config'

export default class Composer extends React.Component {

  render () {
    return (
      <div>
        <SiteSidebar {...this.props}/>
        <div className='content'>
          <div className='main'>
            <div className='main-inner'>
              <MyEditor/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // render () {
  //   return (
  //     <div>
  //       <DocumentTitle title={ config.siteTitle }>
  //         <SiteSidebar {...this.props}/>
  //         <MyEditor/>
  //       </DocumentTitle>
  //     </div>
  //   )
  // }
}
