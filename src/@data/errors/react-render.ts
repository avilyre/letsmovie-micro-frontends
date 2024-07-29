import { reactRenderErrorTemplate } from "./react-render-error-template";

export class ReactRenderError extends Error {
  #message: string;
  #body: HTMLElement;

  constructor(message: string) {
    super(message);
    this.#body = document.body;

    this.name = "ReactRenderError";
    this.#message = message;

    return this;
  }

  render() {
    this.#body.innerHTML = reactRenderErrorTemplate(this.#message);
  }
}