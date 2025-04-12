import { useEffect, useRef, useState } from "react";

export const useDelayedLoading = (isPending: boolean, minDuration = 500) => {
    const [showSkeleton, setShowSkeleton] = useState(isPending);
    const hasBeenPendingRef = useRef<boolean>(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isPending) {
            setShowSkeleton(true);
            hasBeenPendingRef.current = true
        } else {
            if(hasBeenPendingRef.current) {
                timeoutRef.current = setTimeout(() => {
                    setShowSkeleton(false);
                }, minDuration);
            }

            return () => {
                if(timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
            };
        }
    }, [isPending, minDuration]);

    return { showSkeleton: showSkeleton || isPending };
};