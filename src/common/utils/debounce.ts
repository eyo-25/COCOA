type DebounceFunction<T extends unknown[] = []> = (
  callback: (...args: T) => void,
  delay: number
) => (...args: T) => void;

export const debounce: DebounceFunction = (callback, delay) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
