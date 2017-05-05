import React from 'react';
import { prefixLink } from 'gatsby-helpers';
import Link from '../PrefixedLink';
import './style.css';

class SiteNav extends React.Component {
    constructor() {
        super();
        this.navLinks = [
            { text: 'Articles', route: '/' },
            { text: 'About', route: '/about/' },
            { text: 'Compose', route: '/compose/' },
        ];
    }

    checkIfRouteIsActive(path) {
        return this.props.location.pathname === prefixLink(path) ? 'current' : null;
    }

    render() {
        const linkList = this.navLinks.map(link => (
          <li>
            <Link to={link.route} className={this.checkIfRouteIsActive(link.route)}>
              { link.text }
            </Link>
          </li>
        ));

        return (
          <nav className="blog-nav">
            <ul>
              { linkList }
            </ul>
          </nav>
        );
    }
}

SiteNav.propTypes = {
    location: React.PropTypes.object,
};

export default SiteNav;
