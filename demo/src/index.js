import React from 'react'
import {render} from 'react-dom'

import SharedView from './../../src'

class Demo extends React.Component {

    render() {

        return (
            <div>
                <SharedView/>
            </div>
        )
    }
}

render(<Demo/>, document.querySelector('#demo'))
