import React from 'react'
import {css} from 'emotion'
import {connect} from 'react-redux'
import RecordDetail from '@cmds/record-detail'
import Fader from './Fader'
import selectors from './services/selectors'
import fieldRenderer from './utils/fieldRenderer'
import NavigationBar from './NavigationBar'
import RecordLoading from './RecordLoading'

class RecordDetailDialog extends React.Component {

    render() {

        const {
            id,
            fields,
            visibleFieldOrder
        } = this.props

        return (
            <Fader
                onClose={this.onClose}
            >
                <NavigationBar>
                    <NavigationBar.Button
                        icon={'arrowLeft'}
                        onClick={this.onClose}
                    />
                    <NavigationBar.Title
                        title={this.props.name || 'Untitled'}
                    />
                    <NavigationBar.Placeholder />
                </NavigationBar>
                <div
                    className={css`
                        position: absolute;
                        top: 60px;
                        right: 0;
                        left: 0;
                        bottom: 0;
                    `}
                >
                    <RecordLoading id={this.props.id}>
                        <div
                            className={css`
                                position: absolute;
                                top: 0;
                                right: 0;
                                left: 0;
                                bottom: 0;
                                overflow-x: hidden;
                                overflow-y: auto;
                            `}
                        >
                            <RecordDetail
                                id={id}
                                roleId={'readOnly'}
                                fields={fields}
                                visibleFieldOrder={visibleFieldOrder}
                                fieldRenderer={fieldRenderer}
                            />
                        </div>
                    </RecordLoading>
                </div>
            </Fader>
        )
    }

    onClose = () => {

        this.props.onClose({
            id: this.props.id,
            index: this.props.index
        })
    }
}

export default connect((state, props) => ({
    name: selectors.recordName(state, {id: props.id}),
    fields: selectors.recordFields(state, {id: props.id}),
    visibleFieldOrder: selectors.recordVisibleFieldOrder(state, {id: props.id})
}))(RecordDetailDialog)