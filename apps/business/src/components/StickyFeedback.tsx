import { Helmet } from 'react-helmet'

const StickyFeedback: React.FC = () => {
  return (
    <>
      <div className="z-10 sticky top-0 bg-information-bg w-full lg:fixed lg:bottom-0 lg:top-auto px-8 md:px-14 py-3 text-default-text text-sm">
        You are using <b>MoneyMoov for Business Beta</b>. Help us improve by{' '}
        <a
          className="underline hover:no-underline"
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
