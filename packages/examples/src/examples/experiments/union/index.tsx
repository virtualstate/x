import {union} from "@virtualstate/union";
import {queue} from "../cached/queue";
import {h} from "@virtualstate/fringe";

async function Union() {
  const source = queue<AsyncIterable<number>>();
  queueMicrotask(add);

  const size = /*Math.random() * */(process.stdout.columns * 0.6);

  let breakWhenZero;

  for await (const z of union(source)) {
    const values = z.filter(value => typeof value === "number");
    // const max = Math.max(...values);
    // console.log(
    //   values.join("|")
    // );

    if (values.length >= size) {
      if (typeof breakWhenZero === "bigint") {
        if (breakWhenZero) {
          breakWhenZero -= 1n;
          continue;
        }
        break;
      }
      breakWhenZero = BigInt(values.length) * 5n;
    } else {
      add(0.01)
    }
  }
  source.end();
  return <hello />;

  function add(variable = 0.5) {
    source.value({
      async *[Symbol.asyncIterator]() {
        let fixedValue;
        for (let value = 1; value < size; value = (fixedValue ?? (value + 1))) {
          yield value;
          if (Math.random() < variable) {
            fixedValue = value;
          }
        }
      }
    })
  }
}


export const _EUNION001_Union = <Union />
export const _EUNION001_URL = import.meta.url;
