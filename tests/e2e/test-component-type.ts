import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import { Usernames } from "../../src/constants/usernames";
import * as allure from "allure-js-commons";

/** Тип компонента. */
export class TestComponentType extends BaseTest {
  /** Возвращение типа компонента к первоначальному после автотеста.
   *
   * @param component Название компонента.
   * @param value Тип компонента.
   */
  private async setComponentType(component: string, value: string): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(component);

    await this.componentInformationPage.clickOnFirstComboBox();
    await this.componentInformationPage.clickOnElementWithText(value);
    await this.componentInformationPage.refreshPage();
    await this.componentInformationPage.checkFirstComboBox(value);
  }

  /** Установить тип компонента. */
  async testSetComponentType(): Promise<void> {
    await allure.description(`Баг: при выборе значения в combobox'е иногда значение не сохраняется.`);

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов компонентов авторизован в сервисе,
      // открыта страница "Компоненты"
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

      // 2. В списке выбрать компонент, у которого не задан тип → проверить информацию в поле "Тип компонента"
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.checkFirstComboBox(UITextElements.ABSENT);

      // 3. Кликнуть в поле "Тип"
      const elements: string[] = [UITextElements.ABSENT, UITextElements.INTERNAL, UITextElements.EXTERNAL];

      await this.componentInformationPage.clickOnFirstComboBox();
      await this.componentInformationPage.checkElementsInComboBoxComponentType(elements);

      // 4. Выбрать один из вариантов, за исключением "Не указан"
      await this.componentInformationPage.clickOnElementWithText(UITextElements.EXTERNAL);
      await this.componentInformationPage.refreshPage();
      await this.componentInformationPage.checkFirstComboBox(UITextElements.EXTERNAL);

      // 5. В списке компонентов выбрать любой другой компонент → далее вернуться к компоненту из ш. 2
      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACETAO);

      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.checkFirstComboBox(UITextElements.EXTERNAL);

      // 6. Войти в сервис под пользователем с правами на чтение по компоненту из ш. 2 → проверить отображение
      // типа компонента
      await this.impersonateAsUserWithReadOrWritePermissions(false);

      await this.componentPage.clickOnTitle();
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.checkComponentTypeText(UITextElements.EXTERNAL);
    } finally {
      // Возвращение типа компонента к первоначальному после автотеста.
      await this.setComponentType(Components.ACCORDSDK, UITextElements.ABSENT);
    }
  }

  /** Удалить тип компонента. */
  async testDeleteComponentType(): Promise<void> {
    await allure.description(`Баг: при выборе значения в combobox'е иногда значение не сохраняется.`);

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов компонентов авторизован в сервисе,
      // открыта страница "Компоненты"
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

      // 2. В списке компонентов выбрать компонент с заданным типом
      await this.componentPage.fillInSearchInput(Components.ADDRESSBOOK);
      await this.componentPage.clickOnLink(Components.ADDRESSBOOK);

      await this.componentInformationPage.checkFirstComboBox(UITextElements.INTERNAL);

      // 3. В поле "Тип" выбрать значение "Не указан"
      await this.componentInformationPage.clickOnFirstComboBox();
      await this.componentInformationPage.clickOnElementWithText(UITextElements.ABSENT);
      await this.componentInformationPage.refreshPage();
      await this.componentInformationPage.checkFirstComboBox(UITextElements.ABSENT);

      // Пользователь с правами на чтение
      await this.impersonateAsUserWithReadOrWritePermissions(false);

      await this.componentPage.clickOnTitle();
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.fillInSearchInput(Components.ADDRESSBOOK);
      await this.componentPage.clickOnLink(Components.ADDRESSBOOK);

      await this.componentInformationPage.checkComponentTypeText(UITextElements.DASH);
    } finally {
      // Возвращение типа компонента к первоначальному после автотеста.
      await this.setComponentType(Components.ADDRESSBOOK, UITextElements.INTERNAL);
    }
  }

  /** Изменить тип компонента. */
  async testChangeComponentType(): Promise<void> {
    await allure.description(`Баг: при выборе значения в combobox'е иногда значение не сохраняется.`);

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов компонентов авторизован в сервисе,
      // открыта страница "Компоненты"
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

      // 2. В списке компонентов выбрать компонент с заданным типом
      await this.componentPage.fillInSearchInput(Components.ADDRESSBOOK);
      await this.componentPage.clickOnLink(Components.ADDRESSBOOK);

      await this.componentInformationPage.checkFirstComboBox(UITextElements.INTERNAL);

      // 3. Изменить тип компонента (в выпадающем списке выбрать другое значение)
      await this.componentInformationPage.clickOnFirstComboBox();
      await this.componentInformationPage.clickOnElementWithText(UITextElements.EXTERNAL);
      await this.componentInformationPage.refreshPage();
      await this.componentInformationPage.checkFirstComboBox(UITextElements.EXTERNAL);

      // 4. В списке компонентов выбрать любой другой компонент → далее вернуться к компоненту из ш. 2
      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACETAO);

      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ADDRESSBOOK);

      await this.componentInformationPage.checkFirstComboBox(UITextElements.EXTERNAL);

      // 5. Войти в сервис под пользователем с правами на чтение по компоненту из ш. 2 → проверить отображение
      // типа компонента
      await this.impersonateAsUserWithReadOrWritePermissions(false);

      await this.componentPage.clickOnTitle();
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ADDRESSBOOK);

      await this.componentInformationPage.checkComponentTypeText(UITextElements.EXTERNAL);
    } finally {
      // Возвращение типа компонента к первоначальному после автотеста.
      await this.setComponentType(Components.ADDRESSBOOK, UITextElements.INTERNAL);
    }
  }

  /** Тип компонента, значение по умолчанию. */
  public async testComponentTypeDefaultValue(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница "Компоненты"
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. В списке выбрать любой компонент, проверить информацию в поле "Тип компонента"
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.checkFirstComboBox(UITextElements.ABSENT);
    await this.componentInformationPage.clickOnUserMenuIcon();
    await this.componentInformationPage.logout();

    await this.loginPage.checkUsernameInput();
    await this.loginPage.loginAsSettingsUser();

    await this.componentPage.clickOnUserMenuIcon();
    await this.componentPage.clickOnImpersonationButton();

    await this.impersonationPage.impersonateAsAnotherUser(Usernames.USER_WITH_READ_PERMISSIONS);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.checkComponentTypeText(UITextElements.DASH);
  }
}
