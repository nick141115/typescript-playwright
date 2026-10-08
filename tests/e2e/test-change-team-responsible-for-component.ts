import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import { Usernames } from "../../src/constants/usernames";
import { TestInputs } from "../../src/constants/test-inputs";
import * as allure from "allure-js-commons";

/** Изменить команду, ответственную за компонент. */
export class TestChangeTeamResponsibleForComponent extends BaseTest {
  /** Удаление ответственного за реализацию (компонент accordsdk). */
  private async cleanupRemoveImplementationManager(): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnAllCrossIcons();
    await this.componentInformationPage.refreshPage();
    await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(UITextElements.ABSENT);
  }

  /** Возвращение команды, ответственной за компонент, к первоначальной после автотеста.
   *
   * @param component Название компонента для восстановления.
   * @param fullName Имя пользователя для восстановления.
   */
  private async cleanupSetTeamResponsibleForComponent(component: string, fullName: string): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(component);

    await this.componentInformationPage.clickOnResponsibleForImplementationOfComponentComboBox();
    await this.componentInformationPage.fillInResponsibleForImplementationOfComponentComboBox(fullName);
    await this.componentInformationPage.clickOnComponentOwnerComboBox();
    await this.componentInformationPage.fillInComponentOwnerComboBox(fullName);
    await this.componentInformationPage.clickOnTechnicalExpertComboBox();
    await this.componentInformationPage.fillInTechnicalExpertComboBox(fullName);
    await this.componentInformationPage.refreshPage();
    await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(fullName);
    await this.componentInformationPage.checkComponentOwnerComboBox(fullName);
    await this.componentInformationPage.checkTechnicalExpertComboBox(fullName);
  }

  /** Удалить ответственного за реализацию. */
  public async testRemovePersonResponsibleForImplementation(): Promise<void> {
    await allure.description(`Баг: при выборе значения в combobox'е иногда значение не сохраняется.`);

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов компонентов авторизован в сервисе,
      // открыта страница 'Компоненты'. Есть компоненты для которых указаны: 'Ответственный за реализацию',
      // 'Владелец', 'Технический эксперт'
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

      // 2. В списке выбрать компонент → очистить поля: 'Ответственный за реализацию', 'Владелец',
      // 'Технический эксперт'
      await this.componentPage.fillInSearchInput(Components.ACPI);
      await this.componentPage.clickOnLink(Components.ACPI);

      await this.componentInformationPage.clickOnAllCrossIcons();

      // 3. Войти в сервис под пользователем с правами на чтение, в списке выбрать компонент из ш. 2
      await this.impersonateAsUserWithReadOrWritePermissions(false);

      await this.componentPage.clickOnTitle();
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.fillInSearchInput(Components.ACPI);
      await this.componentPage.clickOnLink(Components.ACPI);

      await this.componentInformationPage.checkResponsibleForImplementationOfComponent(UITextElements.DASH);
      await this.componentInformationPage.checkComponentOwner(UITextElements.DASH);
      await this.componentInformationPage.checkTechnicalExpertOfComponent(UITextElements.DASH);
    } finally {
      // Возвращение команды, ответственной за компонент, к первоначальной после автотеста.
      await this.cleanupSetTeamResponsibleForComponent(Components.ACPI, Usernames.USER_WITH_READ_PERMISSIONS);
    }
  }

  /** Добавить ответственного за реализацию. */
  public async testAddPersonResponsibleForImplementation(): Promise<void> {
    await allure.description(`Баг: Текст 'Пожалуйста, введите минимум 3 символа' не отображается на странице.`);

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов компонентов авторизован в сервисе,
      // открыта страница 'Компоненты'
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

      // 2. В списке выбрать компонент, для которого не указаны сотрудники команды, ответственной за компонент
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.checkComponentOwnerComboBox(UITextElements.ABSENT);
      await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(UITextElements.ABSENT);
      await this.componentInformationPage.checkTechnicalExpertComboBox(UITextElements.ABSENT);

      // 3. В поле 'Ответственный за реализацию' ввести НЕвалидное значение (ФИО сотрудника не из ЦРПП, цифры,
      // спец. символы и т.п.)
      await this.componentInformationPage.clickOnResponsibleForImplementationOfComponentComboBox();
      await this.componentInformationPage.fillInResponsibleForImplementationOfComponentComboBox(
        TestInputs.SPECIAL_CHARACTERS,
        false,
      );
      await this.componentInformationPage.checkText({ pageText: UITextElements.NOTHING_FOUND });
      await this.componentInformationPage.clickOnResponsibleForImplementationOfComponentComboBox();

      // 4. Очистить поле 'Ответственный за реализацию'
      await this.componentInformationPage.refreshPage();
      await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(UITextElements.ABSENT);
      await this.componentInformationPage.clickOnResponsibleForImplementationOfComponentComboBox();
      await this.componentInformationPage.checkText({ pageText: "Пожалуйста, введите минимум 3 символа" });

      // 5. В поле 'Ответственный за реализацию' ввести валидное значение (ФИО любого сотрудника ЦРПП)
      // 6. Выбрать любого сотрудника из списка
      await this.componentInformationPage.fillInResponsibleForImplementationOfComponentComboBox(
        Usernames.USER_WITH_READ_PERMISSIONS,
      );
      await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(
        Usernames.USER_WITH_READ_PERMISSIONS,
      );
      await this.componentInformationPage.checkComponentOwnerComboBox(UITextElements.ABSENT);
      await this.componentInformationPage.checkTechnicalExpertComboBox(UITextElements.ABSENT);

      // 7. В списке выбрать любой другой компонент и вернуться к компоненту из ш. 2
      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACETAO);

      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(
        Usernames.USER_WITH_READ_PERMISSIONS,
      );
      await this.componentInformationPage.checkComponentOwnerComboBox(UITextElements.ABSENT);
      await this.componentInformationPage.checkTechnicalExpertComboBox(UITextElements.ABSENT);

      // 8. Войти в сервис под пользователем, которому доступно только чтение, в списке выбрать компонент из ш. 2
      await this.impersonateAsUserWithReadOrWritePermissions(false);

      await this.componentPage.clickOnTitle();
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.checkResponsibleForImplementationOfComponent(
        `${Usernames.USER_WITH_READ_PERMISSIONS} Программист`,
      );
      await this.componentInformationPage.checkComponentOwner(UITextElements.DASH);
      await this.componentInformationPage.checkTechnicalExpertOfComponent(UITextElements.DASH);
    } finally {
      // Удаление ответственного за реализацию (компонент accordsdk).
      await this.cleanupRemoveImplementationManager();
    }
  }

  /** Изменить команду, ответственную за компонент. */
  public async testChangeTeamResponsibleForComponent(): Promise<void> {
    await allure.description(`Баг: при выборе значения в combobox'е иногда значение не сохраняется`);

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов компонентов авторизован в сервисе,
      // открыта страница 'Компоненты'
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

      // 2. В списке выбрать компонент для которого указан 'Ответственный за реализацию'
      await this.componentPage.fillInSearchInput(Components.ACPI);
      await this.componentPage.clickOnLink(Components.ACPI);

      await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(
        Usernames.USER_WITH_READ_PERMISSIONS,
      );

      // 3. Очистить поле 'Ответственный за реализацию' → ввести ФИО другого сотрудника
      // 4. Повторить ш. 2 и 3 для изменения 'Владельца' и 'Технического эксперта'
      await this.componentInformationPage.clickOnAllCrossIcons();
      await this.componentInformationPage.clickOnResponsibleForImplementationOfComponentComboBox();
      await this.componentInformationPage.fillInResponsibleForImplementationOfComponentComboBox(
        Usernames.USER_WITH_WRITE_PERMISSIONS,
      );
      await this.componentInformationPage.clickOnComponentOwnerComboBox();
      await this.componentInformationPage.fillInComponentOwnerComboBox(Usernames.USER_WITH_WRITE_PERMISSIONS);
      await this.componentInformationPage.clickOnTechnicalExpertComboBox();
      await this.componentInformationPage.fillInTechnicalExpertComboBox(Usernames.USER_WITH_WRITE_PERMISSIONS);
      await this.componentInformationPage.refreshPage();
      await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(
        Usernames.USER_WITH_WRITE_PERMISSIONS,
      );
      await this.componentInformationPage.checkComponentOwnerComboBox(Usernames.USER_WITH_WRITE_PERMISSIONS);
      await this.componentInformationPage.checkTechnicalExpertComboBox(Usernames.USER_WITH_WRITE_PERMISSIONS);

      // 5. В списке выбрать любой другой компонент и вернуться к компоненту из ш. 2
      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACETAO);

      await this.componentInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.fillInSearchInput(Components.ACPI);
      await this.componentPage.clickOnLink(Components.ACPI);

      await this.componentInformationPage.checkResponsibleForImplementationOfComponentComboBox(
        Usernames.USER_WITH_WRITE_PERMISSIONS,
      );
      await this.componentInformationPage.checkComponentOwnerComboBox(Usernames.USER_WITH_WRITE_PERMISSIONS);
      await this.componentInformationPage.checkTechnicalExpertComboBox(Usernames.USER_WITH_WRITE_PERMISSIONS);

      // 6. Войти в сервис под пользователем с правами на чтение, в списке выбрать компонент из ш. 2
      await this.impersonateAsUserWithReadOrWritePermissions(false);

      await this.componentPage.clickOnTitle();
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.fillInSearchInput(Components.ACPI);
      await this.componentPage.clickOnLink(Components.ACPI);

      await this.componentInformationPage.checkResponsibleForImplementationOfComponent(
        `${Usernames.USER_WITH_WRITE_PERMISSIONS} Старший инженер-тестировщик`,
      );
      await this.componentInformationPage.checkComponentOwner(
        `${Usernames.USER_WITH_WRITE_PERMISSIONS} Старший инженер-тестировщик`,
      );
      await this.componentInformationPage.checkTechnicalExpertOfComponent(
        `${Usernames.USER_WITH_WRITE_PERMISSIONS} Старший инженер-тестировщик`,
      );
    } finally {
      // Возвращение команды, ответственной за компонент, к первоначальной после автотеста.
      await this.cleanupSetTeamResponsibleForComponent(Components.ACPI, Usernames.USER_WITH_READ_PERMISSIONS);
    }
  }
}
