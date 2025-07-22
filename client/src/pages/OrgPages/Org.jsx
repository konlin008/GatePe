import { Card } from '@/components/ui/card'
import React from 'react'

const Org = () => {
    return (
        <div className='min-h-screen px-100 py-20 bg-gradient-to-b from-fuchsia-100 via-blue-100 to-white'>
            <h1 className='text-center font-semibold text-6xl'>What GatePe Supports?</h1>
            <p className='text-center font-semibold my-5'>As your event companion, GatePe empowers you with end-to-end solutions — from event registration to successful execution. Here's what you can host with us.</p>
            <div className='w-full h-50 flex flex-wrap justify-center gap-10'>
                <Card className={'h-60 w-60 rounded-sm'}>

                </Card>
                <Card className={'h-60 w-60'}>

                </Card>
                <Card className={'h-60 w-60'}>

                </Card>
                <Card className={'h-60 w-60'}>

                </Card>
                <Card className={'h-60 w-60'}>

                </Card>
                <Card className={'h-60 w-60'}>

                </Card>
            </div>
        </div>
    )
}

export default Org