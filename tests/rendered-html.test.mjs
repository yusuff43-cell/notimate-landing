import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const publicRoot = new URL("../public/", import.meta.url);

test("landing presents the Thailand LINE Monitor product", async () => {
  const html = await readFile(new URL("landing.html", publicRoot), "utf8");

  assert.match(html, /NotiMate — AI operations for your LINE team/);
  assert.match(html, /RU · TH · EN/);
  assert.match(html, /10,000\+|10 000\+/);
  assert.match(html, /Google Sheets/);
  assert.match(html, /฿<\/span>5,000/);
  assert.match(html, /฿<\/span>4,900/);
  assert.match(html, /฿<\/span>8,900/);
  assert.match(html, /฿15,000/);
  assert.match(html, /฿25,000/);
  assert.match(html, /site\.js/);
  assert.match(html, /href="\/terms"/);
});

test("landing keeps pricing bounded and avoids unsupported promises", async () => {
  const [html, script] = await Promise.all([
    readFile(new URL("landing.html", publicRoot), "utf8"),
    readFile(new URL("site.js", publicRoot), "utf8"),
  ]);
  const content = `${html}\n${script}`;

  assert.doesNotMatch(content, /24\/7 support|priority support 24\/7|unlimited LINE groups/i);
  assert.doesNotMatch(content, /Dashboard \+ reports|API integration|Task Management/i);
  assert.doesNotMatch(content, /пилот|NotiMate pilot/i);
  assert.match(content, /Функция находится в развитии/);
  assert.match(content, /Контроль бизнеса через рабочие LINE-чаты/);
  assert.match(content, /До 10 000 текстовых сообщений/);
  assert.match(content, /Up to 300 images per month/);
  assert.match(content, /ระยะเวลาจัดเก็บ/);
});

test("language switch includes Thai, English and Russian", async () => {
  const [html, script] = await Promise.all([
    readFile(new URL("landing.html", publicRoot), "utf8"),
    readFile(new URL("site.js", publicRoot), "utf8"),
  ]);

  for (const language of ["th", "en", "ru"]) assert.match(html, new RegExp(`data-lang="${language}"`));
  assert.match(script, /th:\s*\{/);
  assert.match(script, /ru:\s*\{/);
  assert.match(script, /en:\s*\{/);
  assert.match(script, /localStorage\.setItem\("notimate-language"/);
});

test("privacy notice covers service roles, retention and data rights in three languages", async () => {
  const [landing, privacy, privacyScript] = await Promise.all([
    readFile(new URL("landing.html", publicRoot), "utf8"),
    readFile(new URL("privacy.html", publicRoot), "utf8"),
    readFile(new URL("privacy.js", publicRoot), "utf8"),
  ]);

  assert.match(landing, /href="\/privacy"/);
  for (const language of ["th", "en", "ru"]) assert.match(privacy, new RegExp(`data-policy="${language}"`));
  assert.match(privacy, /client will normally be the controller/);
  assert.match(privacy, /written schedule for raw content/);
  assert.match(privacy, /Personal Data Protection Committee/);
  assert.match(privacyScript, /localStorage\.setItem\("notimate-language"/);
});

test("terms explain AI limits, verification and client data responsibilities", async () => {
  const [landing, terms, termsScript] = await Promise.all([
    readFile(new URL("landing.html", publicRoot), "utf8"),
    readFile(new URL("terms.html", publicRoot), "utf8"),
    readFile(new URL("terms.js", publicRoot), "utf8"),
  ]);

  assert.match(landing, /AI-помощник, а не источник окончательной истины/);
  for (const language of ["th", "en", "ru"]) assert.match(terms, new RegExp(`data-policy="${language}"`));
  assert.match(terms, /may make errors, be delayed or extract data incompletely/);
  assert.match(terms, /a system of record/);
  assert.match(terms, /client remains responsible/);
  assert.match(termsScript, /localStorage\.setItem\("notimate-language"/);
});

test("landing makes event extraction readable and keeps the AI notice below FAQ", async () => {
  const [html, script, css] = await Promise.all([
    readFile(new URL("landing.html", publicRoot), "utf8"),
    readFile(new URL("site.js", publicRoot), "utf8"),
    readFile(new URL("styles.css", publicRoot), "utf8"),
  ]);

  assert.match(html, /data-signal-context/);
  assert.match(script, /signalContextCopy/);
  assert.equal((html.match(/class="step-icon/g) ?? []).length, 4);
  assert.ok(html.indexOf("faq-section") < html.indexOf("ai-notice"));
  assert.match(css, /\.step-icon\{width:58px;height:58px/);
  assert.match(css, /\.faq-section \.ai-notice\{grid-column:1\/-1/);
});
