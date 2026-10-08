import { BaseTest } from "../base/base-test";
import { Components } from "../../src/constants/components";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Packages } from "../../src/constants/packages";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { Lists } from "../../src/constants/lists";
import { Products } from "../../src/constants/products";
import { Versions } from "../../src/constants/versions";
import * as allure from "allure-js-commons";

/** Паспорт версии продукта. */
export class TestProductVersionPassport extends BaseTest {
  private readonly FIRST_STRING_VALUES_WITHOUT_FILTERS: string[] = [
    " ",
    Components.ACPI_SUPPORT_BASE,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    Packages.PACKAGE_ACPI_SUPPORT_BASE,
    UITextElements.NOT_SPECIFIED,
    "",
    UITextElements.NOT_SPECIFIED,
    "",
  ];

  private readonly FIRST_STRING_VALUES: string[] = [
    " ",
    Components.BIND9_DEV,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    "1:9.16.50-1~deb11u2",
    UITextElements.NO,
    "",
    UITextElements.NOT_INCLUDED,
    "",
  ];

  /** Паспорт версии продукта, вкладка 'Компонентный состав', отображение фильтра. */
  public async testProductVersionPassportComponentCompositionTabDisplayFilter(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, открыт паспорт версии продукта
    // на вкладке "Компонентный состав
    await this.setupVersionOfProductComponentComposition();

    // 2. Нажать на иконку в виде воронки
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.checkResetFiltersButton();

    // 3. Нажать Х (закрыть)
    await this.productInformationPage.clickOnCloseFilterBlockIcon();
    await this.productInformationPage.checkResetFiltersButton(false);
  }

