import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'containers'
import * as serviceWorker from 'serviceWorker/serviceWorkerConfig'

import './styles/index.scss'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()
