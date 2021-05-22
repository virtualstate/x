import { union } from "../union";

for await (const set of union([[1, 2, 3, 4], [5, 6, 7, 8, 9]])) {
  console.log(set);
}

console.log("Complete");
