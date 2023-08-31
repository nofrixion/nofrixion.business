import ReactDOM from 'react-dom/client'
import { AccountDashboard } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'
import React from 'react'

const AccountDashboardWebComponent = r2wc(AccountDashboard, React, ReactDOM, {
  props: {
    token: 'string',
    apiUrl: 'string',
    accountId: 'string',
    merchantId: 'string',
    onAllCurrentAccountsClick: 'function',
  },
})

customElements.define('account-dashboard', AccountDashboardWebComponent)
