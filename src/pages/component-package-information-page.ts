import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { UITextElements } from "../constants/ui-text-elements";
import { Settings } from "../../settings";
import * as allure from "allure-js-commons";

/** Описывает страницу информации о пакете компонента. */
export class ComponentPackageInformationPage extends BasePage {
  // Селекторы и текстовые константы, необходимые для работы класса ComponentPackageInformationPage.
  private static readonly TEXT_NO_LINK_TO_SOURCE_CODE: string =
    "Редактирование списка доступно при наличии ссылки на исходный код";
  /** Элемент, который включает в себя input (для ввода названия ЯП) и блоки с названиями ЯП. */
  private static readonly CHIPS_INPUT: string = ".chipsInput.remoteMultiselect";
  /** Второй столбец в строке 'Язык программирования'. */
  private static readonly DD_PROGRAMMING_LANGUAGE: string = `//dt[text()='${UITextElements.TEXT_PROGRAMMING_LANGUAGE}']
/following-sibling::dd[1]`;
  /** Класс, который делает все элементы внутри себя недоступными. */
  private static readonly CONTAINER_DISABLED: string = ".selectContainer__controlContainer_disabled";
  /** Input с placeholder'ом 'Редактирование списка доступно при наличии ссылки на исходный код'. */
  private static readonly INPUT_NO_LINK_TO_SOURCE_CODE: string = `//div[text()=
'${ComponentPackageInformationPage.TEXT_NO_LINK_TO_SOURCE_CODE}']/following-sibling::input[1]`;
  /** Input 'Язык программирования'. */
  private static readonly PROGRAMMING_LANGUAGE_INPUT: string = ".selectContainer__placeholder";
  /** Иконка в виде плюса в кружочке. */
  private static readonly ICON_PLUS_IN_CIRCLE: string = ".icon-example-app.icon-app-add.icon-component";
  /** Input для ввода url'а на внешний исходный код. */
  private static readonly INPUT_URL: string = "input[name='url']";
  /** Иконка меню. */
  private static readonly ICON_MENU: string = ".icon-example-app.icon-app-menu.icon-component";

  // Локаторы, необходимые для работы класса ComponentPackageInformationPage.
  private locatorInputUrl: Locator;

  constructor(page: Page) {
    super(page);
    this.locatorInputUrl = this.page.locator(ComponentPackageInformationPage.INPUT_URL);
  }

  /** Проверить Input с placeholder'ом 'Редактирование списка доступно при наличии ссылки на исходный код'. */
  async checkInputNoLinkToSourceCode(): Promise<void> {
    await allure.step(
      `Проверить Input с placeholder'ом 'Редактирование списка доступно при наличии ссылки на исходный код'.`,
      async () => {
        const locatorInputNoLinkToSourceCode: Locator = this.page
          .locator(ComponentPackageInformationPage.DD_PROGRAMMING_LANGUAGE)
          .locator(ComponentPackageInformationPage.CONTAINER_DISABLED)
          .locator(ComponentPackageInformationPage.INPUT_NO_LINK_TO_SOURCE_CODE);

        await expect(
          locatorInputNoLinkToSourceCode,
          `Input с placeholder'ом '${ComponentPackageInformationPage.TEXT_NO_LINK_TO_SOURCE_CODE}' не 
отображается или доступен для редактирования`,
        ).toBeVisible();
      },
    );
  }

  /** Проверить текст в блоке справа от текста 'Язык программирования'.
   *
   * @param textInChipsInput Текст в блоке справа от текста 'Язык программирования'.
   */
  async checkTextInChipsInput(textInChipsInput: string): Promise<void> {
    await allure.step(`Проверить текст в блоке справа от текста 'Язык программирования'.`, async (): Promise<void> => {
      const chipsLocatorInput: Locator = this.page
        .locator(ComponentPackageInformationPage.DD_PROGRAMMING_LANGUAGE)
        .locator(ComponentPackageInformationPage.CHIPS_INPUT);
      await expect(
        chipsLocatorInput,
        `Текст '${textInChipsInput}' в блоке справа от текста 'Язык программирования' не отображается`,
      ).toContainText(textInChipsInput, { timeout: Settings.DEFAULT_TIMEOUT });
    });
  }

