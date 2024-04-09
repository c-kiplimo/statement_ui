import { useEffect, useRef } from "react";

const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offSetWidth;
            dimensions.current.height = ref.current.offSetHeight;
        }
    }, [ref])

    return dimensions.current;
}