import express from "express";
import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
//const port = 3000;
const port = 3001;

const secretToken = "tmp";
const maxConcurrentRequests = 6;

let queue = 0;
let waitingQueue = [];

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/api/test", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const verifyMainServer = (req, res, next) => {
    // const token = req.headers["x-secret-token"];
    const token = "tmp";
    if (token !== secretToken) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    next();
};

app.post("/score", verifyMainServer, (req, res) => {
    const userCode = req.body.code;
    const _problem = req.body.problem;
    console.log("queue : ", ++queue);
    if (!userCode.includes("_mainloop = function()")) {
        console.log("queue : ", --queue);
        return res.status(400).json({ error: "문법 오류 : _mainLoop 할당 필수" });
    }

    const child = fork("utils/lander/lander.js", [], { execArgv: ["--experimental-modules"] });

    child.send({ code: userCode, problem: _problem });

    child.on("message", (message) => {
        child.kill();
        console.log("queue : ", --queue);
        console.log(message);
        if (message.type === "result") {
            if (message.timeOver == true) res.json({ time: message.time, message: "시간 초과(" + message.timeLimit + "ms)" });
            else res.json({ score: message.score, fuel: message.fuel, time: message.time, bytes: message.bytes, angle: message.angle, velX: message.velX, velY: message.velY });
        } else if (message.type === "error") {
            res.status(400).json({ error: "문법 오류 : " + message.error });
        }
    });

    child.on("error", (error) => {
        console.log("queue : ", --queue);
        console.error("Error in child process:", error);
        res.status(500).json({ error: "채점 서버 오류" });
    });
});

app.listen(port, () => {
    console.log(`port ${port}`);
});
