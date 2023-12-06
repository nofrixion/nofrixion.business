import { motion } from 'framer-motion'

import RedAlertIcon from '../../../assets/icons/red-alert-icon.svg'
import AnimateHeightWrapper from '../utils/AnimateHeight'

export interface InlineErrorProps {
  title: string
  messages?: string[]
}

const InlineError = ({ title, messages }: InlineErrorProps) => {
  return (
    <AnimateHeightWrapper layoutId="submit-error">
      <motion.div
        className="border-4 border-solid border-negative-red rounded px-4 py-6 flex flex-row space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <img src={RedAlertIcon} alt="Warning" title="Warning" className="w-4 h-4" />
        <div className="[&>p]:text-default-text [&>p]:text-13px [&>p]:leading-5 [&>p]:font-normal [&>p]:py-1">
          <span className="text-base leading-4 font-semibold text-default-text block mb-2">
            {title}
          </span>
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <p key={'submit-error-' + index.toString()}>{message}</p>
            ))
          ) : (
            <p>
              Please try again. If the problem persists, you can contact us at{' '}
              <a
                className="underline"
                href="mailto:support@nofrixion.com"
                target="_blank"
                rel="noreferrer"
              >
                support@nofrixion.com
              </a>
              .
            </p>
          )}
        </div>
      </motion.div>
    </AnimateHeightWrapper>
  )
}

export default InlineError
