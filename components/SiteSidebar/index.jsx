import React from 'react';
import { config } from 'config';
import Link from '../PrefixedLink';
import SiteNav from '../SiteNav';
import SiteLinks from '../SiteLinks';
import './style.css';
import profilePic from '../../pages/dash_circle_normal.png';

class SiteSidebar extends React.Component {
    render() {
        const header = (
          <header>
            <Link
              style={{
                  textDecoration: 'none',
                  borderBottom: 'none',
                  outline: 'none',
              }}
              to="/"
            >
              <img src={profilePic} alt="User avatar" width="75" height="75" />
            </Link>
            <h1>
              <Link
                style={{
                    textDecoration: 'none',
                    borderBottom: 'none',
                    color: 'inherit',
                }}
                to="/"
              >
                { config.siteAuthor }
              </Link>
            </h1>

            <p>
              { config.siteDescr }
            </p>
          </header>
        );

        return (
          <div className="sidebar">
            <div className="sidebar-inner">
              <div className="blog-details">
                { header }
              </div>
              <div className="blog-options">
                <SiteNav {...this.props} />
                <footer>
                  <SiteLinks {...this.props} />
                </footer>
              </div>
            </div>
          </div>
        );
    }
}

// <p className='copyright'>
//   &copy; All rights reserved.
// </p>

SiteSidebar.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
};

export default SiteSidebar;
