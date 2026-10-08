import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { Products } from "../../src/constants/products";
import { Versions } from "../../src/constants/versions";
import { Packages } from "../../src/constants/packages";
import { Lists } from "../../src/constants/lists";

/** Паспорт компонента. */
export class TestComponentPassport extends BaseTest {
  private readonly COMPONENTS_FOUND: number = 1;
  private readonly TITLES: string[] = [
    UITextElements.TEXT_VERSION,
    UITextElements.PACKAGE_MANAGERS,
    UITextElements.DEVELOPMENT_STATUS,
    UITextElements.PLATFORMS,
    UITextElements.LICENSE,
  ];

  /** Паспорт компонента уникален. */
  public async testComponentPassportIsUnique(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница 'Компоненты'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. Проверить список компонентов
    const listComponents: string[] = [
      Components.ACCORDSDK,
      Components.ACETAO,
      "accepts",
      Components.ADDUSER,
      Components.ANTCUSTOM,
    ];

    for (const component of listComponents) {
      await this.componentPage.fillInSearchInput(component);
      await this.componentPage.checkTextComponentsFound(this.COMPONENTS_FOUND);
      await this.componentPage.clickOnCrossIcon();
      await this.componentPage.checkSearchInput("");
      await this.componentPage.checkTextTotalComponentsWithAnyNumber();
    }
  }

