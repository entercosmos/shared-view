import React from 'react'
import {css} from 'emotion'

export default class NotFound extends React.Component {

    render() {

        return (
            <div
                className={css`
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `}
            >
                Not found
            </div>
        )
    }
}