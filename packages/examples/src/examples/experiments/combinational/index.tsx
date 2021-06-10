import {h} from "@virtualstate/fringe";
import {Not} from "./not";
import {And} from "./and";
import {Or} from "./or";
import { True, False } from "./thing";

export const _E0101_Combinational = (
  <container>
    <Or>
      <And size={4}>
        <And size={2}>
          <True />
          <True />
        </And>
        <Not>
          <And size={2}>
            <True />
            <False />
          </And>
        </Not>
        <Not>
          <And size={2}>
            <False />
            <True />
          </And>
        </Not>
        <Not>
          <And size={2}>
            <False />
            <False />
          </And>
        </Not>
      </And>
    </Or>
  </container>
)
