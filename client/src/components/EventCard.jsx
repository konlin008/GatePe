import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

const EventCard = () => {
    return (
        <Card className={'shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300 pt-0 overflow-hidden w-60'}>
            <div>
                <img src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/tanvi-the-great-et00440977-1752906555.jpg" alt=""
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