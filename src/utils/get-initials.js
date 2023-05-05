// ** Returns initials from string
export const getInitials = (string) => {
  let finalResult = string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
  let result = finalResult.substring(0, 2);
  return (result)
  // string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
}
