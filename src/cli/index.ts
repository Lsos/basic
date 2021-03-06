#!/usr/bin/env node

import { activate } from "./commands/activate";
import { status } from "./commands/status";
import { debug } from "./commands/debug";
import { postinstall } from "./commands/postinstall";
import { fgBold, styleError, styleErrorEmphasis } from "./components/colors";
import { header } from "./components/header";
import assert = require("assert");
import { EOL } from "os";

process.on("unhandledRejection", console.error);

cli();

async function cli() {
  try {
    await runCli();
  } catch (err) {
    console.error(err);
  }
}

async function runCli() {
  console.log(header);
  console.log();

  const cmd = getCommand();

  if (cmd === null) {
    showHelp();
    return;
  }
  const { command, args } = cmd;

  switch (command) {
    case "activate":
      await _activate(args);
      break;
    case "status":
      await _status(args);
      break;
    case "postinstall":
      await postinstall();
      break;
    case "debug":
      await debug();
      break;
    default:
      console.log(styleError("Unknown command ") + styleErrorEmphasis(command));
      console.log();
    case "help":
      showHelp();
  }
}

async function _activate(args: string[]) {
  const activationKeyHash = args[0];
  if (args.length !== 1 || !activationKeyHash) {
    console.log(
      styleError("Wrong ") +
        styleErrorEmphasis("activate") +
        styleError(" usage.")
    );
    console.log();
    console.log("Usage: lsos activate <activation-key>");
    console.log();
    return;
  }
  await activate(args[0]);
  console.log();
}

async function _status(args: string[]) {
  if (args.length !== 0) {
    console.log(
      styleError("Wrong ") +
        styleErrorEmphasis("status") +
        styleError(" usage.")
    );
    console.log();
    console.log("Usage: lsos status");
    console.log();
    return;
  }
  await status();
  console.log();
}

function showHelp() {
  console.log(
    [
      "Usage: lsos " + /*cmdColor*/ "<command>",
      "",
      "Commands:",
      `  ${cmdColor("activate")}  Add activation key`,
      `  ${cmdColor("status")}    Show expiration dates of activation keys`,
      `  ${cmdColor("help")}      Display this help information`,
      "",
    ].join(EOL)
  );
}

function cmdColor(str: string): string {
  return fgBold(str);
}

function getCommand() {
  const { argv } = process;
  if (argv.length < 3) {
    return null;
  }

  const command = argv[2];
  assert(command.constructor === String);

  const args = argv.slice(3);

  return { command, args };
}
