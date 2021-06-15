import fetch from "node-fetch";
import {a, h} from "@virtualstate/x";

function isBuffer(value: unknown): value is Buffer {
  return Buffer.isBuffer(value);
}

async function *EarthquakesCSV() {

  const endpointURL = new URL("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
  const response = await fetch(endpointURL);
  const csvParser: unknown = await import("csv-parser");
  if (!isDefault(csvParser)) throw new Error("Bad types :(");
  for await (const item of response.body.pipe(csvParser.default())) {
    yield { reference: Symbol("CSV row"), options: item };
  }

  function isDefault(v: unknown): v is { default(): (data: Buffer) => Buffer } {
    return !!v
  }
}

export const _O10001_EarthquakesCSV = <EarthquakesCSV />
export const _O10001_URL = import.meta.url;
