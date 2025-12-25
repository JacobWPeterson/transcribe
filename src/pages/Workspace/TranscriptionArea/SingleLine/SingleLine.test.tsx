import { render, screen } from "@testing-library/react";
import type { Line } from "src/files/manifests";
import userEvent from "@testing-library/user-event";

import { SingleLine } from "./SingleLine";
import { LessonStatus } from "./singleLine.enum";

const mockTitleLine: Line = {
  isTitle: true,
  caption: "",
  newConcept: null,
  text: "ιωβ",
};

const mockNewConceptLine: Line = {
  isTitle: false,
  caption: "Helpful caption",
  newConcept: "Ekthesis",
  text: "αδελφοσ",
};

describe("SingeLine", () => {
  it("renders correctly for titles", async () => {
    render(
      <SingleLine
        line={mockTitleLine}
        passedIndex={0}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    expect(screen.getByRole("textbox", { name: "title" })).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.hover(screen.getByRole("img", { name: "title" }));
    expect(
      screen.getByText(
        "Titles can be plain or feature elaborate patterns. Titles often feature ligatures and abbreviations and can be much more difficult to read, so don't worry about them as much early on. Type them as a single line."
      )
    ).toBeInTheDocument();
  });

  it("renders correctly for new concept lines", () => {
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    expect(
      screen.queryByRole("img", { name: "title" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "L1" })).toBeInTheDocument();

    expect(screen.getByText(/Helpful caption/)).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();
    expect(screen.getByText(/New concept: Ekthesis./)).toBeInTheDocument();
    expect(
      screen.getByText(
        /A large, decorative letter at the beginning of a line that is often in the margin./
      )
    ).toBeInTheDocument();
  });

  it("enables the check button when text is present", async () => {
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "α");
    expect(checkButton).toBeEnabled();
  });

  it("shows a help message when user types non-Greek characters", async () => {
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    expect(screen.getByText(/Helpful caption/)).toBeInTheDocument();

    await user.type(lineInput, "latin");

    expect(screen.queryByText(/Helpful caption/)).not.toBeInTheDocument();
    expect(
      screen.getByText("Non-Greek characters have been detected")
    ).toBeInTheDocument();

    await user.clear(lineInput);
    expect(
      screen.queryByText("Non-Greek characters have been detected")
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Helpful caption/)).toBeInTheDocument();
  });

  it("shows a help message when user types numbers", async () => {
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    expect(screen.getByText(/Helpful caption/)).toBeInTheDocument();

    await user.type(lineInput, "1000");

    expect(screen.queryByText(/Helpful caption/)).not.toBeInTheDocument();
    expect(
      screen.getByText("Non-Greek characters have been detected")
    ).toBeInTheDocument();
  });

  it("showσ a check when user has submitted a correct answer", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφοσ");

    expect(checkButton).toBeEnabled();
    await user.click(checkButton);

    expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
  });

  it("allows final sigmas", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφος");

    expect(checkButton).toBeEnabled();
    await user.click(checkButton);

    expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
  });

  it("is case insensitive", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αΔεΛφοΣ");

    expect(checkButton).toBeEnabled();
    await user.click(checkButton);

    expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
  });

  it("clears the incorrect answer symbol after user changes input", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφω");

    expect(checkButton).toBeEnabled();
    await user.click(checkButton);
    expect(screen.getByRole("img", { name: "incorrect" })).toBeInTheDocument();

    await user.type(lineInput, "{backspace}");
    expect(
      screen.queryByRole("img", { name: "incorrect" })
    ).not.toBeInTheDocument();
  });

  it("tells the user their incorrect answer is too short when appropriate", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφω");

    expect(checkButton).toBeEnabled();
    await user.click(checkButton);

    const incorrectButton = screen.getByRole("img", { name: "incorrect" });
    expect(incorrectButton).toBeInTheDocument();
    await user.hover(incorrectButton);
    expect(
      screen.getByText("Your answer is 1 letter too short.")
    ).toBeInTheDocument();
  });

  it("tells the user their incorrect answer is too long when appropriate", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφωσοο");

    expect(checkButton).toBeEnabled();
    await user.click(checkButton);

    const incorrectButton = screen.getByRole("img", { name: "incorrect" });
    expect(incorrectButton).toBeInTheDocument();
    await user.hover(incorrectButton);
    expect(
      screen.getByText("Your answer is 2 letters too long.")
    ).toBeInTheDocument();
  });

  it("indicates an answer is incorrect when it is wrong but the correct length", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφωσ");

    expect(checkButton).toBeEnabled();
    await user.click(checkButton);

    const incorrectButton = screen.getByRole("img", { name: "incorrect" });
    expect(incorrectButton).toBeInTheDocument();
    await user.hover(incorrectButton);
    expect(screen.getByText("Answer is incorrect.")).toBeInTheDocument();
  });

  it("shows a hint after three incorrect guesses of correct length", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφοο");
    expect(checkButton).toBeEnabled();
    await user.click(checkButton);
    expect(screen.getByRole("img", { name: "incorrect" })).toBeInTheDocument();

    await user.type(lineInput, "{backspace}{backspace}ωσ");
    await user.click(checkButton);
    expect(screen.getByRole("img", { name: "incorrect" })).toBeInTheDocument();

    await user.type(lineInput, "{backspace}{backspace}οω");
    await user.click(checkButton);
    expect(
      screen.queryByRole("img", { name: "incorrect" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "help" })).toBeInTheDocument();

    await user.hover(screen.getByRole("img", { name: "help" }));
    expect(screen.getByText("Incorrect letter: ω(7).")).toBeInTheDocument();

    await user.type(lineInput, "{backspace}{backspace}ωζ");
    await user.click(checkButton);
    expect(
      screen.queryByRole("img", { name: "incorrect" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "help" })).toBeInTheDocument();

    await user.hover(screen.getByRole("img", { name: "help" }));
    expect(
      screen.getByText("Incorrect letters: ω(6), ζ(7).")
    ).toBeInTheDocument();
  });

  it("does not show a hint after three incorrect guesses of incorrect length", async () => {
    // Answer is αδελφοσ
    render(
      <SingleLine
        line={mockNewConceptLine}
        passedIndex={1}
        updateLessonStatus={() => {}}
      />
    );

    const user = userEvent.setup();
    const lineInput = screen.getByRole("textbox", { name: "L1" });
    expect(lineInput).toBeInTheDocument();
    const checkButton = screen.getByRole("button", { name: "Check" });
    expect(checkButton).toBeInTheDocument();
    expect(checkButton).toBeDisabled();

    await user.type(lineInput, "αδελφ");
    expect(checkButton).toBeEnabled();
    await user.click(checkButton);
    expect(screen.getByRole("img", { name: "incorrect" })).toBeInTheDocument();

    await user.type(lineInput, "ω");
    await user.click(checkButton);
    expect(screen.getByRole("img", { name: "incorrect" })).toBeInTheDocument();

    await user.type(lineInput, "{backspace}ο");
    await user.click(checkButton);
    expect(screen.getByRole("img", { name: "incorrect" })).toBeInTheDocument();
  });

  describe("Requiring spaces", () => {
    it("does not consider missing spaces when requireSpaces is false", async () => {
      render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });

      await user.type(lineInput, "αδελφοσμου");

      expect(checkButton).toBeEnabled();
      await user.click(checkButton);

      expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
    });

    it("does not consider extra spaces when requireSpaces is false", async () => {
      render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });

      await user.type(lineInput, "αδελφοσ     μου");

      expect(checkButton).toBeEnabled();
      await user.click(checkButton);

      expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
    });

    it("does not consider incorrect spacing when requireSpaces is false", async () => {
      render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });

      await user.type(lineInput, "αδελ φοσ μου");

      expect(checkButton).toBeEnabled();
      await user.click(checkButton);

      expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
    });

    it("marks the asnwer as correct when answer is correctly spaced adn when requireSpaces is true", async () => {
      render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });

      await user.type(lineInput, "αδελφοσ μου");

      expect(checkButton).toBeEnabled();
      await user.click(checkButton);

      expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
    });

    it("considers missing spaces when requireSpaces is true", async () => {
      render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });

      await user.type(lineInput, "αδελφοσμου");

      expect(checkButton).toBeEnabled();
      await user.click(checkButton);

      expect(
        screen.queryByRole("img", { name: "correct" })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: "incorrect" })
      ).toBeInTheDocument();
    });

    it("considers extra spaces when requireSpaces is true", async () => {
      render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });

      await user.type(lineInput, "αδελφοσ  μου");

      expect(checkButton).toBeEnabled();
      await user.click(checkButton);

      expect(
        screen.queryByRole("img", { name: "correct" })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: "incorrect" })
      ).toBeInTheDocument();
    });

    it("considers incorrect spacing when requireSpaces is true", async () => {
      render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });

      await user.type(lineInput, "αδελ φοσ μου");

      expect(checkButton).toBeEnabled();
      await user.click(checkButton);

      expect(
        screen.queryByRole("img", { name: "correct" })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: "incorrect" })
      ).toBeInTheDocument();
    });
  });

  describe("a11y", () => {
    it("has keyboard accessible answer checking", async () => {
      // Answer is αδελφοσ
      render(
        <SingleLine
          line={mockNewConceptLine}
          passedIndex={1}
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });
      expect(checkButton).toBeInTheDocument();
      expect(checkButton).toBeDisabled();

      await user.keyboard("{tab}");
      await user.keyboard("αδελφοσ");

      expect(checkButton).toBeEnabled();
      await user.keyboard("{tab}");
      await user.keyboard("{enter}");

      expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
    });

    it("has keyboard accessible title messaging", async () => {
      // Answer is αδελφοσ
      render(
        <SingleLine
          line={mockTitleLine}
          passedIndex={1}
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();

      await user.keyboard("{tab}");

      expect(
        screen.getByText(
          "Titles can be plain or feature elaborate patterns. Titles often feature ligatures and abbreviations and can be much more difficult to read, so don't worry about them as much early on. Type them as a single line."
        )
      ).toBeInTheDocument();
    });

    it("has keyboard accessible incorrect answer messaging", async () => {
      // Answer is αδελφοσ
      render(
        <SingleLine
          line={mockNewConceptLine}
          passedIndex={1}
          updateLessonStatus={() => {}}
        />
      );

      const user = userEvent.setup();
      const lineInput = screen.getByRole("textbox", { name: "L1" });
      expect(lineInput).toBeInTheDocument();
      const checkButton = screen.getByRole("button", { name: "Check" });
      expect(checkButton).toBeInTheDocument();
      expect(checkButton).toBeDisabled();

      await user.keyboard("{tab}");
      await user.keyboard("αδελφο");

      expect(checkButton).toBeEnabled();
      await user.keyboard("{tab}");
      await user.keyboard("{enter}");

      const incorrectButton = screen.getByRole("img", { name: "incorrect" });
      expect(incorrectButton).toBeInTheDocument();
      await user.keyboard("{tab}");
      expect(
        screen.getByText("Your answer is 1 letter too short.")
      ).toBeInTheDocument();
    });

    it("re-evaluates submitted answer when requireSpaces changes", () => {
      const mockUpdateLessonStatus = vi.fn();
      const { rerender } = render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces={false}
          savedAnswer="αδελφοσμου"
          savedStatus={LessonStatus.CORRECT}
          updateLessonStatus={mockUpdateLessonStatus}
        />
      );

      // Initially should show correct status
      expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
      expect(mockUpdateLessonStatus).not.toHaveBeenCalled();

      // Change requireSpaces to true - should re-evaluate and mark as incorrect
      rerender(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces={true}
          savedAnswer="αδελφοσμου"
          savedStatus={LessonStatus.CORRECT}
          updateLessonStatus={mockUpdateLessonStatus}
        />
      );

      // Should have re-evaluated and called updateLessonStatus with INCORRECT
      expect(mockUpdateLessonStatus).toHaveBeenCalledWith(
        1,
        LessonStatus.INCORRECT
      );
    });

    it("re-evaluates saved answer when requireSpaces changes, even for incomplete lines", () => {
      const mockUpdateLessonStatus = vi.fn();
      const { rerender } = render(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces={false}
          savedAnswer="αδελφοσμου"
          savedStatus={LessonStatus.INCOMPLETE}
          updateLessonStatus={mockUpdateLessonStatus}
        />
      );

      expect(mockUpdateLessonStatus).not.toHaveBeenCalled();

      // Change requireSpaces to true - should re-evaluate the savedAnswer and mark as incorrect
      rerender(
        <SingleLine
          line={{ ...mockNewConceptLine, text: "αδελφοσ μου" }}
          passedIndex={1}
          requireSpaces={true}
          savedAnswer="αδελφοσμου"
          savedStatus={LessonStatus.INCOMPLETE}
          updateLessonStatus={mockUpdateLessonStatus}
        />
      );

      // Should have re-evaluated the savedAnswer and called updateLessonStatus with INCORRECT
      expect(mockUpdateLessonStatus).toHaveBeenCalledWith(
        1,
        LessonStatus.INCORRECT
      );
    });
  });
});
