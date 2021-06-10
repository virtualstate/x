import { h } from "@virtualstate/fringe";
import { Not } from "./not";
import { And } from "./and";
import { Or } from "./or";
import { True, False, isTrue } from "./truth";
import { Truthful } from "./truthful";
import { Void } from "./void";

const a = (
  <And>
    <True />
    <True />
  </And>
);
const b = (
  <Not>
    <And>
      <True />
      <False />
    </And>
  </Not>
);
const c = (
  <Not>
    <And>
      <False />
      <True />
    </And>
  </Not>
);
const d = (
  <Not>
    <And>
      <False />
      <False />
    </And>
  </Not>
);
const e = (
  <And>
    {a}
    {b}
    {c}
    {d}
  </And>
);

const complete =
  <Or>
    {e}
  </Or>;

/**
 * @experimental
 */
export const Combinational = {
  Void,
  Truthful,
  And,
  Or,
  Not,
  isTrue,
  True,
  False,
}

/**
 * @experimental
 */
export const _E0101_Combinational = (
  <Void>
    <Truthful>
      {a}
      {e}
      {complete}
    </Truthful>
  </Void>
)
