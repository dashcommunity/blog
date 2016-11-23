import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import './style.css'
import '../../static/fonts/fontawesome/style.css'

class SiteLinks extends React.Component {
    render() {
        return (
            <div className='blog-social'>
              <ul>
                <li>
                  <a href={ config.siteGithubUrl }><i className='fa fa-github'></i></a>
                </li>
                <li>
                  <a href={ config.siteRedditUrl }><i className='fa fa-reddit-alien'></i></a>
                </li>
                <li>
                  <a href={ config.siteYoutubeUrl }><i className='fa fa-youtube'></i></a>
                </li>
                <li>
                  <a href={ config.siteSlackUrl }><i className='fa fa-slack'></i></a>
                </li>
                <li>
                  <a href={ config.siteTelegramUrl }><i className='fa fa-paper-plane'></i></a>
                </li>
                <li>
                  <a href={ config.siteTwitterUrl }><i className='fa fa-twitter'></i></a>
                </li>
              </ul>
            </div>
        );
    }
}

export default SiteLinks
