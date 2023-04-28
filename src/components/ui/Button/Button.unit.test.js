import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("should render the button text correctly", () => {
    render(<Button name="More Details" />);
    const buttonText = screen.getByText(/More Details/i);
    expect(buttonText).toBeInTheDocument();
  });

  it("should render the button with text Button when no one name is passed", () => {
    render(<Button />);
    const buttonText = screen.getByText(/Button/i);
    expect(buttonText).toBeInTheDocument();
  });

  it("should render additional props correctly", () => {
    render(<Button name="Click me" className="test-class" id="my-button" value="clicked" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("id", "my-button");
    expect(button).toHaveAttribute("value", "clicked");
    expect(button).toHaveAttribute("class", "button__container test-class");
  });
});