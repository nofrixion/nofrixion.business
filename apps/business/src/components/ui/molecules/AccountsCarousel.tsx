import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccountSummaryCard from '../../../components/AccountSummaryCard'
import ScrollArea from '../../../components/ui/ScrollArea'
import { Account } from '../../../lib/types/localTypes'

interface AccountsCarouselProps {
  accounts: Account[]
}

const AccountsCarousel: React.FC<AccountsCarouselProps> = ({ accounts }) => {
  const navigate = useNavigate()

  const ref = useRef<HTMLDivElement>(null)

  const [scrollState, setScrollState] = useState<'left' | 'right' | 'none' | 'not-needed'>('left')

  // If the element is fully scrolled, hide the next arrow
  // If the element is not scrolled, hide the previous arrow
  useEffect(() => {
    if (ref.current) {
      if (ref.current.offsetWidth >= ref.current.scrollWidth) {
        setScrollState('not-needed')
      }

      ref.current.addEventListener('scroll', () => {
        const isFullyScrolled =
          (ref.current?.scrollLeft ?? 0) + (ref.current?.offsetWidth ?? 0) >=
          (ref.current?.scrollWidth ?? 0)
        const isScrolledToStart = ref.current?.scrollLeft === 0

        if (isFullyScrolled) {
          setScrollState('right')
        }

        if (isScrolledToStart) {
          setScrollState('left')
        }

        if (!isFullyScrolled && !isScrolledToStart) {
          setScrollState('none')
        }
      })
    }
  }, [ref])

  const scrollRight = () => {
    ref.current?.scrollTo({
      left: ref.current?.scrollLeft + ref.current?.offsetWidth,
      behavior: 'smooth',
    })
  }

  const scrollLeft = () => {
    ref.current?.scrollTo({
      left: ref.current?.scrollLeft - ref.current?.offsetWidth,
      behavior: 'smooth',
    })
  }
  return (
    <ScrollArea ref={ref} className="relative" enableCustomScrollbar>
      {/* Previous arrow */}
      {scrollState !== 'left' && scrollState !== 'not-needed' && (
        <button
          onClick={scrollLeft}
          className="biz-hidden lg:biz-flex biz-absolute biz-top-0 -biz-left-0.5 biz-h-full biz-w-[104px] biz-bg-gradient-to-l biz-from-transparent biz-to-main-gray-bg  biz-items-center biz-justify-start biz-pr-4"
        >
          <div className="biz-w-12 biz-h-8 biz-bg-white biz-rounded-full biz-flex biz-justify-center biz-items-center biz-shadow-small">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="15"
              viewBox="0 0 9 15"
              fill="none"
            >
              <path
                d="M7.66665 14.0003L0.999999 7.33365L7.66665 0.666993"
                stroke="#454D54"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      )}

      <div className="biz-flex biz-space-x-4">
        {accounts
          .sort((a, b) => a.accountName.localeCompare(b.accountName))
          .map((account: Account) => {
            return (
              <AccountSummaryCard
                key={account.id}
                account={account}
                className="md:biz-snap-center lg:biz-snap-start" // Snap to center when scrolling (only for tablet resolution)
                onClick={() => {
                  navigate('current-accounts')
                }}
              />
            )
          })}
      </div>

      {/* Next arrow */}
      {scrollState !== 'right' && scrollState !== 'not-needed' && (
        <button
          onClick={scrollRight}
          className="biz-hidden lg:biz-flex biz-absolute biz-top-0 -biz-right-0.5 biz-h-full biz-w-[104px] biz-bg-gradient-to-r biz-from-transparent biz-to-main-gray-bg biz-items-center biz-justify-end biz-pl-4"
        >
          <div className="biz-w-12 biz-h-8 biz-bg-white biz-rounded-full biz-flex biz-justify-center biz-items-center biz-shadow-small">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="15"
              viewBox="0 0 9 15"
              fill="none"
            >
              <path
                d="M1.33335 0.999702L8 7.66635L1.33335 14.333"
                stroke="#454D54"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      )}
    </ScrollArea>
  )
}

export default AccountsCarousel
