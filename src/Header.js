import React from 'react'
import {css} from 'emotion'

export default class Header extends React.Component {

    render() {

        return (
            <div
                className={css`
                    position: fixed;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    height: 40px;
                    background-color: #fff;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                `}
            >
                <div
                    className={css`
                        font-weight: 600;
                        flex-grow: 1;
                        text-align: center;
                    `}
                >
                    {this.props.title}
                </div>
            </div>
        )
    }
}