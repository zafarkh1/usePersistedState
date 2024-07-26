import {useEffect, useState} from "react";

export default function usePersistedState(key, initialValue) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            try {
                return JSON.parse(storedValue);
            } catch (e) {
                console.error('Error parsing stored JSON', e);
                return initialValue;
            }
        }
        return initialValue;
    });

    useEffect(() => {
        const handleStorageChange = (event) => {
            console.log(event)
            if (event.key === key) {
                try {
                    const newValue = JSON.parse(event.newValue);
                    setValue(newValue);
                } catch (e) {
                    console.error('Error parsing storage event data:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);

    const setPersistedValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setPersistedValue];
}