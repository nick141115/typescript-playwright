import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Products } from "../../src/constants/products";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { Versions } from "../../src/constants/versions";
import { Assemblies } from "../../src/constants/assemblies";
import { TestInputs } from "../../src/constants/test-inputs";
import { Usernames } from "../../src/constants/usernames";

/** Реестр продуктов. */
export class TestProductRegistry extends BaseTest {
  private readonly NINE_ZERO_ONE: string = "5.1.0.901";
  private readonly PRODUCT_VERSION_BUILD: string = "Продукт, версия, сборка";
  private readonly NO_ITEMS_TO_SELECT: string = "Нет элементов для выбора";
  private readonly LOG_ANALYZER: string = "Log Analyzer";
  private readonly LIST_FIRST_PART: string[] = [Products.COORDINATOR_HW_5];
  private readonly LIST_LAST_PART: string[] = [Versions.VERSION_ONE_ONE];
  private readonly LIST_OF_VERSIONS: string[] = [
    Versions.VERSION_FIVE_FIVE_ZERO,
    "5.4.2",
    Versions.VERSION_FIVE_FOUR_ONE,
    Versions.VERSION_COORDINATOR_HW_5,
    "5.3.3",
    "5.3.2",
    "5.3.1",
    "5.3.0",
    "5.2.1",
    Versions.VERSION_FIVE_TWO_ZERO,
    "5.1.2",
    "5.1.1",
    Versions.VERSION_FIVE_ONE_ZERO,
  ];
  private readonly LIST_OF_ASSEMBLIES: string[] = [
    "5.1.0.666",
    "5.1.0.4423",
    "5.1.0.1416",
    "5.1.0.1082",
    this.NINE_ZERO_ONE,
    "5.1.0.795",
    "5.1.0.795",
    "5.1.0.780",
  ];

  /** Реестр продуктов, переход по ссылкам. */
  public async testProductRegistryClickingOnLinks(): Promise<void> {
    // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыта страница
    // 'Продукты', вкладка 'Все продукты'
    await this.setup();

    // 2. В списке выбрать любой продукт → нажать на название продукта
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.checkPageTitle(Products.COORDINATOR_HW_5);
    await this.productInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);

