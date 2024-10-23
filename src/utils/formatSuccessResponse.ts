export const formatSuccessResponse = (data: any, type: string) => {
  const formattedData = Array.isArray(data)
    ? data.map((item) => ({
        attributes: { ...item }
      }))
    : {
        attributes: { ...data }
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
