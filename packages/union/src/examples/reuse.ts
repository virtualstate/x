import { union } from "../union";
import { setReuse } from "../reuse";

async function* generatorOne() {
  let remaining = 10;
  while (remaining >= 0) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    yield remaining;
    remaining -= 1;
  }
}

async function* generatorTwo() {
  let remaining = 10;
  while (remaining <= 20) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    yield remaining;
    remaining += 1;
  }
}

async function run() {
  const basicOne = generatorOne();
  const basicTwo = generatorTwo();
  for await (const result of union([
    basicOne,
    basicOne,
    basicTwo,
    basicOne,
    basicOne,
    basicOne,
    basicTwo
  ], { reuseInFlight: true })) {
    console.log(result.join(","));
  }
  const brandedOne = generatorOne();
  setReuse(brandedOne);
  const brandedTwo = generatorTwo();
  setReuse(brandedTwo);
  for await (const result of union([
    brandedOne,
    brandedOne,
    brandedTwo,
    brandedOne,
    brandedOne,
    brandedOne,
    brandedTwo
  ])) {
    console.log(result.join(","));
  }
}

run().catch(console.error);
