import axios from 'axios'
import store from './store'

const api = axios.create({
    baseURL: 'http://0.0.0.0:2995'
})

export default async ({id}) => {

    const response = await api.request({
        method: 'post',
        data: {
            query: `
               query sharedView($id: ID!) {
                  viewer {
                    __typename
                    id
                    sharedView(id: $id) {
                      __typename
                      id
                      application {
                        __typename
                        id
                        tables {
                          __typename
                          id
                          primaryFieldId
                          fields {
                            __typename
                            id
                            name
                            typeId
                            options
                          }
                        }
                      }
                      view {
                        __typename
                        id
                        typeId
                        coverFieldId
                        coverFitTypeId
                        fieldVisibilitiesById {
                          __typename
                          id
                          fieldId
                          visibility
                        }
                        fieldIndicesById {
                          __typename
                          id
                          fieldId
                          indice
                        }
                        tableId
                        records {
                          __typename
                          id
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
                                id
                                name
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
                                      id
                                      name
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
                }
            `,
            variables: {
                id
            }
        }
    })

    if (response.data.errors) {

        store.dispatch({
            type: 'SET_ERROR',
            payload: true
        })
    }

    store.dispatch({
        type: 'IMPORT',
        payload: response.data
    })

    store.dispatch({
        type: 'SET_LOADING',
        payload: false
    })
}