    // 3. Вернуться в реестр продуктов → В списке выбрать любой продукт → нажать на экспандер
    await this.productInformationPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.fillInSearchInput(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
    await this.productPage.checkTableComponentsOrProducts([
      ...this.LIST_FIRST_PART,
      ...this.LIST_OF_VERSIONS,
      ...this.LIST_LAST_PART,
    ]);

    // 4. Нажать на номер версии
    await this.productPage.clickOnLink(Versions.VERSION_FIVE_ONE_ZERO);

    await this.productVersionInformationPage.checkPageTitle(`Версия ${Versions.VERSION_FIVE_ONE_ZERO}`);
    await this.productVersionInformationPage.checkActiveTab(UITextElements.ASSEMBLIES);

    // 5. Вернуться в реестр продуктов → В списке выбрать любой продукт → открыть список версий продукта → в списке
    // выбрать любую версию → нажать на экспандер
    await this.productVersionInformationPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.fillInSearchInput(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnExpander(Versions.VERSION_FIVE_ONE_ZERO);
    await this.productPage.checkTableComponentsOrProducts([
      ...this.LIST_FIRST_PART,
      ...this.LIST_OF_VERSIONS,
      ...this.LIST_OF_ASSEMBLIES,
      ...this.LIST_LAST_PART,
    ]);

    // 6. Нажать на номер сборки
    await this.productPage.clickOnLink(this.NINE_ZERO_ONE);
    await this.productVersionInformationPage.checkPageTitle(`Сборка ${this.NINE_ZERO_ONE}`);
  }

  /** Реестр продуктов, отображение. */
  public async testProductRegistryDisplay(): Promise<void> {
    // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыта страница
    // 'Продукты', вкладка 'Все продукты'.
    await this.setup();

    // 2. Проверить отображение страницы
    await this.productPage.checkResetFiltersButton(false);
    await this.productPage.checkTextTotalProductsWithAnyNumber();

    // Убираем у константы `Products.COORDINATOR_HW_5` последние два символа
    await this.productPage.fillInSearchInput(Products.COORDINATOR_HW_5.slice(0, -2));

    const countFavoritesIndicator: number = await this.productPage.getCountFavoritesIndicator();

    await this.productPage.checkTextProductsFound(countFavoritesIndicator);

    // 3. В списке выбрать любой продукт и нажать на экспандер
    await this.productPage.fillInSearchInput(Products.COORDINATOR_HW_5);
    await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
    await this.productPage.checkTableComponentsOrProducts([
      ...this.LIST_FIRST_PART,
      ...this.LIST_OF_VERSIONS,
      ...this.LIST_LAST_PART,
    ]);

    // 4. В списке версий продукта выбрать любую версию и нажать на экспандер
    await this.productPage.clickOnExpander(Versions.VERSION_FIVE_ONE_ZERO);
    await this.productPage.checkInvisibleExpanders(this.LIST_OF_ASSEMBLIES);
    await this.productPage.checkTableComponentsOrProducts([
      ...this.LIST_FIRST_PART,
      ...this.LIST_OF_VERSIONS,
      ...this.LIST_OF_ASSEMBLIES,
      ...this.LIST_LAST_PART,
    ]);
  }

  /** Реестр продуктов, фильтр 'Верифицированная версия', отображение. */
  public async testProductRegistryFilterVerifiedVersionDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на чтение паспортов компонентов и продуктов авторизован в сервисе, открыт
    // реестр продуктов
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Открыть блок фильтров
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);

    // 3. Нажать на поле фильтра
    await this.productPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.clickOnElementWithText(UITextElements.YES);
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.clickOnElementWithText(UITextElements.NO);

