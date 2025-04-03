import { useCallback, useEffect } from 'react'
import {
    getClickPosition,
    getPercentage,
    roundToStep,
} from '../helpers'
import throttle from 'lodash/throttle'
import { SliderOrientation } from '../ui/Slider/Slider'

type UseChangeHoverValueProps = {
    sliderRef: React.RefObject<HTMLDivElement | null>
    min: number
    max: number
    step: number
    orientation: SliderOrientation
    onChangeHoverValue: (value: number) => void
}

export const useChangeHoverValue = (props: UseChangeHoverValueProps) => {
    const {
        sliderRef,
        min,
        max,
        step,
        orientation,
        onChangeHoverValue,
    } = props

    // eslint-disable-next-line
    const handleChangeHoverValue = useCallback(
        throttle(
            (event: React.MouseEvent | React.TouchEvent) => {
                const slider = sliderRef.current

                if (!slider) return

                const sliderRect = slider.getBoundingClientRect()

                const clickPosition = getClickPosition(event, orientation, sliderRect)

                const percentage = getPercentage(clickPosition, sliderRect, orientation)

                let newValue = Math.round(((max - min) / 100) * percentage + min)

                if (step > 1) {
                    newValue = roundToStep(newValue, min, step)
                }

                onChangeHoverValue(newValue)
            },
            15
        ),
        [max, min, orientation]
    )

    useEffect(() => {
        return () => {
            handleChangeHoverValue.cancel()
        }
    }, [handleChangeHoverValue])

    return { handleChangeHoverValue }
}
