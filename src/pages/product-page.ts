import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CssKeysAndValues } from "../constants/css-keys-and-values";
import { Settings } from "../../settings";
import * as allure from "allure-js-commons";

/** Описывает страницу 'Продукты'. */
export class ProductPage extends BasePage {
  // Селекторы и текстовые константы, необходимые для работы класса ProductPage.
  /** Checkbox 'Не указан' */
  private readonly CHECKBOX_NOT_SPECIFIED: string = `div:nth-child(6) .selectContainer__menu__option.includeUnsetOption 
${BasePage.PATH}`;
  /** Checkbox с именем ответственного за реализацию */
  private readonly CHECKBOX_RESPONSIBLE_FOR_IMPLEMENTATION: string = `div:nth-child(5) .selectContainer__menu div 
${BasePage.PATH}`;
  /** Класс, который сокращает текст троеточием */
  private readonly TEXT_WITH_ELLIPSES: string = ".valueContainer__value";

  constructor(page: Page) {
    super(page);
  }

  /** Проверить сокращённый троеточием текст.
   *
   * @param text Текст, который должен быть сокращён троеточием.
   */
  async checkTextWithEllipses(text: string): Promise<void> {
    await allure.step(`Проверить сокращённый троеточием текст '${text}'.`, async () => {
      await expect(
        this.page.locator(this.TEXT_WITH_ELLIPSES).getByText(text),
        `Текст ('${text}') не найден или не сокращён троеточием`,
      ).toBeVisible();
    });
  }

  /** Проверить checkbox с именем ответственного за реализацию. */
  async checkCheckboxResponsibleForImplementation(): Promise<void> {
    await allure.step(`Проверить checkbox с именем ответственного за реализацию.`, async () => {
      await expect(
        this.page.locator(this.CHECKBOX_RESPONSIBLE_FOR_IMPLEMENTATION),
        "Checkbox с именем ответственного за реализацию не отмечен",
      ).toHaveCSS(CssKeysAndValues.DISPLAY, CssKeysAndValues.INLINE);
    });
  }

  /** Проверить checkbox 'Не указан'. */
  async checkCheckboxNotSpecified(): Promise<void> {
    await allure.step(`Проверить checkbox 'Не указан'.`, async () => {
      await expect(this.page.locator(this.CHECKBOX_NOT_SPECIFIED), "Checkbox 'Не указан' не отмечен").toHaveCSS(
        CssKeysAndValues.DISPLAY,
        CssKeysAndValues.INLINE,
      );
    });
  }

  /** Проверить сортировку на вкладке 'Все продукты'.
   *
   * @param list_products Эталонный список продуктов.
   */
  async checkSortingOnAllProductsTab(list_products: string[]): Promise<void> {
    await allure.step(`Проверить сортировку на вкладке 'Все продукты'.`, async () => {
      for (let i: number = 0; i < list_products.length; i++) {
        await expect(this.locatorLink.nth(i + 6), "Неверная сортировка на вкладке 'Все продукты'").toHaveText(
          list_products[i],
          { timeout: Settings.DEFAULT_TIMEOUT },
        );
      }
    });
  }

  /** Проверить сортировку на вкладке 'Избранное'.
   *
   * @param list_favorites Эталонный список избранного.
   */
  async checkSortingOnFavoritesTab(list_favorites: string[]): Promise<void> {
    await allure.step(`Проверить сортировку на вкладке 'Избранное'.`, async () => {
      for (let i: number = 0; i < list_favorites.length; i++) {
        await expect(this.locatorLink.nth(i + 6), "Неверная сортировка на вкладке 'Избранное'").toHaveText(
          list_favorites[i],
          { timeout: Settings.DEFAULT_TIMEOUT },
        );
      }
    });
  }
}
