import ReactDOM from 'react-dom/client'
import { AccountsList } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'
import React from 'react'
import { CurrentAccountsListProps } from '@nofrixion/components/src/components/functional/CurrentAccountsList/CurrentAccountsList'

const CurrentAccountsListWrapperForWebComponent: React.FC<CurrentAccountsListProps> = (props) => {
  return <AccountsList {...props} isWebComponent={true} />
}

const CurrentAccountsListWebComponent = r2wc(
  CurrentAccountsListWrapperForWebComponent,
  React,
  ReactDOM,
  {
    props: {
      token: 'string',
      apiUrl: 'string',
      merchantId: 'string',
      onAccountClick: 'function',
    },
  },
)

customElements.define('current-accounts-list', CurrentAccountsListWebComponent)
