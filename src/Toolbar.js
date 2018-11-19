import React from 'react'
import {css} from 'emotion'

export default class Toolbar extends React.Component {

    render() {

        return (
            <div
                className={css`
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 40px;
                    height: 40px;
                    background-color: #fff;
                    border-bottom: 1px solid #ccc;
                    z-index: 10;
                `}
            >
                {this.props.children}
            </div>
        )
    }
}