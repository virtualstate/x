import {h} from "@virtualstate/fringe";
import Website from "./website";

async function *Render() {
  yield <Website />;
  yield <ok />
}
// I'm just leaving this here, but I will come back to it
//
// export const _EDOMA0001_Render = <Render />
// export const _EDOMA0001_URL = import.meta.url;
