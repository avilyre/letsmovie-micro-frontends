import "./styles.scss";

import { FormEvent } from "react";
import { Search } from "lucide-react";

import { SearchFormProps } from "./interface";

export const SearchForm = (props: SearchFormProps) => {
  const { onSearch } = props;

  const onSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const searchResult = (formEvent.currentTarget.querySelector(".search-input") as HTMLInputElement)?.value;
    return onSearch(searchResult);
  }
  
  return (
    <form
      data-testid="search-form"
      className="container"
      onSubmit={onSubmit}
    >
      <input
        type="search"
        className="search-input"
        placeholder="procurar"
      />
      <button
        title="procurar"
        className="search-button"
        type="submit"
      >
        <Search data-testid="search-icon" />
      </button>
    </form>
  )
}