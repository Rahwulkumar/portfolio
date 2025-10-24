import { syncGitHubActivity } from "@/lib/github";

async function main() {
  const startedAt = Date.now();
  console.log("🔄 Starting GitHub activity sync...");

  try {
    await syncGitHubActivity();
    console.log("✅ GitHub activity synced");
  } catch (error) {
    console.error("❌ GitHub sync failed:", error);
    process.exitCode = 1;
  }

  console.log(`🟢 Sync complete in ${(Date.now() - startedAt) / 1000}s`);
}

main().catch((error) => {
  console.error("Unexpected sync failure", error);
  process.exitCode = 1;
});
