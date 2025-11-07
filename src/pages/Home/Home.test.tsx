import { render, screen } from "@testing-library/react";

import { Home } from "./Home";

describe("Home", () => {
  it("should render correctly", () => {
    render(<Home />);

    expect(screen.getByText("Guided lessons")).toBeInTheDocument();
    expect(screen.getByText("for learning to read")).toBeInTheDocument();
    expect(screen.getByText("Greek manuscripts")).toBeInTheDocument();

    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(8);

    expect(screen.getByRole("button", { name: "Get started" })).toBeEnabled();
  });
});
