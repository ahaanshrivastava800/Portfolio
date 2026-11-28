#!/usr/bin/env node
"use strict";

const data = require("./data.js");

const URL_KEY_PATTERN = /(url|href|github|linkedin)$/i;
const EMAIL_KEY_PATTERN = /(emailHref)$/i;

const errors = [];
let checkedCount = 0;

function validateUrl(value, path, allowMailto) {
  checkedCount++;

  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${path}: empty or non-string URL`);
    return;
  }

  const trimmed = value.trim();

  if (trimmed === "#" || trimmed.startsWith("#")) {
    errors.push(`${path}: placeholder "#" link is not allowed (${trimmed})`);
    return;
  }

  if (trimmed.startsWith("mailto:")) {
    if (!allowMailto) {
      errors.push(`${path}: mailto: is only allowed for email contact links (${trimmed})`);
      return;
    }
    const address = trimmed.slice("mailto:".length);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      errors.push(`${path}: malformed mailto address (${trimmed})`);
    }
    return;
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    errors.push(`${path}: malformed URL (${trimmed})`);
    return;
  }

  if (parsed.protocol !== "https:") {
    errors.push(`${path}: URL must use https:// (found ${parsed.protocol} in ${trimmed})`);
    return;
  }

  if (!parsed.hostname || !parsed.hostname.includes(".")) {
    errors.push(`${path}: URL hostname looks invalid (${trimmed})`);
  }
}

function walk(node, path, context) {
  if (Array.isArray(node)) {
    node.forEach((item, idx) => walk(item, `${path}[${idx}]`, context));
    return;
  }

  if (node && typeof node === "object") {
    const isEmailContact =
      path.startsWith("contact[") &&
      typeof node.label === "string" &&
      node.label.toLowerCase() === "email";

    for (const [key, val] of Object.entries(node)) {
      const childPath = path ? `${path}.${key}` : key;
      if (URL_KEY_PATTERN.test(key)) {
        const allowMailto = EMAIL_KEY_PATTERN.test(key) || isEmailContact;
        validateUrl(val, childPath, allowMailto);
      } else if (val && typeof val === "object") {
        walk(val, childPath, context);
      }
    }
  }
}

walk(data, "", {});

if (errors.length > 0) {
  console.error(`Link check failed with ${errors.length} error(s) out of ${checkedCount} URL(s):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(`Link check passed: ${checkedCount} URL(s) verified in data.js (all valid, no "#" or empty links).`);
