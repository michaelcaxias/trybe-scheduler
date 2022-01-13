import { useState, useEffect } from 'react';

export default function usePersistedState(key, initialState) {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }
    return initialState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(initialState));
    }
  }, [key, state, initialState]);

  return [state, setState];
}
