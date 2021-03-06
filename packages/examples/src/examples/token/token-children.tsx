import { createToken, h } from "@virtualstate/fringe";

const BoxSymbol = Symbol("๐ฆ");
const Box = createToken(BoxSymbol);

const WrappedBoxSymbol = Symbol("๐");
const WrappedBox = createToken(WrappedBoxSymbol);

const CactusSymbol = Symbol("๐ต");
const Cactus = createToken(CactusSymbol);

const TestTubeSymbol = Symbol("๐งช");
const TestTube = createToken(TestTubeSymbol);

const ThreadSymbol = Symbol("๐งต");
const Thread = createToken(ThreadSymbol);

const ScrollSymbol = Symbol("๐");
const Scroll = createToken(ScrollSymbol);

const BombSymbol = Symbol("๐ฃ");
const Bomb = createToken(BombSymbol);

function SecretContents() {
  return (
    <WrappedBox>
      <Bomb />
    </WrappedBox>
  );
}

export const _702_TokenChildren = (
  <Box>
    <Scroll />
    <TestTube />
    <Thread />
    <Box>
      <Cactus />
      <SecretContents />
    </Box>
  </Box>
);
export const _702_URL = import.meta.url;
