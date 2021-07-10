import {
  h,
  VNode,
  createFragment,
  SourceReference,
  TokenVNodeFn,
  TokenVNodeBase,
  createToken
} from "@virtualstate/fringe";
import {And} from "../experiments/combinational/and";
import {Collector} from "microtask-collector";
import { Hook } from "@virtualstate/hooks"

const NodeSymbol = Symbol("Node");

type Relationship = "parent" | "child" | "sibling" | "previous sibling" | "next sibling";

type Relationships = Map<NetworkVNode, Relationship[]>;

interface Message {
  reference: SourceReference;
  // All communications must start from within net
  source: NetworkVNode;
}

interface NetworkVNode {
  reference: typeof NodeSymbol;
  source: {
    options?: InputNodeOptions,
    state?: VNode
  },
  communicate(message: Message): Promise<void>
}

function isNetworkVNode(node: VNode): node is NetworkVNode {
  return node.reference === NodeSymbol;
}

interface InputNodeOptions {
  relationships?: Relationship | Relationships;
}

function Node(options: InputNodeOptions, state?: VNode): NetworkVNode {
  return {
    reference: NodeSymbol,
    source: {
      options,
      state
    },
    async communicate() {
      return undefined;
    }
  }
}

const PairedMessageSymbol = Symbol("Paired Message");

interface PairedMessage {
  reference: typeof PairedMessageSymbol
  source: Message;
  resolve(): void;
  reject(error: unknown): void;
}

function PairCommunication(options?: InputNodeOptions, state?: VNode): [NetworkVNode, Collector<PairedMessage>] {
  const messages = new Collector<PairedMessage>();
  const node = Node(options, state);
  node.communicate = async (source) => {
    return new Promise<void>((resolve, reject) => {
      messages.add({
        reference: PairedMessageSymbol,
        source,
        resolve,
        reject
      });
    });
  };
  return [node, messages]
}

interface SizedOptions {
  size: number;
  batch?: number;
}

function *Sized({ size: targetSize, batch: targetBatch }: SizedOptions, state?: VNode) {
  if (!state) return;
  const nodes = [];
  let batch = 0;
  while (nodes.length !== targetSize) {
    nodes.push(state);
    if (!targetBatch) {
      yield nodes;
    } else {
      batch += 1;
      if (batch === targetBatch) {
        yield nodes;
        batch = 0;
      }
    }
  }
  if (batch) {
    yield <>{nodes}</>;
  }
}

interface ClosableOptions {
  close(): void;
}
const ClosableSymbol = Symbol("Closable");
type ClosableToken = TokenVNodeBase<typeof ClosableSymbol, ClosableOptions>;
type ClosableTokenFn = TokenVNodeFn<typeof ClosableSymbol, ClosableOptions>;
const Closable: ClosableTokenFn = createToken(ClosableSymbol);

const GenerateSymbol = Symbol("Generate");

function Generator(options: InputNodeOptions, state?: VNode) {
  const sources = new Set();
  const [node, events] = PairCommunication();
  return [
    node,
    <InternalGenerator />,
    <Closable close={() => events.close()} />
  ];

  async function *InternalGenerator() {
    for await (const batch of events) {
      for (const {} of batch.filter(event => event.source.reference === GenerateSymbol)) {
        sources.add(<Node {...options}>{state}</Node>);
      }
      yield sources;
    }
  }
}

async function *Network(options: unknown, state?: VNode) {
  const closable = new Collector<ClosableToken>();
  const [root, rootMessages] = PairCommunication();
  rootMessages.close();
  let messagesSent = 0;
  yield (
    <>
      <Hook hook={(node: VNode) => {
        if (Closable.is(node)) {
          closable.add(node);
          return createFragment({});
        }
        if (!isNetworkVNode(node)) {
          return node;
        }
        if (messagesSent > 100) {
          return node;
        }
        messagesSent += 1;
        node.communicate({
          reference: GenerateSymbol,
          source: root
        });
        return node;
      }}>
        {state}
      </Hook>
      <Controller />
    </>
  );

  async function Controller() {
    for await (const batch of closable) {
      // Give it x amount of time
      await new Promise(resolve => setTimeout(resolve, 500));
      for (const fn of batch) {
        fn.options.close();
      }
    }
  }

}

export const _N10001_Network = (
  <Network>
    <Generator>
      <Sized size={3}>
        <Node />
      </Sized>
    </Generator>
  </Network>
);
export const _N10001_URL = import.meta.url;
