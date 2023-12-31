const { exec } = require("child_process");

function executeJavaFile(filepath) {
  return new Promise((resolve, reject) => {
    exec(`javac ${filepath} && java ${filepath.slice(0, -5)}`, (error, stdout, stderr) => {
      if (error || stderr) {
        reject({ error, stderr }); // Adjust rejection based on specific conditions
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = {
  executeJavaFile,
};
