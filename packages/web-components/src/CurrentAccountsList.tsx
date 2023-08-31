import ReactDOM from 'react-dom/client'
import { AccountsList } from '@nofrixion/components'
import r2wc from 'react-to-webcomponent'
import React from 'react'

const CurrentAccountsListWebComponent = r2wc(AccountsList, React, ReactDOM, {
  props: {
    token: 'string',
    apiUrl: 'string',
    merchantId: 'string',
    onAccountClick: 'function',
  },
})

customElements.define('current-accounts-list', CurrentAccountsListWebComponent)
