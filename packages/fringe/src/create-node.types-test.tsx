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
        h("data", { id: "eventStamp" }),
        h("data", { id: "rectX", expr: "0" }),
        h("data", { id: "rectY", expr: "0" }),
        h("data", { id: "dx" }),
        h("data", { id: "dy" })
    ),
    h("state", { id: "idle" },
        h("transition", { event: "mousedown", target: "dragging" },
            h("assign", { location: "eventStamp", expr: "_event.data" })
        )
    ),
    h("state", { id: "dragging" },
        h("transition", { event: "mouseup", target: "idle" }),
        h("transition", { event: "mousemove", target: "dragging" },
            h("assign", { location: "dx", expr: "eventStamp.clientX - _event.data.clientX" }),
            h("assign", { location: "dy", expr: "eventStamp.clientY - _event.data.clientY" }),
            h("assign", { location: "rectX", expr: "rectX - dx" }),
            h("assign", { location: "rectY", expr: "rectY - dy" }),
            h("assign", { location: "eventStamp", expr: "_event.data" })
        )
    )
);

const root: {
    source: "scxml",
    children: AsyncIterable<{
        source: "datamodel" | "state",
        children: AsyncIterable<{
            source: "transition" | "data",
            children: AsyncIterable<{
                source: "assign"
            }[]>
        }[]>
    }[]>
} = scxml;

for await (const children of scxml.children) {
    for (const node of children) {
        if (node.source === "state") {
            for await (const transitions of node.children) {
                for (const transition of transitions) {
                    if (transition.source === "transition") {
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
                }
            }
        }
    }
}
