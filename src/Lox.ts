import { readFileSync } from "fs";
import readline from "readline";

let hadError = false;

(function main() {
    const args = process.argv.slice(2);
    if (args.length > 1) {
        console.log("Usage: tlox [script]");
        process.exit(64);
    } else if (args.length === 0) {
        runFile(args[0]);
    } else {
        runPrompt();
    }
})();

function runFile(path: string) {
    run(readFileSync(path, "utf-8"));

    if (hadError) process.exit(64);
}

function run(source: string) {
    const tokens = scanTokens(source);
    console.log(tokens);
}

function error(line: number, message: string) {
    report(line, "", message);
}

function report(line: number, where: string, message: string) {
    console.log(`[line ${line}] Error ${where}: ${message}`);
}

function runPrompt() {
    const rl = readline.createInterface({ input: process.stdin });
    rl.on("line", (line) => {
        if (line === null) rl.close();
        run(line);
        hadError = false;
    });
}

function scanTokens(source: string) {
    // TODO
}
