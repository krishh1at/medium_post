export const formatObj = (obj) => {
  return { id: obj.id, ...obj.attributes };
}

export const formatData = (data) => {
  return data.map(obj => formatObj(obj));
}

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
