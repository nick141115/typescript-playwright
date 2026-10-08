import { BaseTest } from "../base/base-test";
import { AgreementValues } from "../../src/constants/agreement-values";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Products } from "../../src/constants/products";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { Versions } from "../../src/constants/versions";
import { Components } from "../../src/constants/components";
import { Lists } from "../../src/constants/lists";
import { Assemblies } from "../../src/constants/assemblies";
import * as allure from "allure-js-commons";

/** Паспорт продукта. */
export class TestProductPassport extends BaseTest {
  private static readonly APPROVAL_CHANGED_SUCCESSFULLY: string = "Согласование успешно изменено";

  private static readonly COMBO_BOX_LIST_FILTER_APPROVAL_STATUS: string[] = [
    AgreementValues.DEVIATION_IS_AGREED,
    AgreementValues.CHOICE_IS_AGREED,
    AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
    AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
    AgreementValues.NOT_REQUIRED,
  ];

  private static readonly TITLES: string[] = [
    " ",
    UITextElements.COMPONENT,
    UITextElements.TECHNICAL_RADAR_AREA,
    UITextElements.AGREEMENT,
    "Обоснование/Комментарий",
  ];

  /** Очистка комментария и checkbox'а. */
  private async clearCommentAndCheckbox(): Promise<void> {
    // Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыт
    // паспорт продукта на вкладке 'Компонентный состав'
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

    // Нажать 'Редактировать'
    await this.productInformationPage.clickOnElementWithText(UITextElements.EDIT);

    // Убрать галку в чек-боксе 'Согласование'
    await this.productInformationPage.clickOnFunnelIcon();
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementWithText(AgreementValues.CHOICE_IS_AGREED);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementWithText(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productInformationPage.clickOnElementWithText(UITextElements.AGREEMENT, 1);

    // В поле 'Обоснование/Комментарий' очистить комментарий
    await this.productInformationPage.fillInTextareaJustificationComment("");

    // Нажать 'Сохранить'
    await this.productInformationPage.clickOnIconFloppyDisk();

    // Нажать 'Да'
    await this.productInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productInformationPage.checkText({ pageText: TestProductPassport.APPROVAL_CHANGED_SUCCESSFULLY });
    await this.productInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productInformationPage.checkVisibilityCloseMessageIcon();
  }

  /** Паспорт продукта, вкладка 'Компонентный состав', отображение фильтра. */
  async testProductPassportComponentCompositionTabDisplayFilter(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт и открыт его паспорт на вкладке 'Компонентный состав'
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

    // 2. Нажать на иконку в виде воронки
    await this.productInformationPage.clickOnFunnelIcon();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.checkResetFiltersButton();

    // 3. Нажать Х (закрыть)
    await this.productInformationPage.clickOnCloseFilterBlockIcon();
    await this.productInformationPage.checkResetFiltersButton(false);
  }

  /** Паспорт продукта, вкладка 'Компонентный состав', сброс значений фильтров, обновление страницы. */
  async testProductPassportComponentCompositionTabResettingFilterValuesRefreshPage(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт и открыт его паспорт на вкладке 'Компонентный состав',
    // открыт блок фильтра
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnFunnelIcon();

    // 2. В фильтрах 'Зона техрадара' и 'Статус согласования' выбрать любые значения
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 3. Нажать 'Сбросить фильтр'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkResetFiltersButton();
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();

    // 4. Повторить шаг 2 текущего тест-кейса
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 5. Обновить страницу сервиса
    await this.productInformationPage.refreshPage();
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.checkResetFiltersButton(false);
  }

  /** Паспорт продукта, вкладка 'Компонентный состав', фильтр 'Статус согласования', отображение. */
  async testProductPassportComponentCompositionTabFilterApprovalStatusDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт и открыт его паспорт на вкладке 'Компонентный состав',
    // открыт блок фильтра
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnFunnelIcon();

    // 2. Кликнуть в поле фильтра 'Статус согласования'
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.CHOICE_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.APPROVAL_STATUS + UITextElements.COLON_SPACE_TWO,
      TestProductPassport.COMBO_BOX_LIST_FILTER_APPROVAL_STATUS,
    );
  }

  /** Паспорт продукта, вкладка 'Компонентный состав', фильтр 'Зона техрадара', отображение. */
  async testProductPassportComponentCompositionTabFilterTechnicalRadarAreaDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт и открыт его паспорт на вкладке 'Компонентный состав',
    // открыт блок фильтра

    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnFunnelIcon();

    // 2. Кликнуть в поле фильтра 'Зона техрадара'
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );
  }

  /** Фильтр 'Компонентный состав', паспорт продукта, вкладка 'Версии'. */
  async testProductPassportFilterComponentCompositionVersionsTab(): Promise<void> {
    // 1. Пользователь авторизован в сервисе АР, открыт паспорт продукта → вкладка 'Версии', открыт блок фильтра'
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnFunnelIcon();
    await this.productInformationPage.checkResetFiltersButton();

    // 2. Кликнуть по фильтру 'Компонентный состав'
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);

    // 3. Выбрать значение 'Файлы обработаны'
    const title: string[] = [UITextElements.TEXT_VERSION];
    let value: string[] = [Versions.VERSION_FIVE_FIVE_ZERO];

    await this.productInformationPage.clickOnElementWithText(UITextElements.FILES_PROCESSED);
    await this.productInformationPage.checkText({
      pageText: UITextElements.COMPONENT_COMPOSITION + UITextElements.COLON_SPACE + UITextElements.FILES_PROCESSED,
    });
    await this.productInformationPage.checkTextVersionsFoundWithAnyNumber();
    await this.productInformationPage.checkTableHeadings(title);
    await this.productInformationPage.checkTableTextValues(value);

    // 4. Выбрать значение 'Ошибка обработки файлов'
    value = [Versions.VERSION_FIVE_ONE_ZERO];

    await this.productInformationPage.clickOnCrossIcon();
    await this.productInformationPage.checkTextTotalVersionsWithAnyNumber();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnElementWithText(UITextElements.FILE_PROCESSING_ERROR);
    await this.productInformationPage.checkText({
      pageText:
        UITextElements.COMPONENT_COMPOSITION + UITextElements.COLON_SPACE + UITextElements.FILE_PROCESSING_ERROR,
    });
    await this.productInformationPage.checkTextVersionsFoundWithAnyNumber();
    await this.productInformationPage.checkTableTextValues(value);

    // 5. Нажать Х
    await this.productInformationPage.clickOnCrossIcon();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.checkTextTotalVersionsWithAnyNumber();
  }

  /** Паспорт продукта, вкладка 'Компонентный состав', фильтр 'Статус согласования'. */
  async testProductPassportComponentCompositionTabFilterApprovalStatus(): Promise<void> {
    await allure.description(`Баг: Текст 'Всего [любое число] компонент(а/ов)' не отображается на странице.`);

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт и открыт его паспорт на вкладке 'Компонентный состав',
    // открыт блок фильтра
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnFunnelIcon();

    // 2. В фильтре 'Статус согласования' нажать на экспандер'
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.CHOICE_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.APPROVAL_STATUS + UITextElements.COLON_SPACE_TWO,
      TestProductPassport.COMBO_BOX_LIST_FILTER_APPROVAL_STATUS,
    );

    // 3. В фильтре 'Статус согласования' выбрать одно любое значение
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkCheckboxWithTextInComboBoxInFilter(
      AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
    );
    await this.productInformationPage.checkTextComponentsFoundWithAnyNumber();

    let tempTextComponentsFound: string = await this.productInformationPage.getTextComponentsFoundWithAnyNumber();

    // 4. В фильтре 'Статус согласования' выбрать еще одно любое значение
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.CHOICE_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkCheckboxWithTextInComboBoxInFilter(
      AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
    );
    await this.productInformationPage.checkText({ pageText: tempTextComponentsFound, visible: false });

    // 5. Выбрать все значения в фильтре
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_AGREED);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.CHOICE_IS_AGREED);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.NOT_REQUIRED);
    await this.productInformationPage.checkTextComponentsFoundWithAnyNumber();

    tempTextComponentsFound = await this.productInformationPage.getTextComponentsFoundWithAnyNumber();

    // 6. Нажать 'Сбросить фильтр'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.checkText({ pageText: tempTextComponentsFound.slice(7, -10), visible: false });
  }

  /** Паспорт продукта, вкладка 'Компонентный состав', фильтр 'Зона техрадара'. */
  async testProductPassportComponentCompositionTabFilterTechnicalRadarArea(): Promise<void> {
    await allure.description(`Баг: Текст 'Всего [любое число] компонент(а/ов)' не отображается на странице.`);

    const firstValues: string[] = [
      " ",
      Components.BONNIE_PLUS_PLUS,
      RadarAreaValues.INTERESTED_IN,
      AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
      "",
    ];

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт и открыт его паспорт на вкладке 'Компонентный состав',
    // открыт блок фильтра
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnFunnelIcon();
    await this.productInformationPage.checkTableHeadings(TestProductPassport.TITLES);
    await this.productInformationPage.checkTableTextValues(firstValues);

    // 2. В фильтре 'Зона техрадара' нажать на экспандер
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);

    // 3. В фильтре 'Зона техрадара' выбрать одно любое значение
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productInformationPage.checkTableTextValues(Lists.VALUES_BASH);

    const tempTextComponentsFound: string = await this.productInformationPage.getTextComponentsFoundWithAnyNumber();

    // 4. В фильтре 'Зона техрадара' выбрать еще одно любое значение
    const values: string[] = [
      " ",
      Components.UTIL_LINUX,
      RadarAreaValues.PILOTED_BY,
      AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
      "",
    ];

    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productInformationPage.checkText({ pageText: tempTextComponentsFound, visible: false });
    await this.productInformationPage.checkTableTextValues(values);

    // 5. Закрыть выпадающий список
    await this.productInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);

    // 6. Открыть выпадающий список, проверить отображение выбранных значений
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productInformationPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );

    // 7. Выбрать все значения в фильтре
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productInformationPage.checkTableTextValues(firstValues);

    const tempTextComponentsFound2 = await this.productInformationPage.getTextComponentsFoundWithAnyNumber();

    // 8. Нажать 'Сбросить фильтр'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.checkTableTextValues(firstValues);
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.checkText({ pageText: tempTextComponentsFound2.slice(7, -10), visible: false });
  }

  /** Паспорт продукта, вкладка 'Компонентный состав', комбинация фильтров. */
  async testProductPassportComponentCompositionTabFilterCombination(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов авторизован
    // в сервисе. Открыт реестр продуктов, выбран продукт и открыт его паспорт на вкладке 'Компонентный состав',
    // открыт блок фильтра
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnFunnelIcon();

    // 2. В фильтре 'Статус согласования' выбрать значение 'Не требуется'
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.NOT_REQUIRED);
    await this.productInformationPage.checkText({
      pageText: UITextElements.APPROVAL_STATUS + UITextElements.COLON_SPACE + AgreementValues.NOT_REQUIRED,
    });
    await this.productInformationPage.checkTableHeadings(TestProductPassport.TITLES);
    await this.productInformationPage.checkTableTextValues(Lists.VALUES_BASH);
    await this.productInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 3. Очистить значение фильтра 'Статус согласования'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.checkTextTotalComponentsWithAnyNumber();

    // 4. В фильтре 'Зона техрадара' выбрать значение 'Рекомендуется'
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE + RadarAreaValues.RECOMMENDED,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );
    await this.productInformationPage.checkTextComponentsFoundWithAnyNumber();

    // 5. Комбинации фильтров:
    // 6. 'Рекомендуется' + 'Выбор не согласован'/'Отклонение не согласовано'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkText({ pageText: UITextElements.NOTHING_FOUND });

    // 7. 'Неизвестна' + 'Выбор согласован'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.CHOICE_IS_AGREED);
    await this.productInformationPage.checkTableTextValues(Lists.VALUES_ACPID);

    // 8. 'Неизвестна' + 'Выбор не согласован'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.CHOICE_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkTableTextValues(Lists.VALUES_ACCORDSDK);

    // 9. 'Избегать'/'Пилотируется'/'Интересует' (один из статусов) + 'Отклонение согласовано'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_AGREED);
    await this.productInformationPage.checkTableTextValues(Lists.VALUES_CRYPT_CPU_FEATURES);

    // 10. ('Избегать' + 'Пилотируется') + 'Отклонение согласовано'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_AGREED);

    // 11. 'Избегать'/'Пилотируется'/'Интересует' (один из статусов) + 'Отклонение не согласовано'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkTableTextValues(Lists.VALUES_CRYPTO_UNDERGROUND_V2);

    // 12. ('Избегать' + 'Пилотируется' + 'Интересует') + 'Отклонение не согласовано'
    await this.productInformationPage.clickOnResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);

    const tempTextComponentsFound: string = await this.productInformationPage.getTextComponentsFoundWithAnyNumber();

    // 13. Очистить фильтр 'Зона радара', проверить значения в таблице
    const values: string[] = [
      " ",
      Components.BONNIE_PLUS_PLUS,
      RadarAreaValues.INTERESTED_IN,
      AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
      "",
    ];

    await this.productInformationPage.refreshPage();
    await this.productInformationPage.clickOnFunnelIcon();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productInformationPage.clickOnElementInComboBoxInFilter(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productInformationPage.checkTableTextValues(values);
    await this.productInformationPage.checkText({ pageText: tempTextComponentsFound });
  }

  /** Паспорт объекта продукта, удалить из избранного. */
  async testProductPassportDeleteFromFavorites(): Promise<void> {
    // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыта
    // страница 'Продукты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnFavoritesIconOff(Products.COORDINATOR_HW_5);
    await this.productPage.checkText({ pageText: Products.COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES });
    await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productPage.clickOnCloseMessageIcon();
    await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnFavoritesIconOff(Versions.VERSION_COORDINATOR_HW_5);
    await this.productPage.checkText({
      pageText: Versions.VERSION_COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES,
    });
    await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productPage.clickOnCloseMessageIcon();
    await this.productPage.clickOnExpander(Versions.VERSION_COORDINATOR_HW_5);
    await this.productPage.clickOnFavoritesIconOff(Assemblies.ASSEMBLY_COORDINATOR_HW_5);
    await this.productPage.checkText({
      pageText: Assemblies.ASSEMBLY_COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES,
    });
    await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productPage.clickOnCloseMessageIcon();
    await this.productPage.clickOnLink(UITextElements.FAVORITES);

    // 2. В реестре продуктов выбрать любой продукт с индикатором избранного → перейти в паспорт продукта
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    // 3. Нажать на индикатор избранного
    await this.productInformationPage.clickOnFavoritesIcon();
    await this.productInformationPage.checkText({ pageText: UITextElements.FAVORITES });
    await this.productInformationPage.checkText({
      pageText: Products.COORDINATOR_HW_5 + UITextElements.DELETED_FROM_FAVORITES,
    });
    await this.productInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productInformationPage.clickOnCloseMessageIcon();
    await this.productInformationPage.checkFavoritesIconOff();

    // 4. Вернуться в реестр продуктов, выбрать любой продукт → раскрыть экспандер → выбрать любую версию продукта,
    // добавленную в избранное → открыть паспорт версии продукта → Нажать на индикатор избранного
    await this.productInformationPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);
    await this.productVersionInformationPage.clickOnFavoritesIcon();
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.FAVORITES });
    await this.productVersionInformationPage.checkText({
      pageText: Versions.VERSION_COORDINATOR_HW_5 + UITextElements.DELETED_FROM_FAVORITES,
    });
    await this.productVersionInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productVersionInformationPage.clickOnCloseMessageIcon();
    await this.productVersionInformationPage.checkFavoritesIconOff();

    // 5. Вернуться в реестр продуктов, выбрать любой продукт → раскрыть экспандер → выбрать любую версию продукта →
    // раскрыть экспандер → выбрать любую сборку продукта, добавленную в избранное → открыть паспорт сборки продукта
    // → Нажать на индикатор избранного
    await this.productVersionInformationPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnExpander(Versions.VERSION_COORDINATOR_HW_5);
    await this.productPage.clickOnLink(Assemblies.ASSEMBLY_COORDINATOR_HW_5);
    await this.productAssemblyInformationPage.clickOnFavoritesIcon();
    await this.productAssemblyInformationPage.checkText({ pageText: UITextElements.FAVORITES });
    await this.productAssemblyInformationPage.checkText({
      pageText: Assemblies.ASSEMBLY_COORDINATOR_HW_5 + UITextElements.DELETED_FROM_FAVORITES,
    });
    await this.productAssemblyInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productAssemblyInformationPage.clickOnCloseMessageIcon();
    await this.productAssemblyInformationPage.checkFavoritesIconOff();

    // 6. Вернуться в реестр продуктов → для продукта из ш2, версии продукта из ш4, сборки продукта из ш5 проверить
    // отображение индикатора избранного
    await this.productAssemblyInformationPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnExpander(Versions.VERSION_COORDINATOR_HW_5);
    await this.productPage.checkCountFavoritesIndicatorOn(0);

    // 7. Перейти на вкладку 'Избранное'
    await this.productPage.goToPreviousOrNextPage();
    await this.productPage.clickOnLink(UITextElements.FAVORITES);
    await this.productPage.checkText({ pageText: UITextElements.FAVORITES_PRODUCTS_ARE_MISSING });
    await this.productPage.checkLinksCount(UITextElements.SHOW_ALL_PRODUCTS, 1);
  }

  /** Паспорт объекта продукта, добавить в Избранное. */
  async testProductPassportAddToFavorites(): Promise<void> {
    try {
      // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыта
      // страница 'Продукты'
      await this.impersonateAsUserWithReadOrWritePermissions(false);

      await this.componentPage.clickOnLinkProducts();

      // 2. В списке выбрать любой продукт не добавленный в избранное → открыть паспорт продукта → Нажать на индикатор
      // избранного
      await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
      await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
      await this.productPage.clickOnFavoritesIcon();
      await this.productPage.checkText({ pageText: UITextElements.FAVORITES });
      await this.productPage.checkText({ pageText: Products.COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES });
      await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productPage.clickOnCloseMessageIcon();
      await this.productPage.checkFavoritesIconOn();

      // 3. Вернуться в реестр продуктов, выбрать любой продукт → раскрыть экспандер → выбрать любую версию продукта
      // не добавленную в избранное → открыть паспорт версии продукта → Нажать на индикатор избранного
      await this.productInformationPage.clickOnLinkProducts();
      await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
      await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
      await this.productPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);
      await this.productVersionInformationPage.clickOnFavoritesIcon();
      await this.productVersionInformationPage.checkText({ pageText: UITextElements.FAVORITES });
      await this.productVersionInformationPage.checkText({
        pageText: Versions.VERSION_COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES,
      });
      await this.productVersionInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productVersionInformationPage.clickOnCloseMessageIcon();
      await this.productVersionInformationPage.checkFavoritesIconOn();

      // 4. Вернуться в реестр продуктов, выбрать любой продукт → раскрыть экспандер → выбрать любую версию продукта →
      // раскрыть экспандер → выбрать любую сборку продукта не добавленную в избранное → открыть паспорт сборки
      // продукта → Нажать на индикатор избранного
      await this.productVersionInformationPage.clickOnLinkProducts();
      await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
      await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
      await this.productPage.clickOnExpander(Versions.VERSION_COORDINATOR_HW_5);
      await this.productPage.clickOnLink(Assemblies.ASSEMBLY_COORDINATOR_HW_5);
      await this.productAssemblyInformationPage.clickOnFavoritesIcon();
      await this.productAssemblyInformationPage.checkText({ pageText: UITextElements.FAVORITES });
      await this.productAssemblyInformationPage.checkText({
        pageText: Assemblies.ASSEMBLY_COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES,
      });
      await this.productAssemblyInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productAssemblyInformationPage.clickOnCloseMessageIcon();
      await this.productAssemblyInformationPage.checkFavoritesIconOn();

      // 5. Вернуться в реестр продуктов → для продукта из ш2, версии продукта из ш3, сборки продукта из ш4 проверить
      // отображение индикатора избранного
      await this.productAssemblyInformationPage.clickOnLinkProducts();
      await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
      await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
      await this.productPage.clickOnExpander(Versions.VERSION_COORDINATOR_HW_5);
      await this.productPage.checkCountFavoritesIndicatorOn(3);

      // 6. Перейти на вкладку 'Избранное'
      await this.productPage.clickOnLinkProducts();
      await this.productPage.clickOnFavoritesIconOn(Assemblies.ASSEMBLY_COORDINATOR_HW_5);
      await this.productPage.checkText({
        pageText: Assemblies.ASSEMBLY_COORDINATOR_HW_5 + UITextElements.DELETED_FROM_FAVORITES,
      });
      await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productPage.clickOnCloseMessageIcon();
      await this.productPage.clickOnFavoritesIconOn(Products.COORDINATOR_HW_5);
      await this.productPage.checkText({ pageText: Products.COORDINATOR_HW_5 + UITextElements.DELETED_FROM_FAVORITES });
      await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productPage.clickOnCloseMessageIcon();
      await this.productPage.clickOnFavoritesIconOn(Versions.VERSION_COORDINATOR_HW_5);
      await this.productPage.checkText({
        pageText: Versions.VERSION_COORDINATOR_HW_5 + UITextElements.DELETED_FROM_FAVORITES,
      });
      await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productPage.clickOnCloseMessageIcon();
    } finally {
      // Очистка избранного после автотеста
      await this.cleanupFavorites();
    }
  }

  /** Паспорт продукта, согласование отклонения от техрадара. */
  async testProductPassportApprovalOfDeviationsFromTechnicalRadar(): Promise<void> {
    const comment: string = "a".repeat(1000);

    try {
      // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыт
      // паспорт продукта на вкладке 'Компонентный состав'
      await this.componentPage.clickOnLinkProducts();
      await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
      await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
      await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

      // 2. Нажать 'Редактировать'
      await this.productInformationPage.clickOnElementWithText(UITextElements.EDIT);
      await this.productInformationPage.checkText({ pageText: UITextElements.EDIT, visible: false });
      await this.productInformationPage.checkVisibilityCancelEditingButton();

      // 3. В списке выбрать любой несогласованный компонент с зоной техрадара 'Неизвестна' → отметить чек-бокс
      // 'Согласование' галкой
      await this.productInformationPage.clickOnFunnelIcon();
      await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
      await this.productInformationPage.clickOnElementWithText(AgreementValues.CHOICE_IS_NOT_AGREED_UPON);
      await this.productInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
      await this.productInformationPage.clickOnElementWithText(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
      await this.productInformationPage.clickOnElementWithText(UITextElements.AGREEMENT, 1);
      await this.productInformationPage.fillInTextareaJustificationComment("");
      await this.productInformationPage.checkText({ pageText: "Поле с обоснованием не заполнено" });
      await this.productInformationPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.AGREEMENT);
      await this.productInformationPage.checkVisibilityTextareaJustificationComment();
      await this.productInformationPage.checkRedBacklightForTextarea();
      await this.productInformationPage.checkTextInTextareaJustificationComment("");

      // 4. Нажать 'Сохранить'
      await this.productInformationPage.clickOnIconFloppyDisk();
      await this.productInformationPage.checkText({ pageText: UITextElements.QUESTION, visible: false });

      // 5. В поле 'Обоснование/Комментарий' добавить валидный комментарий до 1000 символов (включительно)
      await this.productInformationPage.fillInTextareaJustificationComment(comment);
      await this.productInformationPage.checkTextInTextareaJustificationComment(comment);
      await this.productInformationPage.checkAttributesInTextareaJustificationComment();

      // 6. Нажать 'Сохранить'
      await this.productInformationPage.clickOnIconFloppyDisk();
      await this.productInformationPage.checkText({ pageText: UITextElements.QUESTION });
      await this.productInformationPage.checkText({ pageText: UITextElements.NO });
      await this.productInformationPage.checkTitleModal();

      // 7. Нажать 'Да'
      await this.productInformationPage.clickOnElementWithText(UITextElements.YES);
      await this.productInformationPage.checkText({ pageText: TestProductPassport.APPROVAL_CHANGED_SUCCESSFULLY });
      await this.productInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productInformationPage.checkVisibilityCloseMessageIcon();
      await this.productInformationPage.checkText({
        pageText: TestProductPassport.APPROVAL_CHANGED_SUCCESSFULLY,
        visible: false,
        timeout: 6000,
      });
    } finally {
      // Очистка комментария и checkbox'а
      await this.clearCommentAndCheckbox();
    }
  }
}
