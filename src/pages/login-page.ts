import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { Settings } from "../../settings";
import * as allure from "allure-js-commons";

/** Описывает страницу входа в систему. */
export class LoginPage extends BasePage {
  // Селекторы и текстовые константы, необходимые для работы класса LoginPage.
  /** Поле ввода логина пользователя. */
  private static readonly USERNAME_INPUT: string = "input[name='Username']";
  /** Поле ввода пароля пользователя. */
  private static readonly PASSWORD_INPUT: string = "input[name='Password']";
  /** Кнопка 'Ок'. */
  private static readonly SIGN_IN_BUTTON: string = "button[value='login']";

  // Локаторы, необходимые для работы класса LoginPage.
  private usernameInput: Locator;
  private passwordInput: Locator;
  private signInButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator(LoginPage.USERNAME_INPUT);
    this.passwordInput = page.locator(LoginPage.PASSWORD_INPUT);
    this.signInButton = page.locator(LoginPage.SIGN_IN_BUTTON);
  }

  /** Перейти на страницу авторизации. */
  async goToLoginPage(): Promise<void> {
    await allure.step(`Перейти на страницу авторизации.`, async () => {
      await this.page.goto(Settings.URL);
    });
  }

  /** Залогиниться под пользователем, который прописан в файле 'settings.ts'. */
  async loginAsSettingsUser(): Promise<void> {
    await allure.step(`Залогиниться под пользователем, который прописан в файле 'settings.ts'.`, async () => {
      await expect(this.usernameInput, "Поле ввода логина недоступно").toBeEnabled();
      await this.usernameInput.fill(Settings.LOGIN);

      await expect(this.passwordInput, "Поле ввода пароля не отображается").toBeVisible();
      await expect(this.passwordInput, "Поле ввода пароля недоступно").toBeEnabled();
      await this.passwordInput.fill(Settings.PASSWORD);

      await expect(this.signInButton, 'Кнопка "Ок" не отображается').toBeVisible();
      await expect(this.signInButton, 'Кнопка "Ок" недоступна').toBeEnabled();
      await this.signInButton.click();
    });
  }

  /** Проверить видимость поля ввода логина. */
  async checkUsernameInput(): Promise<void> {
    await allure.step(`Проверить видимость поля ввода логина.`, async () => {
      await expect(this.usernameInput, "Поле ввода логина не отображается").toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    });
  }
}
