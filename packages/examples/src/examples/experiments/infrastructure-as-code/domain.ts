import {createToken, TokenVNodeBase, TokenVNodeFn} from "@virtualstate/fringe";
import {create} from "domain";

export const FarmSymbol = Symbol("🚜");
export interface FarmOptions {

}
export type FarmToken = TokenVNodeBase<typeof FarmSymbol, FarmOptions>;
export type FarmTokenFn = TokenVNodeFn<typeof FarmSymbol, FarmOptions>;
export const Farm: FarmTokenFn = createToken(FarmSymbol);

export const ServiceSymbol = Symbol("🙋");
export interface ServiceOptions {
  ram: "big" | "huge"
  cpu: "quick" | "very quick"
}
export type ServiceToken = TokenVNodeBase<typeof ServiceSymbol, ServiceOptions>;
export type ServiceTokenFn = TokenVNodeFn<typeof ServiceSymbol, ServiceOptions>;
export const Service: ServiceTokenFn = createToken(ServiceSymbol);

export const SmallerBigProcess = createToken(Symbol("Smaller Big Process"), {});
export const BigProcess = createToken(Symbol("Big Process"), {});

const domainMap = {
  Farm,
  Service,
  SmallerBigProcess,
  BigProcess
}

type DomainTokenMap = typeof domainMap;
export type DomainToken = DomainTokenMap[keyof DomainTokenMap];

export const Domain: DomainToken[] = [
  ...Object.values(domainMap)
]
