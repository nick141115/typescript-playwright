import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import { Versions } from "../../src/constants/versions";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { Packages } from "../../src/constants/packages";
import { TestInputs } from "../../src/constants/test-inputs";
import { Lists } from "../../src/constants/lists";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import * as allure from "allure-js-commons";

/** Версия компонента. */
export class TestComponentVersion extends BaseTest {
  /** Версия компонента, посмотреть сведения. */
  async testComponentVersionViewInformation(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница "Компоненты", выбран один из
    // компонентов списка, выбрана версия компонента.
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    // 2. Проверить отображение информации по выбранной версии компонента
    await this.componentVersionInformationPage.checkPageTitle(UITextElements.VERSION_ONE);
    await this.componentVersionInformationPage.checkFavoritesIndicator();
    await this.componentVersionInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.DEVELOPMENT_STATUS,
      UITextElements.DASH,
    );
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PACKAGE_MANAGERS,
      UITextElements.ANT_IVY,
    );
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PLATFORMS,
      RegularExpressions.PATTERN_WINDOWS,
    );
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.LICENSE,
      UITextElements.LICENSES_LINK,
    );
    await this.componentVersionInformationPage.checkLinksCount(UITextElements.REGULATIONS, 1);
    await this.componentVersionInformationPage.checkLinksCount(UITextElements.PACKAGES_TAB, 1);
    await this.componentVersionInformationPage.checkLinksCount(UITextElements.CONSUMER_PRODUCTS_TAB, 1);
    await this.componentVersionInformationPage.checkLinksCount(UITextElements.CONSUMER_COMPONENTS_TAB, 1);
  }

  /** Версия компонента, редактирование статуса. */
  async testComponentVersionEditingStatus(): Promise<void> {
    await allure.description(`Баг: при выборе значения в combobox'е иногда значение не сохраняется.`);

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов компонентов авторизован в сервисе, открыта
      // страница "Компоненты", выбран один из компонентов списка, выбрана версия компонента, статус
      // разработки "Не указан"
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
      await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

      // 2. Проверить отображение информации в поле "Статус разработки"
      await this.componentVersionInformationPage.checkFirstComboBox(UITextElements.ABSENT);

      // 3. Установить курсор в поле "Статус разработки"
      await this.componentVersionInformationPage.clickOnFirstComboBox();

      // 4. Выбрать любой статус кроме "Не указан" и "Не поддерживается"
      await this.componentVersionInformationPage.clickOnElementWithText(UITextElements.DEVELOPING);
      await this.componentVersionInformationPage.refreshPage();
      await this.componentVersionInformationPage.checkFirstComboBox(UITextElements.DEVELOPING);

      // 5. Выбрать любую другую версию компонента и вернуться обратно в первоначальную версию
      await this.componentPage.clickOnTitle();
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACETAO);

      await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
      await this.componentInformationPage.clickOnLink(Versions.VERSION_ACETAO);

      await this.componentVersionInformationPage.clickOnTitle();

      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACCORDSDK);

      await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
      await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

      await this.componentVersionInformationPage.checkFirstComboBox(UITextElements.DEVELOPING);
    } finally {
      await this.set_development_status();
    }
  }

  /** Паспорт версии компонента, посмотреть сведения. */
  async testComponentVersionViewDetails(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница "Компоненты", выбран один из
    // компонентов списка, выбрана версия компонента
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    // 2. Проверить отображение информации по выбранной версии компонента
    // Вкладка "Общая информация"
    await this.componentVersionInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
    await this.componentVersionInformationPage.checkTextInNavigationBar(
      UITextElements.COMPONENTS + Components.ACCORDSDK + UITextElements.VERSION_ONE,
    );
    await this.componentVersionInformationPage.checkLinksCount(UITextElements.COMPONENTS, 3);
    await this.componentVersionInformationPage.checkLinksCount(Components.ACCORDSDK, 1);
    await this.componentVersionInformationPage.checkFavoritesIndicator();
    await this.componentVersionInformationPage.checkText({ pageText: UITextElements.VERSION_ONE, nth: 1 });
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.DEVELOPMENT_STATUS,
      UITextElements.DASH,
    );
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PACKAGE_MANAGERS,
      UITextElements.ANT_IVY,
    );
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PLATFORMS,
      RegularExpressions.PATTERN_WINDOWS,
    );
    await this.componentVersionInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.LICENSE,
      UITextElements.LICENSES_LINK,
    );
    await this.componentVersionInformationPage.checkLinksCount(UITextElements.REGULATIONS, 1);

    // Вкладка "Пакеты"
    let titles: string[] = [
      UITextElements.TEXT_PACKAGE,
      UITextElements.VERIFIED_VERSION,
      UITextElements.PACKAGE_MANAGER,
    ];
    let values: string[] = [Packages.PACKAGE_NUMBER_ACCORDSDK, "", UITextElements.ANT_IVY];

    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.checkActiveTab(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.checkTextTotalPackagesWithAnyNumber();
    await this.componentVersionInformationPage.checkTableHeadings(titles);
    await this.componentVersionInformationPage.checkTableTextValues(values);
    await this.componentVersionInformationPage.checkLinksCount(Packages.PACKAGE_NUMBER_ACCORDSDK, 1);
    await this.componentVersionInformationPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);
    await this.componentVersionInformationPage.clickOnFunnelIcon();

    // Вкладка "Продукты-потребители"
    values = [UITextElements.CONNECT, Versions.VERSION_FIVE_TWO_ZERO];

    await this.componentVersionInformationPage.clickOnLink(UITextElements.CONSUMER_PRODUCTS_TAB);
    await this.componentVersionInformationPage.checkActiveTab(UITextElements.CONSUMER_PRODUCTS_TAB);
    await this.componentVersionInformationPage.checkTextTotalProductsWithAnyNumber();
    await this.componentVersionInformationPage.checkTableHeadings(Lists.TITLES_TABLE_CONSUMER_PRODUCTS);
    await this.componentVersionInformationPage.checkTableTextValues(values);
    await this.componentVersionInformationPage.checkLinksCount(UITextElements.CONNECT, 3);
    await this.componentVersionInformationPage.checkLinksCount(Versions.VERSION_FIVE_TWO_ZERO, 5);
    await this.componentVersionInformationPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);

    // Вкладка "Компоненты-потребители"
    titles = [UITextElements.COMPONENT, UITextElements.TEXT_VERSION, UITextElements.TECHNICAL_RADAR_AREA];
    values = [Components.CRYPT_PASSWORD_FORGE, Versions.VERSION_ONE_ONE, RadarAreaValues.RECOMMENDED];

    await this.componentVersionInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentVersionInformationPage.checkActiveTab(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentVersionInformationPage.checkTableHeadings(titles);
    await this.componentVersionInformationPage.checkTableTextValues(values);
    await this.componentVersionInformationPage.checkLinksCount(Components.CRYPT_PASSWORD_FORGE, 3);
    await this.componentVersionInformationPage.checkLinksCount(Versions.VERSION_ONE_ONE, 1);
    await this.componentVersionInformationPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);
    await this.componentVersionInformationPage.clickOnFunnelIcon();
  }

  /** Возвращение статуса разработки к первоначальному после автотеста. */
  private async set_development_status(): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    await this.componentVersionInformationPage.clickOnFirstComboBox();
    await this.componentVersionInformationPage.clickOnElementWithText(UITextElements.ABSENT);
    await this.componentVersionInformationPage.refreshPage();
    await this.componentVersionInformationPage.checkFirstComboBox(UITextElements.ABSENT);
  }
}
