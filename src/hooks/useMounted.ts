import { useRef, useEffect } from 'react';

const useMounted = () => {
    const ref = useRef(false);
    useEffect(() => {
        ref.current = true;
    }, []);
    return ref.current;
};

export default useMounted;