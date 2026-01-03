import React, { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'

const Scanner = ({ onScan }) => {
    const [open, setOpen] = useState(false)
    const scannerRef = useRef(null)
  

    useEffect(() => {
        if (!open) return

        const timeout = setTimeout(() => {
            const readerEl = document.getElementById('reader')
            if (!readerEl) return

            scannerRef.current = new Html5QrcodeScanner(
                'reader',
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                false
            )

            scannerRef.current.render(
                (decodedText) => {
                    console.log('QR Code:', decodedText)
                    onScan(decodedText)

                    scannerRef.current.clear()
                    setOpen(false)
                },
                () => { }
            )
        }, 100)

        return () => {
            clearTimeout(timeout)
            scannerRef.current?.clear().catch(() => { })
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600">
                    Scan Ticket
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Scan Ticket</DialogTitle>
                    <DialogDescription>
                        Point the camera at the QR code
                    </DialogDescription>
                </DialogHeader>

                <div
                    id="reader"
                    className="h-[450px] overflow-hidden rounded-md border bg-muted"
                />

            </DialogContent>
        </Dialog>
    )
}

export default Scanner
