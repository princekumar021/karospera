"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { CameraOff } from 'lucide-react';

interface ReceiptScannerProps {
    onScanSuccess: (scannedData: { amount?: number, note?: string }) => void;
    onCancel: () => void;
}

export function ReceiptScanner({ onScanSuccess, onCancel }: ReceiptScannerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error("Camera API not supported in this browser.");
                setHasCameraPermission(false);
                toast({
                    variant: "destructive",
                    title: "Unsupported Browser",
                    description: "Your browser does not support the camera API needed for scanning.",
                });
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings.',
                });
            }
        };

        getCameraPermission();
        
        return () => {
             if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [toast]);

    const handleSimulateScan = () => {
        // In a real app, a barcode scanning library would be used here.
        // For demonstration, we'll simulate a scan with dummy data.
        const randomAmount = Math.floor(Math.random() * 100) + 1;
        const randomNote = `Scanned Item #${Math.floor(Math.random() * 1000)}`;
        onScanSuccess({ amount: randomAmount, note: randomNote });
    }

    return (
        <div className="flex flex-col h-full items-center justify-between">
            <h3 className="text-lg font-semibold mb-2">Scan Receipt</h3>
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                 {hasCameraPermission === false && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                        <CameraOff className="h-10 w-10 mb-2" />
                        <p className="text-center">Camera access is required to scan receipts.</p>
                    </div>
                 )}
            </div>
            
            <p className="text-sm text-muted-foreground my-4 text-center">Position the receipt barcode or QR code inside the frame.</p>

            {hasCameraPermission && (
                 <Button onClick={handleSimulateScan} className="w-full">Simulate Scan</Button>
            )}

            <Button variant="ghost" onClick={onCancel} className="w-full mt-2">Cancel</Button>
        </div>
    );
}
