import {useState, useEffect, useContext, useRef} from "./source.interface";
import {View, Text, Source} from "./source.tokens";
import {h, createFragment} from "@virtualstate/fringe";

const context = useContext();
const [state, setState] = useState({
  currentThing: 0
});

useEffect(() => {
  console.log("On each second", state.currentThing, context.globalThing);
}, new Date().getSeconds());

useEffect(async () => {
  console.log("On something else", state.currentThing, context.globalThing);
  await setState({
    currentThing: 1
  });
}, Math.random() < 0.1);

const previousStateThing = useRef(state.currentThing);
useEffect(() => {
  console.log("State thing changed from", previousStateThing.current, "to", state.currentThing);
  previousStateThing.current = state.currentThing;

  if (state.currentThing > 10) {
    WebDynamic = (
      <div>
        Did ten things!!
      </div>
    );
  }
}, state.currentThing);

const previousGlobalThing = useRef(context.globalThing);
useEffect(() => {
  console.log("Global thing changed from", previousGlobalThing.current, "to", context.globalThing);
  previousGlobalThing.current = context.globalThing;
}, context.globalThing);

export const Web = (
  <div>
    <h1>Global Thing:</h1>
    <span>{previousGlobalThing.current}</span>
    <h1>State Thing:</h1>
    <span>{state.currentThing}</span>
  </div>
);

export const Native = (
  <View>
    <Text>Global Thing:</Text>
    <Text>{previousGlobalThing.current}</Text>
    <Text>State Thing:</Text>
    <Text>{state.currentThing}</Text>
  </View>
);

export let WebDynamic = (
  <div>
    <h1>Global Thing:</h1>
    <span>{previousGlobalThing.current}</span>
    <h1>State Thing:</h1>
    <span>{state.currentThing}</span>
  </div>
)

export const _CT0001_CompileTransform = (
  <>
    <Source>
      {Web}
    </Source>
    <Source>
      {Native}
    </Source>
    <Source>
      {WebDynamic}
    </Source>
  </>
)
export const _CT0001_URL = import.meta.url;
