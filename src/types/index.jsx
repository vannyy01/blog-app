
import PropTypes from 'prop-types';
import React from 'react';

export const postType = PropTypes.shape(
    {
        post_id: PropTypes.number.isRequired,
        post_name: PropTypes.string.isRequired,
        post_text: PropTypes.string.isRequired,
        rait: PropTypes.number.isRequired,
        user_id: PropTypes.number,
        author: PropTypes.shape({
            id:PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        blog: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            s_desc: PropTypes.string.isRequired,
        }),
        blog_id: PropTypes.number,
        category_id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
    }
);
