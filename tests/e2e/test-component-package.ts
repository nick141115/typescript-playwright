import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import { Versions } from "../../src/constants/versions";
import { Packages } from "../../src/constants/packages";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { TestInputs } from "../../src/constants/test-inputs";
import * as allure from "allure-js-commons";

/** Пакет компонента. */
export class TestComponentPackage extends BaseTest {
  private static readonly TEXT_IN_DEVELOPMENT: string = " В разработке ";
  private static readonly TEXT_ASSEMBLY_BY_CONFIGURATION: string = "Сборка по конфигурации";
  private static readonly TEXT_PACKAGE: string = "Пакет 1.0.0.14";
  private static readonly RUBY: string = "Ruby";
  private static readonly C_SHARP: string = "C#";
  private static readonly YA_RU: string = "http://ya.ru/";
  private static readonly LINK_REMOVED: string = "Ссылка удалена.";
  private static readonly SOURCE_CODE_IS_EXTERNAL: string = "Исходный код внешний";
  private static readonly SOURCE_CODE_IS_INTERNAL: string = "Исходный код внутренний";
  private static readonly LINK_SAVED: string = "Ссылка сохранена.";
  private static readonly RETURN_LINK_FROM_SOURCE: string = "Вернуть ссылку из источника";
  private static readonly LINK_CHANGED: string = "Ссылка изменена.";
  private static readonly COPY: string = "Копировать";
  private static readonly TEAM_CITY: string = "TeamCity";
  private static readonly SOURCE_CODE_IS_EXTERNAL_LINK_NOT_PROVIDED: string =
    "Исходный код внешний (ссылка не указана)";
  private static readonly SOURCE_CODE_INTERNAL_ARTIFACTORY_LINK_SOURCE: string =
    "Исходный код внутренний (источник ссылки Artifactory)";
  private static readonly SIX_POINT_TWO: string = "6.2";
  private static readonly PACKAGE_NUMBER_ACETAO: string = "6.2.7.15";

