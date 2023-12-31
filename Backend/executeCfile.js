const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require('path');
const outputPath = path.join(__dirname, "outputs");

// Import createOutputDirectory function from another module
const { createOutputDirectory } = require('./Outputs');

async function executeCfile(filepath) {
  // Call createOutputDirectory function before proceeding
  await createOutputDirectory();

  const jobId = path.basename(filepath, path.extname(filepath));
  const outPath = path.join(outputPath, `${jobId}.out`);
  try {
    await exec(`g++ "${filepath}" -o "${outPath}" && "${outPath}"`);
    const { stdout, stderr } = await exec(`"${outPath}"`);
    if (stderr) {
      console.error("Execution error:", stderr);
      throw new Error(stderr);
    }
    return stdout;
  } catch (error) {
    console.error("Compilation error:", error.message);
    throw error;
  }
}

module.exports = {
  executeCfile
};
