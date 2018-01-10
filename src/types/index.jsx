import PropTypes from 'prop-types';
import React from 'react';

export const postType = PropTypes.shape(
    {
        post_id: PropTypes.number.isRequired,
        post_name: PropTypes.string.isRequired,
        short_description: PropTypes.string.isRequired,
        rait: PropTypes.number.isRequired,
        author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        blog: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
        created_at: PropTypes.string.isRequired,
        category: PropTypes.array.isRequired,
    }
);
