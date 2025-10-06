"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { CameraOff, Loader2 } from 'lucide-react';
import BarcodeScanner from 'react-zxing';

interface ReceiptScannerProps {
    onScanSuccess: (scannedData: { amount?: number, note?: string }) => void;
    onCancel: () => void;
}

export function ReceiptScanner({ onScanSuccess, onCancel }: ReceiptScannerProps) {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isScanning, setIsScanning] = useState(true);
    const { toast } = useToast();

    const handleScan = (result: any) => {
        if (result && isScanning) {
            setIsScanning(false);
            const scannedText = result.getText();
            let scannedData: { amount?: number; note?: string } = {};

            try {
                // Try to parse as JSON for rich data
                const jsonData = JSON.parse(scannedText);
                if (typeof jsonData === 'object' && (jsonData.amount || jsonData.note)) {
                    scannedData.amount = typeof jsonData.amount === 'number' ? jsonData.amount : undefined;
                    scannedData.note = typeof jsonData.note === 'string' ? jsonData.note : undefined;
                } else {
                    throw new Error("Not a valid receipt JSON format");
                }
            } catch (e) {
                // Fallback for plain text scans
                const numericValue = parseFloat(scannedText);
                if (!isNaN(numericValue)) {
                    scannedData.amount = numericValue;
                } else {
                    scannedData.note = scannedText;
                }
            }
            
            onScanSuccess(scannedData);
        }
    };
    
    const handleError = (error: any) => {
        console.error('Scanner error:', error);
        if (error?.name === 'NotAllowedError') {
             setHasCameraPermission(false);
             toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions in your browser settings.',
            });
        } else {
             toast({
                variant: 'destructive',
                title: 'Camera Error',
                description: 'Could not start the camera. Please ensure it is not being used by another app.',
            });
        }
    }

    return (
        <div className="flex flex-col h-full items-center justify-between">
            <h3 className="text-lg font-semibold mb-2">Scan Receipt</h3>
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                 <BarcodeScanner
                    onResult={handleScan}
                    onError={handleError}
                 />
                 {isScanning && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white">
                        <p className="mt-2 text-sm bg-black/50 px-3 py-1 rounded-full">Searching for barcode...</p>
                    </div>
                 )}
                 <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-lg" />
            </div>
            
            <p className="text-sm text-muted-foreground my-4 text-center">Position a barcode or QR code inside the frame.</p>

            <Button variant="ghost" onClick={onCancel} className="w-full mt-2">Cancel</Button>
        </div>
    );
}
