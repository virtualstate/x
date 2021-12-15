import { h, VNode, createFragment } from "@virtualstate/fringe";

async function Parent(options: unknown, input?: VNode) {
  const children = (await input?.children) ?? [];
  return (
    <parent empty={!children.length}>
        {children.length ? children : "\n"}
    </parent>
  )
}

const EmptyChild1 = undefined;
const EmptyChild2 = () => undefined;
const EmptyChild3 = () => h(() => undefined);
const Child4 = () => h(async () => "actual value!");

export const _CH0001 = (
    <>
        <Parent>
            <EmptyChild1 />
        </Parent>
        <Parent>
            <EmptyChild2 />
        </Parent>
        <Parent>
            <EmptyChild3 />
        </Parent>
        <Parent>
            <Child4 />
        </Parent>
    </>
);
export const _CH0001_URL = import.meta.url;