import { createNode as h } from "./create-node";

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
    children: AsyncIterable<{
        source: "datamodel" | "state",
        options: {
            id?: "idle" | "dragging"
        },
        children: AsyncIterable<{
            source: "transition" | "data",
            options: (
                (
                    {
                        id: "rectX" | "rectY" | "dx" | "dy" | "eventStamp"
                    } |
                    {
                        event: "mousemove" | "mouseup" | "mousedown",
                        target: "idle" | "dragging"
                    }
                )
            ),
            children: AsyncIterable<{
                source: "assign",
                options: {
                    location: "rectX" | "rectY" | "dx" | "dy" | "eventStamp",
                    expr:
                        | "eventStamp.clientX - _event.data.clientX"
                        | "eventStamp.clientY - _event.data.clientY"
                        | "rectX - dx"
                        | "rectY - dy"
                        | "_event.data"
                },
                children: never
            }[]>
        }[]>
    }[]>
} = scxml;

async function doThing(root: typeof scxml) {
    for await (const children of root.children) {
        for (const node of children) {
            if (node.source === "state") {
                const stateId: "idle" | "dragging" = node.options.id;
                for await (const transitions of node.children) {
                    for (const transition of transitions) {
                        if (transition.source === "transition") {
                            const event: "mousedown" | "mouseup" | "mousemove" = transition.options.event;
                            const target: "idle" | "dragging" = transition.options.target;
                            for await (const assigns of transition.children) {
                                for (const assign of assigns) {
                                    const assignSource: "assign" = assign.source;
                                    const { location, expr } = assign.options;
                                    const locationString: string = location;
                                    const exprString: string = expr;
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
                        if (data.options.id === "rectX" || data.options.id === "rectY") {
                            const { expr } = data.options;
                            const exprString = expr;
                        }
                    }
                }
            }
        }
    }
}

await doThing(scxml);

const r = h(() => scxml);

for await (const children of r.children) {
    for (const child of children) {
        await doThing(child);
    }
}
