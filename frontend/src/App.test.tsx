import ReactDOM from 'react-dom'
import PublicApp from './PublicApp'

it('renders PublicApp without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PublicApp />, div)
})
