import {compare, h, createFragment} from "@virtualstate/fringe";

function Structure() {
  return (
    <thing>
      <inner />
    </thing>
  )
}

async function Compare() {
  return (
    <p>
      Is Same {`${await compare(<Structure />, <Structure />)}`}
      Is Same {`${await compare(<Structure />, (
        <>
          {h(async function *Thinger() {
            yield <z />
            yield <thing />
            yield <thing><zee /></thing>
            yield <thing><inner /></thing>
          })}
        </>
      ))}`}
    </p>
  )
}

export const _ECO01_Compare = <Compare />
export const _ECO01_URL = import.meta.url;
