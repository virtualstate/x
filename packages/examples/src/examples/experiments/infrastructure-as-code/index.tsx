import { Farm, Service, SmallerBigProcess, BigProcess } from "./domain";
import { h } from "../../../jsx";

export const _E3001_InfrastructureAsCode = (
  <Farm>
    <Service ram="big" cpu="quick">
      <SmallerBigProcess />
    </Service>
    <Service ram="huge" cpu="very quick">
      <BigProcess />
    </Service>
  </Farm>
)
export const _E3001_URL = import.meta.url;
