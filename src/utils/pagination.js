const Pagination = (record, page, limit) => {
  const { count: totalItems, rows: data } = record;
  if (!page && !limit) {
    return { totalItems, data };
  }
  const currentPage = page ? Number(page) : 0;
  const nextPage = Number(totalItems) / Number(limit) > Number(page) ? Number(page) + 1 : null;
  const previousPage = Number(page) <= 1 ? null : Number(page) - 1;
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));
  return {
    totalItems,
    data,
    totalPages,
    currentPage,
    nextPage,
    previousPage
  };
};

export default Pagination;
