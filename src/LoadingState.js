import React from 'react'
import {css} from 'emotion'
import {connect} from 'react-redux'

class LoadingState extends React.Component {

    render() {

        if (this.props.loading || this.props.error) {
            return (
                <div
                    className={css`
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                    `}
                >
                    {this.props.error ? 'Not found' : 'Loading view'}
                </div>
            )
        }

        return this.props.children
    }
}

export default connect((state) => ({
    error: state.get('error'),
    loading: state.get('loading')
}))(LoadingState)