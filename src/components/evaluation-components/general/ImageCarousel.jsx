'use client'

import React, {useEffect, useState} from 'react'
import {Button} from '../../ui/button'
import {ChevronLeft, ChevronRight} from 'lucide-react'

export default function ImageCarousel({images, currentImageName, setCurrentImageName}) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
        setCurrentImageName(images[newIndex].name)
    }

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1
        const newIndex = isLastImage ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
        setCurrentImageName(images[newIndex].name)
    }

    const findImageIndex = (name) => {
        return images.findIndex(image => image.name === name)
    }

    useEffect(() => {
        setCurrentIndex(findImageIndex(currentImageName))
    }, [currentImageName]);

    return (

            <div className="flex items-center justify-between px-4 h-full w-full space-x-2">
                <Button
                    onClick={goToPrevious}
                    variant="outline"
                    size="icon"
                    className="bg-white/70 hover:bg-white/90"
                >
                    <ChevronLeft className="h-6 w-6"/>
                </Button>

                <div className="relative w-full h-full flex justify-center items-center">
                    <img
                        src={images[currentIndex].preview}
                        alt={"currentImageName"}
                        className="object-contain h-full"
                    />
                </div>

                <Button
                    onClick={goToNext}
                    variant="outline"
                    size="icon"
                    className="bg-white/70 hover:bg-white/90"
                >
                    <ChevronRight className="h-6 w-6"/>
                </Button>
            {/*<div className="mt-4 text-center">*/}
            {/*    <h2 className="text-2xl font-semibold">{currentImageName}</h2>*/}
            {/*</div>*/}
        </div>
    )
}

