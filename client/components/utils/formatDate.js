// export const formatDate = (date) =>
//   new Date(date).toLocaleDateString("en-US"); 

export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");

    return `${m}/${d}/${y}`;
  };