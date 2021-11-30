import { h, Fragment } from "@virtualstate/fringe";
import { Runtime } from "./runtime";
import {Call, DefaultValue, Identity} from "./domain";

function *MyProgram() {

  const token = h("call", {
    [Identity]() {
      return token
    },
    [Call]({ options: { number } }) {
      return <yay number={(number ?? 0) + 1}>Hi</yay>;
    },
    [DefaultValue]: <in number={-1} />
  });

  yield token;
  yield token;
  yield token;

}

export const _EGRUN0001_MyProgram = (
  <Runtime>
    <MyProgram />
  </Runtime>
)
export const _EGRUN0001_URL = import.meta.url;
