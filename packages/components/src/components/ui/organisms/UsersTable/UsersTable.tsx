import { Pagination, SortDirection, UserRoleAndUserInvite } from '@nofrixion/moneymoov'

import { cn } from '../../../../utils'
import { formatDateWithYearAndTime } from '../../../../utils/formatters'
import { userRoleToDisplay, userStatusToStatus } from '../../../../utils/parsers'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../atoms/Table/Table'
import ColumnHeader from '../../ColumnHeader/ColumnHeader'
import { Loader } from '../../Loader/Loader'
import { Status } from '../../molecules'
import Pager from '../../Pager/Pager'
import EmptyState from '../../PaymentRequestTable/EmptyState'

export interface UsersTableProps extends React.HTMLAttributes<HTMLDivElement> {
  users: UserRoleAndUserInvite[] | undefined
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  onPageChange: (page: number) => void
  onSort: (name: 'lastmodified' | 'username' | 'status' | 'role', direction: SortDirection) => void
  onUserClicked?: (user: UserRoleAndUserInvite) => void
  isLoading?: boolean
  selectedUserId: string | undefined
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  pagination,
  onPageChange,
  onSort,
  onUserClicked,
  isLoading,
  selectedUserId,
  ...props
}: UsersTableProps) => {
  const onUserClickedHandler = (
    event: React.MouseEvent<HTMLTableRowElement | HTMLButtonElement | HTMLDivElement, MouseEvent>,
    user: UserRoleAndUserInvite,
  ) => {
    onUserClicked && onUserClicked(user)
  }

  return (
    <div className="flex justify-center w-full" {...props}>
      {users && users.length > 0 && (
        <>
          <Table {...props}>
            <TableHeader>
              <TableRow className="hover:bg-transparent cursor-auto">
                <TableHead className="w-[150px]">
                  <ColumnHeader
                    label={'Status'}
                    onSort={(direction) => onSort('status', direction)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    label={'User Name'}
                    onSort={(direction) => onSort('username', direction)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader label={'Role'} onSort={(direction) => onSort('role', direction)} />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    label={'Last Modified'}
                    onSort={(direction) => onSort('lastmodified', direction)}
                  />
                </TableHead>
                <TableHead>{/* Action buttons */}</TableHead>
                <TableHead>
                  <Pager
                    onPageChange={onPageChange}
                    pageSize={pagination.pageSize}
                    totalRecords={pagination.totalSize}
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from(Array(12)).map((_, index) => (
                  <TableRow
                    key={`pr-placeholder-${index}`}
                    className="animate-pulse border-b border-[#F1F2F3]"
                  >
                    <TableCell className="w-48 py-6">
                      <div className="w-full h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-48">
                      <div className="w-full h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-48">
                      <div className="w-1/4 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="p-0"></TableCell>

                    <TableCell className="w-0">
                      <div className="w-1/2 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-0">
                      <div className="w-1/2 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading &&
                users &&
                users.length > 0 &&
                users?.map((user, index) => (
                  <TableRow
                    className={cn(
                      'cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]',
                      {
                        'bg-[#F6F8F9] border-[#E1E5EA]': selectedUserId === user.userID,
                      },
                    )}
                    key={`${user}-${index}`}
                    onClick={(event) => onUserClickedHandler(event, user)}
                  >
                    <TableCell className="w-48">
                      <Status size="small" variant={userStatusToStatus(user.status)} />
                    </TableCell>
                    <TableCell className="w-48">{user.name}</TableCell>
                    <TableCell className="w-48">{userRoleToDisplay(user.roleType)}</TableCell>
                    <TableCell>
                      {user.lastModified && formatDateWithYearAndTime(new Date(user.lastModified))}
                    </TableCell>
                    <TableCell className="pl-0 text-grey-text font-normal text-sm text-right"></TableCell>
                    <TableCell className="text-center w-0"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}

      {isLoading && !users && (
        <div className=" justify-center items-center">
          <Loader className="mt-12" />
        </div>
      )}

      {!isLoading && users !== undefined && users?.length === 0 && (
        <EmptyState state="nothingFound" description="No users were found" />
      )}
    </div>
  )
}

export default UsersTable
