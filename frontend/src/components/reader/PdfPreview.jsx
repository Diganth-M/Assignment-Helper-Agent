import React, { useState, useEffect } from 'react';

const PdfPreview = ({ documentKey }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // We use the full API URL through our backend proxy or direct endpoint
    // Assuming api is mounted on the same host or we construct it
    // Actually, in React, we can just use the path if the proxy is set up in vite,
    // or use the base URL from env.
    const url = `/api/default-documents/${documentKey}/file`;
    setPdfUrl(url);
  }, [documentKey]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#fff' }}>
        <h3>Failed to load PDF Preview</h3>
        <p>You can still read the Structured Content view.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '80vh' }}>
      <iframe
        src={pdfUrl}
        title="PDF Preview"
        width="100%"
        height="100%"
        style={{ border: 'none', backgroundColor: '#333' }}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default PdfPreview;
