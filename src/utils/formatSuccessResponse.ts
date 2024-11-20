export const formatSuccessResponse = (data: any, type: string) => {
  // Check if the data is null and return the desired format
  if (data === null) {
    return {
      success: true,
      type,
      total: 0,
      data: null,
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  }

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
    total: Array.isArray(formattedData) ? formattedData.length : 1, // Return 1 if it's an object
    data: formattedData,
    meta: {
      timestamp: new Date().toISOString()
    }
  };
};

export const formatSuccessResponseWithPagination = (
  data: any,
  type: string,
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    rowsPerPage: number;
  }
) => {
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
    total: Array.isArray(formattedData) ? paginationInfo.totalCount : 1, // Return 1 if it's an object
    data: formattedData,
    pagination: {
      currentPage: paginationInfo.currentPage,
      totalPages: paginationInfo.totalPages,
      rowsPerPage: paginationInfo.rowsPerPage,
      totalCount: paginationInfo.totalCount
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  };
};