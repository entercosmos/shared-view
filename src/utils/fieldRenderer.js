import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import pascalCase from 'pascal-case'
import CheckboxField from '@cmds/checkbox-field'
import AttachmentField from '@cmds/attachment-field'
import LongTextField from '@cmds/long-text-field'
import SingleLineTextField from '@cmds/single-line-text-field'
import SingleSelectField from '@cmds/single-select-field'
import MultipleSelectField from '@cmds/multiple-select-field'
import NumberField from '@cmds/number-field'
import LinkToAnotherRecordField from '@cmds/link-to-another-record-field'
import selectors from './../services/selectors'

const connector = connect((state, {id, field}) => {

    const cacheKey = pascalCase(field.typeId) + 'Cell'
    const cellId = [id, field.id].join('/')
    const cell = state.getIn(['cache', cacheKey, cellId])

    if (!cell) {
        throw new Error(`${cacheKey} ${cellId} not found`)
    }

    return {
        cell: cell.toJS()
    }
})

const renderers = {
    singleLineText: connector(({props, cell}) => (
        <SingleLineTextField
            {...props}
            text={cell.text}
        />
    )),
    longText: connector(({props, cell}) => (
        <LongTextField
            {...props}
            longText={cell.longText}
        />
    )),
    checkbox: connector(({props, cell}) => (
        <CheckboxField
            {...props}
            checked={cell.checked}
        />
    )),
    attachment: connector(({props, cell}) => (
        <AttachmentField
            {...props}
            attachments={cell.attachments}
        />
    )),
    linkToAnotherRecord: compose(
        connector,
        connect((state, {cell, field}) => ({
            records: cell.records ? cell.records.map(id => {
                return state.getIn(['cache', 'Record', id]).toJS()
            }) : null,
            fields: selectors.tableFields(state, {id: field.options.linkTableId}),
            visibleFieldOrder: selectors.tableVisibleFieldOrder(state, {id: field.options.linkTableId}),
            openRecords: state.get('openRecords')
        }))
    )(({props, cell, records, fields, visibleFieldOrder, dispatch}) => (
        <LinkToAnotherRecordField
            {...props}
            records={records}
            fields={fields}
            visibleFieldOrder={visibleFieldOrder}
            fieldRenderer={fieldRenderer}
            onRecordClick={({id}) => {

                dispatch({
                    type: 'OPEN_RECORD',
                    payload: {
                        id
                    }
                })
            }}
        />
    )),
    multipleSelect: connector(({props, field, cell}) => (
        <MultipleSelectField
            {...props}
            optionIds={cell.optionIds}
            options={field.options.options}
            optionOrder={field.options.optionOrder}
            coloredOptions={field.options.coloredOptions}
        />
    )),
    singleSelect: connector(({props, field, cell}) => (
        <SingleSelectField
            {...props}
            optionId={cell.optionId}
            options={field.options.options}
            optionOrder={field.options.optionOrder}
            coloredOptions={field.options.coloredOptions}
        />
    )),
    number: connector(({props, field, cell}) => (
        <NumberField
            {...props}
            number={cell.number}
            allowNegativeNumbers={field.options.allowNegativeNumbers}
            numberFormatId={field.options.numberFormatId}
            precisionId={field.options.precisionId}
        />
    ))
}

const fieldRenderer = ({id, field, props}) => {

    let Field = renderers[field.typeId]

    if (!Field) {
        throw new Error(`Field for typeId '${field.typeId}' not found`)
    }

    return (
        <Field
            id={id}
            field={field}
            props={props}
        />
    )
}

export default fieldRenderer