import { VNodeRepresentationSource } from "./vnode";
/**
 * `unique symbol` to represent a {@link FragmentVNode}, this will be used on the {@link VNode.reference} property.
 * The {@link FragmentVNode} should be ignored and the {@link VNode.children} values should be used in its place
 */
export declare const Fragment: unique symbol;
export declare function createFragment(options: Record<string, unknown>, ...children: VNodeRepresentationSource[]): Omit<import("./vnode").VNode, "options" | "children" | "source" | "scalar"> & {
    source: typeof Fragment;
    scalar: false;
    options: Record<string, unknown>;
    children: undefined;
};
//# sourceMappingURL=fragment.d.ts.map