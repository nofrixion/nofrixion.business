import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../../utils'

const iconVariants = cva('stroke-current fill-none')

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size: '8' | '12' | '16' | '24'
  viewBox?: string
}

const SVG: React.FC<SVGProps> = ({ className, size, viewBox, children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox={`${viewBox ?? '0 0'} ${size} ${size}`}
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
      <path d="M3.5 14.498L0.5 11.498L3.5 8.49805" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M0.5 11.498H10.5C11.8261 11.498 13.0979 10.9713 14.0355 10.0336C14.9732 9.0959 15.5 7.82413 15.5 6.49805C15.5 5.17196 14.9732 3.9002 14.0355 2.96251C13.0979 2.02483 11.8261 1.49805 10.5 1.49805H6.5"
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
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 3L3 13" strokeLinecap="round" strokeLinejoin="round" />
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
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 5L7.82611 10.5691C7.7445 10.6925 7.64058 10.7946 7.52134 10.8684C7.4021 10.9423 7.27032 10.9862 7.13488 10.9972C6.99945 11.0083 6.8635 10.9862 6.73622 10.9324C6.60893 10.8786 6.49327 10.7945 6.39702 10.6856L4.5 8.52867"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'qr/16': (className: string) => (
    <SVG className={className} size="16">
      <path d="M6.66667 6.66667H4V4H6.66667V6.66667Z" />
      <path d="M12 6.66667H9.33331V4H12V6.66667Z" />
      <path d="M6.66667 12H4V9.33331H6.66667V12Z" />
      <path d="M1.33331 5.99998L1.33331 1.33331L5.99998 1.33331" />
      <path d="M1.33331 10L1.33331 14.6667H5.99998" />
      <path d="M10 1.33331L14.6667 1.33331V5.99998" />
      <path d="M10 14.6667H14.6667V10" />
      <path d="M12.8333 12H9.33331V8.66669" />
      <path d="M11.9973 9.50269V9.16669H12.3333V9.50269H11.9973Z" />
    </SVG>
  ),
  'back/12': (className: string) => (
    <SVG className={className} size="12">
      <path d="M6 11L0.999999 6L6 1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 6L11 6" strokeLinecap="round" strokeLinejoin="round" />
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
      <path
        d="M1.65378 6.81579L4.49588 9.65789L10.6538 3.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  ),
  'done/16': (className: string) => (
    <SVG className={className} size="16" viewBox="0 -1">
      <path
        d="M2 8.42105L5.78947 12.2105L14 4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
        d="M0.75 6C0.75 7.39239 1.30312 8.72774 2.28769 9.71231C3.27226 10.6969 4.60761 11.25 6 11.25C7.39239 11.25 8.72774 10.6969 9.71231 9.71231C10.6969 8.72774 11.25 7.39239 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72774 1.30312 7.39239 0.75 6 0.75C4.60761 0.75 3.27226 1.30312 2.28769 2.28769C1.30312 3.27226 0.75 4.60761 0.75 6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 6V4.125" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L8.3435 8.344" strokeLinecap="round" strokeLinejoin="round" />
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
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.75 2.25L2.25 9.75" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_6629_30732">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  ),
  'download/12': (className: string) => (
    <SVG className={className} size="12">
      <path d="M6 9L6 1" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.125 7.49902L6 9.37402L7.875 7.49902"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1 11H11" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'arrow-down/8': (className: string) => (
    <SVG className={className} size="8">
      <path d="M0.5 2L4 5.5L7.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'arrow-up/8': (className: string) => (
    <SVG className={className} size="8">
      <path d="M7.5 5.5L4 2L0.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
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
  'failed/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.86089 2.7929C3.47038 2.40237 2.83721 2.40236 2.44668 2.79288C2.05615 3.1834 2.05614 3.81657 2.44666 4.2071L4.74062 6.50112L2.44692 8.79488C2.0564 9.18541 2.05641 9.81858 2.44694 10.2091C2.83747 10.5996 3.47064 10.5996 3.86115 10.2091L6.15482 7.91535L8.44848 10.2091C8.839 10.5996 9.47217 10.5996 9.8627 10.2091C10.2532 9.81858 10.2532 9.18541 9.86272 8.79489L7.56901 6.50112L9.86298 4.2071C10.2535 3.81657 10.2535 3.1834 9.86296 2.79288C9.47243 2.40236 8.83926 2.40237 8.44874 2.7929L6.15482 5.08689L3.86089 2.7929Z"
      />
    </SVG>
  ),
  'failed/16': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="16" viewBox="0 -1">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.70712 3.2929C4.3166 2.90237 3.68343 2.90236 3.2929 3.29288C2.90237 3.6834 2.90236 4.31657 3.29288 4.7071L6.58719 8.00149L3.29323 11.2955C2.90271 11.6861 2.90272 12.3192 3.29325 12.7098C3.68378 13.1003 4.31694 13.1003 4.70746 12.7097L8.00139 9.41573L11.2953 12.7097C11.6858 13.1003 12.319 13.1003 12.7095 12.7098C13.1001 12.3192 13.1001 11.6861 12.7095 11.2955L9.41558 8.00149L12.7099 4.7071C13.1004 4.31657 13.1004 3.6834 12.7099 3.29288C12.3193 2.90236 11.6862 2.90237 11.2957 3.2929L8.00139 6.58726L4.70712 3.2929Z"
      />
    </SVG>
  ),
  'pending-approval/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <g clipPath="url(#clip0_7677_15478)">
        <path d="M10.5272 10.25H1.77874C1.7235 10.25 1.67051 10.2719 1.63145 10.311C1.59239 10.3501 1.57044 10.4031 1.57044 10.4583V10.8749C1.57044 11.0406 1.63628 11.1996 1.75347 11.3168C1.87066 11.4339 2.0296 11.4998 2.19533 11.4998H10.1106C10.2763 11.4998 10.4353 11.4339 10.5525 11.3168C10.6697 11.1996 10.7355 11.0406 10.7355 10.8749V10.4583C10.7355 10.4031 10.7135 10.3501 10.6745 10.311C10.6354 10.2719 10.5824 10.25 10.5272 10.25Z" />
        <path d="M10.1105 7.33376C8.5608 7.33376 7.61097 7.09213 7.34435 6.61722C7.07773 6.1423 7.44433 5.39243 7.79011 4.73838C8.01803 4.38928 8.16991 3.9961 8.23586 3.58442C8.24577 3.30822 8.19866 3.03293 8.09749 2.77573C7.99632 2.51854 7.84324 2.28494 7.64781 2.08951C7.45238 1.89407 7.21878 1.741 6.96158 1.63983C6.70438 1.53865 6.4291 1.49155 6.15289 1.50146C5.87653 1.49093 5.60097 1.5376 5.34349 1.63856C5.08601 1.73951 4.85216 1.89256 4.6566 2.08812C4.46104 2.28368 4.30798 2.51753 4.20703 2.77502C4.10608 3.0325 4.0594 3.30806 4.06993 3.58442C4.13533 4.00079 4.28871 4.39844 4.51985 4.75088C4.86562 5.40077 5.25722 6.13814 4.96977 6.61722C4.68232 7.0963 3.74915 7.33376 2.19526 7.33376C1.54538 7.33376 1.15378 8.49189 1.15378 9.00013C1.15378 9.16586 1.21961 9.3248 1.3368 9.44199C1.45399 9.55918 1.61294 9.62502 1.77867 9.62502H10.5271C10.6929 9.62502 10.8518 9.55918 10.969 9.44199C11.0862 9.3248 11.152 9.16586 11.152 9.00013C11.152 8.49189 10.7604 7.33376 10.1105 7.33376Z" />
      </g>
      <defs>
        <clipPath id="clip0_7677_15478">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  ),
  'pending-approval/16': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="16" viewBox="0 -2">
      <g clipPath="url(#clip0_7890_8618)">
        <path d="M12.8313 12H1.16664C1.09299 12 1.02235 12.0293 0.970261 12.0813C0.918177 12.1334 0.888916 12.2041 0.888916 12.2777V12.8332C0.888916 13.0542 0.976698 13.2661 1.13295 13.4223C1.2892 13.5786 1.50113 13.6664 1.7221 13.6664H12.2758C12.4968 13.6664 12.7087 13.5786 12.8649 13.4223C13.0212 13.2661 13.109 13.0542 13.109 12.8332V12.2777C13.109 12.2041 13.0797 12.1334 13.0276 12.0813C12.9756 12.0293 12.9049 12 12.8313 12Z" />
        <path d="M12.2757 8.11135C10.2094 8.11135 8.94296 7.78919 8.58747 7.15597C8.23198 6.52274 8.72078 5.52292 9.18181 4.65085C9.48571 4.18538 9.68822 3.66114 9.77615 3.11224C9.78936 2.74396 9.72655 2.37692 9.59166 2.03399C9.45676 1.69106 9.25266 1.37959 8.99208 1.11902C8.73151 0.858441 8.42004 0.654341 8.07711 0.519443C7.73418 0.384545 7.36714 0.321742 6.99886 0.334949C6.63038 0.320911 6.26297 0.383144 5.91966 0.517748C5.57635 0.652352 5.26455 0.856425 5.0038 1.11717C4.74305 1.37792 4.53898 1.68972 4.40438 2.03303C4.26977 2.37634 4.20754 2.74375 4.22158 3.11224C4.30877 3.6674 4.51328 4.1976 4.82147 4.66752C5.2825 5.53403 5.80463 6.51719 5.42136 7.15597C5.0381 7.79474 3.79387 8.11135 1.72202 8.11135C0.855504 8.11135 0.333374 9.65552 0.333374 10.3332C0.333374 10.5542 0.421156 10.7661 0.577409 10.9223C0.733661 11.0786 0.945585 11.1664 1.16656 11.1664H12.8312C13.0521 11.1664 13.2641 11.0786 13.4203 10.9223C13.5766 10.7661 13.6644 10.5542 13.6644 10.3332C13.6644 9.65552 13.1422 8.11135 12.2757 8.11135Z" />
      </g>
      <defs>
        <clipPath id="clip0_7890_8618">
          <rect
            width="13.3333"
            height="13.3333"
            fill="white"
            transform="translate(0.333374 0.333008)"
          />
        </clipPath>
      </defs>
    </SVG>
  ),
  'inprogress/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12">
      <g clipPath="url(#clip0_7681_7737)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.01462 6.78418C1.01462 5.4581 1.5414 4.18633 2.47908 3.24865C3.41677 2.31096 4.68854 1.78418 6.01462 1.78418C7.3407 1.78418 8.61247 2.31096 9.55015 3.24865C10.4878 4.18633 11.0146 5.4581 11.0146 6.78418C11.0146 8.11026 10.4878 9.38203 9.55015 10.3197C8.61247 11.2574 7.3407 11.7842 6.01462 11.7842C4.68854 11.7842 3.41677 11.2574 2.47908 10.3197C1.5414 9.38203 1.01462 8.11026 1.01462 6.78418ZM6.63962 4.30318C6.63962 4.13742 6.57377 3.97845 6.45656 3.86124C6.33935 3.74403 6.18038 3.67818 6.01462 3.67818C5.84886 3.67818 5.68989 3.74403 5.57268 3.86124C5.45547 3.97845 5.38962 4.13742 5.38962 4.30318V7.78418C5.38962 8.12918 5.66962 8.40918 6.01462 8.40918H8.01462C8.18038 8.40918 8.33935 8.34333 8.45656 8.22612C8.57377 8.10891 8.63962 7.94994 8.63962 7.78418C8.63962 7.61842 8.57377 7.45945 8.45656 7.34224C8.33935 7.22503 8.18038 7.15918 8.01462 7.15918H6.63962V4.30318Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_7681_7737">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  ),
  'arrow-down/12': (className: string) => (
    <SVG className={className} size="12">
      <path d="M1 3L6 8L11 3" strokeLinecap="round" strokeLinejoin="round" />
    </SVG>
  ),
  'inprogress/16': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="16" viewBox="0 -2">
      <g clipPath="url(#clip0_7890_8905)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.147827 7.37858C0.147827 5.61047 0.850206 3.91478 2.10045 2.66454C3.35069 1.41429 5.04638 0.711914 6.81449 0.711914C8.5826 0.711914 10.2783 1.41429 11.5285 2.66454C12.7788 3.91478 13.4812 5.61047 13.4812 7.37858C13.4812 9.14669 12.7788 10.8424 11.5285 12.0926C10.2783 13.3429 8.5826 14.0452 6.81449 14.0452C5.04638 14.0452 3.35069 13.3429 2.10045 12.0926C0.850206 10.8424 0.147827 9.14669 0.147827 7.37858ZM7.64783 4.07058C7.64783 3.84957 7.56003 3.63761 7.40375 3.48132C7.24747 3.32504 7.03551 3.23725 6.81449 3.23725C6.59348 3.23725 6.38152 3.32504 6.22524 3.48132C6.06896 3.63761 5.98116 3.84957 5.98116 4.07058V8.71191C5.98116 9.17191 6.35449 9.54525 6.81449 9.54525H9.48116C9.70217 9.54525 9.91414 9.45745 10.0704 9.30117C10.2267 9.14489 10.3145 8.93293 10.3145 8.71191C10.3145 8.4909 10.2267 8.27894 10.0704 8.12266C9.91414 7.96638 9.70217 7.87858 9.48116 7.87858H7.64783V4.07058Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_7890_8905">
          <rect
            width="13.3333"
            height="13.3333"
            fill="white"
            transform="translate(0.147827 0.711914)"
          />
        </clipPath>
      </defs>
    </SVG>
  ),
  'authorise/16': (className: string) => (
    <SVG className={cn(className, 'fill-none stroke-current')} size="16" viewBox="0 0">
      <g id="16px/Authorise" clipPath="url(#clip0_8090_3518)">
        <path
          id="Vector"
          d="M14.4533 14.5C14.4533 14.7643 14.3487 15.0178 14.1623 15.2052C13.9759 15.3926 13.723 15.4986 13.4587 15.5H2.52C2.2557 15.4986 2.00272 15.3926 1.81633 15.2052C1.62995 15.0178 1.52533 14.7643 1.52533 14.5V13.5H14.4533V14.5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M12.9613 9.49963H10.9726C9.6753 9.49963 9.28664 8.65162 9.28664 7.67362C9.28664 6.04296 10.908 5.05496 10.908 3.43429C10.908 2.66021 10.6005 1.91784 10.0531 1.37048C9.50576 0.823127 8.76338 0.515625 7.9893 0.515625C7.21523 0.515625 6.47285 0.823127 5.9255 1.37048C5.37814 1.91784 5.07064 2.66021 5.07064 3.43429C5.07064 5.05496 6.69197 6.04296 6.69197 7.67362C6.69197 8.65162 6.3033 9.49963 5.00597 9.49963H2.51997C0.119971 9.49963 0.115304 13.4996 1.1793 13.4996H14.8C15.8346 13.4996 16.088 9.49963 12.9613 9.49963Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8090_3518">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </SVG>
  ),
  'bank/12': (className: string) => (
    <SVG className={cn(className, 'fill-current stroke-none')} size="12" viewBox="0 0">
      <g id="16px/Bank">
        <path
          id="Vector"
          d="M2 14L2.50629 12.2277C2.52523 12.1614 2.56157 12.1038 2.61018 12.0629C2.65879 12.0221 2.7172 12.0001 2.77714 12H13.2229C13.2828 12.0001 13.3412 12.0221 13.3898 12.0629C13.4384 12.1038 13.4748 12.1614 13.4937 12.2277L14 13.9973"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M3.33325 6.66602H12.6666V11.9993H3.33325V6.66602Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path id="Vector_3" d="M14.6666 14H1.33325" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_4" d="M6 6.66602V11.9993" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_5" d="M10 6.66602V11.9993" strokeLinecap="round" strokeLinejoin="round" />
        <path
          id="Vector_6"
          d="M13.9852 5.10775C14.0063 5.04229 14.0048 4.9713 13.981 4.90684C13.9573 4.84237 13.9127 4.78842 13.8548 4.75415L8.14539 1.374C8.10154 1.34778 8.05179 1.33398 8.00115 1.33398C7.95052 1.33398 7.90077 1.34778 7.85692 1.374L2.14518 4.75176C2.08734 4.78603 2.04274 4.83998 2.01897 4.90445C1.9952 4.96891 1.99372 5.0399 2.01479 5.10536L2.45558 6.46304C2.4747 6.52248 2.5114 6.5742 2.56048 6.61086C2.60955 6.64752 2.66853 6.66727 2.72905 6.66732H13.2756C13.3361 6.66727 13.3951 6.64752 13.4441 6.61086C13.4932 6.5742 13.5299 6.52248 13.549 6.46304L13.9852 5.10775Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path id="Vector_7" d="M14 5H2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </SVG>
  ),
  'bank/16': (className: string) => (
    <SVG className={cn(className)} size="16" viewBox="0 0">
      <g id="16px/Bank">
        <path
          id="Vector"
          d="M2 14L2.50629 12.2277C2.52523 12.1614 2.56157 12.1038 2.61018 12.0629C2.65879 12.0221 2.7172 12.0001 2.77714 12H13.2229C13.2828 12.0001 13.3412 12.0221 13.3898 12.0629C13.4384 12.1038 13.4748 12.1614 13.4937 12.2277L14 13.9973"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M3.33325 6.66602H12.6666V11.9993H3.33325V6.66602Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path id="Vector_3" d="M14.6666 14H1.33325" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_4" d="M6 6.66602V11.9993" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_5" d="M10 6.66602V11.9993" strokeLinecap="round" strokeLinejoin="round" />
        <path
          id="Vector_6"
          d="M13.9852 5.10775C14.0063 5.04229 14.0048 4.9713 13.981 4.90684C13.9573 4.84237 13.9127 4.78842 13.8548 4.75415L8.14539 1.374C8.10154 1.34778 8.05179 1.33398 8.00115 1.33398C7.95052 1.33398 7.90077 1.34778 7.85692 1.374L2.14518 4.75176C2.08734 4.78603 2.04274 4.83998 2.01897 4.90445C1.9952 4.96891 1.99372 5.0399 2.01479 5.10536L2.45558 6.46304C2.4747 6.52248 2.5114 6.5742 2.56048 6.61086C2.60955 6.64752 2.66853 6.66727 2.72905 6.66732H13.2756C13.3361 6.66727 13.3951 6.64752 13.4441 6.61086C13.4932 6.5742 13.5299 6.52248 13.549 6.46304L13.9852 5.10775Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path id="Vector_7" d="M14 5H2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </SVG>
  ),
  'connected/16': (className: string) => (
    <SVG className={cn(className)} size="16" viewBox="0 0">
      <path
        d="M1.83333 9.30026C1.03333 8.70026 0.5 7.76693 0.5 6.70026C0.5 4.90026 1.96667 3.43359 3.76667 3.43359H8.96667C10.7667 3.43359 12.2333 4.90026 12.2333 6.70026C12.2333 8.50026 10.7667 9.96693 8.96667 9.96693H5.76667"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 6.69987C14.9667 7.29987 15.5 8.2332 15.5 9.29987C15.5 11.0999 14.0333 12.5665 12.2333 12.5665H7.03333C5.23333 12.5665 3.76666 11.0999 3.76666 9.29987C3.76666 7.49987 5.23333 6.0332 7.03333 6.0332H10.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