  /** Паспорт версии продукта, вкладка "Компонентный состав", сброс значений фильтров, обновление страницы. */
  public async testComponentCompositionTabResettingFilterValuesRefreshPage(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт, версия продукта, открыт паспорт версии продукта на
    // вкладке "Компонентный состав", открыт блок фильтра
    await this.setupVersionOfProductComponentComposition();

    await this.productVersionInformationPage.clickOnFunnelIcon();

    // 2. В нескольких фильтрах выбрать любые значения
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.YES);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_INCLUDED);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 3. Нажать кнопку "Сбросить фильтр"
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();

    // 4. Повторить ш.2 и обновить страницу сервиса
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.YES);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_INCLUDED);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.refreshPage();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkResetFiltersButton(false);
  }

  /** Паспорт версии продукта, вкладка "Компонентный состав", фильтр "Зона техрадара", отображение. */
  public async testComponentCompositionTabFilterTechnicalRadarAreaDisplay(): Promise<void> {
    //1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован в
    // сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, открыт паспорт версии продукта на
    // вкладке "Компонентный состав"
    await this.setupVersionOfProductComponentComposition();

    // 2. Кликнуть в поле фильтра 'Зона техрадара'
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productVersionInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );
  }

  /** Паспорт версии продукта, вкладка "Компонентный состав", фильтр "Функция безопасности", отображение. */
  public async testProductVersionPassportComponentCompositionTabFilterSecurityFunctionDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, открыт паспорт версии продукта на
    // вкладке "Компонентный состав"
    await this.setupVersionOfProductComponentComposition();

    // 2. Кликнуть в поле фильтра 'Функция безопасности'
    const listComboBoxElements: string[] = [
      UITextElements.NOT_SPECIFIED,
      UITextElements.YES,
      UITextElements.INDIRECTLY,
      UITextElements.NO,
    ];

    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.YES);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NO);
    await this.productVersionInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.SECURITY_FUNCTION + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
  }

  /** Паспорт версии продукта, вкладка "Компонентный состав", фильтр "Поверхность атаки", отображение. */
  public async testProductVersionPassportComponentCompositionTabFilterAttackSurfaceDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, открыт паспорт версии продукта
    // на вкладке "Компонентный состав"
    await this.setupVersionOfProductComponentComposition();

    // 2. Кликнуть в поле фильтра 'Поверхность атаки'
    const listComboBoxElements: string[] = [
      UITextElements.NOT_SPECIFIED,
      UITextElements.NOT_INCLUDED,
      UITextElements.INDIRECTLY,
      UITextElements.ENTERS,
    ];

    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_INCLUDED);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.ENTERS);
    await this.productVersionInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.ATTACK_SURFACE + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
  }

  /** Фильтр "Компонентный состав", паспорт версии продукта, вкладка "Сборки". */
  public async testProductVersionPassportFilterComponentCompositionAssembliesTab(): Promise<void> {
    // 1. Пользователь авторизован в сервисе АР, открыт паспорт версии продукта → вкладка "Сборки", открыт блок
    // фильтра
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkResetFiltersButton();

    // 2. Кликнуть по фильтру 'Компонентный состав'
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);

    // 3. Выбрать значение 'Файлы обработаны'
    const titles: string[] = [UITextElements.ASSEMBLY, "Дистрибутив", "Хранилище сборок"];
    let value: string[] = ["5.4.0.2299", "Coordinator HWVA", "PDC"];

    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.FILES_PROCESSED);
    await this.productVersionInformationPage.checkText({
      pageText: UITextElements.COMPONENT_COMPOSITION + UITextElements.COLON_SPACE + UITextElements.FILES_PROCESSED,
    });
    await this.productVersionInformationPage.checkTextAssembliesFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableHeadings(titles);
    await this.productVersionInformationPage.checkTableTextValues(value);

    // 4. Выбрать значение 'Ошибка обработки файлов'
    await this.productVersionInformationPage.clickOnCrossIcon();
    await this.productVersionInformationPage.checkTextTotalAssembliesWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.FILE_PROCESSING_ERROR);
    await this.productVersionInformationPage.checkText({
      pageText:
        UITextElements.COMPONENT_COMPOSITION + UITextElements.COLON_SPACE + UITextElements.FILE_PROCESSING_ERROR,
    });
    await this.productVersionInformationPage.checkTextAssembliesFoundWithAnyNumber();
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.NOTHING_FOUND });

    // 5. Нажать Х
    value = ["5.4.0.7008", "", ""];

    await this.productVersionInformationPage.clickOnCrossIcon();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.checkTextTotalAssembliesWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(value);
  }

  /** Паспорт версии продукта, вкладка "Компонентный состав", фильтр "Зона техрадара". */
  public async testProductVersionPassportComponentCompositionTabFilterTechnicalRadarArea(): Promise<void> {
    await allure.description(`Баг: Текст 'Всего [любое число] компонент(а/ов)' не отображается на странице.`);

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, открыт паспорт версии продукта
    // на вкладке "Компонентный состав"
    await this.setupVersionOfProductComponentComposition();

    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkTableHeadings(Lists.TITLES_TABLE_COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.checkTableTextValues(this.FIRST_STRING_VALUES_WITHOUT_FILTERS);

    // 2. Кликнуть в поле фильтра 'Зона техрадара'
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);

    // 3. В фильтре 'Зона техрадара' выбрать одно любое значение
    const values: string[] = [
      " ",
      Components.BASH,
      RadarAreaValues.RECOMMENDED,
      Packages.PACKAGE_BASH,
      UITextElements.NOT_SPECIFIED,
      "",
      UITextElements.NOT_SPECIFIED,
      "",
    ];

    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(values);

    let tempTextComponentsFound: string = await this.productInformationPage.getTextComponentsFoundWithAnyNumber();

    // 4. В фильтре 'Зона техрадара' выбрать еще одно любое значение
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productVersionInformationPage.checkText({
      pageText: tempTextComponentsFound,
      visible: false,
    });

    // 5. Закрыть выпадающий список
    await this.productVersionInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);

    // 6. Открыть выпадающий список, проверить отображение выбранных значений
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productVersionInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // 7. Выбрать все значения в фильтре
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productVersionInformationPage.checkTableTextValues(this.FIRST_STRING_VALUES_WITHOUT_FILTERS);

    tempTextComponentsFound = await this.productInformationPage.getTextComponentsFoundWithAnyNumber();

    // 8. Нажать 'Сбросить фильтр'
    const componentCountFirstSymbol = 7;
    const componentCountLastSymbol = -11;

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productVersionInformationPage.checkTableTextValues(this.FIRST_STRING_VALUES_WITHOUT_FILTERS);
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkText({
      pageText: tempTextComponentsFound.substring(componentCountFirstSymbol, componentCountLastSymbol),
      // tempTextComponentsFound.slice(componentCountFirstSymbol, componentCountLastSymbol);
      exact: false,
    });
  }

  /** Паспорт версии продукта, вкладка "Компонентный состав", фильтр "Поверхность атаки". */
  public async testProductVersionPassportComponentCompositionTabFilterAttackSurface(): Promise<void> {
    await allure.description(`Баг: Текст 'Всего [любое число] компонент(а/ов)' не отображается на странице.`);

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, открыт паспорт версии продукта
    // на вкладке "Компонентный состав"
    await this.setupVersionOfProductComponentComposition();

    // 2. Кликнуть в поле фильтра 'Поверхность атаки'
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);

    // 3. В фильтре 'Поверхность атаки' выбрать значение 'Не указана'
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 1);
    await this.productVersionInformationPage.checkCheckboxNotSpecified();
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 4. Нажать 'Сбросить фильтр'
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();

    // 5. Повторить шаги тест кейса для выбора следующих значений в фильтре 'Поверхность атаки':
    // 6. Не указана + одно из значений: Входит/Косвенно/Не входит
    const listComboBoxElements: string[] = [
      UITextElements.NOT_SPECIFIED,
      UITextElements.NOT_INCLUDED,
      UITextElements.INDIRECTLY,
      UITextElements.ENTERS,
    ];

    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 1);
    await this.productVersionInformationPage.checkCheckboxNotSpecified();
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_INCLUDED);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.NOT_INCLUDED);
    await this.productVersionInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.ATTACK_SURFACE + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 7. Значение 'Входит'
    let firstStringValues: string[] = [
      " ",
      "libcrypt1",
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
      "1:4.4.18-4",
      UITextElements.NO,
      "",
      UITextElements.ENTERS,
      "",
    ];

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.ENTERS);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableHeadings(Lists.TITLES_TABLE_COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.checkTableTextValues(firstStringValues);

    // 8. Значение 'Не входит'
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_INCLUDED);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(this.FIRST_STRING_VALUES);

    // 9. Значение 'Косвенно'
    firstStringValues = [
      " ",
      "libgcc-s1",
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
      "10.2.1-6",
      UITextElements.NOT_SPECIFIED,
      "",
      UITextElements.INDIRECTLY,
      "",
    ];

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY, 1);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(firstStringValues);

    // 10. 'Не указана' + 'Не входит' + 'Косвенно' + 'Входит'
    const componentCountFirstSymbol = 7;
    const componentCountLastSymbol = -11;

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY, 1);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 1);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_INCLUDED);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.ENTERS);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(this.FIRST_STRING_VALUES_WITHOUT_FILTERS);

    const tempTextComponentsFound: string =
      await this.productVersionInformationPage.getTextComponentsFoundWithAnyNumber();

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkText({
      pageText: tempTextComponentsFound.substring(componentCountFirstSymbol, componentCountLastSymbol),
      // tempTextComponentsFound.slice(componentCountFirstSymbol, componentCountLastSymbol);
      exact: false,
    });
  }

  /** Паспорт версии продукта, вкладка "Компонентный состав", фильтр "Функция безопасности". */
  public async testProductVersionPassportComponentCompositionTabFilterSecurityFunction(): Promise<void> {
    await allure.description(`Баг: Текст 'Всего [любое число] компонент(а/ов)' не отображается на странице.`);

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, открыт паспорт версии продукта
    // на вкладке "Компонентный состав"
    await this.setupVersionOfProductComponentComposition();

    // 2. Кликнуть в поле фильтра 'Функция безопасности'
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);

    // 3. В фильтре 'Функция безопасности' выбрать значение 'Не указана'
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 4. Нажать 'Сбросить фильтр'
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();

    // 5. Повторить шаги тест кейса для выбора следующих значений в фильтре 'Функция безопасности':
    // 6. Не указана + одно из значений: Да/Косвенно/Нет
    const listComboBoxElements: string[] = [
      UITextElements.NOT_SPECIFIED,
      UITextElements.YES,
      UITextElements.INDIRECTLY,
      UITextElements.NO,
    ];

    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productVersionInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.SECURITY_FUNCTION + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 7. Значение 'Да'
    let firstStringValues: string[] = [
      " ",
      "libxtables12",
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
      "1.8.7-1",
      UITextElements.YES,
      "",
      UITextElements.NOT_SPECIFIED,
      "",
    ];

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.YES);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableHeadings(Lists.TITLES_TABLE_COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.checkTableTextValues(firstStringValues);

    // 8. Значение 'Нет'
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NO);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.NO);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(this.FIRST_STRING_VALUES);
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NO);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.NO);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productVersionInformationPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.YES);

    // 9. Значение 'Косвенно'
    firstStringValues = [
      " ",
      "libtinfo6",
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
      "6.2+20201114-2+deb11u1",
      UITextElements.INDIRECTLY,
      "",
      UITextElements.NOT_SPECIFIED,
      "",
    ];

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(firstStringValues);

    // 10. 'Не указана' + 'Да' + 'Косвенно' + 'Нет'
    const componentCountFirstSymbol = 7;
    const componentCountLastSymbol = -11;

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NO);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productVersionInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productVersionInformationPage.checkTableTextValues(this.FIRST_STRING_VALUES_WITHOUT_FILTERS);

    const tempTextComponentsFound: string =
      await this.productVersionInformationPage.getTextComponentsFoundWithAnyNumber();

    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productVersionInformationPage.checkText({
      pageText: tempTextComponentsFound.substring(componentCountFirstSymbol, componentCountLastSymbol),
      // tempTextComponentsFound.slice(componentCountFirstSymbol, componentCountLastSymbol);
      exact: false,
    });
  }
}
