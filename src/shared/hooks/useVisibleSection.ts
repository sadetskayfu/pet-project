import { useEffect, useRef, useState } from "react";

export const useVisibleSection = () => {
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
                threshold: 0.1,
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
    }, [sectionRef]);

    return { sectionRef, isVisibleSection };
};