export function throttle(callback: () => void, delay: number) {
  let previousCall = Date.now();
  return function () {
    const currentCall = Date.now();
    if (currentCall - previousCall >= delay) {
      previousCall = currentCall;
      callback();
    }
  };
}