  /** Предусловие: открыть пакет компонента. */
  private async setup(): Promise<void> {
    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.productVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ADDRESSBOOK);
  }

  /** Удаление ссылок после автотеста. */
  private async removeLinks(): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACETAO);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(TestComponentPackage.SIX_POINT_TWO);

    await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.productVersionInformationPage.clickOnLink(TestComponentPackage.PACKAGE_NUMBER_ACETAO);

    for (let i: number = 0; i < 2; i++) {
      // Нажать на меню ссылки
      await this.componentPackageInformationPage.clickOnIconMenu();

      // Нажать 'Удалить'
      await this.componentPackageInformationPage.clickOnElementWithText("Удалить");

      // Нажать 'Да'
      await this.componentPackageInformationPage.clickOnElementWithText(UITextElements.YES);
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_REMOVED });
      await this.componentPackageInformationPage.refreshPage();
    }
  }

  /** Возвращение ссылки из источника после автотеста. */
  private async returnLinkFromSource(): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.productVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ACCORDSDK);

    await this.componentPackageInformationPage.clickOnIconMenu();

    // Нажать 'Вернуть ссылку из источника'
    await this.componentPackageInformationPage.clickOnElementWithText(TestComponentPackage.RETURN_LINK_FROM_SOURCE);

    // Нажать 'Да'
    await this.componentPackageInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_CHANGED });
  }

  /** Удаление языков программирования после автотеста. */
  private async deleteProgrammingLanguages(programmingLanguages: string[]): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);
    await this.setup();

    let programmingLanguage: string;
    for (programmingLanguage of programmingLanguages) {
      await this.componentPackageInformationPage.deleteProgrammingLanguage(programmingLanguage);
    }
  }

  /** Пакет компонента, посмотреть сведения. */
  public async testComponentPackageViewInformation(): Promise<void> {
    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница 'Компоненты', выбран один из
    // компонентов списка, выбрана версия компонента, выбран пакет.
    await this.impersonateAsUserWithReadOrWritePermissions(false);
    await this.setup();

    // 2. Проверить отображение информации по выбранному пакету компонента
    // Вкладка 'Общая информация'
    await this.componentPackageInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
    await this.componentPackageInformationPage.checkTextInNavigationBar(
      UITextElements.COMPONENTS + Components.ACCORDSDK + UITextElements.VERSION_ONE + TestComponentPackage.TEXT_PACKAGE,
    );
    await this.componentPackageInformationPage.checkLinksCount(UITextElements.COMPONENTS, 3);
    await this.componentPackageInformationPage.checkLinksCount(Components.ACCORDSDK, 1);
    await this.componentPackageInformationPage.checkLinksCount(UITextElements.VERSION_ONE, 1);
    await this.componentPackageInformationPage.checkFavoritesIndicator();
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.TEXT_PACKAGE, nth: 1 });
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TEXT_VERSION,
      Versions.VERSION_ACCORDSDK + TestComponentPackage.TEXT_IN_DEVELOPMENT,
    );
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PACKAGE_MANAGER,
      UITextElements.ANT_IVY,
    );
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PLATFORMS,
      RegularExpressions.PATTERN_WINDOWS,
    );
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TEXT_PROGRAMMING_LANGUAGE,
      "Bourne ShellCC/C++ HeaderDOS BatchPython",
    );
    await this.componentPackageInformationPage.checkText({ pageText: UITextElements.LINKS });
    await this.componentPackageInformationPage.checkLinksCount(UITextElements.ARTIFACTORY, 2);
    await this.componentPackageInformationPage.checkLinksCount(TestComponentPackage.TEAM_CITY, 1);
    await this.componentPackageInformationPage.checkLinksCount(
      TestComponentPackage.SOURCE_CODE_INTERNAL_ARTIFACTORY_LINK_SOURCE,
      1,
    );
    await this.componentPackageInformationPage.checkLinksCount(TestComponentPackage.SOURCE_CODE_IS_EXTERNAL, 1);

    // Вкладка 'Сборки'
    const title: string[] = [TestComponentPackage.TEXT_ASSEMBLY_BY_CONFIGURATION];
    const value: string[] = [UITextElements.DEFAULT_BRAND_TRUNK];

    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.checkActiveTab(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.checkTableHeadings(title);
    await this.componentPackageInformationPage.checkTableTextValues(value);

    // Вкладка 'Компоненты-потребители'
    await this.componentPackageInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentPackageInformationPage.checkActiveTab(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentPackageInformationPage.checkLinksCount(Components.CRYPT_PASSWORD_FORGE, 1);
    await this.componentPackageInformationPage.checkLinksCount(Versions.VERSION_ONE_FOUR, 1, true);
    await this.componentPackageInformationPage.checkLinksCount("1.4.7.10", 1);
  }

  /** Паспорт пакета компонента, отображение ЯП, нет ссылки на исходный код. */
  public async testComponentPackageNoLinkToSourceCode(): Promise<void> {
    // 1. Предусловие: Пользователь с правами на редактирование паспортов компонентов авторизован в сервисе. Открыт
    // паспорт пакета компонента, нет ссылки на исходный код
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.fillInSearchInput(Components.ADDRESSBOOK);
    await this.componentPage.clickOnLink(Components.ADDRESSBOOK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ADDRESSBOOK);

    await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.productVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ADDRESSBOOK);

    // 2. Проверить отображение ЯП
    await this.componentPackageInformationPage.checkInputNoLinkToSourceCode();
  }

  /** Паспорт пакета компонента, отображение ЯП, есть ссылка на исходный код. */
  public async testComponentPackageThereIsLinkToSourceCode(): Promise<void> {
    await allure.description(`Баг: при добавлении ЯП иногда удаляются все ЯП из списка вместо добавления.`);

    // 1. Предусловие: Пользователь с правами на редактирование паспортов компонентов авторизован в сервисе. Открыт
    // паспорт пакета компонента, есть ссылка на исходный код
    await this.setup();

    // 2. Проверить отображение ЯП
    await this.componentPackageInformationPage.checkTextInChipsInput(
      UITextElements.PROGRAMMING_LANGUAGE_INPUT_PLACEHOLDER,
    );
    await this.componentPackageInformationPage.checkTextInChipsInput(UITextElements.BOURNE_SHELL);
    await this.componentPackageInformationPage.checkTextInChipsInput("C/C++ Header");
    await this.componentPackageInformationPage.checkTextInChipsInput("DOS Batch");
    await this.componentPackageInformationPage.checkTextInChipsInput(UITextElements.PYTHON);
    await this.componentPackageInformationPage.checkTitlesCount("Удалить из списка", 5);
  }

  /** Паспорт пакета компонента, добавить ЯП. */
  public async testComponentPackageAddProgrammingLanguage(): Promise<void> {
    await allure.description(`Баг: при добавлении ЯП иногда удаляются все ЯП из списка вместо добавления.`);

    try {
      // 1. Предусловие: Пользователь с правами на редактирование паспортов компонентов авторизован в сервисе. Открыт
      // паспорт пакета компонента, есть ссылка на исходный код
      await this.setup();

      // 2. В поле 'Язык программирования' ввести часть названия ЯП
      await this.componentPackageInformationPage.fillInChipsInput("C");

      // 3. Выбрать любой ЯП из списка
      await this.componentPackageInformationPage.clickOnElementWithText(TestComponentPackage.C_SHARP);

      // 4. Повторить шаги 2 и 3 для добавления нескольких ЯП
      await this.componentPackageInformationPage.fillInChipsInput("ru");
      await this.componentPackageInformationPage.clickOnElementWithText(TestComponentPackage.RUBY);
      await this.componentPackageInformationPage.checkTitlesCount("Удалить из списка", 7);
      await this.componentPackageInformationPage.checkTextInChipsInput(
        "Bourne ShellCC/C++ HeaderDOS BatchPythonC#RubyНачните вводить и выберите из списка",
      );

      // 5. Обновить страницу сервиса
      await this.componentPackageInformationPage.refreshPage();
      await this.componentPackageInformationPage.checkTextInChipsInput(
        "Bourne ShellCC#C/C++ HeaderDOS BatchPythonRubyНачните вводить и выберите из списка",
      );
    } finally {
      // Удаление языков программирования после автотеста.
      await this.deleteProgrammingLanguages([TestComponentPackage.C_SHARP, TestComponentPackage.RUBY]);
    }
  }

  /** Паспорт пакета компонента, удалить ручную ссылку на исходный код, подтвердить удаление. */
  public async testComponentPackageRemoveManualSourceCodeLinkConfirmDeletion(): Promise<void> {
    // TODO когда сервис станет работать стабильно добавить фикстуру проверки удаления ссылки после теста
    // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе. Открыт
    // паспорт пакета компонента, ссылка на внешний исходный код введена вручную
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.fillInSearchInput(Components.ADDRESSBOOK);
    await this.componentPage.clickOnLink(Components.ADDRESSBOOK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ADDRESSBOOK);

    await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.productVersionInformationPage.clickOnLink(Packages.PACKAGE_NUMBER_ADDRESSBOOK);

    // Ввод данных для создания сценария
    await this.componentPackageInformationPage.clickOnIconPlusInCircle(1);
    await this.componentPackageInformationPage.fillInInputUrl(TestComponentPackage.YA_RU);
    await this.componentPackageInformationPage.checkTextInInputUrl(TestComponentPackage.YA_RU);
    await this.componentPackageInformationPage.clickOnIconFloppyDisk();

    // 2. Нажать на меню ссылки
    await this.componentPackageInformationPage.clickOnIconMenu();
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.COPY });
    await this.componentPackageInformationPage.checkText({ pageText: UITextElements.EDIT });

    // 3. Нажать 'Удалить'
    await this.componentPackageInformationPage.clickOnElementWithText("Удалить");
    await this.componentPackageInformationPage.checkTitleModal();
    await this.componentPackageInformationPage.checkText({ pageText: "Удалить ссылку?" });
    await this.componentPackageInformationPage.checkText({ pageText: UITextElements.NO });

    // 4. Нажать 'Да'
    await this.componentPackageInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_REMOVED });
    await this.componentPackageInformationPage.checkText({
      pageText: TestComponentPackage.SOURCE_CODE_IS_EXTERNAL_LINK_NOT_PROVIDED,
    });
  }

  /** Паспорт пакета компонента, ручной ввод ссылки на исходный код. */
  public async testComponentPackageManuallyEnteringLinkToSourceCode(): Promise<void> {
    try {
      // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе. Открыт
      // паспорт пакета компонента, ссылка на внешний исходный код отсутствует
      await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
      await this.componentPage.clickOnLink(Components.ACETAO);

      await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
      await this.componentInformationPage.clickOnLink(TestComponentPackage.SIX_POINT_TWO);

      await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
      await this.productVersionInformationPage.clickOnLink(TestComponentPackage.PACKAGE_NUMBER_ACETAO);

      // 2. Нажать на иконку в виде плюса в кружочке
      await this.componentPackageInformationPage.clickOnIconPlusInCircle(1);
      await this.componentPackageInformationPage.checkButtonCancel();

      // 3. Ввести валидную ссылку на внешний репозиторий
      await this.componentPackageInformationPage.fillInInputUrl(TestComponentPackage.YA_RU);
      await this.componentPackageInformationPage.checkTextInInputUrl(TestComponentPackage.YA_RU);

      // 4. Нажать 'Сохранить'
      await this.componentPackageInformationPage.clickOnIconFloppyDisk();
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_SAVED });
      await this.componentPackageInformationPage.clickOnCloseMessageIcon();
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.SOURCE_CODE_IS_EXTERNAL });
      await this.componentPackageInformationPage.checkHref(
        TestComponentPackage.SOURCE_CODE_IS_EXTERNAL,
        TestComponentPackage.YA_RU,
        false,
      );

      // 5. Повторить шаги тест-кейса для внутренней ссылки.
      // Нажать на иконку в виде плюса в кружочке.
      await this.componentPackageInformationPage.clickOnIconPlusInCircle();
      await this.componentPackageInformationPage.checkButtonCancel();

      // Ввести валидную ссылку на репозиторий
      await this.componentPackageInformationPage.fillInInputUrl(TestComponentPackage.YA_RU);
      await this.componentPackageInformationPage.checkTextInInputUrl(TestComponentPackage.YA_RU);

      // Нажать 'Сохранить'
      await this.componentPackageInformationPage.clickOnIconFloppyDisk();
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_SAVED });
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.SOURCE_CODE_IS_INTERNAL });
      await this.componentPackageInformationPage.checkHref(
        TestComponentPackage.SOURCE_CODE_IS_INTERNAL,
        TestComponentPackage.YA_RU,
        false,
      );
    } finally {
      // Удаление ссылок после автотеста.
      await this.removeLinks();
    }
  }

  /** Паспорт пакета компонента, редактирование ссылки на исходный код (Исходный код внутренний). */
  public async testComponentPackageEditingSourceCodeLinkSourceCodeIsInternal(): Promise<void> {
    // TODO проверить тест-кейс (его должны актуализировать), возможно нужно будет изменить автотест после этого
    try {
      const linkTfs: string =
        "http://tfs.example.ru/tfs/exampletc1/TDCode/_versionControl?path=%24%2FTDCode%2Fcontrib" +
        "%2Faccordsdk%2Ftrunk";

      // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе. Открыт
      // паспорт пакета компонента, ссылка на исходный код получена автоматически
      await this.setup();

      // 2. Нажать на меню справа от ссылки
      await this.componentPackageInformationPage.clickOnIconMenu();

      // 3. Нажать 'Редактировать'
      await this.componentPackageInformationPage.checkHref(
        TestComponentPackage.SOURCE_CODE_IS_INTERNAL,
        linkTfs,
        false,
        false,
      );
      await this.componentPackageInformationPage.clickOnElementWithText(UITextElements.EDIT);
      await this.componentPackageInformationPage.checkTextInInputUrl(linkTfs);

      // 4. Внести изменения в URL
      await this.componentPackageInformationPage.fillInInputUrl(TestComponentPackage.YA_RU);
      await this.componentPackageInformationPage.checkTextInInputUrl(TestComponentPackage.YA_RU);

      // 5. Нажать 'Сохранить'", async () => {
      await this.componentPackageInformationPage.clickOnIconFloppyDisk();
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_SAVED });
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.SOURCE_CODE_IS_INTERNAL });
      await this.componentPackageInformationPage.checkHref(
        TestComponentPackage.SOURCE_CODE_IS_INTERNAL,
        TestComponentPackage.YA_RU,
        false,
      );

      // 6. Снова нажать меню ссылки
      await this.componentPackageInformationPage.clickOnIconMenu();
      await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.RETURN_LINK_FROM_SOURCE });
    } finally {
      // Возвращение ссылки из источника после автотеста.
      await this.returnLinkFromSource();
    }
  }

  /** Паспорт пакета компонента, вернуть автоссылку на исходный код, подтвердить изменение (Исход. код внутр.). */
  public async testComponentPackageReturnAutolinkToSourceCodeConfirmChangeSourceCodeIsInternal(): Promise<void> {
    // TODO проверить тест-кейс (его должны актуализировать), возможно нужно будет изменить автотест после этого
    // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе. Открыт
    // паспорт пакета компонента, ссылки на исходный код полученные автоматически были изменены вручную
    await this.setup();

    // Подготовка: меняем ссылку вручную, чтобы создать сценарий для теста
    await this.componentPackageInformationPage.clickOnIconMenu();
    await this.componentPackageInformationPage.clickOnElementWithText(UITextElements.EDIT);
    await this.componentPackageInformationPage.fillInInputUrl(TestComponentPackage.YA_RU);
    await this.componentPackageInformationPage.clickOnIconFloppyDisk();
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_SAVED });
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.SOURCE_CODE_IS_INTERNAL });
    await this.componentPackageInformationPage.checkHref(
      TestComponentPackage.SOURCE_CODE_IS_INTERNAL,
      TestComponentPackage.YA_RU,
      false,
    );
    await this.componentPackageInformationPage.refreshPage();

    // 2. Нажать на меню справа от ссылки
    await this.componentPackageInformationPage.clickOnIconMenu();
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.COPY });
    await this.componentPackageInformationPage.checkText({ pageText: UITextElements.EDIT });

    // 3. Нажать 'Вернуть ссылку из источника'
    await this.componentPackageInformationPage.clickOnElementWithText(TestComponentPackage.RETURN_LINK_FROM_SOURCE);
    await this.componentPackageInformationPage.checkTitleModal();
    await this.componentPackageInformationPage.checkText({
      pageText: "Будет подставлена ссылка полученная из источника.",
    });
    await this.componentPackageInformationPage.checkText({ pageText: "Вернуть ссылку?" });
    await this.componentPackageInformationPage.checkText({ pageText: UITextElements.NO });

    // 4. Нажать 'Да'
    await this.componentPackageInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.componentPackageInformationPage.checkTitleModal(false);
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.LINK_CHANGED });
    await this.componentPackageInformationPage.checkText({
      pageText: TestComponentPackage.SOURCE_CODE_IS_INTERNAL,
      exact: false,
    });
    await this.componentPackageInformationPage.checkText({ pageText: "(источник ссылки Artifactory)" });
  }

  /** Паспорт пакета компонента, посмотреть сведения (все вкладки). */
  public async testComponentPackageViewDetailsAllTabs(): Promise<void> {
    // TODO изменились тестовые данные
    const packageVersion: string = "1.0.0.13";
    const firstPackageInTable: string = "1.1.8.35";

    // 1. Предусловие: Пользователь авторизован в сервисе, открыта страница 'Компоненты', выбран один из компонентов
    // списка, выбрана версия компонента, выбран пакет
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnTitle();
    await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
    await this.componentPage.clickOnLink(Components.ACCORDSDK);

    await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.componentInformationPage.clickOnLink(Versions.VERSION_ACCORDSDK);

    await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
    await this.productVersionInformationPage.clickOnLink(packageVersion);

    // 2. Проверить отображение информации по выбранному пакету компонента
    // Вкладка 'Общая информация'
    await this.componentPackageInformationPage.checkActiveTab(UITextElements.GENERAL_INFORMATION);
    await this.componentPackageInformationPage.checkTextInNavigationBar(
      UITextElements.COMPONENTS +
        Components.ACCORDSDK +
        UITextElements.VERSION_ONE +
        UITextElements.TEXT_PACKAGE +
        " " +
        packageVersion,
    );
    await this.componentPackageInformationPage.checkLinksCount(UITextElements.COMPONENTS, 3);
    await this.componentPackageInformationPage.checkLinksCount(Components.ACCORDSDK, 1);
    await this.componentPackageInformationPage.checkLinksCount(UITextElements.VERSION_ONE, 1);
    await this.componentPackageInformationPage.checkFavoritesIndicator();
    await this.componentPackageInformationPage.checkText({
      pageText: `${UITextElements.TEXT_PACKAGE} ${packageVersion}`,
      nth: 1,
    });
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TEXT_VERSION,
      Versions.VERSION_ADDRESSBOOK + TestComponentPackage.TEXT_IN_DEVELOPMENT,
    );
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PACKAGE_MANAGER,
      UITextElements.ANT_IVY,
    );
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.PLATFORMS,
      RegularExpressions.PATTERN_WINDOWS,
    );
    await this.componentPackageInformationPage.checkTitleAndTextInTabGeneralInformation(
      UITextElements.TEXT_PROGRAMMING_LANGUAGE,
      "Bourne ShellCC/C++ HeaderDOS Batch",
    );
    await this.componentPackageInformationPage.checkText({ pageText: UITextElements.LINKS });
    await this.componentPackageInformationPage.checkText({ pageText: UITextElements.LINKS_ARTIFACTORY, exact: false });
    await this.componentPackageInformationPage.checkText({
      pageText: TestComponentPackage.TEAM_CITY + " " + UITextElements.LICENSES_LINK,
      exact: false,
    });
    await this.componentPackageInformationPage.checkLinksCount(UITextElements.REGULATIONS, 2);
    await this.componentPackageInformationPage.checkLinksCount(
      TestComponentPackage.SOURCE_CODE_INTERNAL_ARTIFACTORY_LINK_SOURCE,
      1,
    );
    await this.componentPackageInformationPage.checkText({ pageText: TestComponentPackage.SOURCE_CODE_IS_EXTERNAL });

    // Вкладка 'Сборки'
    const title: string[] = [TestComponentPackage.TEXT_ASSEMBLY_BY_CONFIGURATION];
    const value: string[] = [UITextElements.DEFAULT_BRAND_TRUNK];

    await this.componentPackageInformationPage.clickOnLink(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.checkActiveTab(UITextElements.ASSEMBLIES_BY_CONFIGURATION);
    await this.componentPackageInformationPage.checkTextTotalAssembliesWithAnyNumber();
    await this.componentPackageInformationPage.checkTableHeadings(title);
    await this.componentPackageInformationPage.checkTableTextValues(value);
    await this.componentPackageInformationPage.checkLinksCount(UITextElements.DEFAULT_BRAND_TRUNK, 1);
    await this.componentPackageInformationPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);

    // Вкладка 'Компоненты-потребители'
    const titles: string[] = [UITextElements.COMPONENT, UITextElements.TEXT_VERSION, UITextElements.TEXT_PACKAGE];
    const values: string[] = [Components.CRYPT_PASSWORD_FORGE, Versions.VERSION_ONE_ONE, firstPackageInTable];

    await this.componentPackageInformationPage.clickOnLink(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentPackageInformationPage.checkActiveTab(UITextElements.CONSUMER_COMPONENTS_TAB);
    await this.componentPackageInformationPage.checkTextTotalComponentsWithAnyNumber();
    await this.componentPackageInformationPage.checkTableHeadings(titles);
    await this.componentPackageInformationPage.checkTableTextValues(values);
    await this.componentPackageInformationPage.checkLinksCount(Components.CRYPT_PASSWORD_FORGE, 7);
    await this.componentPackageInformationPage.checkLinksCount(Versions.VERSION_ONE_ONE, 1, true);
    await this.componentPackageInformationPage.checkLinksCount(firstPackageInTable, 1);
    await this.componentPackageInformationPage.fillInSearchInput(TestInputs.SPECIAL_CHARACTERS);
  }
}
