import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import * as allure from "allure-js-commons";

/** Описывает страницу о сборке по конфигурации (компонент). */
export class ComponentAssemblyByConfigurationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Проверить серый индикатор в первой строке в таблице на вкладке 'Компоненты-потребители'. */
  async checkGreyIndicatorInTableConsumerComponentsAssemblyPage(): Promise<void> {
    await allure.step(
      `Проверить серый индикатор в первой строке в таблице на вкладке 'Компоненты-потребители'.`,
      async () => {
        const fifthColumn: number = 4;

        await expect(
          this.locatorTableFirstRowAndColumn.nth(fifthColumn).locator(this.GREY_INDICATOR),
          "Серый индикатор в столбце номер 5 не отображается",
        ).toBeVisible();
      },
    );
  }
}
