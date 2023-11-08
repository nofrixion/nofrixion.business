import ReactDOM from 'react-dom/client'
import { AccountDashboard } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'
import React from 'react'
import { AccountDashboardProps } from '@nofrixion/components/src/components/functional/AccountDashboard/AccountDashboard'

const AccountsReceivableWrapperForWebComponent: React.FC<AccountDashboardProps> = (props) => {
  return <AccountDashboard {...props} isWebComponent={true} />
}

const AccountDashboardWebComponent = r2wc(
  AccountsReceivableWrapperForWebComponent,
  React,
  ReactDOM,
  {
    props: {
      token: 'string',
      apiUrl: 'string',
      accountId: 'string',
      merchantId: 'string',
      onAllCurrentAccountsClick: 'function',
    },
  },
)

customElements.define('account-dashboard', AccountDashboardWebComponent)
