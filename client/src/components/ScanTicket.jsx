import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

const ScanTicket = ({ open }) => {
    const scannerRef = useRef(null);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!open) return;

        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode("reader");
        }

        const startScanner = async () => {
            if (startedRef.current) return;

            try {
                await scannerRef.current.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: 250 },
                    (decodedText) => {
                        console.log("Scanned:", decodedText);
                    }
                );
                startedRef.current = true;
            } catch (e) {
                console.error("Scanner error:", e);
            }
        };

        startScanner();

        return () => {
            if (scannerRef.current && startedRef.current) {
                scannerRef.current.stop().then(() => {
                    startedRef.current = false;
                });
            }
        };
    }, [open]);

    return <div id="reader" className="w-full" />;
};

export default ScanTicket;
