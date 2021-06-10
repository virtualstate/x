import { h } from "../../jsx";

class Component {

  iterations = 0;

  async *[Symbol.asyncIterator]() {
    const id = this.iterations += 1;
    yield `Iteration ${id}`;
    const randomPicked = Math.random() > 0.5 ? "Task 1" : "Task 2";
    yield `Doing task ${randomPicked}`;
    if (randomPicked === "Task 1") {
      await new Promise<void>(queueMicrotask);
    } else {
      await new Promise<void>(resolve => setTimeout(resolve, 5));
    }
  }

}

const node = <Component />

export const _405_SharedInstance = (
  <container>
    {node}
    {node}
    {node}
  </container>
)
