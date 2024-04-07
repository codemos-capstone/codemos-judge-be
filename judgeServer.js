import express from "express";
import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/score", (req, res) => {
    const userCode = req.body.code;

    if (!userCode.includes("_mainLoop = function()")) {
        return res.status(400).json({ error: "코드 문법 오류 : _mainLoop 할당 필수" });
    }

    const child = fork("index.js", [], { execArgv: ["--experimental-modules"] });

    child.send({ code: userCode });

    child.on("message", (message) => {
        if (message.type === "result") {
            res.json({ score: message.score, fuel: message.fuel, time: message.time });
        } else if (message.type === "error") {
            console.error("Error in child process:", message.error);
            res.status(400).json({ error: "코드 문법 오류 : " + message.error });
        }
        child.kill();
    });

    child.on("error", (error) => {
        console.error("Error in child process:", error);
        res.status(500).json({ error: "채점 서버 오류" });
    });
});

app.listen(port, () => {
    console.log(`port ${port}`);
});
