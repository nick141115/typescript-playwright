import { BaseTest } from "../base/base-test";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Lists } from "../../src/constants/lists";
import { Components } from "../../src/constants/components";
import { TestInputs } from "../../src/constants/test-inputs";
import { Versions } from "../../src/constants/versions";

/** Реестр компонентов. */
export class TestComponentRegistry extends BaseTest {
  private readonly SHOW_ALL_COMPONENTS = "Показать все компоненты";

  /** Реестр компонентов, отображение. */
  public async testComponentRegistryDisplay(): Promise<void> {
    const fourPointFivePointZero: string = "4.5.0";
    const systemIoPipelines: string = "System.IO.Pipelines";
    const fourPointFive: string = "4.5";
    const fourPointfivePointTwo: string = "4.5.2";
    const textDefault: string = "default";

    // 1. Пользователь авторизован в сервисе, открыт реестр компонентов, отсутствуют избранные компоненты
    // 2. Проверить отображение страницы по умолчанию
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.checkText({ pageText: "Отсутствуют избранные компоненты" });
    await this.componentPage.checkLinksCount(this.SHOW_ALL_COMPONENTS, 1);

    // 3. Нажать "Показать все компоненты"
    const listFirstPart = [
      "minipass-pipeline",
      Components.PIP,
      "Pipelines.Sockets.Unofficial",
      "python-pip-whl",
      "python3-pip",
      systemIoPipelines,
    ];
    const listSecondPart = ["System.IO.Pipes", "System.IO.Pipes.AccessControl", "unpipe", "WireMock.Net.OpenApiParser"];

    await this.componentPage.clickOnLink(this.SHOW_ALL_COMPONENTS);
    await this.componentPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentPage.fillInSearchInput(Components.PIP);
    await this.componentPage.checkFavoritesIndicator(10);
    await this.componentPage.checkTableComponentsOrProducts([...listFirstPart, ...listSecondPart]);

    // 4. В списке выбрать любой компонент и раскрыть экспандер
    const listOfVersions = ["8.0", "7.0", "6.0", "5.0", fourPointFive];

    await this.componentPage.clickOnExpander(systemIoPipelines);
    await this.componentPage.checkFavoritesIndicator(15);
    await this.componentPage.checkTableComponentsOrProducts([...listFirstPart, ...listOfVersions, ...listSecondPart]);

    // 5. В списке выбрать любую версию компонента и раскрыть экспандер
    const listOfPackages = ["4.5.3", fourPointfivePointTwo, fourPointFivePointZero];

    await this.componentPage.clickOnExpander(fourPointFive);
    await this.componentPage.checkFavoritesIndicator(18);
    await this.componentPage.checkTableComponentsOrProducts([
      ...listFirstPart,
      ...listOfVersions,
      ...listOfPackages,
      ...listSecondPart,
    ]);

    // 6. В списке выбрать любой пакет компонента и раскрыть экспандер
    const listOfAssemblies = [textDefault];

    await this.componentPage.clickOnExpander(fourPointFivePointZero);
    await this.componentPage.checkFavoritesIndicator(19);
    await this.componentPage.checkTableComponentsOrProducts([
      ...listFirstPart,
      ...listOfVersions,
      ...listOfPackages,
      ...listOfAssemblies,
      ...listSecondPart,
    ]);

    // 7. Нажать на название любого компонента
    await this.componentPage.checkHref(systemIoPipelines, "/components/component/system_io_pipelines");

    // 8. Нажать на номер любой версии компонента
    await this.componentPage.checkHref(fourPointFive, "/components/componentVersion/system_io_pipelines__4_5", true);

    // 9. Нажать на любой пакет компонента
    await this.componentPage.checkHref(
      fourPointfivePointTwo,
      "/components/componentPackage/nuget__System_IO_Pipelines__4_5_2",
    );

    // 10. Нажать на любую сборку по конфигурации

    await this.componentPage.checkHref(
      textDefault,
      "/components/componentConfiguration/5bed7a4cc08a75806ae243d4635f41c0c4415fbc74a8acb255d454aaedf9f2d6",
    );
    await this.componentPage.clickOnFunnelIcon();
  }

