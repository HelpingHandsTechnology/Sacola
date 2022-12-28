export function throttle<T extends unknown>(callback: (...args: T[]) => void, delay: number): (...args: T[]) => void {
  let previousCall = Date.now();
  return function (...args: T[]) {
    const currentCall = Date.now();
    if (currentCall - previousCall >= delay) {
      previousCall = currentCall;
      callback(...args);
    }
  };
}
