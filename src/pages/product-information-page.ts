import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { Settings } from "../../settings";
import * as allure from "allure-js-commons";

/** Описывает страницу информации о продукте. */
export class ProductInformationPage extends BasePage {
  // Селекторы и текстовые константы, необходимые для работы класса ProductInformationPage.
  /** Textarea 'Обоснование/Комментарий'. */
  private readonly TEXTAREA_JUSTIFICATION_COMMENT: string = "textarea";
  /** Красная подсветка для textarea 'Обоснование/Комментарий'. */
  private readonly RED_BACKLIGHT_FOR_TEXTAREA: string = "div[data-status='error']";
  /** Кнопка отмены редактирования. */
  private readonly CANCEL_EDITING_BUTTON: string = ".icon-example-app.icon-app-cancel.icon-component";
  /** Checkbox 'Согласование'. */
  private readonly CHECKBOX_AGREEMENT: string = ".checkboxMark";

  // Локаторы, необходимые для работы класса ProductInformationPage.
  public readonly locator_first_textarea: Locator;

  constructor(page: Page) {
    super(page);
    this.locator_first_textarea = this.page.locator(this.TEXTAREA_JUSTIFICATION_COMMENT).first();
  }

  /** Проверить видимость первой textarea 'Обоснование/Комментарий'. */
  async checkVisibilityTextareaJustificationComment(): Promise<void> {
    await allure.step(`Проверить видимость первой textarea 'Обоснование/Комментарий'.`, async () => {
      await expect(this.locator_first_textarea, "Textarea 'Обоснование/Комментарий' не отображается").toBeVisible();
    });
  }

  /** Ввести в первую textarea 'Обоснование/Комментарий' текст.
   *
   * @param text Текст вводимый в textarea.
   */
  async fillInTextareaJustificationComment(text: string): Promise<void> {
    await allure.step(`Ввести в первую textarea 'Обоснование/Комментарий' текст '${text}'.`, async () => {
      await this.checkVisibilityTextareaJustificationComment();
      await expect(this.locator_first_textarea, "Textarea 'Обоснование/Комментарий' недоступна").toBeEnabled();
      await this.locator_first_textarea.fill(text);
    });
  }

  /** Проверить в первой textarea 'Обоснование/Комментарий' текст.
   *
   * @param text Текст, который должен присутствовать в textarea.
   */
  async checkTextInTextareaJustificationComment(text: string): Promise<void> {
    await allure.step(`Проверить в первой textarea 'Обоснование/Комментарий' текст '${text}'.`, async () => {
      await expect(
        this.locator_first_textarea,
        `Textarea 'Обоснование/Комментарий' не содержит ожидаемый текст '${text}'`,
      ).toHaveText(text);
    });
  }

  /** Проверить красную подсветку для первой textarea 'Обоснование/Комментарий'. */
  async checkRedBacklightForTextarea(): Promise<void> {
    await allure.step(`Проверить красную подсветку для первой textarea 'Обоснование/Комментарий'.`, async () => {
      await expect(
        this.page.locator(this.RED_BACKLIGHT_FOR_TEXTAREA),
        "Красная подсветка для textarea 'Обоснование/Комментарий' не отображается",
      ).toBeVisible();
    });
  }

  /** Проверить вертикальный скролл и отображение первых 3 строк в первой textarea. */
  async checkAttributesInTextareaJustificationComment(): Promise<void> {
    await allure.step(`Проверить вертикальный скролл и отображение первых 3 строк в первой textarea.`, async () => {
      await expect(
        this.locator_first_textarea,
        "Textarea 'Обоснование/Комментарий' не отображает ожидаемое количество строк (три строки)",
      ).toHaveAttribute("rows", "3");

      await expect(
        this.locator_first_textarea.locator(".."),
        "Textarea 'Обоснование/Комментарий' не отображает ожидаемый вертикальный скролл (с классом 'scrollThin')",
      ).toHaveClass(/.*scrollThin/);
    });
  }

  /** Проверить видимость кнопки отмены редактирования. */
  async checkVisibilityCancelEditingButton(): Promise<void> {
    await allure.step(`Проверить видимость кнопки отмены редактирования.`, async () => {
      await expect(
        this.page.locator(this.CANCEL_EDITING_BUTTON),
        "Кнопка отмены редактирования не отображается",
      ).toBeVisible();
    });
  }

  /** Проверить сортировку в паспорте продукта, вкладка 'Компонентный состав'.
   *
   * @param listComponents Эталонный список компонентов.
   */
  async checkSortingInProductPassportComponentCompositionTab(listComponents: string[]): Promise<void> {
    await allure.step(`Проверить сортировку в паспорте продукта, вкладка 'Компонентный состав'.`, async () => {
      let index: number;
      for (let i: number = 0; i < listComponents.length; i++) {
        index = i + 10;
        await expect(
          this.locatorLink.nth(index),
          "Неверная сортировка в паспорте продукта, вкладка 'Компонентный состав'",
        ).toHaveText(listComponents[i], { timeout: Settings.DEFAULT_TIMEOUT });
      }
    });
  }

  /** Проверить checkbox 'Согласование' и кликнуть на него, если он не отмечен.
   *
   * @param marked Checkbox должен быть отмечен или нет (если 'False', то checkbox должен быть не отмечен).
   */
  async checkCheckboxAgreementAndClick(marked: boolean = true): Promise<void> {
    await allure.step(`Проверить checkbox 'Согласование' и кликнуть на него, если он не отмечен.`, async () => {
      // Ожидание в одну секунду
      await this.page.waitForTimeout(1_000);

      const locatorCheckboxAgreement: Locator = this.page.locator(this.CHECKBOX_AGREEMENT);
      const locatorCheckboxMarkChecked: Locator = this.page.locator(BasePage.CHECKBOX);

      await expect(locatorCheckboxAgreement, "Checkbox 'Согласование' не отображается").toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(locatorCheckboxAgreement, "Checkbox 'Согласование' недоступен").toBeEnabled();

      if (marked) {
        if (!(await locatorCheckboxMarkChecked.isVisible())) {
          await locatorCheckboxAgreement.click();
        }
      } else {
        if (await locatorCheckboxMarkChecked.isVisible()) {
          await locatorCheckboxAgreement.click();
        }
      }
    });
  }
}
