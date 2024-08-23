import { render, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { SearchForm } from ".";

describe("SearchForm Component", () => {
  const onSearchMockFn = vi.fn();

  it("shoud be able to render", async () => {
    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const searchFormRoot = await searchForm.findByTestId("search-form");
    expect(searchFormRoot).toBeInTheDocument();
  });

  it("should be rendered with a submit button", async () => {
    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const submitButton = await searchForm.findByRole("button");
    const searchSVGIcon = await within(submitButton).findByTestId("search-icon");

    expect(searchSVGIcon).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
    expect(submitButton).toHaveAttribute("title", "procurar");
  });

  it("should be rendered with an input", async () => {
    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const searchInput = await searchForm.findByRole("searchbox");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "search");
    expect(searchInput).toHaveAttribute("placeholder", "procurar");
  });

  it("should be able to type in the search input", async () => {
    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const searchInput = await searchForm.findByRole("searchbox");
    await userEvent.type(searchInput, "some movie");

    expect(searchInput).toHaveValue("some movie");
  });

  it("should be able to submit the form", async () => {
    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const submitButton = await searchForm.findByRole("button");
    await userEvent.click(submitButton);

    expect(onSearchMockFn).toHaveBeenCalled();
  });
});