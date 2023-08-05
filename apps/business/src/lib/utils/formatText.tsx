import { Fragment } from 'react'

const formatText = (text: string) => {
  const boldRegex = /\*(.*?)\*/g
  const parts = text.split(boldRegex) // split description into an array of strings and bold text

  return parts.map((part, index) => {
    if (index % 2) {
      // if part is bold text, wrap it in a span element with the font-bold class
      return (
        <b key={index} className="font-bold">
          {part}
        </b>
      )
    } else {
      // otherwise, return the regular text
      return <Fragment key={index}>{part}</Fragment>
    }
  })
}

export default formatText
