import './index.css'

import { useOutlet } from 'react-router-dom'

import HotjarInjection from './components/HotjarInjection'

const Root = () => {
  const outlet = useOutlet()

  return (
    <>
      <div className="font-inter h-full antialiased">{outlet}</div>

      <HotjarInjection />
    </>
  )
}

export default Root
