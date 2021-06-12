import path from 'path';
import { lstatSync, readdirSync } from 'fs';

// get listing of packages in the mono repo
const basePath = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'packages');
const packages = readdirSync(basePath)
  .filter(name => {
    return lstatSync(path.join(basePath, name)).isDirectory();
  })
  .filter(name => name !== "deno");

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.ts$': 'ts-jest',
    '\\.tsx$': 'ts-jest',
  },
  moduleNameMapper: {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@virtualstate/${name}(.*)$`]:
          `<rootDir>/packages/./${name}/src/$1`,
      }),
      {},
    ),
  },
  modulePathIgnorePatterns: [
    ...packages.reduce(
      (acc, name) => [...acc, `<rootDir>/packages/${name}/lib`, `<rootDir>/packages/${name}/node_modules`],
      []
    ),
  ],
  projects: [
    ...packages.map(
      name => `<rootDir>/packages/${name}`
    )
  ],
};
