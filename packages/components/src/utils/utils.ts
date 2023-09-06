export const getRoute = (route: string) => {
  const pullRequestId = import.meta.env.VITE_NOFRIXION_PULL_REQUEST_ID

  return pullRequestId ? `/${pullRequestId}${route}` : route
}
