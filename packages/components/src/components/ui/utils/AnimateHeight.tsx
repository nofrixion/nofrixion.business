import { motion } from 'framer-motion'

const AnimateHeightWrapper = ({
  children,
  layoutId,
  layout,
}: {
  children: React.ReactNode
  layoutId: string
  layout?: boolean | 'position' | 'size' | 'preserve-aspect'
}) => {
  return (
    <motion.div
      layout={layout}
      layoutId={layoutId}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: 'auto',
        transitionEnd: {
          overflow: 'inherit',
        },
      }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateHeightWrapper
