import { render, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import { SearchForm } from ".";

describe("SearchForm Component", () => {
  const onSearchMockFn = vi.fn((query: string) => query);

  beforeEach(() => {
    onSearchMockFn.mockClear();
  });

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

  it("should the search form to be submitted with button", async () => {
    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const submitButton = await searchForm.findByRole("button");
    await userEvent.click(submitButton);

    expect(onSearchMockFn).toHaveBeenCalledOnce();
  });

  it("should the search form to be submitted when the enter key is pressed", async () => {
    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const searchInput = await searchForm.findByRole("searchbox");

    await userEvent.type(searchInput, "some movie");
    await userEvent.type(searchInput, "{enter}");

    expect(onSearchMockFn).toHaveBeenCalledOnce();
  });

  it("should be the search form function return with the correct value", async () => {
    const searchValue = "some great movie";

    const searchForm = render(<SearchForm onSearch={onSearchMockFn} />);
    const searchInput = searchForm.getByRole("searchbox");
    
    await userEvent.type(searchInput, searchValue);
    await userEvent.type(searchInput, "{enter}");

    const searchFormFnReturnedValue = onSearchMockFn.mock.results.shift()?.value;

    expect(searchFormFnReturnedValue).to.be.equal(searchValue);
    //or expect(onSearchMockFn).toHaveBeenCalledWith(searchValue);
  });
});