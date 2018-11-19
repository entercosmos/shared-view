import React from 'react'
import {connect} from 'react-redux'
import {cx, css} from 'emotion'
import icons from './services/icons'

class NavigationBar extends React.Component {

    render() {

        return (
            <div
                className={cx(css`
                    position: ${this.props.fixed ? 'fixed' : 'absolute'};
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 60px;
                    border-bottom: 1px solid rgba(114,121,133,.3);
                    z-index: 1030;
                    display: flex;
                    background-color: #fff;
                `, this.props.className)}
            >
                {this.props.children}
            </div>
        )
    }
}

const NavigationBarTitle = ({title, className}) => (
    <div
        className={cx(
            css`
                font-size: 18px;
                height: 60px;
                flex-grow: 1;
                font-weight: 600;
                align-items: center;
                display: flex;
                justify-content: center;
                user-select: none;
            `
            , className)}
    >
        {title}
    </div>
)

const NavigationBarContent = ({children, className}) => (
    <div
        className={cx(css`
            height: 60px;
            align-items: center;
            display: flex;
            flex-grow: 1;
            justify-content: center;
        `, className)}
    >
        {children}
    </div>
)

const buttonIcons = {
    arrowLeft: () => icons.arrowLeft({width: 16}),
    dotsY: () => icons.dotsY({width: 16}),
    dotsX: () => icons.dotsX({width: 16}),
}

const NavigationBarButton = ({icon, title, onClick, className, renderIcon}) => {

    renderIcon = icon && buttonIcons[icon] ? buttonIcons[icon] : renderIcon

    return (
        <div
            className={css`
                padding-left: 16px;
                padding-right: 16px;
                align-items: center;
                display: flex;
            `}
        >
            <div
                className={cx(css`
                width: 40px;
                height: 40px;
                border: none;
                background: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f9f9f9;
                &:hover {
                    background-color: #eee;
                    color: #000;
                }
                &:active {
                    background-color: #ccc;
                    color: #000;
                }
        `, className)}
                onClick={onClick}
            >
                {renderIcon ? renderIcon() : null}
            </div>
        </div>
    )
}

const NavigationBarPlaceholder = ({className}) => (
    <div
        className={cx(
            css`
                display: flex;
                align-items: center;
                padding-left: 16px;
                padding-right: 16px;
            `,
            className
        )}
    >
        <div
            className={cx(css`
            width: 40px;
            height: 40px;
        `)}
        />
    </div>
)

NavigationBar.Title = NavigationBarTitle
NavigationBar.Content = NavigationBarContent
NavigationBar.Button = NavigationBarButton
NavigationBar.Placeholder = NavigationBarPlaceholder

export default NavigationBar