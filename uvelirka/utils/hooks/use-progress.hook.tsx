import { useEffect, useState } from 'react';

export const useProgress = (
  delta: number,
  period: number,
  itemsCount: number,
  pause: boolean,
) => {
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState(0);

  if (!process.browser) {
    return {
      progress, selected, setSelected, setProgress
    };
  }

  useEffect(() => {
    if (pause) {
      return ;
    }

    const interval = setInterval(() => {
      setProgress(p => {
        if (p + delta > 100) {
          setSelected(s => (s + 1) % itemsCount);

          return 0;
        }

        return p + delta;
      });
    }, period);

    return () => {
      clearInterval(interval);
    };
  }, [delta, period, selected, pause]);

  return { progress, selected, setSelected, setProgress };
};