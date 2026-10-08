import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { AgreementValues } from "../../src/constants/agreement-values";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { Components } from "../../src/constants/components";
import { Packages } from "../../src/constants/packages";
import { Products } from "../../src/constants/products";
import { Assemblies } from "../../src/constants/assemblies";
import { Versions } from "../../src/constants/versions";

/** Паспорт сборки продукта. */
export class TestProductAssemblyPassport extends BaseTest {
  private readonly LIBC6: string = "libc6";
  private readonly PACKAGE_LIBC6: string = "2.31-13+deb11u8";
  private readonly ACPID_PACKAGE: string = "1:2.0.32-1";

  private readonly TABLE_TITLES: string[] = [
    UITextElements.COMPONENT,
    UITextElements.TEXT_PACKAGE,
    UITextElements.TEXT_PROGRAMMING_LANGUAGE,
    UITextElements.COMPONENT_TYPE,
    UITextElements.AGREEMENT,
    UITextElements.TECHNICAL_RADAR_AREA,
    UITextElements.SECURITY_FUNCTION,
    UITextElements.ATTACK_SURFACE,
  ];

  private readonly TABLE_VALUES_WITHOUT_FILTER: string[] = [
    Components.ACPID,
    this.ACPID_PACKAGE,
    "",
    UITextElements.ABSENT,
    AgreementValues.CHOICE_IS_AGREED,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    UITextElements.NOT_SPECIFIED,
    UITextElements.NOT_SPECIFIED,
  ];

  private readonly TABLE_VALUES_FIRST: string[] = [
    Components.ACPI_SUPPORT_BASE,
    Packages.PACKAGE_ACPI_SUPPORT_BASE,
    UITextElements.BOURNE_SHELL,
    UITextElements.EXTERNAL,
    AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    UITextElements.NOT_SPECIFIED,
    UITextElements.NOT_SPECIFIED,
  ];

  private readonly TABLE_VALUES_SECOND: string[] = [
    this.LIBC6,
    this.PACKAGE_LIBC6,
    "AssemblyawkBashBourne ShellCC++C/C++ HeaderKorn Shellm4PerlPHPPythonSQLAssemblyawkBashЕщё 7",
    UITextElements.ABSENT,
    AgreementValues.DEVIATION_IS_AGREED,
    RadarAreaValues.PILOTED_BY,
    UITextElements.NOT_SPECIFIED,
    UITextElements.NOT_SPECIFIED,
  ];

  /** Паспорт сборки продукта, блок фильтра, отображение. */
  public async testProductAssemblyPassportFilterBlockDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов
    // авторизован в сервисе. Открыт реестр продуктов, выбран продукт, выбрана версия продукта, выбрана сборка
    // продукта, открыт паспорт сборки продукта
    await this.setup();

    // 2. Нажать на иконку в виде воронки
    await this.productAssemblyInformationPage.clickOnFunnelIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.checkResetFiltersButton();

