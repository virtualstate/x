import { createNode as h } from "./create-node";
import {createToken, isTokenVNodeFn} from "./token";

// <scxml>
//
//     <datamodel>
//         <data id="eventStamp"/>
//         <data id="rectX" expr="0"/>
//         <data id="rectY" expr="0"/>
//         <data id="dx"/>
//         <data id="dy"/>
//     </datamodel>
//
//     <state id="idle">
//         <transition event="mousedown" target="dragging">
//             <assign location="eventStamp" expr="_event.data"/>
//         </transition>
//     </state>
//
//     <state id="dragging">
//         <transition event="mouseup" target="idle"/>
//         <transition event="mousemove" target="dragging">
//             <assign location="dx" expr="eventStamp.clientX - _event.data.clientX"/>
//             <assign location="dy" expr="eventStamp.clientY - _event.data.clientY"/>
//             <assign location="rectX" expr="rectX - dx"/>
//             <assign location="rectY" expr="rectY - dy"/>
//             <assign location="eventStamp" expr="_event.data"/>
//         </transition>
//     </state>
//
// </scxml>

const scxml = h("scxml", { },
    h("datamodel", {},
        h("data", { id: "eventStamp" } as const),
        h("data", { id: "rectX", expr: "0" } as const),
        h("data", { id: "rectY", expr: "0" } as const),
        h("data", { id: "dx" } as const),
        h("data", { id: "dy" } as const)
    ),
    h("state", { id: "idle" } as const,
        h("transition", { event: "mousedown", target: "dragging" } as const,
            h("assign", { location: "eventStamp", expr: "_event.data" } as const)
        )
    ),
    h("state", { id: "dragging" } as const,
        h("transition", { event: "mouseup", target: "idle" } as const),
        h("transition", { event: "mousemove", target: "dragging" } as const,
            h("assign", { location: "dx", expr: "eventStamp.clientX - _event.data.clientX" } as const),
            h("assign", { location: "dy", expr: "eventStamp.clientY - _event.data.clientY" } as const),
            h("assign", { location: "rectX", expr: "rectX - dx" } as const),
            h("assign", { location: "rectY", expr: "rectY - dy" } as const),
            h("assign", { location: "eventStamp", expr: "_event.data" } as const)
        )
    )
);

const root: {
    source: "scxml",
    options?: {
        id?: string
    },
    children: AsyncIterable<(
        {
            source: "datamodel",
            children: AsyncIterable<(
                {
                    source: "data",
                    options: {
                        id: "rectX" | "rectY" | "dx" | "dy" | "eventStamp",
                        expr?: string;
                    },
                    children: AsyncIterable<{
                        source: "assign",
                        options: {
                            location: "rectX" | "rectY" | "dx" | "dy" | "eventStamp",
                            expr: string
                        },
                        children: never
                    }[]>
                }
            )[]>
        } |
        {
            source: "state",
            options: {
                id: "idle" | "dragging"
            },
            children: AsyncIterable<(
                {
                    source: "transition",
                    options: {
                        event: "mousemove" | "mouseup" | "mousedown",
                        target: "idle" | "dragging"
                    },
                    children: AsyncIterable<{
                        source: "assign",
                        options: {
                            location: "rectX" | "rectY" | "dx" | "dy" | "eventStamp",
                            expr: string
                        },
                        children: never
                    }[]>
                }
            )[]>
        }
    )[]>
} = scxml;

