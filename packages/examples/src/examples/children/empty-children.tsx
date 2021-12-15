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
const EmptyChild4 = () => h(async () => undefined);
const EmptyChild5 = () => h(async function *() {});
const EmptyChild6 = () => h(async function *() {
    yield "Initial loading"; // Initial yields a loading indicator
    await new Promise(resolve => setTimeout(resolve, 10));
    // Settles that there is nothing to render
    yield <EmptyChild5 />;
});
const EmptyChild7 = () => h(async function *() {
    yield "Initial loading"; // Initial yields a loading indicator
    await new Promise(resolve => setTimeout(resolve, 10));
    // Settles that there is nothing to render
    yield undefined;
});
const ActualChild1 = () => h(async () => "actual value!");

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
            <EmptyChild4 />
        </Parent>
        <Parent>
            <EmptyChild5 />
        </Parent>
        <Parent>
            <EmptyChild6 />
        </Parent>
        <Parent>
            <EmptyChild7 />
        </Parent>
        <Parent>
            <ActualChild1 />
        </Parent>
    </>
);
export const _CH0001_URL = import.meta.url;
export const _CH0001_IsResolving = true;