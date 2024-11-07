export const formatSuccessResponse = (data: any, type: string) => {
  const formattedData = Array.isArray(data)
    ? data.map((item) => ({
        ...item
      }))
    : {
        ...data
      };

  return {
    success: true,
    type,
    total: (Array.isArray(formattedData) && data.length) || 1,
    data: formattedData,
    meta: {
      timestamp: new Date().toISOString()
    }
  };
};


export const formatSuccessResponseWithPagination = (
  data: any,
  type: string,
  paginationInfo: { currentPage: number; totalPages: number; totalCount: number, rowsPerPage: number }
) => {
  const formattedData = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
      }))
    : {
        ...data,
      };

  return {
    success: true,
    type,
    total: paginationInfo.totalCount,
    data: formattedData,
    pagination: {
      currentPage: paginationInfo.currentPage,
      totalPages: paginationInfo.totalPages,
      rowsPerPage: paginationInfo.rowsPerPage,
      totalCount: paginationInfo.totalCount,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
};
