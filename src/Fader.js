import React from 'react'
import {css, keyframes} from 'emotion'

export default class Fader extends React.Component {

    state = {
        closing: false
    }

    fadeOut = () => new Promise((resolve) => {

        this.setState({
            closing: true
        })

        setTimeout(resolve, 500)
    })

    render() {

        const scaleIn = keyframes`
            0% {
                transform: scale(0.1);
            }
            100% {
                transform: scale(1);
            }
        `

        const scaleOut = keyframes`
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(0.1);
            }
        `

        const fadeOut = keyframes`
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        `

        return (
            <div
                className={css`
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                `}
                onClick={this.props.onClick}
            >
                <div
                    className={css`
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        cursor: pointer;
                        transition: 200ms ease background-color;
                        background-color: rgba(0, 0, 0, 0.3);
                        &:hover {
                            background-color: rgba(0, 0, 0, 0.28);
                        }
                        &:active {
                            background-color: rgba(0, 0, 0, 0.2);
                        }
                        ${this.state.closing ? `animation: ${fadeOut} 200ms ease; animation-delay: 300ms;` : null}
                    `}
                    onClick={this.props.onClose}
                />
                <div
                    className={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1090;
                    background-color: #fff;
                    transform: ${this.state.closing ? 'scale(0)' : 'scale(1)'};
                    animation: ${this.state.closing ? scaleOut : scaleIn} 300ms cubic-bezier(0.4, 0, 0.2, 1);
                    @media (min-width: 768px) {
                        right: auto;
                        width: 600px;
                        left: calc(50vw - 300px);
                        top: 80px;
                        bottom: 80px;
                        border-radius: 6px;
                        overflow: hidden;
                    }
                `}
                    onClick={e => {
                        e.stopPropagation()
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}