import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  it("should render the Home link", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
  });

  it("should render my email", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const authorName = screen.getByText("Test By Lavinia Melo");
    expect(authorName).toBeInTheDocument();
    expect(authorName).toHaveAttribute("href", "mailto:lavininhamelo@hotmail.com");
  });

  it("should render my linkedin", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const linkedInLink = screen.getByText("(LinkedIn)");
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute("href", "https://linkedin.com/in/laviniamelo");
  });
});
