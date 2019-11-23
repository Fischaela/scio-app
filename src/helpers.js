export const handleApiErrors = (response) => {
  // Logout user
  if (response.status === 403) {
    throw Error(response.statusText);
  }
}