  /** Паспорт компонента, общая информация. */
  public async testComponentPassportGeneralInformation(): Promise<void> {
    const tooltip = "Дата изменения файла в источнике хранения - Artifactory.";
    const patternDate = /\d{2}\.\d{2}\.\d{4}\s\d{2}:\d{2}/;

    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница 'Компоненты' на вкладке 'Все компоненты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. В реестре выбрать любой компонент
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    // 3. Название компонента
    await this.componentInformationPage.checkPageTitle(Components.ACCORDSDK);

    // 4. Дата последней синхронизации
    await this.componentInformationPage.hoverCursorOverQuestionMark();
    await this.componentInformationPage.checkText({ pageText: tooltip });

    // 5 - 12. Зона радара, Тип, Описание, Пакетные менеджеры, Платформы, Ссылки, Лицензия,
    // 'Ответственный за реализацию', 'Владелец', 'Технический эксперт'
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.LAST_SYNC_DATE,
      patternDate,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      "Зона радара",
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TYPE,
      UITextElements.DASH,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation("Описание", UITextElements.DASH);
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PACKAGE_MANAGERS,
      UITextElements.ANT_IVY,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PLATFORMS,
      RegularExpressions.PATTERN_WINDOWS,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.LICENSE,
      UITextElements.LICENSES_LINK,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION,
      UITextElements.DASH,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.OWNER,
      UITextElements.DASH,
    );
    await this.componentInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TECHNICAL_EXPERT,
      UITextElements.DASH,
    );
    await this.componentInformationPage.checkText({ pageText: UITextElements.LINKS });
    await this.componentInformationPage.checkLinksCount(UITextElements.REGULATIONS, 1);
    await this.componentInformationPage.checkLinksCount(UITextElements.ARTIFACTORY, 1);
    await this.componentInformationPage.checkGreyIndicatorInTableGeneralInformationComponent();
  }

  /** Паспорт компонента, вкладка 'Продукты-потребители'. */
  public async testComponentPassportConsumerProductTab(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыт паспорт компонента на вкладке
    // 'Продукты-потребители'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_PRODUCTS_TAB);

    // 2. Проверить отображение на вкладке 'Продукты-Потребители'
    const products: string[] = [
      UITextElements.CONNECT,
      Products.COORDINATOR_HW_4,
      Products.COORDINATOR_HW_5,
      Products.COORDINATOR_IG_5,
      "CSS Connect 3",
      "Protelion Enterprise Messenger",
      "TDC Archive",
      "TSM-EN",
      "ViPNet Client 5 for Android",
      "Архитектурный Репозиторий",
      "Светофор здоровья проектов",
      "УМЗЧ Апелиотис А110 ФРКЕ.465327.004",
    ];

    await this.componentInformationPage.checkLinksInProductsList(products);

    // 3. Кликнуть по ссылке на продукт
    await this.componentInformationPage.clickOnLink(UITextElements.CONNECT);

    await this.productInformationPage.checkItemTitleLink(UITextElements.PRODUCTS);
    await this.productInformationPage.checkPageTitle(UITextElements.CONNECT);
    await this.productInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
  }

  /** Паспорт компонента, вкладка 'Компоненты-потребители'. */
  public async testComponentPassportConsumerComponentTab(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыт паспорт компонента на вкладке
    // 'Компоненты-потребители'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);
    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);

    // 2. Проверить отображение на вкладке 'Компоненты-потребители'
    const components: string[] = [
      Components.CRYPT_PASSWORD_FORGE,
      Components.IPS,
      "itcshub",
      "openssl_engines_gost",
      "ossl_apps",
      "ossl_ex",
      "ossl_itp11util",
      "pkcs11_benchmark",
      "pkcs11_csp4_storage",
      "pkcs11_switch",
      "soft_token",
      "softtoken_ngost_storage",
      Components.UPRNG,
      "vipnet_custom_cms_coder",
      "vipnet_custom_cryptoalg_soft_token",
      "vipnet_custom_key_generation_service",
      "vipnet_custom_key_storage",
      "vipnet_custom_key_system_inproc",
      "vipnet_custom_key_system_utils",
    ];
    await this.componentInformationPage.checkText({ pageText: UITextElements.TECHNICAL_RADAR_AREA });
    await this.componentInformationPage.checkLinksInComponentsList(components);

    // 3. Кликнуть по ссылке на компонент
    await this.componentInformationPage.clickOnLink(Components.CRYPT_PASSWORD_FORGE);
    await this.componentInformationPage.checkItemTitleLink(UITextElements.COMPONENTS);
    await this.componentInformationPage.checkPageTitle(Components.CRYPT_PASSWORD_FORGE);
    await this.componentInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
  }

  /** Уникальная ссылка на паспорт компонента. */
  public async testUniqueLinkToComponentPassport(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница 'Компоненты' → вкладка 'Все компоненты'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. Проверить наличие ссылки
    await this.componentPage.fillInSearchInput(Components.ACCORDSDK);
    await this.componentPage.checkTextComponentsFound(this.COMPONENTS_FOUND);

    // 3. Перейти по ссылке/открыть в новой вкладке/окне
    await this.componentPage.clickOnLink(Components.ACCORDSDK);
    await this.componentInformationPage.checkItemTitleLink(UITextElements.COMPONENTS);
    await this.componentInformationPage.checkNavigationBarItemTitle(Components.ACCORDSDK);
    await this.componentInformationPage.checkPageTitle(Components.ACCORDSDK);
    await this.componentInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
  }

  /** Паспорт компонента, вкладка 'Компоненты-потребители', отображение фильтра. */
  public async testConsumerComponentsTabFilterDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр компонентов, выбран компонент и открыт его паспорт на вкладке
    // 'Компоненты-потребители'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);

    // 2. Нажать на иконку в виде воронки
    await this.componentInformationPage.clickOnFunnelIcon();
    await this.componentInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentInformationPage.checkResetFiltersButton();

    // 3. Нажать Х (закрыть)
    await this.componentInformationPage.clickOnCloseFilterBlockIcon();
    await this.componentInformationPage.checkResetFiltersButton(false);

    // 4. Повторить шаги тест-кейса для паспорта версии компонента (вкладка 'Компоненты-потребители')
    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    await this.componentVersionInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentVersionInformationPage.clickOnFunnelIcon();
    await this.componentVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentVersionInformationPage.checkResetFiltersButton();
    await this.componentVersionInformationPage.clickOnCloseFilterBlockIcon();
    await this.componentVersionInformationPage.checkResetFiltersButton(false);

    // 5. Повторить шаги тест-кейса для паспорта конфигурации компонента (вкладка 'Компоненты-потребители')
    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ACCORDSDK);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.DEFAULT_BRAND_TRUNK);

    await this.componentAssemblyByConfigurationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentAssemblyByConfigurationPage.clickOnFunnelIcon();
    await this.componentAssemblyByConfigurationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentAssemblyByConfigurationPage.checkResetFiltersButton();
    await this.componentAssemblyByConfigurationPage.clickOnCloseFilterBlockIcon();
    await this.componentAssemblyByConfigurationPage.checkResetFiltersButton(false);
  }

  /** Паспорт компонента, вкладка 'Версии'. */
  public async testComponentPassportVersionTab(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыт паспорт компонента на вкладке 'Версии'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);

    // 2. Проверить отображение информации на вкладке 'Версии'
    const values: (string | RegExp)[] = [
      Versions.VERSION_ACCORDSDK,
      UITextElements.ANT_IVY,
      UITextElements.ABSENT,
      RegularExpressions.PATTERN_WINDOWS,
      UITextElements.NOT_SPECIFIED,
    ];

    await this.componentInformationPage.checkTableHeadings(this.TITLES);
    await this.componentInformationPage.checkTableTextValues(values);
    await this.componentInformationPage.checkLinksCount(Versions.VERSION_ACCORDSDK, 1);
    await this.componentInformationPage.checkText({ pageText: "Всего 1 версия" });
    await this.componentInformationPage.fillInSearchInput(Components.ACCORDSDK);
    await this.componentInformationPage.clickOnFunnelIcon();
  }

  /** Перейти по внешним ссылкам из паспорта компонента. */
  public async testFollowExternalLinksFromComponentPassport(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта вкладка 'Компоненты'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. Выбрать компонент
    await this.componentPage.fillInSearchInput(Components.IGC);
    await this.componentPage.clickOnLink(Components.IGC);

    // 3. Перейти по ссылке на документацию
    await this.componentInformationPage.checkHref(
      UITextElements.REGULATIONS,
      "https://wiki.example.int/pages/viewpage.action?pageId=377096397",
      false,
    );
    await this.componentInformationPage.checkTargetBlank(UITextElements.REGULATIONS);

    // 4. Перейти по ссылке на Artifactory
    await this.componentInformationPage.checkHref(
      UITextElements.ARTIFACTORY,
      "https://artifactory.example.ru/ui/repos/tree/General/tdc-local/main/igc",
      false,
    );
    await this.componentInformationPage.checkTargetBlank(UITextElements.ARTIFACTORY);

    // 5. Перейти по ссылке на регламент
    await this.componentInformationPage.checkHref(
      UITextElements.REGULATIONS,
      "https://wiki.example.int/pages/viewpage.action?pageId=377096397",
      false,
    );
    await this.componentInformationPage.checkTargetBlank(UITextElements.REGULATIONS);

    // 6. Перейти по ссылке на лицензию
    await this.componentInformationPage.clickOnTitle();

    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.fillInSearchInput(Components.IDENTITY_MODEL);
    await this.componentPage.clickOnLink(Components.IDENTITY_MODEL);

    await this.componentInformationPage.checkHref(
      UITextElements.APACHE_2_0,
      `https://licenses.nuget.org/${UITextElements.APACHE_2_0}`,
      false,
    );
    await this.componentInformationPage.checkTargetBlank(UITextElements.APACHE_2_0);
  }

  /** Паспорт компонента, вкладка 'Компоненты-потребители', фильтр 'Зона техрадара' (работа). */
  public async testConsumerComponentsTabFilterTechnicalRadarArea(): Promise<void> {
    const componentCountFirstSymbol: number = 7;
    const componentCountLastSymbol: number = -11;

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр компонентов, выбран компонент и открыт его паспорт на вкладке
    // 'Компоненты-потребители'
    const titles: string[] = [UITextElements.COMPONENT, UITextElements.TECHNICAL_RADAR_AREA];
    const firstValues: string[] = [Components.CRYPT_PASSWORD_FORGE, RadarAreaValues.RECOMMENDED];

    await this.checkTitlesAndValuesInTable({
      firstPage: this.componentPage,
      secondPage: this.componentInformationPage,
      firstLink: UITextElements.ALL_COMPONENTS_TAB,
      secondLink: Components.ACCORDSDK,
      titles,
      values: firstValues,
    });

    // 2. В фильтре 'Зона техрадара' выбрать одно любое значение
    await this.componentInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentInformationPage.clickOnFunnelIcon();
    await this.componentInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.componentInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.componentInformationPage.checkTextComponentsFoundWithAnyNumber();

    let tempTextComponentsFound: string = await this.componentInformationPage.getTextComponentsFoundWithAnyNumber();

    // 3. В фильтре 'Зона техрадара' выбрать еще одно любое значение
    await this.componentInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.componentInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.componentInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.componentInformationPage.checkComboBoxListAndTextInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // 4. Закрыть выпадающий список
    await this.componentInformationPage.checkComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentInformationPage.clickOnComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );

    // 5. Открыть выпадающий список, проверить отображение выбранных значений
    await this.componentInformationPage.checkComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentInformationPage.clickOnComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentInformationPage.checkComboBoxListAndTextInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // 6. Выбрать все значения в фильтре
    await this.componentInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.componentInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.componentInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.componentInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.componentInformationPage.checkText({
      pageText: tempTextComponentsFound,
      visible: false,
    });
    tempTextComponentsFound = await this.componentInformationPage.getTextComponentsFoundWithAnyNumber();

    // 7. Нажать 'Сбросить фильтр'
    await this.componentInformationPage.clickOnResetFiltersButton();
    await this.componentInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentInformationPage.checkText({
      pageText: tempTextComponentsFound.substring(componentCountFirstSymbol, componentCountLastSymbol),
      exact: false,
    });
    await this.componentInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentInformationPage.checkTableTextValues(firstValues);

    // 8. Повторить шаги тест-кейса для паспорта версии компонента, вкладка 'Компоненты-потребители'
    const versionTitles: string[] = [
      UITextElements.COMPONENT,
      UITextElements.TEXT_VERSION,
      UITextElements.TECHNICAL_RADAR_AREA,
    ];
    const versionFirstValues: string[] = [
      Components.CRYPT_PASSWORD_FORGE,
      Versions.VERSION_ONE_ONE,
      RadarAreaValues.RECOMMENDED,
    ];

    await this.checkTitlesAndValuesInTable({
      firstPage: this.componentInformationPage,
      secondPage: this.componentVersionInformationPage,
      firstLink: UITextElements.VERSIONS_TAB,
      secondLink: Versions.VERSION_ACCORDSDK,
      titles: versionTitles,
      values: versionFirstValues,
    });

    // В фильтре 'Зона техрадара' выбрать одно любое значение
    await this.componentVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentVersionInformationPage.clickOnFunnelIcon();
    await this.componentVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentVersionInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.componentVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    tempTextComponentsFound = await this.componentVersionInformationPage.getTextComponentsFoundWithAnyNumber();

    // В фильтре 'Зона техрадара' выбрать еще одно любое значение
    await this.componentVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.componentVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.componentVersionInformationPage.checkComboBoxListAndTextInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // Закрыть выпадающий список
    await this.componentVersionInformationPage.checkComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentVersionInformationPage.clickOnComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );

    // Открыть выпадающий список, проверить отображение выбранных значений
    await this.componentVersionInformationPage.checkComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentVersionInformationPage.clickOnComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentVersionInformationPage.checkComboBoxListAndTextInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // Выбрать все значения в фильтре
    await this.componentVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.componentVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.componentVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.componentVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.componentVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.componentVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.componentVersionInformationPage.checkText({
      pageText: tempTextComponentsFound,
      visible: false,
    });
    tempTextComponentsFound = await this.componentVersionInformationPage.getTextComponentsFoundWithAnyNumber();

    // Нажать 'Сбросить фильтр'
    await this.componentVersionInformationPage.clickOnResetFiltersButton();
    await this.componentVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentVersionInformationPage.checkText({
      pageText: tempTextComponentsFound.substring(componentCountFirstSymbol, componentCountLastSymbol),
      exact: false,
    });
    await this.componentVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentVersionInformationPage.checkTableTextValues(versionFirstValues);

    // 9. Повторить шаги для паспорта конфигурации компонента
    const configTitles: string[] = [
      UITextElements.COMPONENT,
      UITextElements.TEXT_VERSION,
      UITextElements.ASSEMBLY,
      UITextElements.CONFIGURATION,
      UITextElements.TECHNICAL_RADAR_AREA,
    ];
    const configFirstValues: string[] = [
      Components.UPRNG,
      Versions.VERSION_ONE_SIX,
      "1.6.3.1400",
      UITextElements.LINUX_RELEASE_ONE_SIX_X,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    ];

    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ACCORDSDK);

    await this.checkTitlesAndValuesInTable({
      firstPage: this.componentPackageInformationPage,
      secondPage: this.componentAssemblyByConfigurationPage,
      firstLink: UITextElements.ASSEMBLIES_BY_CONFIGURATION,
      secondLink: UITextElements.DEFAULT_BRAND_TRUNK,
      titles: configTitles,
      values: configFirstValues,
    });

    // В фильтре 'Зона техрадара' выбрать одно любое значение
    await this.componentAssemblyByConfigurationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentAssemblyByConfigurationPage.clickOnFunnelIcon();
    await this.componentAssemblyByConfigurationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentAssemblyByConfigurationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentAssemblyByConfigurationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.componentAssemblyByConfigurationPage.checkCheckboxWithTextInComboBoxInFilter(
      RadarAreaValues.RECOMMENDED,
    );
    await this.componentAssemblyByConfigurationPage.checkText({ pageText: UITextElements.NOTHING_FOUND });
    await this.componentAssemblyByConfigurationPage.checkTextComponentsFoundWithAnyNumber();
    tempTextComponentsFound = await this.componentAssemblyByConfigurationPage.getTextComponentsFoundWithAnyNumber();

    // В фильтре 'Зона техрадара' выбрать еще одно любое значение
    await this.componentAssemblyByConfigurationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.componentAssemblyByConfigurationPage.checkText({ pageText: UITextElements.NOTHING_FOUND });
    await this.componentAssemblyByConfigurationPage.checkTextComponentsFoundWithAnyNumber();
    await this.componentAssemblyByConfigurationPage.checkComboBoxListAndTextInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // Закрыть выпадающий список
    await this.componentAssemblyByConfigurationPage.checkComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentAssemblyByConfigurationPage.clickOnComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );

    // Открыть выпадающий список, проверить отображение выбранных значений
    await this.componentAssemblyByConfigurationPage.checkComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentAssemblyByConfigurationPage.clickOnComboBoxInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
    );
    await this.componentAssemblyByConfigurationPage.checkComboBoxListAndTextInFilter(
      `${UITextElements.TECHNICAL_RADAR_AREA}${UITextElements.COLON_SPACE_TWO}`,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // Выбрать все значения в фильтре
    await this.componentAssemblyByConfigurationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.componentAssemblyByConfigurationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.componentAssemblyByConfigurationPage.clickOnElementInComboBoxInFilter(
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    );
    await this.componentAssemblyByConfigurationPage.checkCheckboxWithTextInComboBoxInFilter(
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    );
    await this.componentAssemblyByConfigurationPage.checkTextComponentsFoundWithAnyNumber();
    await this.componentAssemblyByConfigurationPage.checkText({
      pageText: tempTextComponentsFound,
      visible: false,
    });
    tempTextComponentsFound = await this.componentAssemblyByConfigurationPage.getTextComponentsFoundWithAnyNumber();

    // Нажать 'Сбросить фильтр'
    await this.componentAssemblyByConfigurationPage.clickOnResetFiltersButton();
    await this.componentAssemblyByConfigurationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentAssemblyByConfigurationPage.checkText({
      pageText: tempTextComponentsFound.substring(componentCountFirstSymbol, componentCountLastSymbol),
      exact: false,
    });
    await this.componentAssemblyByConfigurationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentAssemblyByConfigurationPage.checkTableTextValues(configFirstValues);
  }

  /** Перечень версий компонента, отображение неподдерживаемых версий. */
  public async testListOfComponentVersionsDisplayUnsupportedVersions(): Promise<void> {
    // 1. Пользователь авторизован в сервисе, открыта страница 'Компоненты'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. В списке выбрать компонент, у которого более двух версий и есть неподдерживаемые версии
    // (например, 'librtpkcs11ecp') → перейти на вкладку 'Версии'
    const versions: string[] = ["2014.04", "2.13", "1.9", "1.8", Versions.VERSION_ONE_FOUR];
    const values: string[] = [
      "2014.04",
      UITextElements.ANT_IVY,
      UITextElements.ABSENT,
      "Не указаны",
      UITextElements.NOT_SPECIFIED,
    ];

    await this.componentPage.fillInSearchInput(Components.LIBRTPKCS_11_ECP);
    await this.componentPage.clickOnLink(Components.LIBRTPKCS_11_ECP);
    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.checkTableVersions(versions);
    await this.componentInformationPage.checkTableHeadings(this.TITLES);
    await this.componentInformationPage.checkTableTextValues(values);
  }

  /** Паспорт компонента, дата последнего изменения данных о компоненте. */
  public async testComponentPassportDateOfLastChangeOfComponentData(): Promise<void> {
    const patternString: RegExp = /\b(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}\s([01]\d|2[0-3]):[0-5]\d\b/;

    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница 'Компоненты'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. В списке выбрать любой компонент
    await this.componentPage.clickOnLink(Components.ACCORDSDK);
    const lastSyncDate: string = await this.componentInformationPage.getTextInTabGeneralInformation(
      UITextElements.LAST_SYNC_DATE,
    );

    // 3. В реестре компонентов выбрать любой компонент, перейти в сборку по конфигурации → 'Запустить сканирование
    // конфигурации'. Вернуться в паспорт компонента, проверить поле 'Дата последней синхронизации'
    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);
    await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.productVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ACCORDSDK);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.DEFAULT_BRAND_TRUNK);
    await this.componentAssemblyByConfigurationPage.clickOnElementWithText("Запустить сканирование конфигурации");
    await this.componentAssemblyByConfigurationPage.waitForPageReady();
    await this.componentAssemblyByConfigurationPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);
    await this.componentInformationPage.refreshPage();
    await this.componentInformationPage.checkText({ pageText: patternString });
    await this.componentInformationPage.checkText({
      pageText: lastSyncDate,
      visible: false,
    });
  }

  /** Проверка заголовков и значений в таблице.
   *
   * @param firstPage Объект первой страницы.
   * @param secondPage Объект второй страницы.
   * @param firstLink Первая ссылка по которой необходимо перейти.
   * @param secondLink Вторая ссылка по которой необходимо перейти.
   * @param titles Заголовки таблицы.
   * @param values Значения в первой строке таблицы.
   */
  private async checkTitlesAndValuesInTable({
    firstPage,
    secondPage,
    firstLink,
    secondLink,
    titles,
    values,
  }: {
    firstPage: any;
    secondPage: any;
    firstLink: string;
    secondLink: string;
    titles: string[];
    values: string[];
  }): Promise<void> {
    await firstPage.clickOnLink(firstLink);
    await firstPage.clickOnLink(secondLink);

    await secondPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await secondPage.checkTableHeadings(titles);
    await secondPage.checkTableTextValues(values);
  }
}
