import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { exportData } from './component/export'; // Adjust the path as necessary

function ExportButton({ endpoint }) {
  const [format, setFormat] = useState('');

  const handleExport = async () => {
    if (!format) return;
    try {
      await exportData(endpoint, format);
    } catch (error) {
      console.error(error);
      alert('Failed to export data. Please try again.');
    }
  };

  return (
    <div>
      <button className="btn btn-outline" onClick={() => setFormat(format === 'json' ? '' : 'json')}>
        JSON
      </button>
      <button className="btn btn-outline" onClick={() => setFormat(format === 'csv' ? '' : 'csv')}>
        CSV
      </button>
      <button className="btn btn-primary" onClick={handleExport}>
        <FiChevronDown /> Export
      </button>
    </div>
  );
}

export default ExportButton;