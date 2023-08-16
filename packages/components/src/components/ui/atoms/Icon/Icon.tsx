import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../../utils'

const iconVariants = cva('stroke-current fill-none')

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size: '8' | '12' | '16' | '24'
}

const SVG: React.FC<SVGProps> = ({ className, size, children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    {...props}
  >
    {children}
  </svg>
)

export const Icons = {
  'back/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M11 22L1 12L11 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 12H23" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'next/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M13 2L23 12L13 22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 12L1 12" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'close/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M22 22L12 12L22 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 2L12 12L2 22" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'card/24': (className: string) => (
    <SVG className={className} size="24">
      <path
        d="M18.424 7H3.57214C2.70873 7 2.00879 7.72667 2.00879 8.62307V18.3615C2.00879 19.2579 2.70873 19.9845 3.57214 19.9845H18.424C19.2874 19.9845 19.9874 19.2579 19.9874 18.3615V8.62307C19.9874 7.72667 19.2874 7 18.424 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.00879 10H19.9874" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.9908 13H14.9932" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2593 13H4.00586" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.00348 16H4.00586" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.00586 6.48006V4.62307C4.00586 3.72667 4.74468 3 5.65607 3H21.333C22.2444 3 22.9832 3.72667 22.9832 4.62307V14.3615C22.9832 15.2579 22.2444 15.9845 21.333 15.9845H20.1998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'bank/24': (className: string) => (
    <SVG className={className} size="24">
      <path
        d="M3 21L3.75943 18.3415C3.78784 18.2422 3.84236 18.1557 3.91528 18.0944C3.98819 18.0331 4.0758 18.0001 4.16571 18H19.8343C19.9242 18.0001 20.0118 18.0331 20.0847 18.0944C20.1576 18.1557 20.2122 18.2422 20.2406 18.3415L21 20.996"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 10H19V18H5V10Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 21H2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 10V18" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M20.9778 7.66065C21.0094 7.56246 21.0072 7.45597 20.9715 7.35928C20.9359 7.26258 20.869 7.18166 20.7822 7.13025L12.2181 2.06002C12.1523 2.0207 12.0777 2 12.0017 2C11.9258 2 11.8512 2.0207 11.7854 2.06002L3.21777 7.12666C3.131 7.17807 3.06411 7.259 3.02846 7.35569C2.9928 7.45239 2.99059 7.55888 3.02219 7.65707L3.68336 9.69358C3.71205 9.78275 3.7671 9.86032 3.84071 9.91531C3.91433 9.9703 4.00279 9.99993 4.09357 10H19.9134C20.0041 9.99993 20.0926 9.9703 20.1662 9.91531C20.2398 9.86032 20.2949 9.78275 20.3236 9.69358L20.9778 7.66065Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 7.5H3" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'wallets/24': (className: string) => (
    <SVG className={className} size="24">
      <path d="M16.9435 17.4673H4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17 12.5539V20.2609C17 20.7222 16.7893 21.1645 16.4143 21.4907C16.0391 21.8169 15.5304 22 15 22H6C5.46957 22 4.96086 21.8169 4.58578 21.4907C4.21071 21.1645 4 20.7222 4 20.2609V3.73913C4 3.27789 4.21071 2.83553 4.58578 2.50938C4.96086 2.18323 5.46957 2 6 2H13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7489 19.9978C10.6114 19.9978 10.5 19.8863 10.5 19.7489C10.5 19.6114 10.6114 19.5 10.7489 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.749 19.9978C10.8865 19.9978 10.9979 19.8863 10.9979 19.7489C10.9979 19.6114 10.8865 19.5 10.749 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4783 12.4979C20.7776 12.4979 23.4522 9.82326 23.4522 6.52396C23.4522 3.22466 20.7776 0.550049 17.4783 0.550049C14.179 0.550049 11.5044 3.22466 11.5044 6.52396C11.5044 9.82326 14.179 12.4979 17.4783 12.4979Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2705 3.24634H18.7664C17.8971 3.24634 17.0635 3.59165 16.4488 4.20632C15.8341 4.82099 15.4888 5.65466 15.4888 6.52393C15.4888 7.3932 15.8341 8.22686 16.4488 8.84153C17.0635 9.4562 17.8971 9.80151 18.7664 9.80151H19.2705"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.501 5.51123H17.9519" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.501 7.53662H17.9519" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'ellipsis/24': (className: string) => (
    <SVG className={cn(className)} size="24">
      <circle cx="12.4998" cy="5.73905" r="0.782717" stroke="#454D54" strokeWidth="1.565" />
      <circle cx="12.4998" cy="12" r="0.782717" stroke="#454D54" strokeWidth="1.565" />
      <circle cx="12.4998" cy="18.2608" r="0.782717" stroke="#454D54" strokeWidth="1.565" />
    </SVG>
  ),
  'close/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M2 2L14 14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2L2.00001 14" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'back/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M7.66665 14.5L1 8L7.66665 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 8H15" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'next/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M8.33335 1.5L15 8L8.33335 14.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8L1 8" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'add/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M1 8H15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 1L8 15" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'return/16': (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M3.5 14.498L0.5 11.498L3.5 8.49805"
        stroke="#454D54"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 11.498H10.5C11.8261 11.498 13.0979 10.9713 14.0355 10.0336C14.9732 9.0959 15.5 7.82413 15.5 6.49805C15.5 5.17196 14.9732 3.9002 14.0355 2.96251C13.0979 2.02483 11.8261 1.49805 10.5 1.49805H6.5"
        stroke="#454D54"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'void/16': (className: string) => (
    <SVG className={className} size="16">
      <g clipPath="url(#clip0_6629_30721)">
        <path
          d="M0.5 8C0.5 9.98912 1.29018 11.8968 2.6967 13.3033C4.10322 14.7098 6.01088 15.5 8 15.5C9.98912 15.5 11.8968 14.7098 13.3033 13.3033C14.7098 11.8968 15.5 9.98912 15.5 8C15.5 6.01088 14.7098 4.10322 13.3033 2.6967C11.8968 1.29018 9.98912 0.5 8 0.5C6.01088 0.5 4.10322 1.29018 2.6967 2.6967C1.29018 4.10322 0.5 6.01088 0.5 8Z"
          stroke="#454D54"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 3L3 13" stroke="#454D54" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_6629_30721">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  ),
  'capture/16': (className: string) => (
    <SVG className={className} size="16">
      <path
        d="M0.5 8C0.5 9.98912 1.29018 11.8968 2.6967 13.3033C4.10322 14.7098 6.01088 15.5 8 15.5C9.98912 15.5 11.8968 14.7098 13.3033 13.3033C14.7098 11.8968 15.5 9.98912 15.5 8C15.5 6.01088 14.7098 4.10322 13.3033 2.6967C11.8968 1.29018 9.98912 0.5 8 0.5C6.01088 0.5 4.10322 1.29018 2.6967 2.6967C1.29018 4.10322 0.5 6.01088 0.5 8Z"
        stroke="#454D54"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 5L7.82611 10.5691C7.7445 10.6925 7.64058 10.7946 7.52134 10.8684C7.4021 10.9423 7.27032 10.9862 7.13488 10.9972C6.99945 11.0083 6.8635 10.9862 6.73622 10.9324C6.60893 10.8786 6.49327 10.7945 6.39702 10.6856L4.5 8.52867"
        stroke="#454D54"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),

  'copy/12px': (className: string) => (
    <SVG className={className} size="12">
      <path
        d="M8 2.74365V1.54053C8 1.2989 7.80413 1.10303 7.5625 1.10303H1.4375C1.19588 1.10303 1 1.2989 1 1.54053V7.66553C1 7.90716 1.19588 8.10303 1.4375 8.10303H2.64062"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4.54053C4 4.2989 4.19588 4.10303 4.4375 4.10303H10.5625C10.8041 4.10303 11 4.2989 11 4.54053V10.6655C11 10.9072 10.8041 11.103 10.5625 11.103H4.4375C4.19587 11.103 4 10.9072 4 10.6655V4.54053Z"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'done/12': (className: string) => (
    <SVG className={className} size="12">
      <path d="M1.5 6.31579L4.34211 9.15789L10.5 3" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'not-started/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <circle cx="6" cy="6" r="4" />
    </SVG>
  ),
  'partial/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <path d="M2 10H10L2 2V10Z" />
    </SVG>
  ),
  'cancelled/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70712 2.2929C3.3166 1.90237 2.68343 1.90236 2.2929 2.29288C1.90237 2.6834 1.90236 3.31657 2.29288 3.7071L4.58685 6.00112L2.29314 8.29488C1.90262 8.68541 1.90263 9.31858 2.29316 9.7091C2.68369 10.0996 3.31686 10.0996 3.70738 9.70908L6.00104 7.41535L8.2947 9.70908C8.68522 10.0996 9.31839 10.0996 9.70892 9.7091C10.0994 9.31858 10.0995 8.68541 9.70894 8.29489L7.41524 6.00112L9.7092 3.7071C10.0997 3.31657 10.0997 2.6834 9.70918 2.29288C9.31865 1.90236 8.68548 1.90237 8.29497 2.2929L6.00104 4.58689L3.70712 2.2929Z"
      />
    </SVG>
  ),
  'pending/12': (className: string) => (
    <SVG className={className} size="12">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.46447 9.53553C1.52678 8.59785 1 7.32608 1 6C1 4.67392 1.52678 3.40215 2.46447 2.46447C3.40215 1.52678 4.67392 1 6 1C7.32608 1 8.59785 1.52678 9.53553 2.46447C10.4732 3.40215 11 4.67392 11 6C11 7.32608 10.4732 8.59785 9.53553 9.53553C8.59785 10.4732 7.32608 11 6 11C4.67392 11 3.40215 10.4732 2.46447 9.53553ZM6.75 4.06642C6.75 3.65221 6.41421 3.31642 6 3.31642C5.58579 3.31642 5.25 3.65221 5.25 4.06642V6.10246C5.25 6.26441 5.30242 6.422 5.39942 6.55169L6.76905 8.3828C7.01714 8.71449 7.48716 8.78226 7.81885 8.53416C8.15054 8.28606 8.21831 7.81605 7.97021 7.48435L6.75 5.853V4.06642Z"
        fill="#454D54"
      />
    </SVG>
  ),
  'capture/12': (className: string) => (
    <SVG className={className} size="12">
      <path
        d="M0.5 6C0.5 7.45869 1.07946 8.85764 2.11091 9.88909C3.14236 10.9205 4.54131 11.5 6 11.5C7.45869 11.5 8.85764 10.9205 9.88909 9.88909C10.9205 8.85764 11.5 7.45869 11.5 6C11.5 4.54131 10.9205 3.14236 9.88909 2.11091C8.85764 1.07946 7.45869 0.5 6 0.5C4.54131 0.5 3.14236 1.07946 2.11091 2.11091C1.07946 3.14236 0.5 4.54131 0.5 6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 4L5.87579 7.71273C5.8175 7.79499 5.74327 7.86304 5.6581 7.91227C5.57293 7.96151 5.4788 7.9908 5.38206 7.99816C5.28532 8.00552 5.18822 7.99078 5.0973 7.95493C5.00638 7.91909 4.92376 7.86298 4.85501 7.79037L3.5 6.35245"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'return/12': (className: string) => (
    <SVG className={className} size="12">
      <path d="M3.25 10.8735L1 8.62354L3.25 6.37354" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M1.5 8.62354H7.375C8.36956 8.62354 9.32339 8.22845 10.0267 7.52519C10.7299 6.82192 11.125 5.8681 11.125 4.87354C11.125 3.87897 10.7299 2.92515 10.0267 2.22188C9.32339 1.51862 8.36956 1.12354 7.375 1.12354H4.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'void/12': (className: string) => (
    <SVG className={className} size="12">
      <g clipPath="url(#clip0_6629_30732)">
        <path
          d="M0.375 6C0.375 7.49184 0.967632 8.92258 2.02252 9.97748C3.07742 11.0324 4.50816 11.625 6 11.625C7.49184 11.625 8.92258 11.0324 9.97748 9.97748C11.0324 8.92258 11.625 7.49184 11.625 6C11.625 4.50816 11.0324 3.07742 9.97748 2.02252C8.92258 0.967632 7.49184 0.375 6 0.375C4.50816 0.375 3.07742 0.967632 2.02252 2.02252C0.967632 3.07742 0.375 4.50816 0.375 6Z"
          stroke="#454D54"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.75 2.25L2.25 9.75"
          stroke="#454D54"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6629_30732">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  ),
  'arrow-down/8': (className: string) => (
    <SVG className={className} size="8">
      <path d="M0.5 2L4 5.5L7.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'outgoing/8': (className: string) => (
    <SVG className={className} size="8">
      <path d="M4 0.5L4 7.5" strokeLinecap="round" />
      <path d="M4 7.5L7.5 4" strokeLinecap="round" />
      <path d="M4 7.5L0.5 4" strokeLinecap="round" />
    </SVG>
  ),
  'incoming/8': (className: string) => (
    <SVG className={className} size="8">
      <path d="M4 7.5V0.5" strokeLinecap="round" />
      <path d="M4 0.5L0.5 4" strokeLinecap="round" />
      <path d="M4 0.5L7.5 4" strokeLinecap="round" />
    </SVG>
  ),
} as const

export type IconNames = keyof typeof Icons

export interface IconProps extends VariantProps<typeof iconVariants> {
  className?: string
  name: IconNames
}

const Icon: React.FC<IconProps> = ({ className, name }) =>
  Icons[name](cn(iconVariants(), className))

Icon.displayName = 'Icon'

export { Icon }
