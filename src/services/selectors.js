export default {
    recordCount: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        return view.get('records').count()
    },
    primaryFieldId: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        const table = state.getIn(['cache', 'Table', view.get('tableId')])
        return table.get('primaryFieldId')
    },
    coverFieldId: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        return view.get('coverFieldId')
    },
    coverFitTypeId: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        return view.get('coverFitTypeId')
    },
    visibleFieldOrder: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        return view
            .get('fieldVisibilitiesById')
            .sort((a, b) => {
                const _a = state.getIn(['cache', 'FieldIndice', a, 'indice'])
                const _b = state.getIn(['cache', 'FieldIndice', b, 'indice'])
                return _a - _b
            })
            .map(id => {
                return state.getIn(['cache', 'FieldVisibility', id])
            })
            .filter(v => {
                return v.get('visibility')
            })
            .map(v => v.get('fieldId'))
            .toJS()
    },
    fieldOrder: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        return view
            .get('fieldVisibilitiesById')
            .sort((a, b) => {
                const _a = state.getIn(['cache', 'FieldIndice', a, 'indice'])
                const _b = state.getIn(['cache', 'FieldIndice', b, 'indice'])
                return _a - _b
            })
            .map(id => {
                return state.getIn(['cache', 'FieldIndice', id])
            })
            .map(v => v.get('fieldId'))
            .toJS()
    },
    fields: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        const table = state.getIn(['cache', 'Table', view.get('tableId')])
        return table
            .get('fields')
            .map(id => {
                return state.getIn(['cache', 'Field', id])
            })
            .toJS()
    },
    records: (state, {id}) => {
        const sharedView = state.getIn(['cache', 'SharedView', id])
        const view = state.getIn(['cache', 'View', sharedView.get('view')])
        return view.get('records')
    },
    recordName: (state, {id, primaryFieldId}) => {
        const cellId = [id, primaryFieldId].join('/')
        return state.getIn(['cache', 'SingleLineTextCell', cellId, 'text'])
    },
    coverAttachments: (state, {id, coverFieldId}) => {
        const cellId = [id, coverFieldId].join('/')
        const attachments = state.getIn(['cache', 'AttachmentCell', cellId, 'attachments'])
        return attachments ? attachments.toJS() : null
    },
    tableFields: (state, {id}) => {
        const table = state.getIn(['cache', 'Table', id])
        const fields = table.get('fields').map(id => {
            return state.getIn(['cache', 'Field', id])
        })
        return fields.toJS()
    },
    tableVisibleFieldOrder: (state, {id}) => {
        const table = state.getIn(['cache', 'Table', id])
        return table.get('fields').toJS()
    }
}