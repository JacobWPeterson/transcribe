import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import manifests, { ManifestSets } from "../../../files/manifests";

import { TranscriptionArea } from "./TranscriptionArea";

const mockChangeManuscript = vi.fn();

describe("TranscriptionArea", () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure clean state
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render correctly for first lesson", async () => {
    render(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={1}
        manifest={manifests[ManifestSets.CORE][1]}
      />
    );
    const user = userEvent.setup();

    // Header area
    expect(
      screen.getByRole("heading", { level: 2, name: "Lesson 1" })
    ).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole("checkbox", {
      name: "Require spaces",
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();
    expect(screen.getByRole("link", { name: "Guide" })).toBeInTheDocument();

    // Instructions
    expect(screen.getByText("General instructions")).toBeInTheDocument();
    expect(
      screen.getByText(
        /This lesson is about the right column. The title is above the green rectangle. Treat indented lines as part of the preceding line when entering them in the forms./
      )
    ).toBeInTheDocument();

    // Lines
    expect(screen.getAllByRole("textbox")).toHaveLength(
      manifests[ManifestSets.CORE][1].lines.length
    );

    // Buttons
    expect(
      screen.queryByRole("button", { name: "Previous" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(mockChangeManuscript).toHaveBeenCalledWith("next");
  });

  it("should render correctly for middle lesson", async () => {
    render(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={2}
        manifest={manifests[ManifestSets.CORE][2]}
      />
    );
    const user = userEvent.setup();

    // Header area
    expect(
      screen.getByRole("heading", { level: 2, name: "Lesson 2" })
    ).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole("checkbox", {
      name: "Require spaces",
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();
    expect(screen.getByRole("link", { name: "Guide" })).toBeInTheDocument();

    // Instructions
    expect(screen.getByText("General instructions")).toBeInTheDocument();
    expect(
      screen.getByText(
        /A papyrus manuscript by a trained scribe in a slightly irregular majuscule script/
      )
    ).toBeInTheDocument();

    // Lines
    expect(screen.getAllByRole("textbox")).toHaveLength(
      manifests[ManifestSets.CORE][2].lines.length
    );

    // Buttons
    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(mockChangeManuscript).toHaveBeenCalledWith("next");
    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(mockChangeManuscript).toHaveBeenCalledWith("previous");
  });

  it("should render correctly for last lesson", async () => {
    render(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={3}
        manifest={manifests[ManifestSets.CORE][3]}
      />
    );
    const user = userEvent.setup();

    // Header area
    expect(
      screen.getByRole("heading", { level: 2, name: "Lesson 3" })
    ).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole("checkbox", {
      name: "Require spaces",
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();
    expect(screen.getByRole("link", { name: "Guide" })).toBeInTheDocument();

    // Instructions
    expect(screen.getByText("General instructions")).toBeInTheDocument();
    expect(
      screen.getByText(
        /No new concepts again in this lesson, just more examples of those learned in the previous lessons but in a different style of majuscule script./
      )
    ).toBeInTheDocument();

    // Lines
    expect(screen.getAllByRole("textbox")).toHaveLength(
      manifests[ManifestSets.CORE][3].lines.length
    );

    // Buttons
    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(mockChangeManuscript).toHaveBeenCalledWith("previous");
    expect(
      screen.queryByRole("button", { name: "Next" })
    ).not.toBeInTheDocument();
  });

  it("correctly revalidates a line when user changes from requireSpaces false to true", async () => {
    render(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={3}
        manifest={manifests[ManifestSets.CORE][3]}
      />
    );
    const user = userEvent.setup();

    // Spaces not required by default
    expect(
      screen.getByRole("heading", { level: 2, name: "Lesson 3" })
    ).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole("checkbox", {
      name: "Require spaces",
    });
    expect(requireSpacesCheckbox).toBeInTheDocument();
    expect(requireSpacesCheckbox).not.toBeChecked();

    const line1 = screen.getByRole("textbox", { name: "title" });
    await user.type(line1, "ευαγγελιονκαταμαρκον");

    const checkButtons = screen.getAllByRole("button", { name: "Check" });
    await user.click(checkButtons[0]);
    expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();

    // Now require spaces
    await user.click(requireSpacesCheckbox);
    expect(requireSpacesCheckbox).toBeChecked();
    expect(
      screen.queryByRole("img", { name: "correct" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "incorrect" })).toBeInTheDocument();
  });

  it("correctly revalidates a line when user changes from requireSpaces true to false", async () => {
    render(
      <TranscriptionArea
        changeManuscript={mockChangeManuscript}
        numberOfLessons={3}
        lessonNumber={3}
        manifest={manifests[ManifestSets.CORE][3]}
      />
    );
    const user = userEvent.setup();

    // Spaces not required by default
    expect(
      screen.getByRole("heading", { level: 2, name: "Lesson 3" })
    ).toBeInTheDocument();
    const requireSpacesCheckbox = screen.getByRole("checkbox", {
      name: "Require spaces",
    });
    expect(requireSpacesCheckbox).not.toBeChecked();

    // Now require spaces
    await user.click(requireSpacesCheckbox);
    expect(requireSpacesCheckbox).toBeChecked();
    expect(
      screen.queryByRole("img", { name: "correct" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "incorrect" })
    ).not.toBeInTheDocument();

    const line1 = screen.getByRole("textbox", { name: "title" });
    await user.type(line1, "ευαγγελιον κατα μαρκον");

    const checkButtons = screen.getAllByRole("button", { name: "Check" });
    await user.click(checkButtons[0]);
    expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();

    // Now unrequire spaces
    await user.click(requireSpacesCheckbox);
    expect(screen.getByRole("img", { name: "correct" })).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "incorrect" })
    ).not.toBeInTheDocument();
  });
});
