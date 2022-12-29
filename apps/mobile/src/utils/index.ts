export const debounce = <T extends (...args: any[]) => unknown>(func: T, timeout = 300): T => {
  let timer: any;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  }) as unknown as T;
};

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

/**
 * Access a deep value inside a object
 * Works by passing a path like "foo.bar", also works with nested arrays like "foo[0][1].baz"
 * @author Victor B. https://gist.github.com/victornpb/4c7882c1b9d36292308e
 * Unit tests: http://jsfiddle.net/Victornpb/0u1qygrh/
 */
export function getDeepVal(obj: Record<string, any>, path: string) {
  if (typeof obj === 'undefined' || obj === null) return;
  // eslint-disable-next-line no-useless-escape
  const splitedPath = path.split(/[\.\[\]\"\']{1,2}/);
  for (let i = 0, l = splitedPath.length; i < l; i++) {
    if (splitedPath[i] === '') continue;
    obj = obj[splitedPath[i]];
    if (typeof obj === 'undefined' || obj === null) return;
  }
  return obj;
}
