import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { Roles } from "../constants/roles";
import { Settings } from "../../settings";
import * as allure from "allure-js-commons";

/** Описывает страницу имперсонации. */
export class ImpersonationPage extends BasePage {
  // Селекторы и текстовые константы, необходимые для работы класса ImpersonationPage.
  /** Input 'Учетная запись для имперсонализации'. */
  private readonly accountInputSelector: string = ".form-control.ui-autocomplete-input";
  /** Кнопка 'ОК'. */
  private readonly okButtonName: string = "ОК";
  /** Выпадающая строка с нужным сотрудником под имперсонацию. */
  private readonly searchResultsSelector: string = ".ui-menu-item-wrapper";

  /** Имперсонироваться за другого пользователя.
   *
   * @param fullName Полные ФИО сотрудника.
   */
  async impersonateAsAnotherUser(fullName: string): Promise<void> {
    await allure.step(`Имперсонироваться за другого пользователя (${fullName}).`, async () => {
      const accountInput: Locator = this.page.locator(this.accountInputSelector);
      const searchResults: Locator = this.page.locator(this.searchResultsSelector);
      const okButton: Locator = this.page.getByRole(Roles.BUTTON, { name: this.okButtonName });

      // 1. Проверка и заполнение поля "Учетная запись"
      await expect(accountInput, "Input 'Учетная запись для имперсонализации' не отображается").toBeVisible();
      await expect(accountInput, "Input 'Учетная запись для имперсонализации' недоступен").toBeEnabled();
      await accountInput.fill(fullName);

      // 2. Выбор сотрудника из выпадающего списка
      await expect(searchResults, "Выпадающий блок с ФИО не отображается").toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(searchResults, "Выпадающий блок с ФИО недоступен").toBeEnabled();
      await searchResults.click();

      // 3. Клик по кнопке ОК
      await expect(okButton, "Кнопка 'ОК' не отображается").toBeVisible();
      await expect(okButton, "Кнопка 'ОК' недоступна").toBeEnabled();
      await okButton.click();
    });
  }
}
