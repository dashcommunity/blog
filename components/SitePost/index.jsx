import React from 'react'
import moment from 'moment';
import { Route } from 'react-router';
import { config } from 'config';
import Link from '../PrefixedLink';
import ReadNext from '../ReadNext';
import './style.css';
import '../../static/css/highlight.css';

class SitePost extends React.Component {
    render() {
        const { route } = this.props;
        const post = route.page.data;
        const home = (
          <div>
            <Link className="gohome" to="/">
              All Articles
            </Link>
          </div>
        );

        return (
          <div>
            { home }
            <div className="blog-single">
              <div className="text">
                <h1>{ post.title }</h1>

                <div dangerouslySetInnerHTML={{ __html: post.body }} />

                <div className="date-published">
                  <em>
                    Published { moment(post.date).format('D MMM YYYY ') }
                    by { post.author }
                  </em>
                </div>
              </div>

              <div className="footer">
                <ReadNext post={post} {...this.props} />

                <hr className="hr" />

                <p>
                  { config.siteDescr }
                </p>

                <p>
                  <a href={config.siteGithubUrl}>
                    <strong>{ config.siteAuthor }</strong>
                    on GitHub
                  </a>
                </p>
              </div>
            </div>
          </div>
        );
    }
}

SitePost.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
    route: Route,
}

export default SitePost
