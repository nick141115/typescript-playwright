import { BaseTest } from "../base/base-test";
import { Components } from "../../src/constants/components";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Packages } from "../../src/constants/packages";
import { Versions } from "../../src/constants/versions";
import * as allure from "allure-js-commons";

/** Вкладка 'Компоненты-потребители'. */
export class TestConsumerComponentsTab extends BaseTest {
  private readonly TABLE_VALUES: string[] = [Components.IPS, RadarAreaValues.RADAR_AREA_IS_UNKNOWN];

  /** Вкладка 'Компоненты-потребители', сброс значений фильтров, обновление страницы. */
  public async testConsumerComponentsTabResettingFilterValuesRefreshPage(): Promise<void> {
    await allure.description(`Баг: Текст 'Всего [любое число] компонент(а/ов)' не отображается на странице.`);

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов
    // авторизован в сервисе. Открыт реестр компонентов, выбран компонент, открыт паспорт компонента на вкладке
    // 'Компоненты-потребители', открыт блок фильтра
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentInformationPage.clickOnFunnelIcon();

    // 2. В фильтре выбрать несколько любых значений
    await this.applyRadarFilterAndVerify(this.componentInformationPage, this.TABLE_VALUES);

    // 3. Нажать кнопку 'Сбросить фильтр'
    let tableValues: string[] = [Components.CRYPT_PASSWORD_FORGE, RadarAreaValues.RECOMMENDED];
    await this.clickResetFilterButton(this.componentInformationPage, tableValues);

    // 4. Повторить ш.2 и обновить страницу сервиса
    await this.applyRadarFilterAndVerify(this.componentInformationPage, this.TABLE_VALUES);
    await this.refreshServicePage(this.componentInformationPage);

    // 5. Повторить шаги тест-кейса для паспорта версии компонента, вкладка 'Компоненты-потребители'
    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);
    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentInformationPage.clickOnFunnelIcon();

    // В фильтре выбрать несколько любых значений
    tableValues = [Components.IPS, Versions.VERSION_ACCORDSDK, RadarAreaValues.RADAR_AREA_IS_UNKNOWN];
    await this.applyRadarFilterAndVerify(this.componentVersionInformationPage, tableValues);

    // Нажать кнопку 'Сбросить фильтр'
    tableValues = [Components.CRYPT_PASSWORD_FORGE, Versions.VERSION_ONE_ONE, RadarAreaValues.RECOMMENDED];
    await this.clickResetFilterButton(this.componentVersionInformationPage, tableValues);

    // Повторить ш.2 и обновить страницу сервиса
    tableValues = [Components.IPS, Versions.VERSION_ACCORDSDK, RadarAreaValues.RADAR_AREA_IS_UNKNOWN];
    await this.applyRadarFilterAndVerify(this.componentVersionInformationPage, tableValues);
    await this.refreshServicePage(this.componentVersionInformationPage);

    // 6. Повторить шаги тест-кейса для паспорта конфигурации компонента, вкладка 'Компоненты-потребители'
    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ACCORDSDK);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.DEFAULT_BRAND_TRUNK);
    await this.componentAssemblyByConfigurationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentAssemblyByConfigurationPage.clickOnFunnelIcon();

    // В фильтре выбрать несколько любых значений
    tableValues = [
      Components.UPRNG,
      Versions.VERSION_ONE_SIX,
      "1.6.3.1400",
      UITextElements.LINUX_RELEASE_ONE_SIX_X,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    ];
    await this.applyRadarFilterAndVerify(this.componentAssemblyByConfigurationPage, tableValues);

    // Нажать кнопку 'Сбросить фильтр'
    await this.clickResetFilterButton(this.componentAssemblyByConfigurationPage, tableValues);

    // Повторить ш.2 и обновить страницу сервиса
    await this.applyRadarFilterAndVerify(this.componentAssemblyByConfigurationPage, tableValues);
    await this.refreshServicePage(this.componentAssemblyByConfigurationPage);
  }

  /** Паспорт компонента, вкладка 'Компоненты-потребители', фильтр 'Зона техрадара', отображение. */
  public async testComponentPassportConsumerComponentsTabTechnicalRadarZoneFilterDisplay(): Promise<void> {
    const listComboBoxElements: string[] = [
      RadarAreaValues.RECOMMENDED,
      RadarAreaValues.PILOTED_BY,
      RadarAreaValues.INTERESTED_IN,
      RadarAreaValues.AVOID,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    ];

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован в
    // сервисе. Открыт реестр компонентов, выбран компонент и открыт его паспорт на вкладке 'Компоненты-потребители'
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);
    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);

    // 2. Кликнуть в поле фильтра 'Зона техрадара'
    await this.clickOnTechRadarZoneFilterField(this.componentInformationPage, listComboBoxElements);

    // 3. Повторить шаги тест-кейса для паспорта версии компонента, вкладка 'Компоненты-потребители'",
    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);
    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);

    // Кликнуть в поле фильтра 'Зона техрадара'
    await this.clickOnTechRadarZoneFilterField(this.componentVersionInformationPage, listComboBoxElements);

    // 4. Повторить шаги тест-кейса для паспорта конфигурации компонента, вкладка 'Компоненты-потребители'
    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ACCORDSDK);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.clickOnLink(UITextElements.DEFAULT_BRAND_TRUNK);
    await this.componentAssemblyByConfigurationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);

    // Кликнуть в поле фильтра 'Зона техрадара'
    await this.clickOnTechRadarZoneFilterField(this.componentAssemblyByConfigurationPage, listComboBoxElements);
  }

  /** Применить фильтр по зоне технического радара и проверить результаты. */
  private async applyRadarFilterAndVerify(page: any, tableValues: any[]): Promise<void> {
    await page.checkTextTotalComponentsWithAnyNumber();
    await page.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await page.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await page.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await page.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await page.checkTableTextValues(tableValues);
    await page.checkTextComponentsFoundWithAnyNumber();
  }

  /** Нажать кнопку 'Сбросить фильтр'. */
  private async clickResetFilterButton(page: any, tableValues: any[]): Promise<void> {
    await page.clickOnResetFiltersButton();
    await page.checkResetFiltersButton();
    await page.checkTableTextValues(tableValues);
    await page.checkTextTotalComponentsWithAnyNumber();
  }

  /** Обновить страницу сервиса. */
  private async refreshServicePage(page: any): Promise<void> {
    await page.refreshPage();
    await page.checkTextTotalComponentsWithAnyNumber();
    await page.checkResetFiltersButton(false);
  }

  /** Кликнуть в поле фильтра 'Зона техрадара'. */
  private async clickOnTechRadarZoneFilterField(page: any, listComboBoxElements: any[]): Promise<void> {
    await page.clickOnFunnelIcon();
    await page.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await page.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await page.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await page.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await page.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
  }
}
