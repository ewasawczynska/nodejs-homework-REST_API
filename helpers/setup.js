import { promises as fs } from "fs";

const isAccessible = (folderPath) =>
  fs
    .access(folderPath)
    .then(() => true)
    .catch(() => false);

export const setup = async (folderPath) => {
  const availableFolder = await isAccessible(folderPath);
  if (!availableFolder) {
    try {
      await fs.mkdir(folderPath, { recursive: true });
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }
};