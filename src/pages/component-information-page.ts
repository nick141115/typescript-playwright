import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { UITextElements } from "../constants/ui-text-elements";
import { Settings } from "../../settings";

/** Описывает страницу информации о компоненте. */
export class ComponentInformationPage extends BasePage {
  // Селекторы и текстовые константы, необходимые для работы класса ComponentInformationPage.
  /** Знак вопроса. */
  private readonly QUESTION_MARK: string = ".icon-app-help";
  /** Ссылки в списке продуктов и в списке компонентов. */
  private readonly LIST_LINKS_IN_PRODUCTS_AND_COMPONENTS: string = `tbody > ${BasePage.TR} a`;
  /** CSS-селектор для ссылок на документацию и artifactory. */
  private readonly LINKS: string = ".componentCommonInfo__terminList > dd";
  /** Текст типа компонента. */
  private readonly TEXT_COMPONENT_TYPE: string = `//dt[text()='${UITextElements.TYPE}']/following-sibling::dd[1]`;
  /** Ответственный за реализацию компонента. */
  private readonly RESPONSIBLE_FOR_IMPLEMENTATION_OF_COMPONENT: string = `//dt[text()=
'${UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION}']/following-sibling::dd[1]`;
  /** Владелец компонента. */
  private readonly COMPONENT_OWNER: string = `//dt[text()='${UITextElements.OWNER}']/following-sibling::dd[1]`;
  /** Технический эксперт компонента. */
  private readonly TECHNICAL_EXPERT_OF_COMPONENT: string = `//dt[text()='${UITextElements.TECHNICAL_EXPERT}']
/following-sibling::dd[1]`;
  /** Элемент в выпадающем списке типа компонента. */
  private readonly ELEMENT_IN_COMBO_BOX_COMPONENT_TYPE: string = ".option";

  constructor(page: Page) {
    super(page);
  }

  /** Навести курсор на знак вопроса. */
  async hoverCursorOverQuestionMark(): Promise<void> {
    const locatorQuestionMark: Locator = this.page.locator(this.QUESTION_MARK);

    await expect.soft(locatorQuestionMark, "Знак вопроса не отображается").toBeVisible();
    await locatorQuestionMark.hover();
  }

  /** Проверить сортировку ссылок в алфавитном порядке в списке продуктов.
   *
   * @param listProducts Список продуктов.
   */
  async checkLinksInProductsList(listProducts: string[]): Promise<void> {
    const locatorLinksInProductList: Locator = this.page.locator(this.LIST_LINKS_IN_PRODUCTS_AND_COMPONENTS);

    for (let i: number = 0; i < listProducts.length; i++) {
      await expect
        .soft(
          locatorLinksInProductList.nth(i),
          `Ссылка номер ${i + 1} не содержит ожидаемый текст '${listProducts[i]}'`,
        )
        .toHaveText(listProducts[i], { timeout: Settings.DEFAULT_TIMEOUT });
    }
  }

  /** Проверить сортировку ссылок в алфавитном порядке в списке компонентов.
   *
   * @param listComponents Список компонентов.
   */
  async checkLinksInComponentsList(listComponents: string[]): Promise<void> {
    const locatorLinksInComponentsList: Locator = this.page.locator(this.LIST_LINKS_IN_PRODUCTS_AND_COMPONENTS);

    for (let i: number = 0; i < listComponents.length; i++) {
      await expect(
        locatorLinksInComponentsList.nth(i),
        `Ссылка номер ${i + 1} не содержит ожидаемый текст '${listComponents[i]}'`,
      ).toHaveText(listComponents[i]);
    }
  }

  /** Проверить серый индикатор в таблице на вкладке 'Общая информация' (Компонент). */
  async checkGreyIndicatorInTableGeneralInformationComponent(): Promise<void> {
    await expect(
      this.page.locator(BasePage.SECOND_COLUMN_OF_TABLE).nth(1).locator(this.GREY_INDICATOR),
      "Серый индикатор не отображается",
    ).toBeVisible();
  }

