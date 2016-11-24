import React from 'react'
import DocumentTitle from 'react-document-title'
import SitePost from '../components/SitePost'
import SitePage from '../components/SitePage'
import { config } from 'config'

class MarkdownWrapper extends React.Component {
    render() {
      debugger;
        const {route} = this.props
        const post = route.page.data
        console.log("post: ", post);
        let layout, template

        layout = post.layout

        if (layout !== 'page') {
            template = <SitePost {...this.props}/>
            console.log("template for post: ", template)
        } else {
            template = <SitePage {...this.props}/>
            console.log("template for page: ", template)
        }

        return (
            <DocumentTitle title={ `${post.title} - ${config.siteTitle}` }>
              <div>
                { template }
              </div>
            </DocumentTitle>
        );
    }
}

MarkdownWrapper.propTypes = {
    route: React.PropTypes.object,
}

export default MarkdownWrapper
