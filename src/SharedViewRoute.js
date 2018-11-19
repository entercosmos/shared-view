import React from 'react'
import {connect} from 'react-redux'
import SharedView from './SharedView'
import history from './services/history'
import initData from './services/initData'
import LoadingState from './LoadingState'
import Portal from './Portal'
import RecordLoading from './RecordLoading'
import RecordDetailDialog from './RecordDetailDialog'

class SharedViewRoute extends React.Component {

    async componentDidMount() {
        await initData({
            id: this.props.match.params.shareId
        })
    }

    render() {

        const {shareId, recordId} = this.props.match.params

        let {openRecords} = this.props

        if (recordId) {
            openRecords.unshift(recordId)
        }

        return (
            <LoadingState>
                <SharedView
                    id={shareId}
                />
                {openRecords.length ? (
                    <Portal>
                        {openRecords.map((id, index) => (
                            <RecordDetailDialog
                                key={index}
                                id={id}
                                index={index}
                                shareId={shareId}
                                onClose={this.handleCloseRecord}
                            />
                        ))}
                    </Portal>
                ) : null}
            </LoadingState>
        )
    }

    handleCloseRecord = ({id, index}) => {

        const {shareId, recordId} = this.props.match.params

        if (recordId === id) {
            history.push(`/${shareId}`)
            return
        }

        this.props.dispatch({
            type: 'CLOSE_RECORD_AT_INDEX',
            payload: {
                index: index - 1
            }
        })
    }
}

export default connect((state, props) => ({
    openRecords: state.getIn(['openRecords']).toJS()
}))(SharedViewRoute)