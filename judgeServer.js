import express from "express";
import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

var queue = 0;

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/score", (req, res) => {
    const userCode = req.body.code;
    queue++;console.log("=".repeat(queue * 2));
    if (!userCode.includes("_mainLoop = function()")) {
        queue--;console.log("=".repeat(queue * 2));
        return res.status(400).json({ error: "문법 오류 : _mainLoop 할당 필수" });
    }

    const child = fork("judge/index.js", [], { execArgv: ["--experimental-modules"] });

    child.send({ code: userCode });

    child.on("message", (message) => {
        child.kill();
        queue--;console.log("=".repeat(queue * 2));
        if (message.type === "result") {
            if (message.timeOver == true)
              res.json({ time: message.time, message: "시간 초과(" + message.timeLimit + "ms)"});
            else
              res.json({ score: message.score, fuel: message.fuel, time: message.time });
        } else if (message.type === "error") {
            // console.error("Error in child process:", message.error);
            res.status(400).json({ error: "문법 오류 : " + message.error });
        }
    });

    child.on("error", (error) => {
        queue--;console.log("=".repeat(queue * 2));
        console.error("Error in child process:", error);
        res.status(500).json({ error: "채점 서버 오류" });
    });
});

app.listen(port, () => {
    console.log(`port ${port}`);
});
