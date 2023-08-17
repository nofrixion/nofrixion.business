import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge({
  prefix: '',
})

export const cn = (...inputs: ClassValue[]) => customTwMerge(clsx(inputs))

export const merchantImage = (shortName: string) =>
  `https://cdn.nofrixion.com/nextgen/assets/merchants/${shortName}/${shortName}.svg`

export const sendSlackMessage = async (message?: any) => {
  const url = import.meta.env.VITE_PUBLIC_SLACK_WEBHOOK_URL

  if (!url) {
    console.warn('No Slack webhook URL found')

    return
  }

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
      ],
    }),
  })
  return res
}

export const getRoute = (route: string) => {
  const pullRequestId = import.meta.env.VITE_NOFRIXION_PULL_REQUEST_ID

  return pullRequestId ? `/${pullRequestId}${route}` : route
}
