/// <reference types="react" />

const useCountDown = ({ count = 3, interval = 1000 }) => {
  const [countdown, setCountdown] = React.useState(count);
  const intervalRef = React.useRef<NodeJS.Timer>();

  useEffect(() => {
    if (countdown !== 0) {
      intervalRef.current = setInterval(() => {
        if (count !== 0) {
          setCountdown((c) => --c);
        }
      }, interval);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [count, countdown]);

  return countdown;
};
