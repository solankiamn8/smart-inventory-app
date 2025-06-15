import React, { useState } from 'react';
import QRCodeScanner from '@/components/QRCodeScanner';

const ScanPage = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    setScannedData(decodedText);
    // Optional: handle navigation or fetch based on decodedText here
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Scan QR Code</h1>

      {!scannedData ? (
        <QRCodeScanner onScanSuccess={handleScanSuccess} />
      ) : (
        <div className="mt-6 bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Scanned Result:</h2>
          <p className="text-gray-800 break-words">{scannedData}</p>
          <button
            onClick={() => setScannedData(null)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
