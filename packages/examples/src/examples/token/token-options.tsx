import { createToken, h, createFragment } from "@virtualstate/fringe";

interface BoxOptions extends Record<string, unknown> {
  size: "1" | "2" | "3"
}

const BoxSymbol = Symbol("📦");
const Box = createToken<typeof BoxSymbol, BoxOptions>(BoxSymbol);

const defaultOptions: BoxOptions = {
  size: "1"
}
const BoxSized = createToken(BoxSymbol, defaultOptions);

export const _703_TokenOptions = (
  <>
    <Box size="3" />
    <BoxSized />
    <BoxSized size="2" />
  </>
)
