import { mkdir, writeFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const routeTypesPath = resolve(process.cwd(), ".next/types/routes.d.ts");

await mkdir(dirname(routeTypesPath), { recursive: true });

try {
  await access(routeTypesPath);
} catch {
  await writeFile(
    routeTypesPath,
    [
      "// Auto-generated placeholder to satisfy typed routes reference during local typecheck.",
      "declare const __nextRouteDefinitions: Record<string, never>;",
      "export {};",
      "",
    ].join("\n"),
    "utf8",
  );
}
