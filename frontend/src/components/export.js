export const exportData = async (endpoint, format) => {
    const response = await fetch(`${endpoint}?format=${format}`);
    if (!response.ok) throw new Error('Failed to fetch data');
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };