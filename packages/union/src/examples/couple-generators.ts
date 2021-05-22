import { union } from "../union";

async function doTask(maxInterval = 1000) {
  // Do some task for given time
  const taskTime = Math.round(Math.random() * maxInterval);
  console.log({ taskTime, maxInterval });
  await new Promise(resolve => setTimeout(resolve, taskTime));

  // if (Math.random() > 0.5) {
  //   throw new Error("Hey, this is an error!");
  // }

}

async function *doTasks(maxCount = 100, task: () => Promise<void>) {
  let tasksRemaining = 1 + Math.floor(Math.random() * maxCount);
  console.log("Tasks", tasksRemaining);
  do {
    tasksRemaining -= 1;
    const start = Date.now();
    console.log("start task");
    await task();
    console.log("complete task");
    const complete = Date.now();
    const taskTime = complete - start;
    yield [tasksRemaining, taskTime];
  } while (tasksRemaining > 0);
}

async function *primary() {
  yield* doTasks(5, myPrimaryTask);

  async function myPrimaryTask() {
    await doTask(250);
  }
}

async function *secondary() {
  yield* doTasks(5, mySecondaryTask);

  async function mySecondaryTask() {
    await doTask(250);
  }
}

try {

  for await (const slice of union([primary(), secondary()])) {
    console.log({ slice });
  }
  console.log("Complete");
} catch (error) {
  console.error({ error });
}
