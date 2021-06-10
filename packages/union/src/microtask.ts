export const DefaultUnionTask = Symbol("Default Union Task");

interface Task {
  (fn: () => void): void
}

declare global {

  interface Window {
    [DefaultUnionTask]?: Task
  }

  interface Global {
    [DefaultUnionTask]?: Task
  }

}

export function defaultTask(fn: () => void): void {
  if (typeof window !== "undefined" && typeof window[DefaultUnionTask] === "function") {
    window[DefaultUnionTask](fn);
  } else if (typeof global !== "undefined" && typeof global[DefaultUnionTask] === "function") {
    global[DefaultUnionTask](fn);
  } else if (typeof globalThis !== "undefined" && typeof globalThis[DefaultUnionTask] === "function") {
    globalThis[DefaultUnionTask](fn);
  } else if (typeof queueMicrotask === "function") {
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
