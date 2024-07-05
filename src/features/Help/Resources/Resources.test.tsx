import { render, screen } from "@testing-library/react";

import type { ResourceCategories } from "../../../assets/files/onlineResources";

import { Resources } from "./Resources";

const mockResources: ResourceCategories[] = [
  {
    heading: "Heading 1",
    resources: [
      {
        name: "Name 1",
        creator: "Creator 1",
        description: "Description 1",
        url: "Url1",
      },
    ],
  },
  {
    heading: "Heading 2",
    resources: [
      {
        name: "Name 2",
        creator: "Creator 2",
        description: "Description 2",
        url: "Url2",
        journal: "Journal 2",
        journalDetails: "Journal details 2",
      },
    ],
  },
];

describe("Resources", () => {
  it("should render correctly", () => {
    render(<Resources resources={mockResources} title="Test Resources" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Test Resources" }),
    ).toBeInTheDocument();

    // Websites (i.e., not a journal)
    expect(
      screen.getByRole("heading", { level: 2, name: "Heading 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: mockResources[0].resources[0].name }),
    ).toHaveAttribute("href", mockResources[0].resources[0].url);
    expect(
      screen.getByText(`by ${mockResources[0].resources[0].creator}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockResources[0].resources[0].description),
    ).toBeInTheDocument();

    // Journals/Books should have relevant citation details
    expect(
      screen.getByRole("heading", { level: 2, name: "Heading 2" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Name 2" })).toHaveAttribute(
      "href",
      mockResources[1].resources[0].url,
    );
    expect(screen.getByText("by Creator 2")).toBeInTheDocument();
    expect(screen.getByText(/Journal 2/)).toBeInTheDocument();
    expect(screen.getByText(/Journal details 2/)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/)).toBeInTheDocument();
  });
});
