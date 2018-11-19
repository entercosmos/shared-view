import React from 'react'
import {connect} from 'react-redux'
import SharedView from './SharedView'
import history from './services/history'
import initData from './services/initData'
import LoadingState from './LoadingState'
import Portal from './Portal'
import RecordDetailDialog from './RecordDetailDialog'

class SharedViewRoute extends React.Component {

    async componentDidMount() {
        await initData({
            id: this.props.match.params.shareId
        })
    }

    render() {

        const {record} = this.props
        const {shareId, recordId} = this.props.match.params

        return (
            <LoadingState>
                <SharedView
                    id={shareId}
                />
                {record ? (
                    <Portal>
                        <RecordDetailDialog
                            id={recordId}
                            shareId={shareId}
                            onClose={this.handleClosePrimaryRecord}
                        />
                    </Portal>
                ) : null}
            </LoadingState>
        )
    }

    handleClosePrimaryRecord = () => {
        history.push(`${this.props.match.params.shareId}`)
    }
}

export default connect((state, props) => ({
    record: state.getIn(['cache', 'Record', props.match.params.recordId])
}))(SharedViewRoute)