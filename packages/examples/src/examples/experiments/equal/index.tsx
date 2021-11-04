import {equal, h, createFragment} from "@virtualstate/fringe";

function Structure() {
  return (
    <thing>
      <inner />
    </thing>
  )
}

async function Equal() {
  const instance = <Structure />;
  return (
    <p>
      Is Equal {`${await equal(instance, instance)}`}
      Is Equal {`${await equal(instance, <Structure />)}`}
      Is Equal {`${await equal(<Structure />, <Structure />)}`}
      Is Equal {`${await equal(<Structure />, (
      <>
        {h(async function *Thing() {
          yield <z />
          yield <thing />
          yield <thing><zee /></thing>
          yield <thing><inner /></thing>
        })}
      </>
    ))}`}
      Is Equal {`${await equal(<Structure />, (
      <>
        {h(async function *Thing() {
          yield <thing><inner value="1" /></thing>
        })}
      </>
    ))}`}
      Is Equal {`${await equal(<thing><inner value="1" /></thing>, (
      <>
        {h(async function *Thing() {
          async function *Inner() {
            yield <inner />
            yield <inner value="1" />
          }
          yield <thing><Inner /></thing>
        })}
      </>
    ))}`}
      Is Equal {`${await equal(h(async function *Thing() {
        async function *Inner() {
          yield <inner value="1" />
        }
        yield <thing><Inner /></thing>
      }), (
      <>
        {h(async function *Thing() {
          async function *Inner() {
            yield <inner />
            yield <inner value="1" />
          }
          yield <thing><Inner /></thing>
        })}
      </>
    ))}`}
    </p>
  )
}

export const _EEQ01_Equal = <Equal />
export const _EEQ01_URL = import.meta.url;
