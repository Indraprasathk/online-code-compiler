const cors = require("cors");
const express = require("express");
const { generateFile } = require("./GenerateFile");  // Corrected naming
const { executeCfile } = require("./executeCfile");
const { ExecuteFilePython } = require("./ExecuteFilePython");
const { ExecuteFileJava, JavaFileNamer } = require("./ExecuteFileJava");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ hello: "world" });
});

app.post("/run", async (req, res) => {
    try {
        const { language = "cpp", code } = req.body;
        console.log(language, code.length);

        if (!code) {
            return res.status(400).json({ success: false, error: "Code can't be empty or null" });
        }

        // Create a file from the provided content based on the language
        const filepath = await generateFile(language, code);  // Corrected naming
        let output;

        if (language === "cpp") {
            output = await executeCfile(filepath);
        } else if (language === "java") {
            const javaFileName = JavaFileNamer(code);

            if (javaFileName) {
                const javaFilePath = `./path/to/java/files/${javaFileName}`;
                output = await ExecuteFileJava(javaFilePath);
            } else {
                return res.status(400).json({ success: false, error: "Invalid Java code format" });
            }
        } else {
            output = await ExecuteFilePython(filepath);
        }

        // Send the filepath and output as a response
        return res.json({ output });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
