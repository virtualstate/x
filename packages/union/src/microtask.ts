
export function defaultTask(fn: () => void): void {
  if (typeof queueMicrotask === "function") {
    queueMicrotask(fn);
  } else if (typeof setImmediate === "function") {
    setImmediate(fn);
  } else {
    setTimeout(fn, 0);
  }
}

export interface QueueTask {
  (callback: () => void): void;
}
