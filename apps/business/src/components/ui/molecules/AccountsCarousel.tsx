import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccountSummaryCard from '../../../components/AccountSummaryCard'
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
      } else {
        checkScroll(ref)
      }

      ref.current.addEventListener('scroll', () => {
        checkScroll(ref)
      })
    }
  }, [ref.current?.offsetWidth, ref.current?.scrollWidth, ref.current?.scrollLeft])

  const checkScroll = (ref: React.RefObject<HTMLDivElement>) => {
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
  }

  const scrollRight = () => {
    ref.current?.scrollTo({
      left: ref.current?.scrollLeft + ref.current?.offsetWidth / 2,
      behavior: 'smooth',
    })
  }

  const scrollLeft = () => {
    ref.current?.scrollTo({
      left: ref.current?.scrollLeft - ref.current?.offsetWidth / 2,
      behavior: 'smooth',
    })
  }

  return (
    <RadixScrollArea.Root className="-mt-4">
      <RadixScrollArea.Viewport ref={ref}>
        {/* Previous arrow */}
        {scrollState !== 'left' && scrollState !== 'not-needed' && (
          <button
            onClick={scrollLeft}
            className="hidden lg:flex absolute top-0 left-0 h-full w-[104px] bg-gradient-to-l from-transparent to-main-grey items-center justify-start pl-4"
          >
            <div className="w-12 h-8 bg-white rounded-full flex justify-center items-center shadow-small">
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

        <div className="flex space-x-4 px-8 md:px-14 py-4">
          {accounts
            .sort((a, b) => a.accountName?.localeCompare(b.accountName))
            .map((account: Account) => {
              return (
                <AccountSummaryCard
                  key={account.id}
                  account={account}
                  className="md:snap-center lg:snap-start" // Snap to center when scrolling (only for tablet resolution)
                  onClick={() => {
                    navigate(`current-accounts/${account.id}`)
                  }}
                />
              )
            })}
        </div>

        {/* Next arrow */}
        {scrollState !== 'right' && scrollState !== 'not-needed' && (
          <button
            onClick={scrollRight}
            className="hidden lg:flex absolute top-0 right-0 h-full w-[104px] bg-gradient-to-r from-transparent to-main-grey items-center justify-end pr-4"
          >
            <div className="w-12 h-8 bg-white rounded-full flex justify-center items-center shadow-small">
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
      </RadixScrollArea.Viewport>

      <RadixScrollArea.Scrollbar
        forceMount
        className="select-none md:flex !relative mx-auto overflow-hidden hidden touch-none rounded-lg  h-0.5 w-40 bg-[#E0E7EA] transition-colors duration-[160ms] ease-out hover:bg-gray-200 flex-col"
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="flex-1 rounded-lg bg-[#477085]" />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  )
}

export default AccountsCarousel