  /** Проверить текст в блоке справа от текста 'Язык программирования'.
   *
   * @param titleText Текст атрибута title.
   * @param count Ожидаемое количество элементов.
   */
  async checkTitlesCount(titleText: string, count: number): Promise<void> {
    const locatorTitle: Locator = this.page
      .locator(ComponentPackageInformationPage.DD_PROGRAMMING_LANGUAGE)
      .locator(ComponentPackageInformationPage.CHIPS_INPUT)
      .getByTitle(titleText);
    await expect
      .soft(
        locatorTitle,
        `Элемент с titl'ом '${titleText}' не отображается на странице или количество таких элементов не
 соответствует ожидаемому (ожидаемое количество: ${count})`,
      )
      .toHaveCount(count, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Ввести текст в блок справа от текста 'Язык программирования'.
   *
   * @param text Текст, который будет введён в блок справа от текста 'Язык программирования'.
   */
  async fillInChipsInput(text: string): Promise<void> {
    const locatorInput: Locator = this.page
      .locator(ComponentPackageInformationPage.DD_PROGRAMMING_LANGUAGE)
      .locator(ComponentPackageInformationPage.CHIPS_INPUT)
      .locator("div")
      .first();
    await expect.soft(locatorInput, "Блок справа от текста 'Язык программирования' не отображается").toBeVisible();
    await expect.soft(locatorInput, "Блок справа от текста 'Язык программирования' недоступен").toBeEnabled();
    await locatorInput.click();
    await locatorInput.pressSequentially(text);
  }

  /** Удалить язык программирования из списка.
   *
   * @param nameProgrammingLanguage Название языка программирования.
   */
  async deleteProgrammingLanguage(nameProgrammingLanguage: string): Promise<void> {
    const locatorNameProgrammingLanguage: Locator = this.page
      .locator(BasePage.SPAN)
      .filter({ hasText: nameProgrammingLanguage })
      .locator("xpath=./following-sibling::button[1]");

    await expect(
      locatorNameProgrammingLanguage,
      `Кнопка удаления языка программирования '${nameProgrammingLanguage}' не отображается`,
    ).toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
    await expect(
      locatorNameProgrammingLanguage,
      `Кнопка удаления языка программирования '${nameProgrammingLanguage}' недоступна`,
    ).toBeEnabled();
    await locatorNameProgrammingLanguage.click();
    await expect(
      locatorNameProgrammingLanguage,
      `Кнопка удаления языка программирования '${nameProgrammingLanguage}' не должна отображаться`,
    ).not.toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Кликнуть на иконку в виде плюса в кружочке.
   *
   * @param nth Порядковый номер иконки.
   */
  async clickOnIconPlusInCircle(nth: number = 0): Promise<void> {
    const locatorPlusIconInCircle: Locator = this.page
      .locator(ComponentPackageInformationPage.ICON_PLUS_IN_CIRCLE)
      .nth(nth);

    await expect(
      locatorPlusIconInCircle,
      `Иконка в виде плюса в кружочке с порядковым номером '${nth}' не отображается`,
    ).toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
    await expect(
      locatorPlusIconInCircle,
      `Иконка в виде плюса в кружочке с порядковым номером '${nth}' недоступна`,
    ).toBeEnabled();
    await locatorPlusIconInCircle.click();
  }

  /** Ввести текст в input для ввода url'а на внешний/внутренний исходный код.
   *
   * @param text Текст, который будет введён в input для ввода url'а на внешний/внутренний исходный код.
   */
  async fillInInputUrl(text: string): Promise<void> {
    await expect(
      this.locatorInputUrl,
      "Input для ввода url'а на внешний/внутренний исходный код не отображается",
    ).toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
    await expect(
      this.locatorInputUrl,
      "Input для ввода url'а на внешний/внутренний исходный код недоступен",
    ).toBeEnabled();
    await this.locatorInputUrl.fill(text);
  }

  /** Кликнуть на иконку меню.
   *
   * @param nth Порядковый номер иконки.
   */
  async clickOnIconMenu(nth: number = 0): Promise<void> {
    const locatorIconMenu: Locator = this.page.locator(ComponentPackageInformationPage.ICON_MENU).nth(nth);

    await expect(locatorIconMenu, `Иконка меню с порядковым номером '${nth}' не отображается`).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorIconMenu, `Иконка меню с порядковым номером '${nth}' недоступна`).toBeEnabled();
    await locatorIconMenu.click();
  }

  /** Проверить кнопку 'Отмена'. */
  async checkButtonCancel(): Promise<void> {
    await expect
      .soft(this.page.getByTitle(UITextElements.CANCEL), "Кнопка 'Отмена' не отображается")
      .toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить текст в input'е для ввода url'а на внешний/внутренний исходный код.
   *
   * @param text Текст, который должен присутствовать в input'е для ввода url'а на внешний/внутренний исходный код.
   */
  async checkTextInInputUrl(text: string): Promise<void> {
    await expect(
      this.locatorInputUrl,
      `Input для ввода url'а на внешний/внутренний исходный код не содержит ожидаемый текст '${text}'`,
    ).toHaveValue(text);
  }
}
