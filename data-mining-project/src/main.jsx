import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './component/App'
import './styles/index.css'

// redux store
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>

)
