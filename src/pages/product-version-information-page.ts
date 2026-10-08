import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { UITextElements } from "../constants/ui-text-elements";
import { CssKeysAndValues } from "../constants/css-keys-and-values";
import { Settings } from "../../settings";
import { Colors } from "../constants/colors";
import * as allure from "allure-js-commons";

/** Описывает страницу информации о версии продукта. */
export class ProductVersionInformationPage extends BasePage {
  // Селекторы и текстовые константы
  /** Зелёный индикатор функции безопасности */
  private readonly GREEN_INDICATOR_SECURITY_FUNCTION: string = ".dropdown__popover [data-status='ok']";
  /** Красный индикатор функции безопасности */
  private readonly RED_INDICATOR_SECURITY_FUNCTION: string = ".dropdown__popover [data-status='error']";
  /** Жёлтый индикатор функции безопасности */
  private readonly YELLOW_INDICATOR_SECURITY_FUNCTION: string = ".dropdown__popover [data-status='warning']";
  /** Серый индикатор функции безопасности */
  private readonly GREY_INDICATOR_SECURITY_FUNCTION: string = ".dropdown__popover [data-status='none']";
  /** Красная подсветка поля 'Версия' */
  private readonly RED_BACKLIGHT_FIELD_VERSION: string = ".popover.fieldError.selectContainer";
  /** Красный шрифт текста ошибки */
  private readonly RED_FONT_ERROR: string = ".fieldErrorText";
  /** Checkbox 'Не указана' */
  private readonly CHECKBOX_NOT_SPECIFIED: string = `div:nth-child(3) .selectContainer__menu div:nth-child(1)
 ${BasePage.PATH}`;

  constructor(page: Page) {
    super(page);
  }

  /** Проверить видимость красной подсветки поля 'Версия'. */
  async checkVisibilityRedBacklightFieldVersion(): Promise<void> {
    await allure.step(`Проверить видимость красной подсветки поля 'Версия'.`, async () => {
      await expect(
        this.page.locator(this.RED_BACKLIGHT_FIELD_VERSION),
        "Красная подсветка поля 'Версия' не отображается",
      ).toBeVisible();
    });
  }

  /** Проверить видимость красного шрифта текста ошибки. */
  async checkVisibilityRedFontError(): Promise<void> {
    await allure.step(`Проверить видимость красного шрифта текста ошибки.`, async () => {
      await expect(this.page.locator(this.RED_FONT_ERROR), "Красный шрифт текста ошибки не отображается").toBeVisible();
    });
  }

  /** Проверить checkbox 'Не указана'. */
  async checkCheckboxNotSpecified(): Promise<void> {
    await allure.step(`Проверить checkbox 'Не указана'.`, async () => {
      await expect(
        this.page.locator(this.CHECKBOX_NOT_SPECIFIED),
        `${UITextElements.CHECKBOX}'${UITextElements.NOT_SPECIFIED}'${UITextElements.NOT_MARKED}`,
      ).toHaveCSS(CssKeysAndValues.DISPLAY, CssKeysAndValues.INLINE);
    });
  }

  /** Проверить сортировку в паспорте версии продукта, вкладка 'Сборки'.
   *
   * @param listAssemblies Эталонный список сборок.
   */
  async checkSortingOnAssembliesTab(listAssemblies: string[]): Promise<void> {
    await allure.step(`Проверить сортировку в паспорте версии продукта, вкладка 'Сборки'.`, async () => {
      for (let i: number = 0; i < listAssemblies.length; i++) {
        const locatorIndex: number = i + 9;

        await expect(
          this.locatorLink.nth(locatorIndex),
          "Неверная сортировка в паспорте версии продукта, вкладка 'Сборки'",
        ).toHaveText(listAssemblies[i], { timeout: Settings.DEFAULT_TIMEOUT });
      }
    });
  }

  /** Проверить сортировку в паспорте версии продукта, вкладка 'Компонентный состав'.
   *
   * @param listComponents Эталонный список компонентов.
   */
  async checkSortingInVersionPassportComponentCompositionTab(listComponents: string[]): Promise<void> {
    await allure.step(`Проверить сортировку в паспорте версии продукта, вкладка 'Компонентный состав'.`, async () => {
      for (let i: number = 0; i < listComponents.length; i += 2) {
        await expect(
          this.locatorLink.nth(i * 2 + 9),
          "Неверная сортировка в паспорте версии продукта, вкладка 'Компонентный состав'",
        ).toHaveText(listComponents[i], { timeout: Settings.DEFAULT_TIMEOUT });
      }
    });
  }

  /** Проверить индикатор в списке функции безопасности.
   *
   * @param color Цвет индикатора (возможные значения: green, red, yellow, grey).
   */
  async checkIndicationInListSecurityFunction(color: string): Promise<void> {
    await allure.step(`Проверить индикатор в списке функции безопасности.`, async () => {
      const validColors: string[] = [Colors.GREEN, Colors.RED, Colors.YELLOW, Colors.GREY];
      if (!validColors.includes(color as any)) {
        throw new Error(`Недопустимое значение ('${color}'). Выберите из: ${validColors}`);
      }

      switch (color) {
        case Colors.GREEN:
          await expect(
            this.page.locator(this.GREEN_INDICATOR_SECURITY_FUNCTION),
            `Зеленый индикатор в списке функции безопасности не отображается или не содержит ожидаемый 
текст ('${UITextElements.YES}')`,
          ).toHaveText(UITextElements.YES, { timeout: Settings.DEFAULT_TIMEOUT });
          break;
        case Colors.RED:
          await expect(
            this.page.locator(this.RED_INDICATOR_SECURITY_FUNCTION),
            `Красный индикатор в списке функции безопасности не отображается или не содержит ожидаемый 
текст ('${UITextElements.NO}')`,
          ).toHaveText(UITextElements.NO, { timeout: Settings.DEFAULT_TIMEOUT });
          break;
        case Colors.YELLOW:
          await expect(
            this.page.locator(this.YELLOW_INDICATOR_SECURITY_FUNCTION),
            `Жёлтый индикатор в списке функции безопасности не отображается или не содержит ожидаемый 
текст ('${UITextElements.INDIRECTLY}')`,
          ).toHaveText(UITextElements.INDIRECTLY, { timeout: Settings.DEFAULT_TIMEOUT });
          break;
        case Colors.GREY:
          await expect(
            this.page.locator(this.GREY_INDICATOR_SECURITY_FUNCTION),
            `Серый индикатор в списке функции безопасности не отображается или не содержит ожидаемый 
текст ('${UITextElements.NOT_SPECIFIED}')`,
          ).toHaveText(UITextElements.NOT_SPECIFIED, { timeout: Settings.DEFAULT_TIMEOUT });
          break;
      }
    });
  }
}
