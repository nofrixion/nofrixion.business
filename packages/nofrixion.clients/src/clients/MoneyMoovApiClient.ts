import { ApiProps } from '../types/props'
import { AccountsClient } from './AccountsClient'
import { ClientSettingsClient } from './ClientSettingsClient'
import { MerchantClient } from './MerchantClient'
import { PaymentRequestClient } from './PaymentRequestClient'
import { TransactionsClient } from './TransactionsClient'
import { UsersClient } from './UsersClient'

/**
 * The MoneyMoov Api Client provides access to the api endpoints in the MoneyMoov api.
 */
export class MoneyMoovApiClient {
  props: ApiProps

  /**
   * Provides access to the MoneyMoov PaymentRequests api.
   */
  PaymentRequests: PaymentRequestClient

  /**
   * Provides access to the MoneyMoov ClientSettings api.
   */
  ClientSettings: ClientSettingsClient

  /**
   * Provides access to the MoneyMoov Merchants api.
   */
  Merchants: MerchantClient

  /**
   * Provides access to the MoneyMoov Accounts api.
   */
  Accounts: AccountsClient

  /**
   * Provides access to the MoneyMoov Transactions api.
   */
  Transactions: TransactionsClient

  /**
   * Provides access to the MoneyMoov Users api.
   */
  Users: UsersClient

  /**
   *
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    this.props = props

    this.PaymentRequests = new PaymentRequestClient(props)
    this.ClientSettings = new ClientSettingsClient(props)
    this.Merchants = new MerchantClient(props)
    this.Accounts = new AccountsClient(props)
    this.Transactions = new TransactionsClient(props)
    this.Users = new UsersClient(props)
  }
}
