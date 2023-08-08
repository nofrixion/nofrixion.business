import { Helmet } from 'react-helmet'

const StickyFeedback: React.FC = () => {
  return (
    <>
      <div className="biz-z-10 biz-sticky biz-top-0 biz-bg-information-bg biz-w-full lg:biz-fixed lg:biz-bottom-0 lg:biz-top-auto biz-px-8 md:biz-px-14 biz-py-3 biz-text-default-text biz-text-sm">
        You are using <b>MoneyMoov for Business Beta</b>. Help us improve by{' '}
        <a
          className="biz-underline hover:biz-no-underline"
          href="https://tally.so/#tally-open=mDK9zj&tally-layout=modal&tally-width=600"
        >
          sending us some feedback.
        </a>
      </div>

      <Helmet>
        <script src="https://tally.so/widgets/embed.js" />
      </Helmet>
    </>
  )
}

export default StickyFeedback
