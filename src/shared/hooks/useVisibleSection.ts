import { useEffect, useRef, useState } from "react";

export const useVisibleSection = (threshold: number = 0.2) => {
    const [isVisibleSection, setIsVisibleSection] = useState(false);
    const sectionRef = useRef(null);

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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [sectionRef, threshold]);

    return { sectionRef, isVisibleSection };
};