import { createToken, h } from "@virtualstate/fringe";

const PointData = createToken(Symbol("PointData"));
const LineData = createToken(Symbol("LineData"));
const GraphData = createToken(Symbol("GraphData"));
const DataFrame = createToken(Symbol("DataFrame"));
const StackedBar = createToken(Symbol("StackedBar"));
const GroupedBar = createToken(Symbol("GroupedBar"));

const data = (
  <DataFrame>
    <GraphData>
      <LineData>
        <PointData x={1} y={2} />
        <PointData x={2} y={2} />
      </LineData>
    </GraphData>
  </DataFrame>
)

const Stacked = (
  <StackedBar>
    {data}
  </StackedBar>
)

const Grouped = (
  <GroupedBar>
    {data}
  </GroupedBar>
)
