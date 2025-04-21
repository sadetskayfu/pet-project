import { useEffect, useRef, useState } from "react";

export const useVisibleSection = (externalSectionRef?: React.RefObject<HTMLElement | null>, threshold: number = 0.2) => {
    const [isVisibleSection, setIsVisibleSection] = useState(false);
    const sectionRef = useRef(null);

    const ref = externalSectionRef ?? sectionRef

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisibleSection(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);

    return { sectionRef, isVisibleSection };
};