import React from 'react'
import {css} from 'emotion'
import {connect} from 'react-redux'
import RecordDetail from '@cmds/record-detail'
import Fader from './Fader'
import selectors from './services/selectors'
import fieldRenderer from './utils/fieldRenderer'

class RecordDetailDialog extends React.Component {

    render() {

        const {
            id,
            fields,
            visibleFieldOrder,
            onClose
        } = this.props

        return (
            <Fader
                onClose={onClose}
            >
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
            </Fader>
        )
    }
}

export default connect((state, props) => {

    console.log('props', props)

    const x = {
        fields: selectors.fields(state, {id: props.shareId}),
        visibleFieldOrder: selectors.fieldOrder(state, {id: props.shareId})
    }
    console.log('x', x)

    return x
})(RecordDetailDialog)