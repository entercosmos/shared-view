import React from 'react'
import {connect} from 'react-redux'
import RecordGalleryCard from '@cmds/record-gallery-card'
import selectors from './services/selectors'
import fieldRenderer from './utils/fieldRenderer'

class RecordGalleryCardHOC extends React.Component {

    render() {

        return (
            <RecordGalleryCard
                coverEnabled={!!this.props.coverFieldId}
                fieldRenderer={fieldRenderer}
                {...this.props}
            />
        )
    }
}

export default connect((state, props) => ({
    name: selectors.recordName(state, {id: props.id, primaryFieldId: props.primaryFieldId}),
    coverAttachments: selectors.coverAttachments(state, {id: props.id, coverFieldId: props.coverFieldId})
}))(RecordGalleryCardHOC)