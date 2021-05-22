import FileHound from "filehound";
import fs from "fs";
import path from "path";
import { promisify } from "util";


const packages = await FileHound.create()
  .paths(`packages`)
  .directory()
  .depth(1)
  .find();

console.log(packages);

for (const packageName of packages) {
  const filePaths = await FileHound.create()
    .paths(`${packageName}/lib`)
    .discard("node_modules")
    .ext("js")
    .find()

  await Promise.all(
    filePaths.map(
      async filePath => {

        let contents = await promisify(fs.readFile)(
          filePath,
          "utf-8"
        );

        const statements = contents.match(/(import|export) .+ from ".+";/g);

        if (!statements) {
          return;
        }

        await Promise.all(
          statements.map(
            async statement => {
              const url = statement.match(/"(.+)";/)[1];
              if (url.indexOf(".") !== 0) {
                return;
              }
              const [stat, indexStat] = await Promise.all([
                promisify(fs.stat)(path.resolve(path.dirname(filePath), url + ".js")).catch(() => {}),
                promisify(fs.stat)(path.resolve(path.dirname(filePath), url + "/index.js")).catch(() => {})
              ]);
              if (stat && stat.isFile()) {
                contents = contents.replace(
                  statement,
                  statement.replace(url, url + ".js")
                );
              } else if (indexStat && indexStat.isFile()) {
                contents = contents.replace(
                  statement,
                  statement.replace(url, url + "/index.js")
                );
              }
            }
          )
        );

        await promisify(fs.writeFile)(filePath, contents, "utf-8");

      }
    )
  );
}
