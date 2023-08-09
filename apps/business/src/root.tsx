import './index.css'

import { useOutlet } from 'react-router-dom'

import HotjarInjection from './components/HotjarInjection'

const Root = () => {
  const outlet = useOutlet()

  return (
    <>
      <div className="biz-font-inter biz-h-full">{outlet}</div>

      <HotjarInjection />
    </>
  )
}

export default Root
