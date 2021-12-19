import {createToken, SetTokenSource, TokenAncestor} from "./token";
import {VNode} from "./vnode";
import {f} from "./f";

const html = createToken("html", { [TokenAncestor]: true });
const htmlTag: "html" = html.source;
const head = html({ [SetTokenSource]: "head" } as const);
const headTag: "head" = head.source;
const body = html({ [SetTokenSource]: "body" } as const);
const bodyTag: "body" = body.source;

const h1 = body({ [SetTokenSource]: "h1" } as const);
const h1Tag: "h1" = h1.source;

console.log({
    html,
    head,
    body,
    h1
})

let Body = body;
let h = (tag: string, options: Record<string, unknown>, ...children: VNode[]) => {
    const h = f;
    return (
        <Body {...{ [SetTokenSource]: tag, ...options }}>
            {...children}
        </Body>
    )
};

const Header = <h1>Title!</h1>

console.log({ Header });

delete body[Header];
