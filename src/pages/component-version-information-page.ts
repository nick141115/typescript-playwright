import { Page } from "playwright";
import { BasePage } from "./base-page";

/** Описывает страницу информации о версии компонента. */
export class ComponentVersionInformationPage extends BasePage {
  /** Инициализация объекта страницы.
   *
   * @param page Объект страницы playwright Page.
   */
  constructor(page: Page) {
    super(page);
  }
}
