import fs from "node:fs";
import { parse } from "csv-parse";

const csvPath = new URL("../../task.csv", import.meta.url);

const csvParseOptions = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});

const stream = fs.createReadStream(csvPath);

async function getTasksFromCSV() {
  const csvLines = stream.pipe(csvParseOptions);
  for await (const line of csvLines) {
    const [title, description] = line;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
}

getTasksFromCSV();
