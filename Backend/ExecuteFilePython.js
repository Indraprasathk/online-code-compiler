const { exec } = require("child_process");

const executePythonFile = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(`python "${filepath}"`, (error, stdout, stderr) => {
      if (error || stderr) {
        reject({ error, stderr }); // Adjust rejection based on specific conditions
      } else {
        resolve(stdout); // Resolve with the output if successful
      }
    });
  });
};

module.exports = {
  executePythonFile,
};

