export const formatStringToFillInSpace = (
  name: string,
  lettersToShow: number
) => {
  return name.length > lettersToShow
    ? `${name.slice(0, lettersToShow)}...`
    : name
}
