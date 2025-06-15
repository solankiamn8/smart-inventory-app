import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const QRCodeScanner = ({ onScanSuccess }: QRCodeScannerProps) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    }, /* verbose */ false);

    scanner.render(
      (decodedText: string) => {
        scanner.clear();
        onScanSuccess(decodedText);
      },
      (error: any) => {
        console.warn('QR scan error:', error);
      }
    );

    return () => {
      scanner.clear().catch((err: any) => console.error('Clear failed', err));
    };
  }, [onScanSuccess]);

  return <div id="qr-reader" className="w-full max-w-md mx-auto mt-4" />;
};

export default QRCodeScanner;
