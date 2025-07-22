import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

const EventCard = () => {
    return (
        <Card className={'shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300 pt-0 overflow-hidden'}>
            <div>
                <img src="https://assetscdn1.paytm.com/images/cinema/Siayaar2-2-a522dbb0-60a9-11f0-a47d-892349f87030.jpg" alt=""
                    className='w-full h-70' />
            </div>
            <CardFooter className={'flex flex-col items-start space-y-2'}>
                <h2 className='font-bold text-md'>Tanvi</h2>
                <p>UA16+ | <span>Hindi</span></p>
            </CardFooter>
        </Card>
    )
}

export default EventCard