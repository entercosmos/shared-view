import React from 'react'
import {connect} from 'react-redux'
import {css} from 'emotion'
import history from './services/history'
import selectors from './services/selectors'
import GalleryView from '@cmds/gallery-view'
import RecordGalleryCardHOC from './RecordGalleryCardHOC'
import RecordGalleryCard from '@cmds/record-gallery-card'
import fieldHeightGetter from './utils/fieldHeightGetter'
import Header from './Header'
import Toolbar from './Toolbar'
import Brand from './Brand'

class SharedView extends React.Component {

    render() {

        const {
            recordCount,
            fields,
            visibleFieldOrder,
        } = this.props

        const cardHeight = RecordGalleryCard.calculateCardHeight({
            visibleFieldOrder,
            fields,
            fieldHeightGetter,
            coverEnabled: true
        })

        return (
            <div>
                <Header
                    title={this.props.name}
                />
                <Toolbar>

                </Toolbar>
                <div
                    className={css`
                        position: absolute;
                        top: 80px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    `}
                >
                    <GalleryView
                        cardCount={recordCount}
                        cardHeight={cardHeight}
                        cardRenderer={this.cardRenderer}
                    />
                </div>
                <div
                    className={css`
                        position: fixed;
                        bottom: 16px;
                        right: 16px;
                    `}
                >
                    <Brand />
                </div>
            </div>
        )
    }

    cardRenderer = ({index}) => {

        const id = this.props.records.get(index)

        const {
            coverFitType,
            coverFieldId,
            visibleFieldOrder,
            fields,
            primaryFieldId
        } = this.props

        return (
            <RecordGalleryCardHOC
                id={id}
                primaryFieldId={primaryFieldId}
                coverFitTypeId={coverFitType}
                coverFieldId={coverFieldId}
                coverEnabled={!!coverFieldId}
                visibleFieldOrder={visibleFieldOrder}
                fieldHeightGetter={fieldHeightGetter}
                fields={fields}
                onClick={this.handleRecordClick}
            />
        )
    }

    handleRecordClick = ({id}) => {
        history.push(`/${this.props.id}/${id}`)
    }
}

export default connect((state, props) => ({
    name: selectors.viewName(state, props),
    recordCount: selectors.recordCount(state, props),
    primaryFieldId: selectors.primaryFieldId(state, props),
    coverFieldId: selectors.coverFieldId(state, props),
    coverFitTypeId: selectors.coverFitTypeId(state, props),
    visibleFieldOrder: selectors.visibleFieldOrder(state, props),
    fields: selectors.fields(state, props),
    records: selectors.records(state, props)
}))(SharedView)