  /** Реестр компонентов, фильтр 'Верифицированная версия', отображение. */
  public async testComponentRegistryFilterVerifiedVersionDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на чтение паспортов компонентов авторизован в сервисе.
    // Открыт реестр компонентов
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. Открыть блок фильтров
    await this.componentPage.clickOnFunnelIcon();
    await this.componentPage.checkResetFiltersButton();
    await this.componentPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);

    // 3. Нажать на поле фильтра
    await this.componentPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.componentPage.clickOnElementWithText(UITextElements.YES);
    await this.componentPage.clickOnResetFiltersButton();
    await this.componentPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.componentPage.clickOnElementWithText(UITextElements.NO);

    // 4. Перейти в паспорт версии компонента, вкладка "Пакеты" → Открыть блок фильтров
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    await this.componentVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.componentVersionInformationPage.clickOnFunnelIcon();
    await this.componentVersionInformationPage.checkResetFiltersButton();
    await this.componentVersionInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);

    // 5. Нажать на поле фильтра
    await this.componentVersionInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.componentVersionInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.componentVersionInformationPage.clickOnResetFiltersButton();
    await this.componentVersionInformationPage.clickOnComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.componentVersionInformationPage.clickOnElementWithText(UITextElements.NO);

    // 6. Проверить наличие фильтра в блоке фильтра на страницах: паспорт компонента → вкладка "Версии" паспорт
    // компонента → вкладка "Компоненты-потребители", паспорт версии компонента → вкладка "Компоненты-потребители"
    await this.componentVersionInformationPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnFunnelIcon();
    await this.componentInformationPage.checkResetFiltersButton();
    await this.componentInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION, false);
    await this.componentInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentInformationPage.clickOnFunnelIcon();
    await this.componentInformationPage.checkResetFiltersButton();
    await this.componentInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION, false);
    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    await this.componentVersionInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentVersionInformationPage.clickOnFunnelIcon();
    await this.componentVersionInformationPage.checkResetFiltersButton();
    await this.componentVersionInformationPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION, false);
  }

  /** Реестр компонентов, блок фильтра, отображение. */
  public async testComponentRegistryFilterBlockDisplay(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на чтение паспортов компонентов авторизован в сервисе, открыт реестр
    // компонентов на вкладке "Все компоненты"
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. Нажать на иконку воронки
    await this.componentPage.clickOnFunnelIcon();
    await this.componentPage.clickOnCloseFilterBlockIcon();
    await this.componentPage.clickOnFunnelIcon();
    await this.componentPage.checkResetFiltersButton();
    await this.componentPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentPage.checkComboBoxInFilter(UITextElements.TEXT_PROGRAMMING_LANGUAGE);
    await this.componentPage.checkComboBoxInFilter(UITextElements.LICENSE);
    await this.componentPage.checkComboBoxInFilter(UITextElements.TECHNICAL_EXPERT);
    await this.componentPage.checkComboBoxInFilter(UITextElements.COMPONENT_TYPE);
    await this.componentPage.checkComboBoxInFilter(UITextElements.DEVELOPMENT_STATUS);
    await this.componentPage.checkComboBoxInFilter("Документация");
    await this.componentPage.checkComboBoxInFilter(UITextElements.VERIFIED_VERSION);
    await this.componentPage.checkComboBoxInFilter(UITextElements.PACKAGE_MANAGER);
    await this.componentPage.checkComboBoxInFilter("Продукт-потребитель");
    await this.componentPage.checkComboBoxInFilter(UITextElements.RESPONSIBLE_FOR_IMPLEMENTATION);
    await this.componentPage.checkComboBoxInFilter(UITextElements.LINKS);
    await this.componentPage.checkComboBoxInFilter(UITextElements.PLATFORM);
    await this.componentPage.checkComboBoxInFilter("Компонент-потребитель");
    await this.componentPage.checkComboBoxInFilter(UITextElements.OWNER);

    // 3. Обновить страницу сервиса
    await this.componentPage.refreshPage();
    await this.componentPage.checkResetFiltersButton(false);
    await this.componentPage.clickOnFunnelIcon();
  }

  /** Реестр компонентов, фильтр 'Зона техрадара'. */
  public async testComponentRegistryFilterTechnicalRadarArea(): Promise<void> {
    const title: string[] = ["Компонент, версия, пакет, конфигурация"];
    const firstValue: string[] = ["@aashutoshrathi/word-wrap"];

    // 1. Предусловие: Пользователь с правами на чтение паспортов компонентов авторизован в сервисе, открыт реестр
    // компонентов на вкладке "Все компоненты", открыт блок фильтров
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnFunnelIcon();
    await this.componentPage.checkResetFiltersButton();
    await this.componentPage.checkTableHeadings(title);
    await this.componentPage.checkTableTextValues(firstValue);

    // 2. В фильтре 'Зона техрадара' нажать на экспандер
    await this.componentPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentPage.clickOnComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);

    // 3. В фильтре 'Зона техрадара' выбрать одно любое значение
    const value = [Components.BASH];

    await this.componentPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.componentPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.componentPage.checkTextComponentsFoundWithAnyNumber();
    await this.componentPage.checkTableTextValues(value);

    const tempTextComponentsFoundFirst: string = await this.componentPage.getTextComponentsFoundWithAnyNumber();

    // 4. В фильтре 'Зона техрадара' выбрать еще одно любое значение
    await this.componentPage.clickOnElementInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.componentPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );
    await this.componentPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.PILOTED_BY);
    await this.componentPage.checkText({ pageText: tempTextComponentsFoundFirst, visible: false });

    // 5. Закрыть выпадающий список
    await this.componentPage.checkComboBoxInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
    );
    await this.componentPage.clickOnComboBoxInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
    );

    // 6. Открыть выпадающий список, проверить отображение выбранных значений
    await this.componentPage.checkComboBoxInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
    );
    await this.componentPage.clickOnComboBoxInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
    );
    await this.componentPage.checkComboBoxListAndTextInFilter(
      UITextElements.TECHNICAL_RADAR_AREA + UITextElements.COLON_SPACE_TWO,
      Lists.COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA,
    );
    await this.componentPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RECOMMENDED);
    await this.componentPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.PILOTED_BY);

    // 7. Выбрать все значения в фильтре
    await this.componentPage.clickOnElementInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.componentPage.clickOnElementInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.componentPage.clickOnElementInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);
    await this.componentPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.INTERESTED_IN);
    await this.componentPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.AVOID);
    await this.componentPage.checkCheckboxWithTextInComboBoxInFilter(RadarAreaValues.RADAR_AREA_IS_UNKNOWN);

    const tempTextComponentsFoundSecond: string = await this.componentPage.getTextComponentsFoundWithAnyNumber();

    // 8. Нажать "Сбросить фильтр"
    await this.componentPage.clickOnResetFiltersButton();
    await this.componentPage.checkComboBoxInFilter(UITextElements.TECHNICAL_RADAR_AREA);
    await this.componentPage.checkTableTextValues(firstValue);
    await this.componentPage.checkText({ pageText: tempTextComponentsFoundSecond.slice(7, -11), visible: false });
  }

  /** Реестр компонентов, вкладка 'Избранное', нет избранного. */
  public async testComponentRegistryFavoritesTabNoFavorites(): Promise<void> {
    //1. Предусловие: Пользователь с правами на чтение паспортов компонентов авторизован в сервисе, открыт реестр
    // компонентов на вкладке "Все компоненты", отсутствуют избранные субъекты компонента
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. Перейти на вкладку 'Избранное'
    await this.componentPage.clickOnLink(UITextElements.FAVORITES);
    await this.componentPage.checkText({ pageText: "Отсутствуют избранные компоненты" });

    // 3. Нажать "Показать все компоненты"
    await this.componentPage.clickOnLink(this.SHOW_ALL_COMPONENTS);
    await this.componentPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentPage.checkActiveTab(UITextElements.ALL_COMPONENTS_TAB);
  }

  /** Поиск компонента, невалидные данные. */
  public async testComponentSearchInvalidData(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница "Компоненты"
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);

    // 2. В поле поиска ввести: наименование несуществующего компонента/цифры/спец символы
    await this.componentPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);
    await this.componentPage.checkTextComponentsFound(0);
    await this.componentPage.checkText({ pageText: UITextElements.NOTHING_FOUND });
  }

  /** Поиск компонента, валидные данные. */
  public async testComponentSearchValidData(): Promise<void> {
    // TODO автотест иногда падает из-за тормозов стенда
    const componentsFound: number = 1;

    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница "Компоненты" → Вкладка "Все компоненты"
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.checkTextTotalComponentsWithAnyNumber();

    // 2. В поле поиска ввести часть наименования компонента.
    // Убираем у константы `Components.ACCORDSDK` последний символ
    await this.componentPage.fillInSearchInput(Components.ACCORDSDK.slice(0, -1));
    await this.componentPage.checkCrossIcon();
    // Проверяем, что текст 'accords' выделен жёлтым цветом
    await this.componentPage.checkYellowBacklight(Components.ACCORDSDK.slice(0, -1));
    await this.componentPage.checkTextComponentsFound(componentsFound);

    // 3. Изменить поисковый запрос, ввести пробелы перед и после наименования компонента
    await this.componentPage.fillInSearchInput(` ${Components.ACCORDSDK} `);
    await this.componentPage.checkYellowBacklight(Components.ACCORDSDK);
    await this.componentPage.checkTextComponentsFound(componentsFound);

    // 4. Очистить поле поиска, нажав крестик
    await this.componentPage.clickOnCrossIcon();
    await this.componentPage.checkSearchInput("");
    await this.componentPage.checkTextTotalComponentsWithAnyNumber();

    // 5. В поле поиска ввести наименование компонента в верхнем регистре/смешанном регистре/нижнем регистре
    await this.componentPage.fillInSearchInput(Components.ACCORDSDK.toUpperCase());
    await this.componentPage.checkYellowBacklight(Components.ACCORDSDK);
    await this.componentPage.checkTextComponentsFound(componentsFound);

    // 6. Перейти к интересующему результату поиска
    await this.componentPage.clickOnLink(Components.ACCORDSDK);
    await this.componentInformationPage.checkFirstComboBox(UITextElements.ABSENT);

    // 7. Вернуться в реестр компонентов
    await this.componentInformationPage.clickOnTitle();

    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentPage.checkSearchInput("");
  }

  /** Реестр компонентов, переход по ссылкам. */
  public async testComponentRegistryClickingOnLinks(): Promise<void> {
    const documentationVersionTenTwo: string = "Документация (по версии 10.2)";
    const componentFmt: string = "fmt";
    const licenseMit: string = "MIT";

    // 1. Предусловие: Пользователь с правами на чтение паспортов компонентов авторизован в сервисе, открыт паспорт
    // компонента на вкладке "Общая информация"',
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.fillInSearchInput(componentFmt);
    await this.componentPage.clickOnLink(componentFmt);

    // 2. Перейти по ссылке на документацию последней версии
    await this.componentInformationPage.checkTargetBlank(documentationVersionTenTwo);
    await this.componentInformationPage.checkHref(
      documentationVersionTenTwo,
      "https://tfs.example.ru/tfs/exampletc1/DEP_Components/_git/contrib_fmt?path=%2FREADME.md&version=GBdevelop",
      false,
    );

    // 3. Перейти по ссылке на Artifactory
    await this.componentInformationPage.checkTargetBlank(UITextElements.ARTIFACTORY);
    await this.componentInformationPage.checkHref(
      UITextElements.ARTIFACTORY,
      "https://10.0.23.87/ui/repos/tree/General/components-conan/platform-1.6/fmt",
      false,
    );

    // 4. Перейти по ссылке на лицензию
    await this.componentInformationPage.checkTargetBlank(licenseMit);
    await this.componentInformationPage.checkHref(
      licenseMit,
      "https://tfs.example.ru/tfs/exampletc1/DEP_Components/_git/contrib_fmt?path=%2FLICENSE&version=GBdevelop",
      false,
    );
  }
}
