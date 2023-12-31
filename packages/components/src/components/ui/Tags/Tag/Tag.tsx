import classNames from 'classnames'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export interface TagProps {
  id: string
  label: string
  readonly?: boolean
  onDelete?: (id: string) => void
}

const Tag = ({ id, label, readonly = false, onDelete }: TagProps) => {
  const [deleteMode, setDeleteMode] = useState(false)
  const text = !deleteMode ? label : 'Delete?'
  const ref = useRef(null)

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setDeleteMode(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const handleClickOutside = () => {
    setDeleteMode(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
        }}
        className={classNames(
          'inline-flex items-center space-x-2 text-[#454D54] px-3 py-1 rounded-[0.25rem] text-sm leading-4 whitespace-nowrap align-middle w-fit select-none',
          {
            'border-solid border-[#ABB2BA] border-[0.063rem]': !deleteMode,
            'hover:bg-grey-bg min-h-[2.0625rem] max-h-[2.0625rem]': !deleteMode && !readonly,
            'px-3 py-1 text-xs': readonly,
            'text-negative-red bg-error-bg': deleteMode,
          },
        )}
        ref={ref}
      >
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
        >
          {text}
        </motion.span>

        {!readonly && (
          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {deleteMode && (
                <motion.svg
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  className="hover:cursor-pointer"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => onDelete && onDelete(id)}
                >
                  <circle cx="10" cy="10" r="10" fill="#FFF5F7" />
                  <path
                    d="M6 10.2369L8.84211 13.079L15 6.92114"
                    stroke="#F32448"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </AnimatePresence>

            <motion.svg
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              key={`cross-${deleteMode}`}
              className={classNames('hover:cursor-pointer stroke-[#454D54]', {
                'stroke-[#A3747C]': deleteMode,
              })}
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setDeleteMode((prev) => !prev)}
            >
              <path d="M1 0.5L9 8.5" />
              <path d="M9 0.5L1 8.5" />
            </motion.svg>
          </div>
        )}
      </motion.div>
    </MotionConfig>
  )
}

export default Tag
