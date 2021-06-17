import {createToken, h, TokenVNodeBase, TokenVNodeFn} from "@virtualstate/fringe";

const BoxSymbol = Symbol("📦");
const Box = createToken(BoxSymbol);

const WrappedBoxSymbol = Symbol("🎁");
const WrappedBox = createToken(WrappedBoxSymbol);

const CactusSymbol = Symbol("🌵");
const Cactus = createToken(CactusSymbol);

const TestTubeSymbol = Symbol("🧪");
const TestTube = createToken(TestTubeSymbol);

const ThreadSymbol = Symbol("🧵");
const Thread = createToken(ThreadSymbol);

const ScrollSymbol = Symbol("📜");
const Scroll = createToken(ScrollSymbol);

const BombSymbol = Symbol("💣");
const Bomb = createToken(BombSymbol);

function SecretContents() {
  return (
    <WrappedBox>
      <Bomb />
    </WrappedBox>
  )
}

export const _702_BoxChildren = (
  <Box>
    <Scroll />
    <TestTube />
    <Thread />
    <Box>
      <Cactus />
      <SecretContents />
    </Box>
  </Box>
)
