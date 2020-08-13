import ReactDOM from 'react-dom'

import { HEADER_TITLE_ID } from '../../constants'

const HeaderTitle = ({ children }) => {
  const element = document.querySelector(`#${HEADER_TITLE_ID}`)
  if (element) {
    return ReactDOM.createPortal(children, element)
  }
  return null
}

export default HeaderTitle
