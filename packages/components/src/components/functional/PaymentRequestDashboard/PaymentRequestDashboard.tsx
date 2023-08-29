import {
  ApiError,
  Currency,
  formatSortExpression,
  PaymentRequest,
  PaymentRequestClient,
  PaymentRequestMetrics,
  PaymentRequestStatus,
  useAccounts,
  useCapture,
  useCreatePayout,
  useMerchant,
  useMerchantTags,
  usePaymentRequestMetrics,
  usePaymentRequests,
  useRefund,
  useVoid,
} from '@nofrixion/moneymoov'
import * as Tabs from '@radix-ui/react-tabs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { add, endOfDay, set, startOfDay } from 'date-fns'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button, Icon } from '../../../components/ui/atoms'
import { LocalPartialPaymentMethods, LocalPaymentMethodTypes } from '../../../types/LocalEnums'
import {
  LocalAccount,
  LocalCounterparty,
  LocalPaymentRequest,
  LocalPaymentRequestCreate,
  LocalTag,
} from '../../../types/LocalTypes'
import {
  localAccountIdentifierTypeToRemoteAccountIdentifierType,
  localCounterPartyToRemoteCounterParty,
  parseApiTagToLocalTag,
  remoteAccountsToLocalAccounts,
  remotePaymentRequestToLocalPaymentRequest,
} from '../../../utils/parsers'
import CreatePaymentRequestPage from '../../functional/CreatePaymentRequestPage/CreatePaymentRequestPage'
import { SortDirection } from '../../ui/ColumnHeader/ColumnHeader'
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker'
import FilterControlsRow from '../../ui/FilterControlsRow/FilterControlsRow'
import PaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable'
import ScrollArea from '../../ui/ScrollArea/ScrollArea'
import Tab from '../../ui/Tab/Tab'
import { FilterableTag } from '../../ui/TagFilter/TagFilter'
import { makeToast } from '../../ui/Toast/Toast'
import LayoutWrapper from '../../ui/utils/LayoutWrapper'
import PaymentRequestDetailsModal from '../PaymentRequestDetailsModal/PaymentRequestDetailsModal'

export interface PaymentRequestDashboardProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
  onUnauthorized: () => void
}

const queryClient = new QueryClient()

const PaymentRequestDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: PaymentRequestDashboardProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaymentRequestDashboardMain
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        onUnauthorized={onUnauthorized}
      />
    </QueryClientProvider>
  )
}

