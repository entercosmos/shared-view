import React from 'react'
import {connect} from 'react-redux'
import {css} from 'emotion'
import api from "./services/api";

class RecordLoading extends React.Component {

    state = {
        loading: true
    }

    async componentDidMount() {

        const response = await api.request({
            method: 'post',
            data: {
                query: `
query record($id: ID!) {
  viewer {
    __typename
    id
    sharedView(id: $id) {
      record(id: $id) {
        __typename
        id
        tableId
        cells {
          id
          __typename
          ... on AttachmentCell {
            attachments {
              id
              size
              filename
              type
              url
              thumbnails {
                small {
                  url
                  width
                  height
                }
                medium {
                  url
                  width
                  height
                }
                large {
                  url
                  width
                  height
                }
              }
            }
          }
          ... on AutonumberCell {
            autonumber
          }
          ... on CheckboxCell {
            checked
          }
          ... on CollaboratorCell {
            collaboratorId
          }
          ... on CreatedCollaboratorCell {
            createdCollaboratorId
          }
          ... on CreatedTimeCell {
            createdTime
          }
          ... on DateCell {
            date
          }
          ... on LongTextCell {
            longText
          }
          ... on MultipleCollaboratorCell {
            collaboratorIds
          }
          ... on MultipleSelectCell {
            optionIds
          }
          ... on NumberCell {
            number
          }
          ... on SingleLineTextCell {
            text
          }
          ... on SingleSelectCell {
            optionId
          }
          ... on UpdatedTimeCell {
            updatedTime
          }
          ... on LinkToAnotherRecordCell {
            records {
                __typename
              id
              name
              tableId
              cells {
                __typename
                id
                ... on AttachmentCell {
                  attachments {
                    id
                    size
                    filename
                    type
                    url
                    thumbnails {
                      small {
                        url
                        width
                        height
                      }
                      medium {
                        url
                        width
                        height
                      }
                      large {
                        url
                        width
                        height
                      }
                    }
                  }
                }
                ... on AutonumberCell {
                  autonumber
                }
                ... on CheckboxCell {
                  checked
                }
                ... on CollaboratorCell {
                  collaboratorId
                }
                ... on CreatedCollaboratorCell {
                  createdCollaboratorId
                }
                ... on CreatedTimeCell {
                  createdTime
                }
                ... on DateCell {
                  date
                }
                ... on LongTextCell {
                  longText
                }
                ... on MultipleCollaboratorCell {
                  collaboratorIds
                }
                ... on MultipleSelectCell {
                  optionIds
                }
                ... on NumberCell {
                  number
                }
                ... on SingleLineTextCell {
                  text
                }
                ... on SingleSelectCell {
                  optionId
                }
                ... on UpdatedTimeCell {
                  updatedTime
                }
                ... on LinkToAnotherRecordCell {
                  records {
                    __typename
                    id
                    name
                    tableId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

            `,
                variables: {
                    id: this.props.id
                }
            }
        })

        this.props.dispatch({
            type: 'IMPORT',
            payload: response.data
        })

        this.setState({
            loading: false
        })
    }

    render() {

        if (this.state.loading) {

            return (
                <div
                    className={css`
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        background-color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    `}
                >
                    Loading record...
                </div>
            )
        }

        return this.props.children
    }
}

export default connect((state, props) => ({
    record: state.getIn(['cache', 'Record', props.id])
}))(RecordLoading)