    // 3. Нажать Х (закрыть)
    await this.productAssemblyInformationPage.clickOnCloseFilterBlockIcon();
    await this.productAssemblyInformationPage.checkResetFiltersButton(false);
  }

  /** Паспорт сборки продукта, сброс значений фильтров, обновление страницы. */
  public async testProductAssemblyPassportResettingFilterValuesRefreshPage(): Promise<void> {
    const totalComponents: number = 279;
    const componentsFound: number = 0;

    // 1. Предусловие: Пользователь с правами редактирования и чтения паспортов продуктов и компонентов
    // авторизован в сервисе. Открыт реестр продуктов, выбран продукт, версия продукта, сборка продукта,
    // открыт паспорт сборки продукта, открыт блок фильтра
    await this.setup();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    // 2. В нескольких фильтрах выбрать любые значения
    await this.productAssemblyInformationPage.checkTextTotalComponents(totalComponents);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.EXTERNAL);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(
      AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
    );
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NO);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_INCLUDED);
    await this.productAssemblyInformationPage.checkTextComponentsFound(componentsFound);

    // 3. Нажать кнопку 'Сбросить фильтр'
    await this.productAssemblyInformationPage.clickOnResetFiltersButton();
    await this.productAssemblyInformationPage.checkResetFiltersButton();
    await this.productAssemblyInformationPage.checkTextTotalComponents(totalComponents);

    // 4. Повторить ш.2 и обновить страницу сервиса
    await this.productAssemblyInformationPage.checkTextTotalComponents(totalComponents);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.EXTERNAL);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(
      AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
    );
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NO);
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_INCLUDED);
    await this.productAssemblyInformationPage.checkTextComponentsFound(componentsFound);
    await this.productAssemblyInformationPage.refreshPage();
    await this.productAssemblyInformationPage.checkTextTotalComponents(totalComponents);
    await this.productAssemblyInformationPage.checkResetFiltersButton(false);
  }

  /** Паспорт сборки продукта, фильтр 'Тип компонента'. */
  public async testProductAssemblyPassportFilterComponentType(): Promise<void> {
    // 1. Предусловие: Открыт паспорт сборки продукта, есть используемые компоненты, список используемых
    // компонентов отображается в виде таблицы. Открыт блок фильтра.
    await this.setup();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    //2. Кликнуть в поле фильтра 'Тип компонента'
    const listComboBoxElements: string[] = [UITextElements.ABSENT, UITextElements.INTERNAL, UITextElements.EXTERNAL];

    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.COMPONENT_TYPE,
      listComboBoxElements,
    );

    // 3. Выбрать одно любое значение
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.EXTERNAL);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.COMPONENT_TYPE + UITextElements.COLON_SPACE + UITextElements.EXTERNAL,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableHeadings(this.TABLE_TITLES);
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_FIRST);

    const tempTextComponentsFound: string =
      await this.productAssemblyInformationPage.getTextComponentsFoundWithAnyNumber();

    // 4. Вернуться в фильтр и выбрать еще одно любое значение
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.INTERNAL);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.COMPONENT_TYPE + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_FIRST);
    await this.productAssemblyInformationPage.checkText({ pageText: tempTextComponentsFound, visible: false });

    // 5. Нажать Х (очистить)", async () => {
    await this.productAssemblyInformationPage.clickOnCrossIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_WITHOUT_FILTER);
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
  }

  /** Паспорт сборки продукта, фильтр 'Зона техрадара'. */
  public async testProductAssemblyPassportFilterTechnicalRadarArea(): Promise<void> {
    // 1. Предусловие: Открыт паспорт сборки продукта, есть используемые компоненты, список используемых
    // компонентов отображается в виде таблицы. Открыт блок фильтра.
    await this.setup();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    // 2. Кликнуть в поле фильтра 'Зона техрадара'
    const listComboBoxElements: string[] = [
      RadarAreaValues.RECOMMENDED,
      RadarAreaValues.PILOTED_BY,
      RadarAreaValues.INTERESTED_IN,
      RadarAreaValues.AVOID,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    ];

    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA,
      listComboBoxElements,
    );

    // 3. Выбрать одно любое значение
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE + RadarAreaValues.PILOTED_BY,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableHeadings(this.TABLE_TITLES);
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_SECOND);

    const tempTextComponentsFound: string =
      await this.productAssemblyInformationPage.getTextComponentsFoundWithAnyNumber();

    // 4. Вернуться в фильтр и выбрать еще несколько любых значений
    const tableValues: string[] = [
      Components.BASH,
      Packages.PACKAGE_BASH,
      "",
      UITextElements.ABSENT,
      AgreementValues.NOT_REQUIRED,
      RadarAreaValues.RECOMMENDED,
      UITextElements.NOT_SPECIFIED,
      UITextElements.NOT_SPECIFIED,
    ];

    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableTextValues(tableValues);
    await this.productAssemblyInformationPage.checkText({ pageText: tempTextComponentsFound, visible: false });

    // 5. Нажать Х (очистить)
    await this.productAssemblyInformationPage.clickOnCrossIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_WITHOUT_FILTER);
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
  }

  /** Паспорт сборки продукта, фильтр 'Функция безопасности'. */
  public async testProductAssemblyPassportFilterSecurityFunction(): Promise<void> {
    // 1. Предусловие: Открыт паспорт сборки продукта, есть используемые компоненты, список используемых
    // компонентов отображается в виде таблицы. Открыт блок фильтра.
    await this.setup();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    // 2. Кликнуть в поле фильтра 'Функция безопасности'
    const listComboBoxElements: string[] = [
      UITextElements.NOT_SPECIFIED,
      UITextElements.YES,
      UITextElements.INDIRECTLY,
      UITextElements.NO,
    ];

    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.SECURITY_FUNCTION,
      listComboBoxElements,
    );

    // 3. Выбрать значение 'Не указана'
    const tableValues: string[] = [
      Components.ACPID,
      this.ACPID_PACKAGE,
      "Bourne ShellCC++C/C++ HeaderCUDAKotlinLuaPythonSQLSwiftBourne ShellCC++Ещё 7",
      UITextElements.ABSENT,
      AgreementValues.CHOICE_IS_AGREED,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
      UITextElements.NOT_SPECIFIED,
      UITextElements.NOT_SPECIFIED,
    ];

    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_SPECIFIED);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.SECURITY_FUNCTION + UITextElements.COLON_SPACE + UITextElements.NOT_SPECIFIED,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableHeadings(this.TABLE_TITLES);
    await this.productAssemblyInformationPage.checkTableTextValues(tableValues);

    const tempTextComponentsFound: string =
      await this.productAssemblyInformationPage.getTextComponentsFoundWithAnyNumber();

    // 4. Вернуться в фильтр и выбрать еще несколько значений
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.YES);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.SECURITY_FUNCTION + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableTextValues(tableValues);
    await this.productAssemblyInformationPage.checkText({ pageText: tempTextComponentsFound, visible: false });

    // 5. Нажать Х (очистить)
    await this.productAssemblyInformationPage.clickOnCrossIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_WITHOUT_FILTER);
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
  }

  /** Паспорт сборки продукта, фильтр 'Поверхность атаки'. */
  public async testProductAssemblyPassportFilterAttackSurface(): Promise<void> {
    // 1. Предусловие: Открыт паспорт сборки продукта, есть используемые компоненты, список используемых
    // компонентов отображается в виде таблицы. Открыт блок фильтра.
    await this.setup();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    // 2. Кликнуть в поле 'Поверхность атаки'
    const listComboBoxElements: string[] = [
      UITextElements.NOT_SPECIFIED,
      UITextElements.NOT_INCLUDED,
      UITextElements.INDIRECTLY,
      UITextElements.ENTERS,
    ];

    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.ATTACK_SURFACE,
      listComboBoxElements,
    );

    // 3. Выбрать значение 'Не указана'
    const tableValues: string[] = [
      Components.ACPID,
      this.ACPID_PACKAGE,
      "Bourne ShellCC++C/C++ HeaderCUDAKotlinLuaPythonSQLSwiftBourne ShellCC++Ещё 7",
      UITextElements.ABSENT,
      AgreementValues.CHOICE_IS_AGREED,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
      UITextElements.NOT_SPECIFIED,
      UITextElements.NOT_SPECIFIED,
    ];

    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_SPECIFIED, 1);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.ATTACK_SURFACE + UITextElements.COLON_SPACE + UITextElements.NOT_SPECIFIED,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableHeadings(this.TABLE_TITLES);
    await this.productAssemblyInformationPage.checkTableTextValues(tableValues);

    const tempTextComponentsFound: string =
      await this.productAssemblyInformationPage.getTextComponentsFoundWithAnyNumber();

    // 4. Вернуться в фильтр и выбрать еще несколько значений
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.ENTERS);
    await this.productAssemblyInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_INCLUDED);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.ATTACK_SURFACE + UITextElements.COLON_SPACE + "3",
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkText({ pageText: tempTextComponentsFound, visible: false });

    // 5. Нажать Х (очистить)
    await this.productAssemblyInformationPage.clickOnCrossIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_WITHOUT_FILTER);
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
  }

  /** Паспорт сборки продукта, фильтр 'Верифицированная версия'. */
  public async testProductAssemblyPassportFilterVerifiedVersion(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на чтение паспортов компонентов и продуктов авторизован в сервисе.
    // Открыт паспорт сборки продукта, открыт блок фильтров.
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    // 2. В фильтре 'Верифицированная версия' нажать на экспандер
    await this.productAssemblyInformationPage.checkResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);

    // 3. В фильтре 'Верифицированная версия' выбрать значение 'Да'
    await this.productAssemblyInformationPage.clickOnElementWithText(UITextElements.YES, 1);
    await this.productAssemblyInformationPage.checkText({
      pageText: UITextElements.VERIFIED_VERSION + UITextElements.COLON_SPACE + UITextElements.YES,
    });
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.hoverCursorOverCheckMark(0);
    await this.productAssemblyInformationPage.hoverCursorOverCheckMark(1);

    // 4. В фильтре 'Верифицированная версия' выбрать значение 'Нет'
    await this.productAssemblyInformationPage.refreshPage();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productAssemblyInformationPage.clickOnElementWithText(UITextElements.NO, 1);
    await this.productAssemblyInformationPage.checkText({
      pageText: UITextElements.VERIFIED_VERSION + UITextElements.COLON_SPACE + UITextElements.NO,
    });
    await this.productAssemblyInformationPage.checkCrossIcon(true);
    await this.productAssemblyInformationPage.hoverCursorOverCheckMark(0, false);

    // 5. Нажать Х (очистить)
    await this.productAssemblyInformationPage.clickOnCrossIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
  }

  /** Паспорт сборки продукта, фильтр 'Ссылки'. */
  public async testProductAssemblyPassportFilterLinks(): Promise<void> {
    const thereAreLinksToSourceCode: string = "Есть ссылки на исходный код";
    const noLinksToSourceCode: string = "Нет ссылок на исходный код";

    // 1. Предусловие: Пользователь с правами на чтение паспортов компонентов и продуктов авторизован в сервисе.
    // Открыт паспорт сборки продукта, открыт блок фильтра.
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    // 2. В фильтре 'Ссылки' выбрать значение 'Есть ссылки на исходный код'
    await this.productAssemblyInformationPage.checkResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.LINKS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.LINKS);
    await this.productAssemblyInformationPage.clickOnElementWithText(thereAreLinksToSourceCode);
    await this.productAssemblyInformationPage.checkText({
      pageText: UITextElements.LINKS + UITextElements.COLON_SPACE + thereAreLinksToSourceCode,
    });
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.hoverCursorOverFirstLinkIcon();
    await this.productAssemblyInformationPage.checkText({
      pageText: UITextElements.ALL_LINKS_HAVE_BEEN_ADDED_TO_PACKAGE,
    });
    await this.productAssemblyInformationPage.checkLinksCount(Packages.PACKAGE_ACPI_SUPPORT_BASE, 1);
    await this.productAssemblyInformationPage.checkLinksCount("0~20171227-0.2", 1);
    await this.productAssemblyInformationPage.checkLinksCount("2.4+20151223.gitfa8646d.1-2", 1);
    await this.productAssemblyInformationPage.checkLinksCount("4.7-1", 1);

    // 3. В фильтре 'Ссылки' выбрать значение 'Нет ссылок на исходный код'
    await this.productAssemblyInformationPage.refreshPage();
    await this.productAssemblyInformationPage.clickOnFunnelIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.LINKS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.LINKS);
    await this.productAssemblyInformationPage.clickOnElementWithText(noLinksToSourceCode);
    await this.productAssemblyInformationPage.checkText({
      pageText: UITextElements.LINKS + UITextElements.COLON_SPACE + noLinksToSourceCode,
    });
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkVisibilityFirstLinkIcon(false);
    await this.productAssemblyInformationPage.checkLinksCount("2.6.0-2", 1);
    await this.productAssemblyInformationPage.checkLinksCount("1:9.16.50-1~deb11u2", 6);
  }

  /** Паспорт сборки продукта, фильтр 'Статус согласования'. */
  public async testProductAssemblyPassportFilterApprovalStatus(): Promise<void> {
    // 1. Предусловие: Открыт паспорт сборки продукта, есть используемые компоненты, список используемых
    // компонентов отображается в виде таблицы. Открыт блок фильтра.
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnLink(Assemblies.ASSEMBLY_COORDINATOR_HW_5);
    await this.productAssemblyInformationPage.clickOnFunnelIcon();

    // 2. Кликнуть в поле фильтра 'Статус согласования'
    await this.productAssemblyInformationPage.checkResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);

    // 3. Выбрать одно любое значение
    const listComboBoxElements: string[] = [
      AgreementValues.DEVIATION_IS_AGREED,
      AgreementValues.CHOICE_IS_AGREED,
      AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
      AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
      AgreementValues.NOT_REQUIRED,
    ];

    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.DEVIATION_IS_AGREED);
    await this.productAssemblyInformationPage.checkCheckboxDeviationIsAgreed();
    await this.productAssemblyInformationPage.checkTextComponentsFoundWithAnyNumber();
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.APPROVAL_STATUS + UITextElements.COLON_SPACE + AgreementValues.DEVIATION_IS_AGREED,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableHeadings(this.TABLE_TITLES);
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_SECOND);

    // 4. Выбрать в фильтре еще одно любое значение
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.CHOICE_IS_NOT_AGREED_UPON);
    await this.productAssemblyInformationPage.checkComboBoxListAndTextInFilter(
      UITextElements.APPROVAL_STATUS + UITextElements.COLON_SPACE_TWO,
      listComboBoxElements,
    );
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_FIRST);

    // 5. Выбрать значение отличное от текущих (снять галки со старых значений, установить на новом значении)
    const tableValues: string[] = [
      Components.BZIP2,
      "1.0.8-4",
      "Bourne ShellCC/C++ HeaderPerlBourne ShellCC/C++ HeaderЕщё 7",
      UITextElements.ABSENT,
      AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
      RadarAreaValues.INTERESTED_IN,
      UITextElements.NOT_SPECIFIED,
      UITextElements.NOT_SPECIFIED,
    ];

    await this.productAssemblyInformationPage.clickOnResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.DEVIATION_IS_NOT_AGREED_UPON);
    await this.productAssemblyInformationPage.checkText({
      pageText:
        UITextElements.APPROVAL_STATUS + UITextElements.COLON_SPACE + AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
    });
    await this.productAssemblyInformationPage.checkCrossIcon();
    await this.productAssemblyInformationPage.checkTableTextValues(tableValues);

    // 6. Нажать Х (очистить)
    await this.productAssemblyInformationPage.clickOnCrossIcon();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.productAssemblyInformationPage.checkTableTextValues(this.TABLE_VALUES_WITHOUT_FILTER);

    // 7. Повторить шаги тест-кейса для фильтрации по каждому статусу согласования и фильтрации по нескольким
    // статусам одновременно
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.CHOICE_IS_NOT_AGREED_UPON);
    await this.productAssemblyInformationPage.clickOnResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.CHOICE_IS_AGREED);
    await this.productAssemblyInformationPage.clickOnResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.NOT_REQUIRED);
    await this.productAssemblyInformationPage.clickOnResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.CHOICE_IS_AGREED);
    await this.productAssemblyInformationPage.clickOnElementWithText(AgreementValues.NOT_REQUIRED);
  }

  /** Предусловие: открыть паспорт сборки продукта. */
  private async setup(): Promise<void> {
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnLink(UITextElements.ASSEMBLIES);
    await this.productVersionInformationPage.clickOnLink(Assemblies.ASSEMBLY_COORDINATOR_HW_5);
  }
}