const PaymentRequestDashboardMain = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: PaymentRequestDashboardProps) => {
  const [page, setPage] = useState(1)
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [contactSortDirection, setContactSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [status, setStatus] = useState<PaymentRequestStatus>(PaymentRequestStatus.All)
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: startOfDay(add(new Date(), { days: -90 })), // Last 90 days as default
    toDate: endOfDay(new Date()),
  })
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [currencyFilter, setCurrencyFilter] = useState<string | undefined>()
  const [minAmountFilter, setMinAmountFilter] = useState<number | undefined>()
  const [maxAmountFilter, setMaxAmountFilter] = useState<number | undefined>()
  const [tags, setTags] = useState<FilterableTag[]>([])
  const [tagsFilter, setTagsFilter] = useState<string[]>([])
  const [showMorePage, setShowMorePage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [metrics, setMetrics] = useState<PaymentRequestMetrics | undefined>(undefined)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[] | undefined>(undefined)

  const [isCreatePaymentRequestOpen, setIsCreatePaymentRequestOpen] = useState(false)

  const [selectedPaymentRequestID, setSelectedPaymentRequestID] = useState<string | undefined>(
    undefined,
  )
  const [prefilledPaymentRequest, setPrefilledPaymentRequest] = useState<
    LocalPaymentRequestCreate | undefined
  >(undefined)

  const pageSize = 20

  const client = new PaymentRequestClient({ apiUrl: apiUrl, authToken: token })

  const onPaymentRequestRowClicked = (paymentRequest: LocalPaymentRequest) => {
    setSelectedPaymentRequestID(paymentRequest.id)
  }

  const onPaymentRequestDetailsModalDismiss = () => {
    setSelectedPaymentRequestID(undefined)
  }

  const getSelectedTagFilters = () => {
    if (!tags) {
      return []
    }

    return tags.filter((tag) => tag.isSelected).map((tag) => tag.id)
  }

  const handleApiError = (error: ApiError) => {
    if (error && error.status === 401) {
      onUnauthorized()
    }
  }

  const { data: merchant } = useMerchant({ apiUrl, authToken: token }, { merchantId })

  const { data: paymentRequestsResponse, isLoading: isLoadingPaymentRequests } = usePaymentRequests(
    {
      amountSortDirection: amountSortDirection,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      status: status,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { processRefund } = useRefund(
    {
      amountSortDirection: amountSortDirection,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      status: status,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { processVoid } = useVoid(
    {
      amountSortDirection: amountSortDirection,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      status: status,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { processCapture } = useCapture(
    {
      amountSortDirection: amountSortDirection,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      status: status,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { createPayout } = useCreatePayout(
    {
      amountSortDirection: amountSortDirection,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      status: status,
      fromDateMS: dateRange?.fromDate?.getTime(),
      toDateMS: dateRange?.toDate?.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
    true,
  )

  const { data: accounts } = useAccounts({ merchantId }, { apiUrl, authToken: token })

  const [localPaymentRequests, setLocalPaymentRequests] = useState<LocalPaymentRequest[]>([])

  const [firstMetrics, setFirstMetrics] = useState<PaymentRequestMetrics | undefined>()

  const { data: metricsResponse, isLoading: isLoadingMetrics } = usePaymentRequestMetrics(
    {
      merchantId: merchantId,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { data: merchantTagsResponse } = useMerchantTags(
    { merchantId: merchantId },
    { apiUrl: apiUrl, authToken: token },
  )

  const [localMerchantTags, setLocalMerchantTags] = useState<LocalTag[]>([] as LocalTag[])

  useEffect(() => {
    if (paymentRequestsResponse?.status === 'success') {
      setPaymentRequests(paymentRequestsResponse.data.content)
      setTotalRecords(paymentRequestsResponse.data.totalSize)
    } else if (paymentRequestsResponse?.status === 'error') {
      makeToast('error', 'Error fetching payment requests.')
      console.error(paymentRequestsResponse.error)

      handleApiError(paymentRequestsResponse.error)
    }
  }, [paymentRequestsResponse])

  useEffect(() => {
    setShowMorePage(1)
    setLocalPaymentRequests(
      paymentRequests?.map((paymentRequest) =>
        remotePaymentRequestToLocalPaymentRequest(paymentRequest),
      ) ?? [],
    )
  }, [paymentRequests])

  useEffect(() => {
    const tempTagArray = getSelectedTagFilters()
    setTagsFilter([...tempTagArray])
  }, [tags])

  useEffect(() => {
    if (merchantTagsResponse?.status === 'success') {
      setLocalMerchantTags(merchantTagsResponse.data.map((tag) => parseApiTagToLocalTag(tag)))
      setTags(
        merchantTagsResponse.data.map((tag) => {
          return {
            id: tag.id,
            label: tag.name,
            isSelected: false,
          }
        }),
      )
    } else if (merchantTagsResponse?.status === 'error') {
      console.warn(merchantTagsResponse.error)
      handleApiError(merchantTagsResponse.error)
    }
  }, [merchantTagsResponse])

  useEffect(() => {
    if (metricsResponse?.status === 'success') {
      setMetrics(metricsResponse.data)
    } else if (metricsResponse?.status === 'error') {
      makeToast('error', 'Error fetching metrics.')
      console.error(metricsResponse.error)
      handleApiError(metricsResponse.error)
    }
  }, [metricsResponse])

  const onDeletePaymentRequest = async (paymentRequest: LocalPaymentRequest) => {
    const response = await client.delete(paymentRequest.id)

    if (response.error) {
      makeToast('error', response.error.title)

      handleApiError(response.error)

      return
    }

    makeToast('success', 'Payment request successfully deleted.')

    // Remove the payment request from the local list.
    setLocalPaymentRequests(localPaymentRequests.filter((pr) => pr.id !== paymentRequest.id))

    // Update the metrics
    if (metrics) {
      metrics.all--
      metrics.unpaid--

      updateMetricTotals(paymentRequest.currency, paymentRequest.amount * -1)
    }
  }

  const onCopyPaymentRequestLink = async (paymentRequest: LocalPaymentRequest) => {
    const link = `${paymentRequest.hostedPayCheckoutUrl}`
    await navigator.clipboard.writeText(link)

    makeToast('success', 'Link copied into clipboard.')
  }

  const onOpenPaymentPage = async (paymentRequest: LocalPaymentRequest) => {
    window.open(paymentRequest.hostedPayCheckoutUrl, '_blank')
  }

  const onDuplicatePaymentRequest = (paymentRequest: LocalPaymentRequest) => {
    setPrefilledPaymentRequest({
      amount: paymentRequest.amount,
      currency: paymentRequest.currency,
      description: paymentRequest.description,
      productOrService: paymentRequest.productOrService,
      firstName: paymentRequest.contact?.name?.split(' ')[0],
      lastName: paymentRequest.contact?.name?.split(' ').slice(1).join(' '),
      email: paymentRequest.contact.email,
      paymentConditions: {
        allowPartialPayments:
          paymentRequest.partialPaymentMethod === LocalPartialPaymentMethods.Partial,
      },
      paymentMethods: {
        bank: {
          active: paymentRequest.paymentMethodTypes.includes(LocalPaymentMethodTypes.Pisp),
          priority: paymentRequest.priorityBankID
            ? {
                id: paymentRequest.priorityBankID,
                name: '',
              }
            : undefined,
        },
        card: {
          active: paymentRequest.paymentMethodTypes.includes(LocalPaymentMethodTypes.Card),
          captureFunds: paymentRequest.captureFunds,
        },
        wallet:
          paymentRequest.paymentMethodTypes.includes(LocalPaymentMethodTypes.ApplePay) &&
          paymentRequest.paymentMethodTypes.includes(LocalPaymentMethodTypes.GooglePay),
        lightning: paymentRequest.paymentMethodTypes.includes(LocalPaymentMethodTypes.Lightning),
      },
      notificationEmailAddresses: paymentRequest.notificationEmailAddresses,
    })

    setIsCreatePaymentRequestOpen(true)
  }

  const onCreatePaymentRequest = () => {
    setPrefilledPaymentRequest(undefined)
    setIsCreatePaymentRequestOpen(true)
  }

  const onCloseCreatePaymentRequest = async () => {
    setPrefilledPaymentRequest(undefined)
    setIsCreatePaymentRequestOpen(false)
  }

  const updateMetricTotals = (currency: Currency, amount: number) => {
    if (metrics) {
      const currencyField: 'eur' | 'gbp' | undefined =
        currency === Currency.EUR ? 'eur' : currency === Currency.GBP ? 'gbp' : undefined

      if (currencyField) {
        if (metrics.totalAmountsByCurrency?.all?.[currencyField]) {
          metrics.totalAmountsByCurrency.all[currencyField]! += amount
        }
        if (metrics.totalAmountsByCurrency?.unpaid?.[currencyField]) {
          metrics.totalAmountsByCurrency.unpaid[currencyField]! += amount
        }
      }
    }
  }

  // Adds the newly created payment request to the top of the list
  // Increments the metrics all and unpaid counts
  // Sets the newly created payment request as the selected one
  const onPaymentRequestCreated = async (paymentRequest: LocalPaymentRequest) => {
    localPaymentRequests.splice(0, 0, paymentRequest)
    if (metrics) {
      metrics.all++
      metrics.unpaid++

      updateMetricTotals(paymentRequest.currency, paymentRequest.amount)
    }

    setIsCreatePaymentRequestOpen(false)

    setSelectedPaymentRequestID(paymentRequest.id)
  }

  const onCardRefundClick = async (authorizationID: string, amount: number, isVoid: boolean) => {
    if (selectedPaymentRequestID) {
      if (isVoid) {
        const voidResult = await processVoid({
          paymentRequestId: selectedPaymentRequestID,
          authorizationId: authorizationID,
        })

        if (voidResult.error) {
          makeToast('error', 'Error processing void.')
          handleApiError(voidResult.error)
        } else {
          makeToast('success', 'Payment successfully voided.')
        }
      } else {
        const refundResult = await processRefund({
          paymentRequestId: selectedPaymentRequestID,
          authorizationId: authorizationID,
          amount: amount,
        })

        if (refundResult.error) {
          makeToast('error', 'Error processing refund.')
          handleApiError(refundResult.error)
        } else {
          makeToast('success', 'Payment successfully refunded.')
        }
      }
    }
  }

  const onBankRefundClick = async (
    sourceAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    paymentInitiationID: string,
  ) => {
    const yourReference = `REFUND-${paymentInitiationID}`
    if (selectedPaymentRequestID) {
      const result = await createPayout({
        accountID: sourceAccount.id,
        type: localAccountIdentifierTypeToRemoteAccountIdentifierType(
          sourceAccount.identifier.type,
        ),
        description: `Refund for ${selectedPaymentRequestID}`,
        currency: sourceAccount.currency,
        amount: amount,
        yourReference: yourReference,
        theirReference: 'Refund',
        destination: localCounterPartyToRemoteCounterParty(counterParty),
        allowIncomplete: false,
        paymentRequestId: selectedPaymentRequestID,
      })

      if (result.error) {
        makeToast('error', 'Error creating refund.')
        handleApiError(result.error)
      } else {
        makeToast('success', 'Refund successfully submitted for approval.')
      }
    }
  }

  const onCaptureClick = async (authorizationID: string, amount: number) => {
    if (selectedPaymentRequestID) {
      const result = await processCapture({
        paymentRequestId: selectedPaymentRequestID,
        authorizationId: authorizationID,
        amount: amount,
      })

      if (result.error) {
        makeToast('error', 'Error capturing Payment.')
        handleApiError(result.error)
      } else {
        makeToast('success', 'Payment successfully captured.')
      }
    }
  }

  /**
   * Fetches the next page of payment requests and adds them to the local list.
   */
  const fetchNextPage = async () => {
    setIsLoadingMore(true)

    const sort = formatSortExpression({
      statusSortDirection,
      createdSortDirection,
      contactSortDirection,
      amountSortDirection,
    })

    const paymentRequests = await client.getAll({
      pageNumber: showMorePage + 1,
      pageSize: pageSize,
      sort: sort,
      tags: tagsFilter,
      status: status,
      fromDate: dateRange.fromDate,
      toDate: dateRange.toDate,
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      merchantId: merchantId,
    })

    if (paymentRequests.status === 'success') {
      setLocalPaymentRequests((prev) => [
        ...prev,
        ...paymentRequests.data.content.map((pr) => remotePaymentRequestToLocalPaymentRequest(pr)),
      ])
      setShowMorePage(showMorePage + 1)
    }
    setIsLoadingMore(false)
  }

  /// Only show the total amount if there are payment requests
  /// with the specified timeframe and currency, no matter the status,
  /// unless there are no payment requests at all for the specified status.
  const getTotalAmountPerCurrencyAndStatus = (
    currency: 'eur' | 'gbp',
    status: 'paid' | 'partiallyPaid' | 'unpaid' | 'authorized',
  ) => {
    if (
      metrics &&
      metrics.totalAmountsByCurrency &&
      metrics.totalAmountsByCurrency.all?.[currency] &&
      metrics[status] &&
      metrics[status] > 0
    ) {
      return metrics.totalAmountsByCurrency?.[status]?.[currency] ?? 0
    }
  }

  // tore the results of the first execution of the metrics
  // and use them as the initial state of the metrics.
  // This way, when they change the dates
  // we don't see the metrics disappear
  useEffect(() => {
    if (metrics && (!firstMetrics || firstMetrics?.all === 0)) {
      setFirstMetrics(metrics)
    }
  }, [metrics])

  const isInitialState = !isLoadingMetrics && (!firstMetrics || firstMetrics?.all === 0)

  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <div className="flex gap-8 justify-between items-center mb-8 md:mb-[68px] md:px-4">
        <span className="leading-8 font-medium text-2xl md:text-[1.75rem]">
          Accounts Receivable
        </span>
        <LayoutGroup>
          <AnimatePresence initial={false}>
            {!isInitialState && (
              <LayoutWrapper>
                <Button
                  size="big"
                  onClick={onCreatePaymentRequest}
                  className="w-10 h-10 md:w-full md:h-full"
                >
                  <span className="hidden md:inline-block">Create payment request</span>
                  <Icon name="add/16" className="md:hidden" />
                </Button>
              </LayoutWrapper>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {!isInitialState && (
          <div className="mb-4">
            <FilterControlsRow
              setDateRange={setDateRange}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              currency={currencyFilter}
              setCurrency={setCurrencyFilter}
              minAmount={minAmountFilter}
              setMinAmount={setMinAmountFilter}
              maxAmount={maxAmountFilter}
              setMaxAmount={setMaxAmountFilter}
              tags={tags}
              setTags={setTags}
              createdSortDirection={createdSortDirection}
              setCreatedSortDirection={setCreatedSortDirection}
              amountSortDirection={amountSortDirection}
              setAmountSortDirection={setAmountSortDirection}
              firstDate={
                // Set first date to the first day of the year the merchant was created
                merchant?.status == 'success'
                  ? set(new Date(merchant?.data.inserted), { month: 0, date: 1 })
                  : undefined
              }
            />
          </div>
        )}
      </AnimatePresence>

      <LayoutGroup>
        <AnimatePresence initial={false}>
          {!isInitialState && (
            <LayoutWrapper className="h-full">
              <ScrollArea hideScrollbar>
                <Tabs.Root
                  defaultValue={PaymentRequestStatus.All}
                  onValueChange={(value) => setStatus(value as PaymentRequestStatus)}
                >
                  {/* Keep the Tab to still get accessibility functions through the keyboard */}
                  <Tabs.List className="flex shrink-0 gap-x-4 mb-4">
                    <Tab
                      status={PaymentRequestStatus.All}
                      isLoading={isLoadingMetrics}
                      totalRecords={metrics?.all ?? 0}
                      totalAmountInEuros={metrics?.totalAmountsByCurrency?.all?.eur}
                      totalAmountInPounds={metrics?.totalAmountsByCurrency?.all?.gbp}
                    />
                    <Tab
                      status={PaymentRequestStatus.None}
                      isLoading={isLoadingMetrics}
                      totalRecords={metrics?.unpaid ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus('eur', 'unpaid')}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus('gbp', 'unpaid')}
                    />
                    <Tab
                      status={PaymentRequestStatus.Authorized}
                      isLoading={isLoadingMetrics}
                      totalRecords={metrics?.authorized ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus('eur', 'authorized')}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus('gbp', 'authorized')}
                    />
                    <Tab
                      status={PaymentRequestStatus.PartiallyPaid}
                      isLoading={isLoadingMetrics}
                      totalRecords={metrics?.partiallyPaid ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus(
                        'eur',
                        'partiallyPaid',
                      )}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus(
                        'gbp',
                        'partiallyPaid',
                      )}
                    />
                    <Tab
                      status={PaymentRequestStatus.FullyPaid}
                      isLoading={isLoadingMetrics}
                      totalRecords={metrics?.paid ?? 0}
                      totalAmountInEuros={getTotalAmountPerCurrencyAndStatus('eur', 'paid')}
                      totalAmountInPounds={getTotalAmountPerCurrencyAndStatus('gbp', 'paid')}
                    />
                  </Tabs.List>
                  <Tabs.Content value=""></Tabs.Content>
                </Tabs.Root>
              </ScrollArea>
            </LayoutWrapper>
          )}
        </AnimatePresence>

        <LayoutWrapper className="lg:bg-white lg:min-h-[18rem] lg:py-10 lg:px-6 lg:rounded-lg">
          <PaymentRequestTable
            paymentRequests={localPaymentRequests}
            pageSize={pageSize}
            totalRecords={totalRecords}
            onPageChanged={setPage}
            setStatusSortDirection={setStatusSortDirection}
            setCreatedSortDirection={setCreatedSortDirection}
            setContactSortDirection={setContactSortDirection}
            setAmountSortDirection={setAmountSortDirection}
            onPaymentRequestDuplicateClicked={onDuplicatePaymentRequest}
            onPaymentRequestDeleteClicked={onDeletePaymentRequest}
            onPaymentRequestCopyLinkClicked={onCopyPaymentRequestLink}
            isLoading={isLoadingPaymentRequests}
            isEmpty={isInitialState}
            onCreatePaymentRequest={onCreatePaymentRequest}
            onPaymentRequestClicked={onPaymentRequestRowClicked}
            onOpenPaymentPage={onOpenPaymentPage}
            selectedPaymentRequestID={selectedPaymentRequestID}
          />

          {!isInitialState && localPaymentRequests.length < totalRecords && (
            <div className="flex">
              <Button
                variant="tertiary"
                size="big"
                onClick={fetchNextPage}
                disabled={isLoadingMore}
                className="lg:hidden mx-auto mt-6 mb-2 w-fit"
              >
                Show more
              </Button>
            </div>
          )}
        </LayoutWrapper>
      </LayoutGroup>

      <CreatePaymentRequestPage
        isOpen={isCreatePaymentRequestOpen}
        onClose={onCloseCreatePaymentRequest}
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        onPaymentRequestCreated={onPaymentRequestCreated}
        prefilledPaymentRequest={prefilledPaymentRequest}
      />
      <PaymentRequestDetailsModal
        token={token}
        apiUrl={apiUrl}
        merchantId={merchantId}
        selectedPaymentRequestID={selectedPaymentRequestID ?? ''}
        merchantTags={localMerchantTags}
        paymentRequests={localPaymentRequests}
        open={!!selectedPaymentRequestID}
        onDismiss={onPaymentRequestDetailsModalDismiss}
        setMerchantTags={setLocalMerchantTags}
        setPaymentRequests={setLocalPaymentRequests}
        onCardRefund={onCardRefundClick}
        onBankRefund={onBankRefundClick}
        onCapture={onCaptureClick}
        statusSortDirection={statusSortDirection}
        createdSortDirection={createdSortDirection}
        contactSortDirection={contactSortDirection}
        amountSortDirection={amountSortDirection}
        pageNumber={page}
        pageSize={pageSize}
        fromDateMS={dateRange.fromDate && dateRange.fromDate.getTime()}
        toDateMS={dateRange.toDate && dateRange.toDate.getTime()}
        status={status}
        search={searchFilter?.length >= 3 ? searchFilter : undefined}
        currency={currencyFilter}
        minAmount={minAmountFilter}
        maxAmount={maxAmountFilter}
        tags={tagsFilter}
        accounts={
          accounts?.status === 'success' && accounts.data
            ? remoteAccountsToLocalAccounts(accounts.data)
            : []
        }
      ></PaymentRequestDetailsModal>
    </div>
  )
}

export default PaymentRequestDashboard
