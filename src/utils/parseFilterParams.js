const parseFavorite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;
  const isFavourite = (favourite) => ['true', 'false'].includes(favourite);

  if (isFavourite(favourite)) return favourite;
};

export const parseFilterParams = (query) => {
  const { isFavourite } = query;

  const parsedFavorite = parseFavorite(isFavourite);

  return {
    isFavourite: parsedFavorite,
  };
};
