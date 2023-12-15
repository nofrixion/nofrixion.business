import { Dialog, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { parse, ParseResult } from 'papaparse'
import { Fragment, useEffect, useState } from 'react'

import { LocalInvoice, ValidationResult } from '../../../../types/LocalTypes'
import { validateInvoices } from '../../../../utils/validation'
import { Button, Icon } from '../../atoms'
import FileInput from '../../atoms/FileInput/FileInput'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../atoms/Tabs/Tabs'
import CustomModal from '../../CustomModal/CustomModal'
import ImportInvoiceTable from '../../organisms/ImportInvoiceTable/ImportInvoiceTable'
import BackArrow from '../../utils/BackArrow'

export interface ImportInvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (invoices: LocalInvoice[]) => void
}

const ImportInvoiceModal = ({ isOpen, onClose, onImport }: ImportInvoiceModalProps) => {
  const [validationResults, setValidationResults] = useState<ValidationResult[] | null>(null)
  const [invoices, setInvoices] = useState<LocalInvoice[] | undefined>()
  const [isError, setIsError] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'upload' | 'review'>('upload')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [fileName, setFilename] = useState<string>()

  useEffect(() => {
    if (isOpen) {
      setSelectedTab('upload')
      setFilename(undefined)
      setValidationResults([])
      setInvoices(undefined)
      setSelectedInvoices([])
    }
  }, [isOpen])

  const linesWithErrors = validationResults?.filter((result) => !result.valid)

  const handleFileAdded = (file: File) => {
    if (file && file.type != 'text/csv') {
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (file) {
      setIsLoading(true)

      const reader = new FileReader()

      reader.readAsText(file)

      reader.onload = async () => {
        parse(reader.result as string, {
          header: true,
          skipEmptyLines: true,
          transform: (value: string) => (value == '' ? undefined : value),
          complete: (results: ParseResult<LocalInvoice>) => {
            const validationResults = validateInvoices(results.data)
            setValidationResults(validationResults)

            // If there's at least one valid invoice, set the valid invoice(s)
            const validResults = validationResults
              .filter((result) => result.valid)
              .map((result) => result.result)

            setInvoices(validResults)

            // Select all valid invoices
            setSelectedInvoices(validResults.map((invoice) => invoice.InvoiceNumber))

            setIsLoading(false)
            setSelectedTab('review')

            setFilename(file.name)
          },
          error: () => {
            setIsLoading(false)
            setIsError(true)
          },
        })
      }
    }
  }

  const onRemoveFile = () => {
    setFilename(undefined)
    setValidationResults([])
    setInvoices(undefined)
    setSelectedInvoices([])
  }

  const onImportInvoices = () => {
    const invoicesToImport = invoices?.filter((invoice) =>
      selectedInvoices?.includes(invoice.InvoiceNumber),
    )

    onImport(invoicesToImport ?? [])
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative font-inter text-default-text z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full transform bg-white text-left align-middle transition-all min-h-screen lg:px-0 lg:flex fixed inset-0 overflow-y-auto z-50">
              <div className="flex min-h-full flex-row pt-[80px] w-full">
                <BackArrow
                  intent="close"
                  onClick={() => {
                    onClose()
                  }}
                />
                <div className="-mt-1 ml-[2.875rem] w-full pr-[7.625rem]">
                  <Dialog.Title
                    as="h3"
                    className="text-[28px]/8 font-semibold text-clip md:whitespace-nowrap flex-nowrap flex justify-between h-10"
                  >
                    Import invoices
                    <AnimatePresence>
                      {selectedInvoices?.length > 0 && selectedTab == 'review' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            size="large"
                            onClick={onImportInvoices}
                            className="w-10 h-10 md:w-full md:h-12"
                          >
                            <span className="hidden md:inline-block">
                              Import{' '}
                              {selectedInvoices.length == 1
                                ? 'invoice'
                                : `${selectedInvoices.length} invoices`}
                            </span>
                            <Icon name="add/16" className="md:hidden" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Dialog.Title>

                  <Tabs value={selectedTab} defaultValue="upload" className="w-full mt-14">
                    <TabsList className="h-10 flex justify-normal">
                      <TabsTrigger
                        value="upload"
                        className="first:rounded-l-md last:rounded-r-md text-default-text disabled:text-grey-text font-medium bg-main-grey transition-all focus-visible:outline-none disabled:pointer-events-none data-[state=active]:bg-information-bg h-full"
                        onClick={() => setSelectedTab('upload')}
                      >
                        <div className="pr-4">1</div>
                        <div>Upload file</div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="review"
                        className="first:rounded-l-md last:rounded-r-md text-default-text disabled:text-grey-text font-medium bg-main-grey transition-all focus-visible:outline-none disabled:pointer-events-none data-[state=active]:bg-information-bg h-full"
                        onClick={() => setSelectedTab('review')}
                        disabled={fileName == undefined}
                      >
                        <div className="pr-4">2</div>
                        <div>Review and import</div>
                      </TabsTrigger>
                      <AnimatePresence>
                        {linesWithErrors && linesWithErrors.length > 0 && (
                          <motion.div
                            className="bg-error-bg p-3 flex rounded ml-auto h-11"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-sm">
                              <span className="font-bold">{linesWithErrors.length}</span>{' '}
                              {linesWithErrors.length == 1 ? 'entry' : 'entries'} not included
                              because {linesWithErrors.length == 1 ? 'it has' : 'they have'} errors.{' '}
                              <button onClick={() => setShowErrorModal(true)} className="underline">
                                Show details
                              </button>
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TabsList>
                    <TabsContent value="upload" className="w-full">
                      <div className="pt-12">
                        <FileInput
                          onFileAdded={handleFileAdded}
                          isError={isError}
                          setIsError={setIsError}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                        >
                          {fileName && (
                            <div className="flex flex-col justify-center items-center">
                              <div className="flex gap-x-4 items-center">
                                <span className="text-base/5 font-semibold">{fileName}</span>
                                <button onClick={onRemoveFile}>
                                  <Icon name="delete/16" className="text-control-grey-hover" />
                                </button>
                              </div>
                              <span className="font-normal text-base/8 text-control-grey">
                                <span className="font-semibold">{invoices?.length}</span> invoice
                                {invoices?.length == 1 ? ' ' : 's '}
                                loaded
                              </span>
                            </div>
                          )}
                        </FileInput>
                      </div>
                    </TabsContent>
                    <TabsContent value="review" className="mt-14">
                      {/* TODO: Validate length */}
                      {invoices && (
                        <ImportInvoiceTable
                          invoices={invoices}
                          selectedInvoices={selectedInvoices}
                          setSelectedInvoices={setSelectedInvoices}
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <CustomModal
                title={`${linesWithErrors?.length} ${
                  linesWithErrors?.length === 1 ? 'entry' : 'entries'
                } with errors`}
                showFooter={false}
                open={showErrorModal}
                onDismiss={() => {
                  setShowErrorModal(false)
                }}
                contentClassName={'max-w-[50rem] h-[25rem]'}
                scrollableContent
              >
                {/* Show error per line */}
                {validationResults
                  ?.filter((result) => !result.valid)
                  .map((result, i) => {
                    return (
                      <div
                        key={`import-error-${i}`}
                        className="py-3 border-b border-border-grey text-sm flex "
                      >
                        <span className="font-semibold w-20">Line {result.lineNumber}</span>
                        <div className="flex gap-x-4 gap-y-2 flex-wrap">
                          {result.errors?.map((err, i) => {
                            return (
                              <div
                                key={`import-error-detail-${i}`}
                                className="flex items-center gap-x-2"
                              >
                                <Icon
                                  name={
                                    err.code == 'invalid_type'
                                      ? err.received === 'undefined'
                                        ? 'missing/16'
                                        : 'error/16'
                                      : 'error/16'
                                  }
                                  className={
                                    err.code == 'invalid_type'
                                      ? err.received === 'undefined'
                                        ? 'text-control-grey-hover'
                                        : 'text-negative-red'
                                      : 'text-negative-red'
                                  }
                                />
                                <span>{err.message}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
              </CustomModal>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default ImportInvoiceModal
