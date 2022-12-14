export const generateTitlePartialSearch = (search: string): { title: { contains: string } }[] => {
  return search
    .replace(new RegExp(',', 'g'), '')
    .split(' ')
    .map((item) => ({
      title: { contains: item },
    }));
};
