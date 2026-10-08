import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import { Versions } from "../../src/constants/versions";
import { Products } from "../../src/constants/products";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { Assemblies } from "../../src/constants/assemblies";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { TestInputs } from "../../src/constants/test-inputs";
import { Lists } from "../../src/constants/lists";

/** Конфигурация компонента. */
export class TestComponentConfiguration extends BaseTest {
  private static readonly PACKAGE: string = "6.4.6.67";
  private static readonly ASSEMBLY_BY_CONFIGURATION_DEFAULT_BRAND_TRUNK: string =
    "Сборка по конфигурации DEFAULT_BRAND_trunk";
  private static readonly TEXT_VERSION_ACETAO: string = "Версия 6.4";

  /** Конфигурация компонента. */
  async testComponentConfiguration(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница 'Компоненты', выбран один из компонентов
    // списка, выбрана версия компонента, выбран пакет, выбрана сборка пакета
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACETAO);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACETAO);

    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.clickOnLink(TestComponentConfiguration.PACKAGE);

    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.DEFAULT_BRAND_TRUNK);

    // 2. Проверить отображение информации по выбранной сборке пакета компонента
    let titles: string[] = [UITextElements.PRODUCT, UITextElements.TEXT_VERSION];
    let values: string[] = [Products.VIPNET_CLIENT_4_X_FOR_WINDOWS, Versions.VERSION_VIPNET_CLIENT_4_X_FOR_WINDOWS];

    await this.componentAssemblyByConfigurationPage.checkPageTitle(
      TestComponentConfiguration.ASSEMBLY_BY_CONFIGURATION_DEFAULT_BRAND_TRUNK,
    );
    await this.componentAssemblyByConfigurationPage.checkFavoritesIndicator();
    await this.componentAssemblyByConfigurationPage.checkItemTitleLink(UITextElements.COMPONENTS);
    await this.componentAssemblyByConfigurationPage.checkItemTitleLink(Components.ACETAO, 1);
    await this.componentAssemblyByConfigurationPage.checkItemTitleLink(
      TestComponentConfiguration.TEXT_VERSION_ACETAO,
      2,
    );
    await this.componentAssemblyByConfigurationPage.checkItemTitleLink("Пакет 6.4.6.67", 3);
    await this.componentAssemblyByConfigurationPage.checkNavigationBarItemTitle(
      TestComponentConfiguration.ASSEMBLY_BY_CONFIGURATION_DEFAULT_BRAND_TRUNK,
    );
    await this.componentAssemblyByConfigurationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
    await this.componentAssemblyByConfigurationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TEXT_VERSION,
      Versions.VERSION_ACETAO,
    );
    await this.componentAssemblyByConfigurationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PACKAGE_MANAGER,
      UITextElements.ANT_IVY,
    );
    await this.componentAssemblyByConfigurationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PLATFORM,
      RegularExpressions.PATTERN_WINDOWS,
    );
    await this.componentAssemblyByConfigurationPage.clickOnLink(UITextElements.CONSUMER_PRODUCTS_TAB);
    await this.componentAssemblyByConfigurationPage.checkActiveTab(UITextElements.CONSUMER_PRODUCTS_TAB);
    await this.componentAssemblyByConfigurationPage.checkTableHeadings(titles);
    await this.componentAssemblyByConfigurationPage.checkTableTextValues(values);
    await this.componentAssemblyByConfigurationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentAssemblyByConfigurationPage.checkActiveTab(UITextElements.CONSUMER_COMPONENTS_TAB);

    titles = [
      UITextElements.COMPONENT,
      UITextElements.TEXT_VERSION,
      UITextElements.ASSEMBLY,
      UITextElements.CONFIGURATION,
      UITextElements.TECHNICAL_RADAR_AREA,
    ];
    values = [
      Components.VPN_INTERFACES,
      Versions.VERSION_TWO_NINE,
      Assemblies.ASSEMBLY_VPN_INTERFACES,
      UITextElements.DEFAULT_BRAND_TRUNK,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    ];

    await this.componentAssemblyByConfigurationPage.checkTableHeadings(titles);
    await this.componentAssemblyByConfigurationPage.checkTableTextValues(values);
    await this.componentAssemblyByConfigurationPage.checkGreyIndicatorInTableConsumerComponentsAssemblyPage();
  }

  /** Конфигурация компонента, посмотреть сведения (все вкладки). */
  async testComponentConfigurationViewDetailsAllTabs(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница "Компоненты" выбран один из компонентов
    // списка, выбрана версия компонента, выбран пакет, выбрана сборка пакета
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACETAO);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACETAO);

    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.clickOnLink(TestComponentConfiguration.PACKAGE);

    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.DEFAULT_BRAND_TRUNK);

    // 2. Проверить отображение информации по выбранному пакету компонента
    // Вкладка 'Общая информация'
    await this.componentAssemblyByConfigurationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
    await this.componentAssemblyByConfigurationPage.checkTextInNavigationBar(
      UITextElements.COMPONENTS +
        Components.ACETAO +
        TestComponentConfiguration.TEXT_VERSION_ACETAO +
        UITextElements.TEXT_PACKAGE +
        " " +
        TestComponentConfiguration.PACKAGE +
        TestComponentConfiguration.ASSEMBLY_BY_CONFIGURATION_DEFAULT_BRAND_TRUNK,
    );
    await this.componentAssemblyByConfigurationPage.checkLinksCount(UITextElements.COMPONENTS, 3);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(Components.ACETAO, 1);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(TestComponentConfiguration.TEXT_VERSION_ACETAO, 1);
    await this.componentAssemblyByConfigurationPage.checkFavoritesIndicator();
    await this.componentAssemblyByConfigurationPage.checkText({
      pageText: TestComponentConfiguration.ASSEMBLY_BY_CONFIGURATION_DEFAULT_BRAND_TRUNK,
      nth: 1,
    });
    await this.componentAssemblyByConfigurationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TEXT_VERSION,
      Versions.VERSION_ACETAO,
    );
    await this.componentAssemblyByConfigurationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PACKAGE_MANAGER,
      UITextElements.ANT_IVY,
    );
    await this.componentAssemblyByConfigurationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PLATFORM,
      RegularExpressions.PATTERN_WINDOWS,
    );

    // Вкладка "Продукты-потребители"
    let values: string[] = [Products.VIPNET_CLIENT_4_X_FOR_WINDOWS, Versions.VERSION_VIPNET_CLIENT_4_X_FOR_WINDOWS];

    await this.componentAssemblyByConfigurationPage.clickOnLink(UITextElements.CONSUMER_PRODUCTS_TAB);
    await this.componentAssemblyByConfigurationPage.checkActiveTab(UITextElements.CONSUMER_PRODUCTS_TAB);
    await this.componentAssemblyByConfigurationPage.checkTextTotalProductsWithAnyNumber();
    await this.componentAssemblyByConfigurationPage.checkTableHeadings(Lists.TITLES_TABLE_CONSUMER_PRODUCTS);
    await this.componentAssemblyByConfigurationPage.checkTableTextValues(values);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(Products.VIPNET_CLIENT_4_X_FOR_WINDOWS, 3);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(Versions.VERSION_VIPNET_CLIENT_4_X_FOR_WINDOWS, 1);
    await this.componentAssemblyByConfigurationPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);

    // Вкладка "Компоненты-потребители"
    const titles: string[] = [
      UITextElements.COMPONENT,
      UITextElements.TEXT_VERSION,
      UITextElements.ASSEMBLY,
      UITextElements.CONFIGURATION,
      UITextElements.TECHNICAL_RADAR_AREA,
    ];
    values = [
      Components.VPN_INTERFACES,
      Versions.VERSION_TWO_NINE,
      Assemblies.ASSEMBLY_VPN_INTERFACES,
      UITextElements.DEFAULT_BRAND_TRUNK,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    ];

    await this.componentAssemblyByConfigurationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentAssemblyByConfigurationPage.checkActiveTab(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentAssemblyByConfigurationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentAssemblyByConfigurationPage.checkTableHeadings(titles);
    await this.componentAssemblyByConfigurationPage.checkTableTextValues(values);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(Components.VPN_INTERFACES, 5);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(Versions.VERSION_TWO_NINE, 1, true);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(Assemblies.ASSEMBLY_VPN_INTERFACES, 1);
    await this.componentAssemblyByConfigurationPage.checkLinksCount(UITextElements.DEFAULT_BRAND_TRUNK, 15);
    await this.componentAssemblyByConfigurationPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);
    await this.componentAssemblyByConfigurationPage.clickOnFunnelIcon();
  }
}
