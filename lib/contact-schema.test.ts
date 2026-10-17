import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "./contact-schema";

test("contactSchema accepts valid contact messages", () => {
  const result = contactSchema.safeParse({
    name: "Agustin",
    email: "agustin@example.com",
    subject: "Project inquiry",
    message: "Hello! I would like to consult on a web development project.",
  });
  assert.equal(result.success, true);
});

test("contactSchema catches bot submissions via honeypot field", () => {
  const result = contactSchema.safeParse({
    name: "Bot",
    email: "bot@spam.com",
    subject: "Marketing offer",
    message: "Automated message for SEO ranking and sales.",
    website: "https://spam-domain.com",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.website, "https://spam-domain.com");
  }
});

test("contactSchema rejects invalid email format", () => {
  const result = contactSchema.safeParse({
    name: "Agustin",
    email: "not-an-email",
    subject: "Testing",
    message: "Valid message content here.",
  });
  assert.equal(result.success, false);
});

test("contactSchema enforces minimum length on message", () => {
  const result = contactSchema.safeParse({
    name: "Agustin",
    email: "test@domain.com",
    subject: "Testing",
    message: "Too short",
  });
  assert.equal(result.success, false);
});
