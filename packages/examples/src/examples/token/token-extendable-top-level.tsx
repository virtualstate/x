import { h } from "@virtualstate/fringe";

const Token = (
  <test class="default-class">
    <inner>Hello!</inner>
  </test>
);

const output = (
  <hello class="main">
    <Token first={true} />
    <Token class="content">
      This is the content for this middle one
    </Token>
    <Token last={true} class="footer">
      This is the content for the last one
    </Token>
  </hello>
)

export const _710_Token = output;
export const _710_URL = import.meta.url;