  /** Проверить таблицу на вкладке 'Версии'.
   *
   * @param listVersions Список версий.
   */
  async checkTableVersions(listVersions: string[]): Promise<void> {
    const notSupported: string = "Не поддерживается";

    // Проверка первого столбца с версиями
    for (let i: number = 0; i < listVersions.length; i++) {
      await expect(
        this.locatorTableRow.nth(i).locator(BasePage.TABLE_COLUMN).first(),
        `Версия в строке номер ${i + 1} не отображается или значение не соответствует ожидаемому 
'${listVersions[i]}'`,
      ).toHaveText(listVersions[i]);
    }

    const thirdColumn: number = 2;
    const fifthLine: number = 4;

    // Проверка столбца со статусом разработки (проверка в цикле первых четырёх строк)
    for (let i: number = 0; i < 4; i++) {
      await expect(
        this.locatorTableRow.nth(i).locator(BasePage.TABLE_COLUMN).nth(thirdColumn),
        `Статус разработки в строке номер ${i + 1} не отображается или значение не соответствует 
ожидаемому '${UITextElements.ABSENT}'`,
      ).toHaveText(UITextElements.ABSENT);
    }

    await expect(
      this.locatorTableRow.nth(fifthLine).locator(BasePage.TABLE_COLUMN).nth(thirdColumn),
      `Статус разработки в строке номер 5 не отображается или значение не соответствует ожидаемому '${notSupported}'`,
    ).toHaveText(notSupported);
  }

  /** Проверить текст типа компонента.
   *
   * @param typeText Ожидаемый текст типа компонента.
   */
  async checkComponentTypeText(typeText: string): Promise<void> {
    const locatorComponentTypeText: Locator = this.page.locator(this.TEXT_COMPONENT_TYPE);

    await expect(
      locatorComponentTypeText,
      "Элемент с текстом типа компонента не отображается на странице.",
    ).toBeVisible();

    await expect(
      locatorComponentTypeText,
      `Элемент с текстом типа компонента не содержит ожидаемый текст '${typeText}'.`,
    ).toContainText(typeText, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить ответственного за реализацию компонента.
   *
   * @param fullName ФИО ответственного за реализацию компонента.
   */
  async checkResponsibleForImplementationOfComponent(fullName: string): Promise<void> {
    const locator: Locator = this.page.locator(this.RESPONSIBLE_FOR_IMPLEMENTATION_OF_COMPONENT);

    await expect(
      locator,
      "Элемент с ФИО ответственного за реализацию компонента не отображается на странице.",
    ).toBeVisible();

    await expect(
      locator,
      `Элемент с ФИО ответственного за реализацию компонента не содержит ожидаемый текст '${fullName}'.`,
    ).toContainText(fullName, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить владельца компонента.
   *
   * @param fullName ФИО владельца компонента.
   */
  async checkComponentOwner(fullName: string): Promise<void> {
    const locator: Locator = this.page.locator(this.COMPONENT_OWNER);

    await expect(locator, "Элемент с ФИО владельца компонента не отображается на странице.").toBeVisible();

    await expect(
      locator,
      `Элемент с ФИО владельца компонента не содержит ожидаемый текст '${fullName}'.`,
    ).toContainText(fullName, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить технического эксперта компонента.
   *
   * @param fullName ФИО технического эксперта компонента.
   */
  async checkTechnicalExpertOfComponent(fullName: string): Promise<void> {
    const locator: Locator = this.page.locator(this.TECHNICAL_EXPERT_OF_COMPONENT);

    await expect(locator, "Элемент с ФИО технического эксперта компонента не отображается на странице.").toBeVisible();

    await expect(
      locator,
      `Элемент с ФИО технического эксперта компонента не содержит ожидаемый текст '${fullName}'.`,
    ).toContainText(fullName, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить элементы в выпадающем списке типа компонента.
   *
   * @param elements Список элементов.
   */
  async checkElementsInComboBoxComponentType(elements: string[]): Promise<void> {
    const locatorElementInComboBox: Locator = this.page.locator(this.ELEMENT_IN_COMBO_BOX_COMPONENT_TYPE);

    for (let i: number = 0; i < elements.length; i++) {
      await expect(
        locatorElementInComboBox.nth(i),
        `Элемент с текстом '${elements[i]}' не содержится в combobox'е.`,
      ).toContainText(elements[i]);
    }
  }
}