async function doThing(givenRoot: { source: "scxml" }) {
    function isLike(type: { source: string }): type is typeof root {
        return type.source === "scxml";
    }
    if (!isLike(givenRoot)) {
        throw new Error("Huh");
    }
    if (givenRoot.options?.id) {
        console.log(`Id: ${givenRoot.options.id}`);
    }
    for await (const children of givenRoot.children) {
        for (const node of children) {
            if (node.source === "state") {
                const stateId: "idle" | "dragging" = node.options.id;
                console.log({ stateId });
                for await (const transitions of node.children) {
                    for (const transition of transitions) {
                        if (transition.source === "transition") {
                            const event: "mousedown" | "mouseup" | "mousemove" = transition.options.event;
                            const target: "idle" | "dragging" = transition.options.target;
                            console.log({ event, target });
                            if (transition.children) {
                                for await (const assigns of transition.children) {
                                    for (const assign of assigns) {
                                        const assignSource: "assign" = assign.source;
                                        const { location, expr } = assign.options;
                                        const locationString: string = location;
                                        const exprString: string = expr;
                                        console.log({ assignSource, locationString, exprString });
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (node.source === "datamodel") {
                for await (const dataArray of node.children) {
                    for (const data of dataArray) {
                        const dataSource: "data" = data.source;
                        const { id } = data.options;
                        const idString: string = id;
                        console.log({ idString, dataSource });
                        if (data.options.id === "rectX" || data.options.id === "rectY") {
                            const { expr } = data.options;
                            const exprString = expr;
                            console.log({ exprString });
                        }
                    }
                }
            }
        }
    }
}

console.log("---------- scxml -------------");

await doThing(scxml);

console.log("---------- r -------------");

const r = h(() => scxml);

for await (const [child] of r.children) {
    console.log({ child });
    await doThing(child);
}

console.log("---------- k -------------");

const k = h(
    async function *K() {
        yield scxml;
        yield scxml;
        for await (const children of scxml.children) {
            for (const child of children) {
                if (child.source === "state") {
                    yield child;
                }
            }
        }
    }
)

for await (const [child] of k.children) {
    console.log({ child });
    if (child.source === "scxml") {
        await doThing(child);
    } else if (child.source === "state") {
        const { id } = child.options
        console.log({ id });
    }
}

console.log("---------- j -------------");

const j = h(
    function *J() {
        yield scxml;
        yield h(1, { meta: 2 });
    }
)

for await (const [child] of j.children) {
    console.log({ child });
    if (child.source === "scxml") {
        await doThing(child);
    } else if (typeof child.source === "number") {
        const { meta } = child.options
        console.log({ meta });
    }
}

console.log("---------- token -------------");

const SCXML = createToken<"scxml", { id?: string }>("scxml");
const Data = createToken<"data", { id: "eventStamp" | "dx" | "dy" | "rectX" | "rectY", expr?: string }>("data");
const State = createToken<"state", { id: "idle" | "dragging" }>("state");
const Transition = createToken<"transition", { event: "mousedown" | "mouseup" | "mousemove", target: "idle" | "dragging" }>("transition");
const Assign = createToken<"assign", { location: "eventStamp" | "dx" | "dy" | "rectX" | "rectY", expr: string }>("assign");

const token = h(SCXML, { },
    h("datamodel", {},
        h(Data, { id: "eventStamp" } as const),
        h(Data, { id: "rectX", expr: "0" } as const),
        h(Data, { id: "rectY", expr: "0" } as const),
        h(Data, { id: "dx" } as const),
        h(Data, { id: "dy" } as const)
    ),
    h(State, { id: "idle" } as const,
        h(Transition, { event: "mousedown", target: "dragging" } as const,
            h(Assign, { location: "eventStamp", expr: "_event.data" } as const)
        )
    ),
    h("state", { id: "dragging" } as const,
        h(Transition, { event: "mouseup", target: "idle" } as const),
        h(Transition, { event: "mousemove", target: "dragging" } as const,
            h(Assign, { location: "dx", expr: "eventStamp.clientX - _event.data.clientX" } as const),
            h(Assign, { location: "dy", expr: "eventStamp.clientY - _event.data.clientY" } as const),
            h(Assign, { location: "rectX", expr: "rectX - dx" } as const),
            h(Assign, { location: "rectY", expr: "rectY - dy" } as const),
            h(Assign, { location: "eventStamp", expr: "_event.data" } as const)
        )
    )
);

console.log("---------- token default -------------");

await doThing(token);

console.log("---------- token with id -------------");

await doThing(token({ id: "identifier" }));

console.log("---------- token with id and no children -------------");

await doThing(token({ id: "identifier" }, h()));
