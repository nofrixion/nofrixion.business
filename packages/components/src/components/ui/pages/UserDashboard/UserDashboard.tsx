import { Pagination, SortDirection, UserRoleAndUserInvite } from '@nofrixion/moneymoov'

import { Button, Icon } from '../../atoms'
import UserTable from '../../organisms/UsersTable/UserTable'
import { Toaster } from '../../Toast/Toast'

export interface UserDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  users: UserRoleAndUserInvite[] | undefined
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  isLoading: boolean
  selectedUserId: string | undefined
  onPageChange: (page: number) => void
  onSort: (name: 'lastmodified' | 'name' | 'status' | 'role', direction: SortDirection) => void
  isInitialState: boolean
  onUserClicked?: (user: UserRoleAndUserInvite) => void
  onInviteUser: () => void
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  users,
  pagination,
  isLoading = false,
  selectedUserId,
  onPageChange,
  onSort,
  onInviteUser,
  onUserClicked,
}) => {
  return (
    <>
      <div className="font-inter bg-main-grey text-default-text h-full">
        <div className="flex gap-8 justify-between items-center mb-8 md:mb-[68px] md:px-4">
          <span className="leading-8 font-medium text-2xl md:text-[1.75rem]">Users</span>
          <div className="flex">
            <Button size="big" onClick={onInviteUser} className="w-10 h-10 md:w-full md:h-full">
              <span className="hidden md:inline-block">Invite user</span>
              <Icon name="add/16" className="md:hidden" />
            </Button>
          </div>
        </div>

        <div className="flex-row bg-white rounded-lg px-7 py-8">
          <UserTable
            users={users}
            pagination={{
              pageSize: pagination.pageSize,
              totalSize: pagination.totalSize,
            }}
            onPageChange={onPageChange}
            onSort={onSort}
            isLoading={isLoading}
            onUserClicked={onUserClicked}
            selectedUserId={selectedUserId}
          />
        </div>

        <Toaster positionY="top" positionX="right" duration={3000} />
      </div>
    </>
  )
}

export { UserDashboard }
