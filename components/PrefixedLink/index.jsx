import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

const PrefixedLink = React.createClass({
    propTypes: {
        style: React.PropTypes.any,
        to: React.PropTypes.string,
        exact: React.PropTypes.bool,
        content: React.PropTypes.any,
    },
    render() {
        const { to, ...props } = this.props;

        return (
          <Link to={prefixLink(to)} {...props} />
        )
    },
});


export default PrefixedLink;
