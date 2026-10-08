import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

/** Описывает страницу 'Компоненты'. */
export class ComponentPage extends BasePage {
  /** Инициализация объекта страницы.
   *
   * @param page Объект страницы playwright Page.
   */
  constructor(page: Page) {
    super(page);
  }
}
