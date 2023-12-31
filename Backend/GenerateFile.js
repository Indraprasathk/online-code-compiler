const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const codesDirectory = path.join(__dirname, "codes");
if (!fs.existsSync(codesDirectory)) {
    fs.mkdirSync(codesDirectory, { recursive: true });
}
const generateFile = async (format, content) => {
    const jobId = uuidv4();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(codesDirectory, filename);
    fs.writeFileSync(filepath, content);
    return filepath;
};
module.exports = {
    generateFile,
};
