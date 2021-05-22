export interface IsFunction<Given, Value extends Given> {
  (given: Given): given is Value;
}