    // 4. Перейти в паспорт версии продукта, вкладка 'Сборки'
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NO);

    // 5. Перейти в паспорт версии продукта, вкладка 'Компонентный состав'
    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES, 1);
    await this.productVersionInformationPage.clickOnResetFiltersButton();
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NO, 1);

    // 6. Перейти в паспорт сборки продукта
    await this.productVersionInformationPage.clickOnLink(UITextElements.ASSEMBLIES);
    await this.productVersionInformationPage.clickOnLink(Assemblies.ASSEMBLY_COORDINATOR_HW_5);

    await this.productAssemblyInformationPage.clickOnFunnelIcon();
    await this.productAssemblyInformationPage.checkResetFiltersButton();
    await this.productAssemblyInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productAssemblyInformationPage.clickOnElementWithText(UITextElements.YES, 1);
    await this.productAssemblyInformationPage.clickOnResetFiltersButton();
    await this.productAssemblyInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productAssemblyInformationPage.clickOnElementWithText(UITextElements.NO, 1);

    // 7. Проверить наличие фильтра в блоке фильтра на страницах: паспорт продукта → вкладка 'Версии', паспорт продукта
    // → вкладка 'Компонентный состав'
    await this.productAssemblyInformationPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnFunnelIcon();
    await this.productInformationPage.checkResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION, false);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productInformationPage.clickOnFunnelIcon();
    await this.productInformationPage.checkResetFiltersButton();
    await this.productInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION, false);
  }

  /** Реестр продуктов, вкладка 'Избранное', нет избранного. */
  public async testProductRegistryFavoritesTabNoFavorites(): Promise<void> {
    // 1. Пользователь с правами на чтение паспортов продуктов авторизован в сервисе, открыт реестр продуктов
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.componentPage.clickOnLinkProducts();

    // 2. Проверить отображение вкладки 'Избранное'
    await this.productPage.checkText({ pageText: UITextElements.FAVORITES_PRODUCTS_ARE_MISSING });

    // 3. Нажать 'Показать все продукты'
    await this.productPage.clickOnLink(UITextElements.SHOW_ALL_PRODUCTS);
    await this.productPage.checkTextTotalProductsWithAnyNumber();
    await this.productPage.checkActiveTab(UITextElements.ALL_PRODUCTS);
  }

  /** Реестр продуктов, фильтр 'Компонентный состав'. */
  public async testProductRegistryFilterComponentComposition(): Promise<void> {
    // 1. Пользователь авторизован в сервисе АР, открыт реестр продуктов, открыт блок фильтра.
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();

    // 2. Кликнуть по фильтру 'Компонентный состав'
    await this.productPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);

    // 3. Выбрать значение 'Файлы обработаны'
    const title: string[] = [this.PRODUCT_VERSION_BUILD];
    let value: string[] = [UITextElements.TEXT_COMPONENTS_ENGLISH];

    await this.productPage.clickOnElementWithText(UITextElements.FILES_PROCESSED);
    await this.productPage.checkText({
      pageText: UITextElements.COMPONENT_COMPOSITION + UITextElements.COLON_SPACE + UITextElements.FILES_PROCESSED,
    });
    await this.productPage.checkTextProductsFoundWithAnyNumber();
    await this.productPage.checkTableHeadings(title);
    await this.productPage.checkTableTextValues(value);

    // 4. Выбрать значение 'Ошибка обработки файлов'
    value = [Products.COORDINATOR_HW_5];

    await this.productPage.clickOnCrossIcon();
    await this.productPage.checkTextTotalProductsWithAnyNumber();
    await this.productPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productPage.clickOnElementWithText(UITextElements.FILE_PROCESSING_ERROR);
    await this.productPage.checkText({
      pageText:
        UITextElements.COMPONENT_COMPOSITION + UITextElements.COLON_SPACE + UITextElements.FILE_PROCESSING_ERROR,
    });
    await this.productPage.checkTextProductsFoundWithAnyNumber();
    await this.productPage.checkTableTextValues(value);

    // 5. Нажать Х
    await this.productPage.clickOnCrossIcon();
    await this.productPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productPage.checkTextTotalProductsWithAnyNumber();
  }

  /** Реестр продуктов, добавить продукт/версию/сборку в избранное. */
  public async testProductRegistryAddProductVersionBuildToFavorites(): Promise<void> {
    try {
      // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыта
      // страница 'Продукты', вкладка 'Все продукты'
      await this.impersonateAsUserWithReadOrWritePermissions(false);
      await this.setup();

      // 2. В реестре выбрать любой продукт (не добавленный в избранное) → нажать иконку в виде звезды
      await this.productPage.clickOnFavoritesIconOff(Products.COORDINATOR_HW_5);
      await this.productPage.checkText({ pageText: Products.COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES });
      await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productPage.clickOnCloseMessageIcon();

      // 3. Перейти на вкладку 'Избранное' → проверить отображение выбранного продукта в избранном
      await this.productPage.clickOnLink(UITextElements.FAVORITES);
      await this.productPage.checkActiveTab(UITextElements.FAVORITES);
      await this.productPage.checkLinksCount(Products.COORDINATOR_HW_5, 1);
      await this.productPage.checkFavoritesIndicator(1);

      // 4. В реестре выбрать любой продукт → раскрыть экспандер → выбрать любую версию продукта (не добавленную в
      // избранное) → нажать иконку в виде звезды
      await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
      await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
      await this.productPage.clickOnFavoritesIconOff(Versions.VERSION_COORDINATOR_HW_5);
      await this.productPage.checkText({
        pageText: Versions.VERSION_COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES,
      });
      await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productPage.clickOnCloseMessageIcon();

      // Перейти на вкладку 'Избранное' → проверить отображение выбранной версии в избранном
      await this.productPage.clickOnLink(UITextElements.FAVORITES);
      await this.productPage.checkActiveTab(UITextElements.FAVORITES);
      await this.productPage.checkLinksCount(Products.COORDINATOR_HW_5, 1);
      await this.productPage.checkLinksCount(Versions.VERSION_COORDINATOR_HW_5, 1);
      await this.productPage.checkFavoritesIndicator(2);
    } finally {
      // Очистка избранного после автотеста
      await this.cleanupFavorites();
    }
  }

  /** Реестр продуктов, удалить продукт/версию/сборку из избранного. */
  public async testProductRegistryRemoveProductVersionBuildFromFavorites(): Promise<void> {
    // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыт реестр
    // продуктов
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.FAVORITES);
    await this.productPage.clickOnAllFavoritesIconsAndAllCloseMessageIcons();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);

    // 2. В реестре выбрать любой продукт (добавленный в избранное, версии и сборки не в избранном) → нажать иконку в
    // виде звезды
    await this.productPage.clickOnFavoritesIconOff(Products.COORDINATOR_HW_5);
    await this.productPage.checkText({ pageText: Products.COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES });
    await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productPage.clickOnCloseMessageIcon();
    await this.productPage.clickOnFavoritesIconOn(Products.COORDINATOR_HW_5);
    await this.productPage.checkText({ pageText: Products.COORDINATOR_HW_5 + UITextElements.DELETED_FROM_FAVORITES });
    await this.productPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productPage.clickOnCloseMessageIcon();

    // 3. Перейти на вкладку 'Избранное' реестра продуктов
    await this.productPage.clickOnLinkProducts();
    await this.productPage.checkText({ pageText: UITextElements.FAVORITES_PRODUCTS_ARE_MISSING });
    await this.productPage.checkLinksCount(UITextElements.SHOW_ALL_PRODUCTS, 1);
  }

  /** Реестр продуктов, блок фильтра, отображение. */
  public async testProductRegistryFilterBlockDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на чтение паспортов продуктов авторизован в сервисе, открыт реестр
    // продуктов на вкладке 'Все продукты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Нажать на иконку воронки
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.clickOnCloseFilterBlockIcon();
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.checkComboBoxInFilter(UITextElements.COMPONENT_COMPOSITION);
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.checkComboBoxInFilter(UITextElements.PLATFORM);
    await this.productPage.checkComboBoxInFilter(UITextElements.APPROVAL_STATUS);
    await this.productPage.checkComboBoxInFilter(UITextElements.DEVELOPMENT_STATUS);
    await this.productPage.checkComboBoxInFilter(UITextElements.TECHNICAL_EXPERT);
    await this.productPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.productPage.checkComboBoxInFilter(UITextElements.OWNER);
    await this.productPage.checkComboBoxInFilter(UITextElements.COMPONENT_TYPE);

    // 3. Обновить страницу сервиса
    await this.productPage.refreshPage();
    await this.productPage.checkResetFiltersButton(false);
    await this.productPage.clickOnFunnelIcon();
  }

  /** Реестр продуктов, фильтр 'Поверхность атаки'. */
  public async testProductRegistryFilterAttackSurface(): Promise<void> {
    const marked_up: string = "Размечена";
    const not_marked_up: string = "Не размечена";

    // 1. Предусловие: Пользователь с правами на чтение паспортов продуктов авторизован в сервисе, открыт реестр
    // продуктов на вкладке 'Все продукты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Нажать на экспандер в фильтре 'Поверхность атаки'
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);

    // 3. Выбрать значение 'Размечена'
    const title: string[] = [this.PRODUCT_VERSION_BUILD];
    let value: string[] = [UITextElements.TEXT_COMPONENTS_ENGLISH];

    await this.productPage.clickOnElementWithText(marked_up);
    await this.productPage.checkText({ pageText: not_marked_up, visible: false });
    await this.productPage.checkText({
      pageText: UITextElements.ATTACK_SURFACE + UITextElements.COLON_SPACE + marked_up,
    });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTableHeadings(title);
    await this.productPage.checkTableTextValues(value);

    // 4. Выбрать значение 'Не размечена'
    value = [Products.COORDINATOR_AR_2];

    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productPage.clickOnElementWithText(not_marked_up);
    await this.productPage.checkText({
      pageText: UITextElements.ATTACK_SURFACE + UITextElements.COLON_SPACE + not_marked_up,
    });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTableHeadings(title);
    await this.productPage.checkTableTextValues(value);
  }

  /** Реестр продуктов, фильтр 'Верифицированная версия'. */
  public async testProductRegistryFilterVerifiedVersion(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на чтение паспортов продуктов авторизован в сервисе, открыт реестр
    // продуктов на вкладке 'Все продукты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Нажать на экспандер в фильтре 'Верифицированная версия'
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);

    // 3. Выбрать значение 'Да'
    const title: string[] = [this.PRODUCT_VERSION_BUILD];

    await this.productPage.clickOnElementWithText(UITextElements.YES);
    await this.productPage.checkText({ pageText: UITextElements.NO, visible: false });
    await this.productPage.checkText({
      pageText: UITextElements.VERIFIED_VERSION + UITextElements.COLON_SPACE + UITextElements.YES,
    });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTableHeadings(title);
    await this.productPage.checkLinksCount(Products.COORDINATOR_AR_2, 0);

    // 4. Выбрать значение 'Нет'
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.clickOnElementWithText(UITextElements.NO);
    await this.productPage.checkText({
      pageText: UITextElements.VERIFIED_VERSION + UITextElements.COLON_SPACE + UITextElements.NO,
    });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTableHeadings(title);
    await this.productPage.checkLinksCount(Products.COORDINATOR_IG_4, 1);
  }

  /** Реестр продуктов, фильтр 'Язык программирования'. */
  public async testProductRegistryFilterProgrammingLanguageText(): Promise<void> {
    const java: string = "Java";
    const java_script: string = "JavaScript";

    // 1. Предусловие: Пользователь с правами на чтение паспортов продуктов авторизован в сервисе, открыт реестр
    // продуктов на вкладке 'Все продукты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Нажать на экспандер в фильтре 'Язык программирования'
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);

    // 3. Отметить чек-бокс 'Не указан' галкой
    await this.productPage.clickOnElementWithText(UITextElements.ABSENT, 1);
    await this.productPage.checkCheckboxNotSpecified();
    await this.productPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.checkText({
      pageText: UITextElements.TEXT_PROGRAMMING_LANGUAGE + UITextElements.COLON_SPACE + UITextElements.ABSENT,
    });
    await this.productPage.checkCrossIcon();

    // 4. Ввести невалидное значение
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.TEXT_PROGRAMMING_LANGUAGE,
      TestInputs.SPECIAL_CHARACTERS,
    );
    await this.productPage.checkText({ pageText: this.NO_ITEMS_TO_SELECT });

    // 5. Ввести валидное значение в верхнем/нижнем/смешанном регистре
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.fillInComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE, UITextElements.PYTHON);
    await this.productPage.clickOnElementWithText(UITextElements.PYTHON);
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.TEXT_PROGRAMMING_LANGUAGE,
      UITextElements.PYTHON.toUpperCase(),
    );
    await this.productPage.clickOnElementWithText(UITextElements.PYTHON);
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.TEXT_PROGRAMMING_LANGUAGE,
      UITextElements.PYTHON.toLowerCase(),
    );
    await this.productPage.clickOnElementWithText(UITextElements.PYTHON);

    // 6. Ввести валидное значение с пробелами до и после
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.TEXT_PROGRAMMING_LANGUAGE,
      ` ${UITextElements.PYTHON} `,
    );
    await this.productPage.clickOnElementWithText(UITextElements.PYTHON);

    // 7. Выбрать из найденного один ЯП и закрыть выпадающий список
    await this.productPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.checkText({
      pageText: UITextElements.TEXT_PROGRAMMING_LANGUAGE + UITextElements.COLON_SPACE + UITextElements.PYTHON,
    });
    await this.productPage.checkCrossIcon();

    // 8. Выбрать еще один ЯП
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.fillInComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE, java);
    await this.productPage.clickOnElementWithText(java);
    await this.productPage.clickOnElementWithText(java_script);
    await this.productPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.checkText({
      pageText: UITextElements.TEXT_PROGRAMMING_LANGUAGE + UITextElements.COLON_SPACE_TWO,
    });
    await this.productPage.checkCrossIcon();
  }

  /** Реестр продуктов, фильтр 'Пакетный менеджер'. */
  public async testProductRegistryFilterPackageManager(): Promise<void> {
    const pypi: string = "Pypi";

    // 1. Предусловие: Пользователь с правами на чтение паспортов продуктов авторизован в сервисе, открыт реестр
    // продуктов на вкладке 'Все продукты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Нажать на экспандер в фильтре 'Пакетный менеджер'
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.PACKAGE_MANAGER);

    // 3. Отметить чек-бокс 'Не указан' галкой
    const list_combo_box_elements: string[] = [
      UITextElements.ABSENT,
      UITextElements.ANT_IVY,
      "APT",
      "CONAN",
      "CONAN2",
      "NPM",
      "NUGET",
      pypi.toUpperCase(),
    ];
    const title: string[] = [this.PRODUCT_VERSION_BUILD];
    let value: string[] = [Products.COORDINATOR_HW_5];

    await this.productPage.clickOnElementWithText(UITextElements.ABSENT, 4);
    await this.productPage.checkComboBoxListAndTextInFilter(
      UITextElements.PACKAGE_MANAGER + UITextElements.COLON_SPACE + UITextElements.ABSENT,
      list_combo_box_elements,
    );
    await this.productPage.checkTableHeadings(title);
    await this.productPage.checkTableTextValues(value);

    // 4. Нажать Х
    value = [UITextElements.TEXT_COMPONENTS_ENGLISH];

    await this.productPage.clickOnCrossIcon();
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.checkTextTotalProductsWithAnyNumber();
    await this.productPage.checkTableTextValues(value);

    // 5. Ввести невалидное название пакетного менеджера
    await this.productPage.fillInComboBoxInFilter(UITextElements.PACKAGE_MANAGER, TestInputs.SPECIAL_CHARACTERS);
    await this.productPage.checkText({ pageText: this.NO_ITEMS_TO_SELECT });

    // 6. Очистить поле фильтра
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.checkTextTotalProductsWithAnyNumber();
    await this.productPage.checkTableTextValues(value);

    // 7. Ввести часть название пакетного менеджера в верхнем/нижнем/смешанном регистре
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    // Убираем у переменной `pypi` последний символ
    await this.productPage.fillInComboBoxInFilter(UITextElements.PACKAGE_MANAGER, pypi.slice(0, -1));
    await this.productPage.clickOnElementInComboBoxInFilter(pypi.toUpperCase());
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    // Убираем у переменной `pypi` последний символ
    await this.productPage.fillInComboBoxInFilter(UITextElements.PACKAGE_MANAGER, pypi.slice(0, -1).toLowerCase());
    await this.productPage.clickOnElementInComboBoxInFilter(pypi.toUpperCase());
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    // Убираем у переменной `pypi` последний символ
    await this.productPage.fillInComboBoxInFilter(UITextElements.PACKAGE_MANAGER, pypi.slice(0, -1).toUpperCase());
    await this.productPage.clickOnElementInComboBoxInFilter(pypi.toUpperCase());

    // 8. Ввести пробелы до/после названия пакетного менеджера
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.fillInComboBoxInFilter(UITextElements.PACKAGE_MANAGER, ` ${pypi.toUpperCase()} `);

    // 9. Выбрать пакетный менеджер из списка
    value = [this.LOG_ANALYZER];

    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.checkCheckboxWithTextInComboBoxInFilter(pypi.toUpperCase(), false);
    await this.productPage.clickOnElementInComboBoxInFilter(pypi.toUpperCase());
    await this.productPage.checkCheckboxWithTextInComboBoxInFilter(pypi.toUpperCase());
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.checkText({
      pageText: UITextElements.PACKAGE_MANAGER + UITextElements.COLON_SPACE + pypi.toUpperCase(),
    });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTableTextValues(value);

    // 10. Выбрать еще один пакетный менеджер из списка
    await this.productPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.productPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.ANT_IVY, false);
    await this.productPage.clickOnElementInComboBoxInFilter(UITextElements.ANT_IVY);
    await this.productPage.checkCheckboxWithTextInComboBoxInFilter(UITextElements.ANT_IVY);
    await this.productPage.checkText({ pageText: UITextElements.PACKAGE_MANAGER + UITextElements.COLON_SPACE_TWO });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTableTextValues(value);
  }

  /** Реестр продуктов, фильтр 'Ответственный за реализацию'. */
  public async testProductRegistryFilterResponsibleForImplementation(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на чтение паспортов продуктов авторизован в сервисе, открыт реестр
    // продуктов на вкладке 'Все продукты'
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Нажать на экспандер в фильтре 'Ответственный за реализацию'
    await this.productPage.clickOnFunnelIcon();
    await this.productPage.checkResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.checkText({ pageText: "Пожалуйста, введите минимум 2 символа" });

    // 3. Отметить чек-бокс 'Не указан' галкой
    await this.productPage.clickOnElementWithText(UITextElements.ABSENT);
    await this.productPage.checkText({
      pageText: UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION + UITextElements.COLON_SPACE + UITextElements.ABSENT,
    });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTextProductsFoundWithAnyNumber();

    // 4. Нажать 'Сбросить фильтр'
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.checkTextTotalProductsWithAnyNumber();

    // 5. Установить курсор в поле 'Ответственный за реализацию'
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);

    // 6. Ввести невалидное ФИО сотрудника
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION,
      TestInputs.SPECIAL_CHARACTERS,
    );
    await this.productPage.checkText({ pageText: this.NO_ITEMS_TO_SELECT });

    // 7. Очистить поле фильтра
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);

    // 8. Ввести часть ФИО сотрудника в верхнем/нижнем/смешанном регистре
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION,
      // Убираем у константы `Usernames.USER_WITH_READ_PERMISSIONS` последние 5 символов
      Usernames.USER_WITH_READ_PERMISSIONS.slice(0, -5).toLowerCase(),
    );
    await this.productPage.clickOnElementWithText(Usernames.USER_WITH_READ_PERMISSIONS, 1);

    // 9. Ввести часть ФИО сотрудника с пробелами до и после ввода
    await this.productPage.clickOnResetFiltersButton();
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION,
      // Убираем у константы `Usernames.USER_WITH_READ_PERMISSIONS` последние 5 символов
      ` ${Usernames.USER_WITH_READ_PERMISSIONS.slice(0, -5)} `,
    );

    // 10. Выбрать сотрудника из списка
    const title: string[] = [this.PRODUCT_VERSION_BUILD];
    let value: string[] = [this.LOG_ANALYZER];

    await this.productPage.clickOnElementWithText(Usernames.USER_WITH_READ_PERMISSIONS, 1);
    await this.productPage.checkCheckboxResponsibleForImplementation();
    await this.productPage.checkTableHeadings(title);
    await this.productPage.checkTableTextValues(value);

    // 11. Нажать за пределами фильтра
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTextWithEllipses(Usernames.USER_WITH_READ_PERMISSIONS);

    // 12. Повторить шаги 10 и 11 для выбора еще одного ответственного
    value = [UITextElements.TEXT_COMPONENTS_ENGLISH];

    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.fillInComboBoxInFilter(
      UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION,
      Usernames.USER_WITH_WRITE_PERMISSIONS,
    );
    await this.productPage.clickOnElementWithText(Usernames.USER_WITH_WRITE_PERMISSIONS);
    await this.productPage.checkCheckboxResponsibleForImplementation();
    await this.productPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.clickOnComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.productPage.checkText({
      pageText: UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION + UITextElements.COLON_SPACE_TWO,
    });
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTableTextValues(value);

    // 13. Нажать Х в фильтре
    await this.productPage.clickOnCrossIcon();
    await this.productPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.productPage.checkTextTotalProductsWithAnyNumber();
  }

  /** Реестр продуктов, поле поиска, невалидные данные. */
  public async testProductSearchInvalidData(): Promise<void> {
    // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыта страница
    // 'Продукты', вкладка 'Все продукты'
    await this.setup();

    // 2. В поле поиска ввести часть названия несуществующего продукта/номер версии продукта/номер сборки
    await this.productPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);
    await this.productPage.checkSearchInput(TestInputs.SPECIAL_CHARACTERS);
    await this.productPage.checkCrossIcon();
    await this.productPage.checkTextProductsFound(0);
    await this.productPage.checkText({ pageText: UITextElements.NOTHING_FOUND });
  }

  /** Реестр продуктов, поле поиска, валидные данные. */
  public async testProductSearchValidData(): Promise<void> {
    const componentsFound: number = 1;

    // 1. Пользователь с правами на чтение и редактирование паспортов продуктов авторизован в сервисе, открыта страница
    // 'Продукты', вкладка 'Все продукты'.
    await this.setup();

    // 2. В поле поиска ввести часть названия продукта

    // Убираем у константы `Products.PRIME` последний символ
    await this.productPage.fillInSearchInput(Products.PRIME.slice(0, -1));
    await this.productPage.checkSearchInput(Products.PRIME.slice(0, -1));
    await this.productPage.checkCrossIcon();
    // Проверяем, что текст 'Prim' выделен жёлтым цветом
    await this.productPage.checkYellowBacklight(Products.PRIME.slice(0, -1));
    await this.productPage.checkTextProductsFound(componentsFound);

    // 3. Нажать Х
    await this.productPage.clickOnCrossIcon();
    await this.productPage.checkSearchInput("");
    await this.productPage.checkCrossIcon(false);
    await this.productPage.checkTextTotalProductsWithAnyNumber();

    // 4. В поле поиска ввести часть названия продукта в верхнем/нижнем/смешанном регистре
    await this.productPage.fillInSearchInput(Products.PRIME.toUpperCase());
    await this.productPage.checkSearchInput(Products.PRIME.toUpperCase());
    await this.productPage.checkCrossIcon();
    await this.productPage.checkYellowBacklight(Products.PRIME);
    await this.productPage.checkTextProductsFound(componentsFound);

    // 5. Нажать Х
    await this.productPage.clickOnCrossIcon();
    await this.productPage.checkSearchInput("");
    await this.productPage.checkCrossIcon(false);
    await this.productPage.checkTextTotalProductsWithAnyNumber();

    // 6. В поле поиска ввести часть названия продукта, до/после введенных символов добавить пробелы
    await this.productPage.fillInSearchInput(` ${Products.PRIME} `);
    await this.productPage.checkSearchInput(` ${Products.PRIME} `);
    await this.productPage.checkCrossIcon();
    await this.productPage.checkYellowBacklight(Products.PRIME);
    await this.productPage.checkTextProductsFound(componentsFound);

    // 7. Нажать Х
    await this.productPage.clickOnCrossIcon();
    await this.productPage.checkSearchInput("");
    await this.productPage.checkCrossIcon(false);
    await this.productPage.checkTextTotalProductsWithAnyNumber();
  }

  /** Предусловие: реестр продуктов → вкладка 'Все продукты'. */
  private async setup(): Promise<void> {
    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
  }
}
