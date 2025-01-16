import * as fs from "fs";
import * as path from "path";

async function processDirectories(directoryPath) {
  try {
    const result = [];

    const filesAndDirs = await fs.promises.readdir(directoryPath);

    const dirPromises = filesAndDirs.map(async (name) => {
      const fullPath = path.join(directoryPath, name);
      const stats = await fs.promises.stat(fullPath);

      if (stats.isDirectory()) {
        result.push(name);
      }
    });

    await Promise.all(dirPromises);

    return result;
  } catch (err) {
    console.error("Error processing directories:", err);
  }
}

async function processFiles(directoryPath) {
  try {
    const result = {};

    const files = await fs.promises.readdir(directoryPath);

    const filePromises = files.map(async (file) => {
      const filePath = path.join(directoryPath, file);

      const stats = await fs.promises.stat(filePath);
      if (stats.isFile()) {
        const fileName = path.basename(file, path.extname(file));

        const { default: defaultExport } = await import(filePath);

        result[fileName] = defaultExport;
      }
    });

    await Promise.all(filePromises);

    return result;
  } catch (err) {
    console.error("Error processing files:", err);
  }
}

const getResolvers = async () => {
  const resolvers = {};

  const types = await processDirectories(path.resolve(process.cwd(), "infrastructure", "resolvers"));

  for (const type of types) {
    const typeResolvers = await processFiles(path.resolve(process.cwd(), "infrastructure", "resolvers", type));

    resolvers[type] = typeResolvers;
  }

  return resolvers;
};

export default getResolvers;
