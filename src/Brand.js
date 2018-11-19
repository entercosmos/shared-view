import React from 'react'
import {css} from 'emotion'
import icons from './services/icons'

export default class Brand extends React.Component {

    render() {

        return (
            <a
                href={'https://entercosmos.io'}
                target={'_blank'}
                className={css`
                    background-color: #000;
                    border-radius: 50%;
                    font-size: 12px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    width: 44px;
                    height: 44px;
                    justify-content: center;
                `}
            >
                {icons.logo({width: 28, color: '#fff'})}
            </a>
        )
    }
}