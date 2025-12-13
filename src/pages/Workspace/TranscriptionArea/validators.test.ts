import evaluateSubmission from "./validators";
import { shortMessage, longMessage } from "./constants";

describe("evaluateSubmission", () => {
  it("normalizes final sigma variants and is case-insensitive", () => {
    const guess = "Τελοϲ"; // contains lunate sigma (U+03F2) or similar
    const answer = "τελοσ"; // lower-case sigma

    const result = evaluateSubmission(guess, answer, false);

    expect(result[0]).toBe(true);
    expect(result[1]).toBe("correct");
  });

  it("returns correct when guess matches answer ignoring spaces (requireSpaces=false)", () => {
    const guess = "ευαγγελιονκαταμαρκον";
    const answer = "ευαγγελιον κατα μαρκον";

    const result = evaluateSubmission(guess, answer, false);

    expect(result[0]).toBe(true);
    expect(result[1]).toBe("correct");
  });

  it("respects spaces when requireSpaces=true and matches exactly", () => {
    const guess = "ευαγγελιον κατα μαρκον";
    const answer = "ευαγγελιον κατα μαρκον";

    const result = evaluateSubmission(guess, answer, true);

    expect(result[0]).toBe(true);
    expect(result[1]).toBe("correct");
  });

  it("returns short message when requireSpaces=true and guess omits spaces", () => {
    const guess = "ευαγγελιονκαταμαρκον"; // no spaces
    const answer = "ευαγγελιον κατα μαρκον"; // spaces required

    const result = evaluateSubmission(guess, answer, true);

    // There are two missing spaces -> shortMessage(2)
    expect(result[0]).toBe(false);
    expect(result[1]).toBe(shortMessage(2));
  });

  it("returns a short message when guess is too short", () => {
    const guess = "ab";
    const answer = "a b"; // with a space counted when requireSpaces=true

    const result = evaluateSubmission(guess, answer, true);

    expect(result[0]).toBe(false);
    expect(result[1]).toBe(shortMessage(1));
  });

  it("returns a long message when guess is too long", () => {
    const guess = "abcdef";
    const answer = "abc";

    const result = evaluateSubmission(guess, answer, false);

    expect(result[0]).toBe(false);
    expect(result[1]).toBe(longMessage(3));
  });
});
