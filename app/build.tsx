import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * What this build is. `version.json` is the one file a demo edits between
 * deployments; everything else is read from the environment the build ran in,
 * so a page can say which commit and which branch it came from without the
 * screenplay knowing.
 */
export interface Build {
  app: string;
  version: string;
  headline: string;
  theme: { background: string; foreground: string };
}

export const build: Build = JSON.parse(readFileSync(join(process.cwd(), "version.json"), "utf8"));

// CI writes build-info.json before the build; a local or console build has none.
function buildInfo(): { sha?: string; branch?: string } {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), "build-info.json"), "utf8"));
  } catch {
    return {};
  }
}
const info = buildInfo();
const sha = (info.sha ?? process.env.GITHUB_SHA ?? process.env.AMPLIFY_COMMIT_ID ?? "local").slice(0, 7);
const branch = info.branch ?? process.env.GITHUB_REF_NAME ?? process.env.AMPLIFY_BRANCH ?? "";
const builtAt = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";

export function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 flex justify-center gap-10 py-6 text-2xl font-mono opacity-60">
      {sha !== "local" ? <span>commit {sha}</span> : null}
      {branch ? <span>branch {branch}</span> : null}
      <span>built {builtAt}</span>
    </footer>
  );
}
