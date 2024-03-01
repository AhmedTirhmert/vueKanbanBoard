export const resolveStatus = (title: string) => {
  return title.replace(/[\s-]/g, '').toLocaleLowerCase()
}
