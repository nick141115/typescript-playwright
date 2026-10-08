import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { UITextElements } from "../constants/ui-text-elements";
import { Settings } from "../../settings";
import { CssKeysAndValues } from "../constants/css-keys-and-values";
import * as allure from "allure-js-commons";

/** Описывает страницу информации о сборке продукта. */
export class ProductAssemblyInformationPage extends BasePage {
  // Селекторы и текстовые константы, необходимые для работы класса ProductAssemblyInformationPage.
  /** Иконка в виде галочки. */
  private readonly VERIFIED_ICON = ".verifiedIcon";
  /** Подсказка 'Верифицированная версия', отображающаяся при наведении курсора. */
  private readonly VERIFIED_VERSION = `//span[text()='${UITextElements.VERIFIED_VERSION}']`;
  /** Иконка ссылок. */
  private readonly LINK_ICON = "[aria-label='В пакет добавлены все ссылки']";
  /** Checkbox 'Отклонение согласовано'. */
  private readonly CHECKBOX_DEVIATION_IS_AGREED = `div:nth-child(2) > 
.selectContainer__menu div:nth-child(1) ${BasePage.PATH}`;

  // Локаторы, необходимые для работы класса ProductAssemblyInformationPage.
  public readonly locatorLinkIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.locatorLinkIcon = page.locator(this.LINK_ICON).first();
  }

  /** Навести курсор на галочку.
   *
   * @param nth Порядковый номер элемента.
   * @param visible Элемент должен быть видимым или нет (если 'False', то элемент должен отсутствовать на странице).
   */
  async hoverCursorOverCheckMark(nth: number = 0, visible: boolean = true): Promise<void> {
    await allure.step(`Навести курсор на галочку.`, async () => {
      await this.page.waitForTimeout(5000);

      const locatorVerifiedIcon: Locator = this.page.locator(this.VERIFIED_ICON).nth(nth);

      if (visible) {
        await expect(locatorVerifiedIcon, "Иконка в виде галочки не отображается").toBeVisible();
        await locatorVerifiedIcon.hover();
        await expect(
          locatorVerifiedIcon.locator(this.VERIFIED_VERSION),
          "Подсказка 'Верифицированная версия', отображающаяся при наведении курсора, не отображается",
        ).toBeVisible();
      } else {
        await expect(locatorVerifiedIcon, "Иконка в виде галочки не должна отображаться").not.toBeVisible({
          timeout: Settings.DEFAULT_TIMEOUT,
        });
      }
    });
  }

  /** Проверить видимость первой иконки ссылок.
   *
   * @param visible Элемент должен быть видимым или нет (если 'False', то элемент должен отсутствовать на странице).
   */
  async checkVisibilityFirstLinkIcon(visible: boolean = true): Promise<void> {
    await allure.step(`Проверить видимость первой иконки ссылок.`, async () => {
      await this.page.waitForTimeout(1_500);

      if (visible) {
        await expect(this.locatorLink, "Иконка ссылок не отображается").toBeVisible();
      } else {
        await expect(this.locatorLink, "Иконка ссылок не должна отображаться").not.toBeVisible();
      }
    });
  }

  /** Навести курсор на первую иконку ссылок. */
  async hoverCursorOverFirstLinkIcon(): Promise<void> {
    await allure.step(`Навести курсор на первую иконку ссылок.`, async () => {
      await this.checkVisibilityFirstLinkIcon();
      await this.locatorLink.hover();
    });
  }

  /** Проверить checkbox 'Отклонение согласовано'. */
  async checkCheckboxDeviationIsAgreed(): Promise<void> {
    await allure.step(`Проверить checkbox 'Отклонение согласовано'.`, async () => {
      await expect(
        this.page.locator(this.CHECKBOX_DEVIATION_IS_AGREED),
        "Checkbox 'Отклонение согласовано' не отмечен",
      ).toHaveCSS(CssKeysAndValues.DISPLAY, CssKeysAndValues.INLINE);
    });
  }

  /** Проверить сортировку в паспорте сборки продукта.
   *
   * @param listComponents Эталонный список компонентов.
   */
  async checkSortingInAssemblyPassport(listComponents: string[]): Promise<void> {
    await allure.step(`Проверить сортировку в паспорте сборки продукта.`, async () => {
      for (let i: number = 0; i < listComponents.length; i += 2) {
        const product: string = listComponents[i];
        await expect(this.locatorLink.nth(i * 2 + 9), `Неверная сортировка в паспорте сборки продукта`).toHaveText(
          product,
          { timeout: Settings.DEFAULT_TIMEOUT },
        );
      }
    });
  }
}
