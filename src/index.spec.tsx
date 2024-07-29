import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { App } from "./app";

describe("App Component", () => {
  it("Should be able to render", async () => {
    const screen = render(<App />);
    const container = await screen.findByText("letsmovie with react!");
    expect(container).toBeInTheDocument();
  });
});