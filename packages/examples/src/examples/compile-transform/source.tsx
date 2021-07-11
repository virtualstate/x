import {useState, useEffect, useContext, useRef} from "./source.interface";
import {View, Text, Source} from "./source.tokens";
import {h, createFragment} from "@virtualstate/fringe";
import {EngineURL, EngineURLSymbol} from "./source.engine";
import {SourceURLSymbol} from "./source.transform";

const context = useContext();
const [state, setState] = useState({
  currentThing: 0
});

useEffect(() => {
  console.log("On each second", state.currentThing, context.globalThing);
}, new Date().getSeconds());

useEffect(async () => {
  console.log("On something else", state.currentThing, context.globalThing);
  setState({
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
    NativeDynamic = (
      <Text>
        Did ten things!!
      </Text>
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

export let NativeDynamic = (
  <View>
    <Text>Global Thing:</Text>
    <Text>{previousGlobalThing.current}</Text>
    <Text>State Thing:</Text>
    <Text>{state.currentThing}</Text>
  </View>
)

export interface SourceComponentProps {
  componentThing: number;
}

export async function SourceComponent({ componentThing }: SourceComponentProps) {

  const [componentState, setComponentState] = useState({
    currentThing: 0
  });

  useEffect(async () => {
    if (state.currentThing > 10) {
      setComponentState({
        currentThing: 1
      });
    }
  }, state.currentThing);

  return (
    <>
      <Source>
        <div>
          <h1>Global Thing:</h1>
          <span>{previousGlobalThing.current}</span>
          <h1>State Thing:</h1>
          <span>{state.currentThing}</span>
          <h1>Component Thing:</h1>
          <span>{componentThing}</span>
          <h1>Component State Thing:</h1>
          <span>{componentState.currentThing}</span>
        </div>
      </Source>
      <Source>
        <View>
          <Text>Global Thing:</Text>
          <Text>{previousGlobalThing.current}</Text>
          <Text>State Thing:</Text>
          <Text>{state.currentThing}</Text>
          <Text>Component Thing:</Text>
          <Text>{componentThing}</Text>
        </View>
      </Source>
    </>
  )
}

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
export const _CT0001_Info = {
  [EngineURLSymbol]: EngineURL,
  [SourceURLSymbol]: import.meta.url,
  ...context
}
