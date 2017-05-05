import React from 'react';
import { config } from 'config';
import './style.css';
import '../../static/fonts/fontawesome/style.css';

class SiteLinks extends React.Component {
    constructor() {
        super();

        this.shareLinks = [
          { href: config.siteGithubUrl, iconClass: 'github' },
          { href: config.siteRedditUrl, iconClass: 'reddit-alien' },
          { href: config.siteYoutubeUrl, iconClass: 'youtube' },
          { href: config.siteSlackUrl, iconClass: 'slack' },
          { href: config.siteTelegramUrl, iconClass: 'paper-plane' },
          { href: config.siteTwitterUrl, iconClass: 'twitter' },
        ];
    }

    render() {
        const linkMarkup = this.shareLinks.map(link => (
          <li>
            <a href={link.href}>
              <i className={`fa fa-${link.iconClass}`} />
            </a>
          </li>
        ));

        return (
          <div className="blog-social">
            <ul>
              { linkMarkup }
            </ul>
          </div>
        );
    }
}

export default SiteLinks;
