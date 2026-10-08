import { expect, Locator, Page } from "@playwright/test";
import { Settings } from "../../settings";
import { Colors } from "../constants/colors";
import { CssKeysAndValues } from "../constants/css-keys-and-values";
import { LoadStates } from "../constants/load-states";
import { Products } from "../constants/products";
import { Roles } from "../constants/roles";
import { RegularExpressions } from "../constants/regular-expressions";
import { UITextElements } from "../constants/ui-text-elements";
import * as allure from "allure-js-commons";

/** Базовый класс для работы со страницами. */
export class BasePage {
  // Селекторы, регулярные выражения и текстовые константы
  /** Галка в checkbox'е 'Компонент' в таблице. */
  protected static readonly CHECK_MARK_IN_CHECKBOX_COMPONENT_IN_TABLE: string = "th path";
  /** Элементы списка в поле 'Продукт' или в поле 'Версия' в окне переноса разметки. */
  protected static readonly ELEMENTS_IN_PRODUCT_FIELD_IN_MARKUP_TRANSFER_WINDOW: string =
    ".formControl__control .popover__popover.selectPopover";
  /** Элемент списка в поле 'Продукт' или в поле 'Версия' в окне переноса разметки. */
  protected static readonly ELEMENT_IN_PRODUCT_FIELD_IN_MARKUP_TRANSFER_WINDOW: string = ".formControl__control li";
  /** Поле 'Продукт' в окне переноса разметки. */
  protected static readonly PRODUCT_FIELD_IN_MARKUP_TRANSFER_WINDOW: string =
    "div:nth-child(2) > .formControl__control";
  /** ComboBox'ы в модальном окне переноса разметки. */
  protected static readonly COMBO_BOX_IN_WINDOW_TRANSFER_OF_MARKINGS: string = ".selectContainer__control";
  /** Селектор для тега 'tr'. */
  protected static readonly TR: string = "tr";
  /** Селектор для тега 'path'. */
  protected static readonly PATH: string = "path";
  /** Селектор для тега 'span'. */
  protected static readonly SPAN: string = "span";
  /** Зеленая индикация у тоста переноса разметки. */
  private static readonly GREEN_INDICATION: string = ".toast__status_ok";
  /** Красная индикация у тоста переноса разметки. */
  private static readonly RED_INDICATION: string = ".toast__status_error";
  /** Жёлтая индикация у тоста переноса разметки. */
  private static readonly YELLOW_INDICATION: string = ".toast__status_warning";
  /** Жёлтая индикация у окна подтверждения. */
  private static readonly TITLE_MODAL: string = ".modalTitle.alertModal__title.alertModal__title_warning";
  /** Иконка в виде дискеты. */
  private static readonly ICON_FLOPPY_DISK: string = ".icon-example-app.icon-app-save.icon-component";
  /** Тег 'dt'. */
  private static readonly DT: string = "dt";
  /** Соседний тег 'dd'. */
  private static readonly DD: string = "+ dd";
  /** CSS-селектор отмеченного checkbox'а в фильтре. */
  protected static readonly CHECKBOX: string = ".checkboxMark__checked";
  /** CSS-селектор checkbox'а в таблице. */
  private static readonly CHECKBOX_IN_TABLE: string = ".checkboxMark__border";
  /** CSS-селектор checkbox'а 'Компонент' в таблице. */
  private static readonly CHECKBOX_COMPONENT_IN_TABLE: string = "th .checkboxMark__indeterminate";
  /** Тег 'label'. */
  private static readonly LABEL: string = "label";
  /** Панель навигации. */
  private static readonly NAVIGATION_BAR: string = ".navigationBar";
  /** Выпадающая строка с нужным сотрудником. */
  private static readonly SEARCH_RESULTS_FULL_NAME: string = ".menuWrapper, .option";
  /** Заголовок с названием компонента. */
  private static readonly TITLE: string = "h1";
  /** Выпадающий список в компоненте. */
  private static readonly COMPONENT_COMBO_BOX: string = ".selectContainer__valueContainer";
  /** Input внутри выпадающего списка в компоненте. */
  private static readonly COMPONENT_COMBO_BOX_INPUT: string = "input";
  /** Div внутри выпадающего списка в компоненте. */
  private static readonly COMPONENT_COMBO_BOX_DIV: string = "div.selectContainer__selectedValue";
  /** Выпадающий список в фильтре. */
  private static readonly COMBO_BOX_IN_FILTER: string = ".appSelect";
  /** Выпадающий список с текстом или с placeholder'ом в фильтре. */
  private static readonly COMBO_BOX_WITH_TEXT_OR_PLACEHOLDER_IN_FILTER: string =
    ".valueContainer__value, .valueContainer__placeholder, .selectContainer__placeholder";
  /** Элемент выпадающего списка в фильтре. */
  private static readonly ELEMENT_COMBO_BOX_IN_FILTER: string = ".checkbox__label";
  /** Иконка меню профиля в правом верхнем углу страницы. */
  private static readonly USER_MENU_ICON: string =
    ".icon-example-app.icon-app-arrow-down-single.dropdown__chevronIcon.icon-component";
  /** Прелоадер страницы. */
  private static readonly LOADING: string = ".loading .loading__svg";
  /** Ссылка-заголовок страницы. */
  private static readonly ITEM_TITLE_LINK: string = ".navigationBar__itemTitle_link";
  /** Активная вкладка. */
  private static readonly ACTIVE_TAB: string = ".tabs__horizontalTab_active";
  /** Вторая колонка таблицы. */
  protected static readonly SECOND_COLUMN_OF_TABLE: string = "dd";
  /** Название элемента панели навигации. */
  private static readonly NAVIGATION_BAR_ITEM_TITLE: string = ".navigationBar__itemTitle";
  /** Включенный индикатор избранного. */
  private static readonly FAVORITES_INDICATOR_ON: string = ".icon-app-favourite-on";
  /** Выключенный индикатор избранного. */
  private static readonly FAVORITES_INDICATOR_OFF: string = ".icon-app-favourite-off";
  /** Любой индикатор избранного. */
  private static readonly FAVORITES_INDICATOR: string = ".icon-app-favourite-off, .icon-app-favourite-on";
  /** Иконка в виде воронки. */
  private static readonly FUNNEL_ICON: string = ".icon-example-app.icon-app-filter.icon-component";
  /** Иконка в виде крестика (закрывает блок фильтра). */
  private static readonly CLOSE_FILTER_BLOCK_ICON: string = ".icon-example-app.icon-app-close.icon-component";
  /** Заголовок столбца. */
  private static readonly COLUMN_HEADER: string = `${this.TR} > th`;
  /** Строка таблицы. */
  private static readonly TABLE_ROW: string = `tbody > ${this.TR}`;
  /** Столбец таблицы. */
  protected static readonly TABLE_COLUMN: string = "td";
  /** Тег ссылки. */
  private static readonly LINK: string = "a";
  /** Экспандер. */
  private static readonly EXPANDER: string = ".icon-example-app.icon-app-arrow-right-single.icon-component";
  /** Серый индикатор. */
  protected readonly GREY_INDICATOR: string = ".circleMarker__mark";
  /** Ссылка 'Продукты'. */
  private static readonly LINK_PRODUCTS: string =
    ".icon-example-app.icon-app-application.navLink__icon.icon-component";
  /** Input поиска. */
  private static readonly SEARCH_INPUT: string = "input[placeholder='Поиск']";
  /** Иконка в виде крестика. */
  private static readonly CROSS_ICON: string = ".selectContainer__clearButton, .selectContainer__clearSelectButton";
  /** Жёлтая подсветка текста. */
  private static readonly YELLOW_BACKLIGHT: string = "mark";
  /** Заголовок-ссылка 'Архитектурный репозиторий'. */
  private static readonly TITLE_ARCHITECTURAL_REPOSITORY: string = "Архитектурный репозиторий";
  /** Кнопка 'Выйти'. */
  private static readonly LOGOUT_BUTTON: string = "Выйти";
  /** Кнопка 'Имперсонация'. */
  private static readonly IMPERSONATION_BUTTON: string = "Имперсонация";
  /** Текст 'Учетная запись для имперсонализации'. */
  private static readonly ACCOUNT_FOR_IMPERSONATION_LABEL: string = "Учетная запись для имперсонализации";
  /** Кнопка 'Сбросить фильтры'. */
  private static readonly RESET_FILTERS_BUTTON: string = "Сбросить фильтры";
  /** Иконка закрытия всплывающего сообщения в правом нижнем углу. */
  private static readonly CLOSE_MESSAGE_ICON: string = "Закрыть сообщение";
  /** Сообщение об ошибке. */
  private static readonly ERROR_MESSAGE: string =
    "Выпадающая строка с нужным сотрудником должна была исчезнуть за 30 секунд";
  /** Регулярное выражения для поиска текста 'Найдено <любое число> компонент(а/ов)'. */
  private static readonly COMPONENTS_FOUND_PATTERN: RegExp = /Найдено \d+ компонент[а-я]*/;
  private static readonly ERROR_MESSAGE_RESPONSIBLE_FOR_IMPLEMENTATION: string =
    "Выпадающий список 'Ответственный за реализацию' недоступен.";
  private static readonly ERROR_MESSAGE_FIRST_COMBO_BOX: string = "Первый выпадающий список на странице недоступен.";
  private static readonly ERROR_MESSAGE_OWNER: string = "Выпадающий список 'Владелец' недоступен.";
  private static readonly ERROR_MESSAGE_TECHNICAL_EXPERT: string =
    "Выпадающий список 'Технический эксперт' недоступен.";
  private static readonly PLACEHOLDER: string = "placeholder";

  // Локаторы
  private locatorTitleArchitecturalRepository: Locator;
  private locatorColumnHeader: Locator;
  protected locatorTableRow: Locator;
  protected locatorTableFirstRowAndColumn: Locator;
  private locatorTableLastRowAndColumn: Locator;
  private locatorSearchInput: Locator;
  private locatorTableRowAndColumn: Locator;
  private locatorResetFiltersButton: Locator;
  private locatorCrossIcon: Locator;
  private locatorComponentsFoundPattern: Locator;
  private locatorFirstComboBox: Locator;
  private locatorFirstComboBoxText: Locator;
  private locatorResponsibleForImplementation: Locator;
  private locatorResponsibleForImplementationText: Locator;
  private locatorComponentOwnerComboBox: Locator;
  private locatorComponentOwnerComboBoxText: Locator;
  private locatorTechnicalExpertComboBox: Locator;
  private locatorTechnicalExpertComboBoxText: Locator;
  private locatorSearchResultsFullName: Locator;
  private locatorComboBox: Locator;
  private locatorFavoritesIndicator: Locator;
  private locatorCloseMessageIcon: Locator;
  protected locatorLink: Locator;
  private locatorFunnelIcon: Locator;

  // eslint-disable-next-line no-unused-vars
  constructor(protected readonly page: Page) {
    this.locatorTitleArchitecturalRepository = this.page.getByRole(Roles.LINK, {
      name: BasePage.TITLE_ARCHITECTURAL_REPOSITORY,
    });
    this.locatorColumnHeader = this.page.locator(BasePage.COLUMN_HEADER);
    this.locatorTableRow = this.page.locator(BasePage.TABLE_ROW);
    this.locatorTableFirstRowAndColumn = this.locatorTableRow.first().locator(BasePage.TABLE_COLUMN);
    this.locatorTableLastRowAndColumn = this.locatorTableRow.last().locator(BasePage.TABLE_COLUMN);
    this.locatorSearchInput = this.page.locator(BasePage.SEARCH_INPUT);
    this.locatorTableRowAndColumn = this.locatorTableRow.locator(BasePage.TABLE_COLUMN);
    this.locatorResetFiltersButton = this.page.getByRole(Roles.BUTTON, {
      name: BasePage.RESET_FILTERS_BUTTON,
    });
    this.locatorCrossIcon = this.page.locator(BasePage.CROSS_ICON);
    this.locatorComponentsFoundPattern = this.page.getByText(BasePage.COMPONENTS_FOUND_PATTERN);
    this.locatorFirstComboBox = this.page.locator(BasePage.COMPONENT_COMBO_BOX).first();
    this.locatorFirstComboBoxText = this.page.locator(BasePage.COMPONENT_COMBO_BOX_DIV).first();
    this.locatorResponsibleForImplementation = this.page.locator(BasePage.COMPONENT_COMBO_BOX).nth(1);
    this.locatorResponsibleForImplementationText = this.page.locator(BasePage.COMPONENT_COMBO_BOX_DIV).nth(1);
    this.locatorComponentOwnerComboBox = this.page.locator(BasePage.COMPONENT_COMBO_BOX).nth(2);
    this.locatorComponentOwnerComboBoxText = this.page.locator(BasePage.COMPONENT_COMBO_BOX_DIV).nth(2);
    this.locatorTechnicalExpertComboBox = this.page.locator(BasePage.COMPONENT_COMBO_BOX).last();
    this.locatorTechnicalExpertComboBoxText = this.page.locator(BasePage.COMPONENT_COMBO_BOX_DIV).last();
    this.locatorSearchResultsFullName = this.page.locator(BasePage.SEARCH_RESULTS_FULL_NAME);
    this.locatorComboBox = this.page.locator(BasePage.COMBO_BOX_WITH_TEXT_OR_PLACEHOLDER_IN_FILTER);
    this.locatorFavoritesIndicator = this.page.locator(BasePage.FAVORITES_INDICATOR);
    this.locatorCloseMessageIcon = this.page.getByTitle(BasePage.CLOSE_MESSAGE_ICON);
    this.locatorLink = this.page.locator(BasePage.LINK);
    this.locatorFunnelIcon = this.page.locator(BasePage.FUNNEL_ICON);
  }

  /** Ожидать исчезновения последнего локатора LOADING. */
  public async waitForPageReady(): Promise<void> {
    await this.page.waitForTimeout(5_000);
    await expect(this.page.locator(BasePage.LOADING).last()).not.toBeAttached();
  }

  /** Обновить страницу. */
  public async refreshPage(): Promise<void> {
    await allure.step(`Обновить страницу.`, async () => {
      await this.page.waitForLoadState(LoadStates.NETWORK_IDLE);
      await this.page.reload({ waitUntil: LoadStates.NETWORK_IDLE });
    });
  }

  /** Проверить заголовок-ссылку 'Архитектурный репозиторий'. */
  public async checkTitle(): Promise<void> {
    await expect(
      this.locatorTitleArchitecturalRepository,
      "Заголовок 'Архитектурный репозиторий' не отображается",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Кликнуть на заголовок-ссылку 'Архитектурный репозиторий'. */
  public async clickOnTitle(): Promise<void> {
    await allure.step(`Кликнуть на заголовок-ссылку 'Архитектурный репозиторий'.`, async () => {
      await this.checkTitle();
      await expect(
        this.locatorTitleArchitecturalRepository,
        "Заголовок-ссылка 'Архитектурный репозиторий' недоступен",
      ).toBeEnabled();
      await this.locatorTitleArchitecturalRepository.click();
    });
  }

  /** Нажать иконку меню профиля в правом верхнем углу страницы. */
  public async clickOnUserMenuIcon(): Promise<void> {
    await allure.step(`Нажать иконку меню профиля в правом верхнем углу страницы.`, async () => {
      const locatorUserMenuIcon: Locator = this.page.locator(BasePage.USER_MENU_ICON);

      await expect(
        locatorUserMenuIcon,
        "Иконка меню профиля в правом верхнем углу страницы не отображается",
      ).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(locatorUserMenuIcon, "Иконка меню профиля в правом верхнем углу страницы недоступна").toBeEnabled();
      await locatorUserMenuIcon.click();
    });
  }

  /** Нажать кнопку 'Выйти'. */
  public async logout(): Promise<void> {
    const locatorLogoutButton: Locator = this.page.getByRole(Roles.BUTTON, { name: BasePage.LOGOUT_BUTTON });

    await expect(locatorLogoutButton, "Кнопка 'Выйти' не отображается").toBeVisible();
    await expect(locatorLogoutButton, "Кнопка 'Выйти' недоступна").toBeEnabled();
    await locatorLogoutButton.click();
  }

  /** Быстро выйти из сервиса. */
  public async fastLogout(): Promise<void> {
    await allure.step(`Быстро выйти из сервиса.`, async () => {
      await this.page.waitForLoadState(LoadStates.NETWORK_IDLE);
      await this.page.evaluate(() => sessionStorage.clear());
      await this.page.context().clearCookies();
    });
  }

  /** Кликнуть на кнопку 'Имперсонация'. */
  public async clickOnImpersonationButton(): Promise<void> {
    await allure.step(`Кликнуть на кнопку 'Имперсонация'.`, async () => {
      const locatorImpersonationButton: Locator = this.page.getByRole(Roles.BUTTON, {
        name: BasePage.IMPERSONATION_BUTTON,
      });

      await expect(locatorImpersonationButton, "Кнопка 'Имперсонация' не отображается").toBeVisible();
      await expect(locatorImpersonationButton, "Кнопка 'Имперсонация' недоступна").toBeEnabled();
      await locatorImpersonationButton.click();
      await expect(
        this.page.getByText(BasePage.ACCOUNT_FOR_IMPERSONATION_LABEL),
        "Текст 'Учетная запись для имперсонализации' не отображается",
      ).toBeVisible();
    });
  }

  /** Проверить наличие или отсутствие на странице текста.
   *
   * @param pageText Текст, который должен присутствовать на странице.
   * @param visible Видимость текста (если 'False', то текст не должен присутствовать на странице).
   * @param exact Частичное совпадение по тексту (если 'True', то будет точное совпадение).
   * @param nth Порядковый номер элемента с текстом.
   * @param timeout Время ожидания появления или исчезновения текста.
   */
  public async checkText({
    pageText,
    visible = true,
    exact = true,
    nth = 0,
    timeout = Settings.DEFAULT_TIMEOUT,
  }: {
    pageText: string | RegExp;
    visible?: boolean;
    exact?: boolean;
    nth?: number;
    timeout?: number;
  }): Promise<void> {
    await allure.step(`Проверить ${visible ? `наличие` : `отсутствие`} на странице текста '${pageText}'.`, async () => {
      const locator: Locator = this.page.getByText(pageText, { exact }).nth(nth);

      if (visible) {
        await expect(
          locator,
          `Текст '${pageText}' не отображается на странице (timeout = ${timeout} миллисекунд)`,
        ).toBeVisible({ timeout });
      } else {
        await expect(
          locator,
          `Текст '${pageText}' не должен отображаться на странице (timeout = ${timeout} миллисекунд)`,
        ).not.toBeVisible({ timeout });
      }
    });
  }

  /** Проверить наличие текста на странице 'Всего * компонент(а/ов)'.
   *
   * @param count Количество компонентов.
   */
  public async checkTextTotalComponents(count: number): Promise<void> {
    await expect(
      this.page.getByText(`Всего ${count} компонент`),
      `Текст 'Всего ${count} компонент(а/ов)' не отображается на странице`,
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Всего <любое число> компонент(а/ов)'. */
  public async checkTextTotalComponentsWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Всего \d+ компонент/),
      "Текст 'Всего <любое число> компонент(а/ов)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Всего <любое число> продукт(а/ов)'. */
  public async checkTextTotalProductsWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Всего \d+ продукт/),
      "Текст 'Всего <любое число> продукт(а/ов)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Всего <любое число> верс(ия/ий/ии)'. */
  public async checkTextTotalVersionsWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Всего \d+ верс[а-я]*/),
      "Текст 'Всего <любое число> верс(ия/ий/ии)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Всего <любое число> сбор(ка/ки/ок)'. */
  public async checkTextTotalAssembliesWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Всего \d+ сбор[а-я]*/),
      "Текст 'Всего <любое число> сбор(ка/ки/ок)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Всего <любое число> пакет(а/ов)'. */
  public async checkTextTotalPackagesWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Всего \d+ пакет[а-я]*/),
      "Текст 'Всего <любое число> пакет(а/ов)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Найдено * компонент(а/ов)'.
   *
   * @param count Количество компонентов.
   */
  public async checkTextComponentsFound(count: number): Promise<void> {
    await expect(
      this.page.getByText(`Найдено ${count} компонент`),
      `Текст 'Найдено ${count} компонент(а/ов)' не отображается на странице`,
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Найдено * продукт(а/ов)'.
   *
   * @param count Количество продуктов.
   */
  public async checkTextProductsFound(count: number): Promise<void> {
    await expect(
      this.page.getByText(`Найдено ${count} продукт`),
      `Текст 'Найдено ${count} продукт(а/ов)' не отображается на странице`,
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Найдено <любое число> продукт(а/ов)'. */
  public async checkTextProductsFoundWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Найдено \d+ продукт[а-я]*/),
      "Текст 'Найдено <любое число> продукт(а/ов)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Найдено <любое число> верс(ия/ий/ии)'. */
  public async checkTextVersionsFoundWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Найдено \d+ верс[а-я]*/),
      "Текст 'Найдено <любое число> верс(ия/ий/ии)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Найдено <любое число> сбор(ка/ки/ок)'. */
  public async checkTextAssembliesFoundWithAnyNumber(): Promise<void> {
    await expect(
      this.page.getByText(/Найдено \d+ сбор[а-я]*/),
      "Текст 'Найдено <любое число> сбор(ка/ки/ок)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить наличие текста на странице 'Найдено <любое число> компонент(а/ов)'. */
  public async checkTextComponentsFoundWithAnyNumber(): Promise<void> {
    await expect(
      this.locatorComponentsFoundPattern,
      "Текст 'Найдено <любое число> компонент(а/ов)' не отображается на странице",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Получить строку 'Найдено <любое число> компонент(а/ов)'.
   *
   * @return Строка 'Найдено <любое число> компонент(а/ов)'.
   */
  public async getTextComponentsFoundWithAnyNumber(): Promise<string> {
    await this.page.waitForTimeout(7_000);
    return this.locatorComponentsFoundPattern.innerText({ timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить количество ссылок на странице.
   *
   * @param linkText Текст ссылки.
   * @param count Ожидаемое количество ссылок.
   * @param exact Частичное совпадение по тексту (если 'True', то будет точное совпадение).
   */
  public async checkLinksCount(linkText: string, count: number, exact: boolean = false): Promise<void> {
    await expect(
      this.page.getByRole(Roles.LINK, { name: linkText, exact }),
      `Ссылка с текстом '${linkText}' не отображается на странице или количество таких ссылок не
 соответствует ожидаемому (ожидаемое количество: ${count})`,
    ).toHaveCount(count, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить первый выпадающий список на странице.
   *
   * @param placeholder Ожидаемый placeholder в выпадающем списке.
   */
  public async checkFirstComboBox(placeholder: string): Promise<void> {
    const errorMessagePlaceholder: string = `Первый выпадающий список на странице не содержит ожидаемый placeholder 
'${placeholder}'.`;
    const errorMessageNotDisplayed: string = "Первый выпадающий список на странице не отображается.";

    if (placeholder == UITextElements.ABSENT) {
      await expect(
        this.locatorFirstComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessageNotDisplayed,
      ).toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
      await expect(
        this.locatorFirstComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        BasePage.ERROR_MESSAGE_FIRST_COMBO_BOX,
      ).toBeEnabled();
      await expect(
        this.locatorFirstComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessagePlaceholder,
      ).toHaveAttribute(BasePage.PLACEHOLDER, placeholder, { timeout: Settings.DEFAULT_TIMEOUT });
    } else {
      await expect(this.locatorFirstComboBoxText, errorMessageNotDisplayed).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(this.locatorFirstComboBoxText, BasePage.ERROR_MESSAGE_FIRST_COMBO_BOX).toBeEnabled();
      await expect(this.locatorFirstComboBoxText, errorMessagePlaceholder).toHaveText(placeholder, {
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    }
  }

  /** Кликнуть на первый выпадающий список на странице. */
  public async clickOnFirstComboBox(): Promise<void> {
    await expect(this.locatorFirstComboBox, BasePage.ERROR_MESSAGE_FIRST_COMBO_BOX).toBeEnabled();
    await this.locatorFirstComboBox.click();
  }

  /** Проверить выпадающий список 'Ответственный за реализацию'.
   *
   * @param placeholder Ожидаемый placeholder в выпадающем списке.
   */
  public async checkResponsibleForImplementationOfComponentComboBox(placeholder: string): Promise<void> {
    const errorMessagePlaceholder: string = `Выпадающий список 'Ответственный за реализацию' не содержит ожидаемый 
placeholder '${placeholder}'.`;
    const errorMessageNotDisplayed: string = "Выпадающий список 'Ответственный за реализацию' не отображается.";

    if (placeholder == UITextElements.ABSENT) {
      await expect(
        this.locatorResponsibleForImplementation.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessageNotDisplayed,
      ).toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
      await expect(
        this.locatorResponsibleForImplementation.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        BasePage.ERROR_MESSAGE_RESPONSIBLE_FOR_IMPLEMENTATION,
      ).toBeEnabled();
      await expect(
        this.locatorResponsibleForImplementation.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessagePlaceholder,
      ).toHaveAttribute(BasePage.PLACEHOLDER, placeholder, { timeout: Settings.DEFAULT_TIMEOUT });
    } else {
      await expect(this.locatorResponsibleForImplementationText, errorMessageNotDisplayed).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(
        this.locatorResponsibleForImplementationText,
        BasePage.ERROR_MESSAGE_RESPONSIBLE_FOR_IMPLEMENTATION,
      ).toBeEnabled();
      await expect(this.locatorResponsibleForImplementationText, errorMessagePlaceholder).toHaveText(placeholder, {
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    }
  }

  /** Кликнуть на выпадающий список 'Ответственный за реализацию'. */
  public async clickOnResponsibleForImplementationOfComponentComboBox(): Promise<void> {
    await expect(
      this.locatorResponsibleForImplementation,
      BasePage.ERROR_MESSAGE_RESPONSIBLE_FOR_IMPLEMENTATION,
    ).toBeEnabled();
    await this.locatorResponsibleForImplementation.click();
  }

  /** Ввести текст в выпадающий список 'Ответственный за реализацию'.
   *
   * @param fullName ФИО технического эксперта компонента.
   * @param clickOnTooltip Кликнуть на tooltip (если 'False', то клик на tooltip не будет производиться).
   */
  public async fillInResponsibleForImplementationOfComponentComboBox(
    fullName: string,
    clickOnTooltip: boolean = true,
  ): Promise<void> {
    await this.locatorResponsibleForImplementation.pressSequentially(fullName);
    await this.waitForPageReady();
    if (clickOnTooltip) {
      await this.locatorSearchResultsFullName.click();
      await expect(this.locatorSearchResultsFullName, BasePage.ERROR_MESSAGE).not.toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await this.page.waitForTimeout(1_000);
    }
  }

  /** Проверить выпадающий список 'Владелец'.
   *
   * @param placeholder Ожидаемый placeholder в выпадающем списке.
   */
  public async checkComponentOwnerComboBox(placeholder: string): Promise<void> {
    const errorMessage: string = `Выпадающий список 'Владелец' не содержит ожидаемый placeholder '${placeholder}'.`;
    const errorMessageNotDisplayed: string = "Выпадающий список 'Владелец' не отображается.";

    if (placeholder == UITextElements.ABSENT) {
      await expect(
        this.locatorComponentOwnerComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessageNotDisplayed,
      ).toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
      await expect(
        this.locatorComponentOwnerComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        BasePage.ERROR_MESSAGE_OWNER,
      ).toBeEnabled();
      await expect(
        this.locatorComponentOwnerComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessage,
      ).toHaveAttribute(BasePage.PLACEHOLDER, placeholder, { timeout: Settings.DEFAULT_TIMEOUT });
    } else {
      await expect(this.locatorComponentOwnerComboBoxText, errorMessageNotDisplayed).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(this.locatorComponentOwnerComboBoxText, BasePage.ERROR_MESSAGE_OWNER).toBeEnabled();
      await expect(this.locatorComponentOwnerComboBoxText, errorMessage).toHaveText(placeholder, {
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    }
  }

  /** Кликнуть на выпадающий список 'Владелец'. */
  public async clickOnComponentOwnerComboBox(): Promise<void> {
    await expect(this.locatorComponentOwnerComboBox, BasePage.ERROR_MESSAGE_OWNER).toBeEnabled();
    await this.locatorComponentOwnerComboBox.click();
  }

  /** Ввести текст в выпадающий список 'Владелец'.
   *
   * @param fullName ФИО технического эксперта компонента.
   */
  public async fillInComponentOwnerComboBox(fullName: string): Promise<void> {
    await this.locatorComponentOwnerComboBox.pressSequentially(fullName);
    await this.waitForPageReady();
    await this.locatorSearchResultsFullName.click();
    await expect(this.locatorSearchResultsFullName, BasePage.ERROR_MESSAGE).not.toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await this.page.waitForTimeout(1_000);
  }

  /** Проверить выпадающий список 'Технический эксперт'.
   *
   * @param placeholder Ожидаемый placeholder в выпадающем списке.
   */
  public async checkTechnicalExpertComboBox(placeholder: string): Promise<void> {
    const errorMessage: string = `Выпадающий список 'Технический эксперт' не содержит ожидаемый placeholder 
'${placeholder}'.`;
    const errorMessageNotDisplayed: string = "Выпадающий список 'Технический эксперт' не отображается.";

    if (placeholder == UITextElements.ABSENT) {
      await expect(
        this.locatorTechnicalExpertComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessageNotDisplayed,
      ).toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
      await expect(
        this.locatorTechnicalExpertComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        BasePage.ERROR_MESSAGE_TECHNICAL_EXPERT,
      ).toBeEnabled();
      await expect(
        this.locatorTechnicalExpertComboBox.locator(BasePage.COMPONENT_COMBO_BOX_INPUT),
        errorMessage,
      ).toHaveAttribute(BasePage.PLACEHOLDER, placeholder, { timeout: Settings.DEFAULT_TIMEOUT });
    } else {
      await expect(this.locatorTechnicalExpertComboBoxText, errorMessageNotDisplayed).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(this.locatorTechnicalExpertComboBoxText, BasePage.ERROR_MESSAGE_TECHNICAL_EXPERT).toBeEnabled();
      await expect(this.locatorTechnicalExpertComboBoxText, errorMessage).toHaveText(placeholder, {
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    }
  }

  /** Кликнуть на выпадающий список 'Технический эксперт'. */
  public async clickOnTechnicalExpertComboBox(): Promise<void> {
    await expect(this.locatorTechnicalExpertComboBox, BasePage.ERROR_MESSAGE_TECHNICAL_EXPERT).toBeEnabled();
    await this.locatorTechnicalExpertComboBox.click();
  }

  /** Ввести текст в выпадающий список 'Технический эксперт'.
   *
   * @param fullName ФИО технического эксперта компонента.
   */
  public async fillInTechnicalExpertComboBox(fullName: string): Promise<void> {
    await this.locatorTechnicalExpertComboBox.pressSequentially(fullName);
    await this.waitForPageReady();
    await this.locatorSearchResultsFullName.click();
    await expect(this.locatorSearchResultsFullName, BasePage.ERROR_MESSAGE).not.toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await this.page.waitForTimeout(2_000);
  }

  /** Проверить количество выпадающих списков.
   *
   * @param placeholder Ожидаемый placeholder в выпадающем списке.
   * @param count Ожидаемое количество выпадающих списков.
   */
  public async checkComboBoxesCount(placeholder: string, count: number): Promise<void> {
    await expect(
      this.page.locator(BasePage.COMPONENT_COMBO_BOX).filter({ hasText: placeholder }),
      `Выпадающий список с placeholder'ом '${placeholder}' не отображается на странице или количество
 таких выпадающих списков не соответствует ожидаемому (ожидаемое количество: ${count})`,
    ).toHaveCount(count);
  }

  /** Кликнуть на ссылку.
   *
   * @param linkText Ожидаемый placeholder в выпадающем списке.
   */
  public async clickOnLink(linkText: string): Promise<void> {
    await allure.step(`Кликнуть на ссылку с текстом '${linkText}'.`, async () => {
      const locatorLink: Locator = this.page.getByRole(Roles.LINK, { name: linkText, exact: true });

      await expect(locatorLink, `Ссылка с текстом '${linkText}' не отображается`).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
      await expect(locatorLink, `Ссылка с текстом '${linkText}' недоступна`).toBeEnabled();
      await locatorLink.click();
    });
  }

  /** Кликнуть на ссылку 'Продукты'. */
  public async clickOnLinkProducts(): Promise<void> {
    const locatorLink: Locator = this.page.locator(BasePage.LINK_PRODUCTS);

    await expect(locatorLink, "Ссылка 'Продукты' не отображается").toBeVisible({ timeout: Settings.DEFAULT_TIMEOUT });
    await expect(locatorLink, "Ссылка 'Продукты' недоступна").toBeEnabled();
    await locatorLink.click();
  }

  /** Проверить ссылку-заголовок страницы.
   *
   * @param title Текст ссылки-заголовка страницы.
   * @param nth Порядковый номер ссылки.
   */
  public async checkItemTitleLink(title: string, nth: number = 0): Promise<void> {
    await expect(
      this.page.locator(BasePage.ITEM_TITLE_LINK).nth(nth),
      `Ссылка-заголовок не отображается или не содержит ожидаемый текст '${title}'`,
    ).toHaveText(title, {
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить заголовок страницы.
   *
   * @param titleText Текст заголовка.
   */
  public async checkPageTitle(titleText: string): Promise<void> {
    await expect(
      this.page.locator(BasePage.TITLE),
      `Текст заголовка страницы '${titleText}' не отображается или отображается другое название`,
    ).toHaveText(titleText, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить название активной вкладки.
   *
   * @param tabName Название вкладки.
   */
  public async checkActiveTab(tabName: string): Promise<void> {
    await expect(
      this.page.locator(BasePage.ACTIVE_TAB),
      `Активная вкладка '${tabName}' не отображается или отображается другое название`,
    ).toHaveText(tabName);
  }

  /** Проверить индикатор/индикаторы избранного.
   *
   * @param count Количество индикаторов.
   */
  public async checkFavoritesIndicator(count: number = 1): Promise<void> {
    await expect(
      this.locatorFavoritesIndicator,
      `Индикатор избранного не отображается или количество не соответствует ожидаемому '${count}'`,
    ).toHaveCount(count, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить индикатор/индикаторы избранного (включенные).
   *
   * @param count Количество индикаторов.
   */
  public async checkCountFavoritesIndicatorOn(count: number = 1): Promise<void> {
    await expect(
      this.page.locator(BasePage.FAVORITES_INDICATOR_ON),
      `Включенный индикатор избранного не отображается или количество не соответствует ожидаемому '${count}'`,
    ).toHaveCount(count, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить видимость продукта 'Coordinator IG 4'. */
  public async checkVisibilityCoordinatorIg4(): Promise<void> {
    await expect(
      this.page.getByText(Products.COORDINATOR_IG_4),
      `Продукт '${Products.COORDINATOR_IG_4}' должен был исчезнуть за 30 секунд`,
    ).not.toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Получить количество индикаторов избранного.
   *
   * @return Количество индикаторов избранного.
   */
  public async getCountFavoritesIndicator(): Promise<number> {
    await this.checkVisibilityCoordinatorIg4();
    await this.page.waitForTimeout(1_500);
    await expect(this.locatorFavoritesIndicator.first(), "Ни один индикатор избранного не отображается").toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });

    return this.locatorFavoritesIndicator.count();
  }

  /** Проверить название элемента панели навигации.
   *
   * @param itemTitleText Название элемента панели навигации.
   */
  public async checkNavigationBarItemTitle(itemTitleText: string): Promise<void> {
    await expect(
      this.page.locator(BasePage.NAVIGATION_BAR_ITEM_TITLE),
      `Название элемента панели навигации не отображается или не соответствует ожидаемому значению
 '${itemTitleText}'`,
    ).toHaveText(itemTitleText);
  }

  /** Проверить видимость иконки в виде воронки. */
  public async checkVisibilityFunnelIcon(): Promise<void> {
    await expect(this.locatorFunnelIcon, "Иконка в виде воронки не отображается").toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Кликнуть на иконку в виде воронки. */
  public async clickOnFunnelIcon(): Promise<void> {
    await this.checkVisibilityFunnelIcon();
    await expect(this.locatorFunnelIcon, "Иконка в виде воронки недоступна").toBeEnabled({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await this.locatorFunnelIcon.click();
  }

  /** Проверить кнопку 'Сбросить фильтры'.
   *
   * @param visibleAndEnabled Видимость и доступность кнопки (если 'False', то должна быть невидимой).
   */
  public async checkResetFiltersButton(visibleAndEnabled: boolean = true): Promise<void> {
    if (visibleAndEnabled) {
      await expect(
        this.locatorResetFiltersButton,
        `Кнопка '${BasePage.RESET_FILTERS_BUTTON}' не отображается`,
      ).toBeVisible();
      await expect(
        this.locatorResetFiltersButton,
        `Кнопка '${BasePage.RESET_FILTERS_BUTTON}' недоступна`,
      ).toBeEnabled();
    } else {
      await expect(
        this.locatorResetFiltersButton,
        `Кнопка '${BasePage.RESET_FILTERS_BUTTON}' не должна отображаться`,
      ).not.toBeVisible();
    }
  }

  /** Кликнуть на кнопку 'Сбросить фильтры'. */
  public async clickOnResetFiltersButton(): Promise<void> {
    await this.checkResetFiltersButton();
    await this.locatorResetFiltersButton.click();
  }

  /** Проверить выпадающий список в фильтре.
   *
   * @param placeholder Placeholder combobox'а.
   * @param visible Видимость выпадающего списка в фильтре (если 'False', то список должен отсутствовать).
   */
  public async checkComboBoxInFilter(placeholder: string, visible: boolean = true): Promise<void> {
    const locatorFirst: Locator = this.page
      .locator(BasePage.COMBO_BOX_WITH_TEXT_OR_PLACEHOLDER_IN_FILTER)
      .filter({ hasText: placeholder });
    const locatorSecond: Locator = this.page.getByPlaceholder(placeholder);
    const errorMessage: string = visible
      ? `Выпадающий список с placeholder'ом '${placeholder}' не отображается`
      : `Выпадающий список с placeholder'ом '${placeholder}' не должен отображаться`;

    if (visible) {
      try {
        await expect(locatorFirst, errorMessage).toBeVisible();
      } catch {
        await expect(locatorSecond, errorMessage).toBeVisible();
      }
    } else {
      try {
        await expect(locatorFirst, errorMessage).not.toBeVisible();
      } catch {
        await expect(locatorSecond, errorMessage).not.toBeVisible();
      }
    }
  }

  /** Проверить элементы и текст в выпадающем списке фильтра.
   *
   * @param textInComboBox Текст combobox'а.
   * @param listComboBoxElements Список элементов combobox'а.
   */
  public async checkComboBoxListAndTextInFilter(textInComboBox: string, listComboBoxElements: string[]): Promise<void> {
    const locatorComboBoxWithText: Locator = this.page
      .locator(BasePage.COMBO_BOX_WITH_TEXT_OR_PLACEHOLDER_IN_FILTER)
      .filter({ hasText: textInComboBox });

    await expect(
      locatorComboBoxWithText,
      `Выпадающий список с текстом '${textInComboBox}' не отображается`,
    ).toBeVisible();

    let element: string;

    for (let i: number = 0; i < listComboBoxElements.length; i++) {
      element = listComboBoxElements[i];
      await expect(
        this.page
          .locator(BasePage.COMBO_BOX_IN_FILTER)
          .filter({ has: locatorComboBoxWithText })
          .locator(BasePage.ELEMENT_COMBO_BOX_IN_FILTER)
          .nth(i),
        `Элемент combobox'а в строке номер ${i + 1} не отображается или значение не соответствует 
ожидаемому '${element}'`,
      ).toHaveText(element);
    }
  }

  /** Кликнуть на выпадающий список в фильтре.
   *
   * @param placeholder Placeholder combobox'а.
   */
  public async clickOnComboBoxInFilter(placeholder: string): Promise<void> {
    const errorMessage: string = `Выпадающий список с placeholder'ом '${placeholder}' недоступен`;
    let locatorComboBoxWithFilter: Locator = this.locatorComboBox.filter({ hasText: placeholder });

    try {
      await expect(locatorComboBoxWithFilter, errorMessage).toBeEnabled();
    } catch {
      locatorComboBoxWithFilter = this.page.getByPlaceholder(placeholder);
      await expect(locatorComboBoxWithFilter, errorMessage).toBeEnabled();
    }
    await locatorComboBoxWithFilter.click();
  }

  /** Ввести текст в выпадающий список в фильтре.
   *
   * @param placeholder Placeholder combobox'а.
   * @param text Текст вводимый в combobox.
   */
  async fillInComboBoxInFilter(placeholder: string, text: string): Promise<void> {
    const locatorComboBoxWithFilter: Locator = this.locatorComboBox.filter({ hasText: placeholder });

    await locatorComboBoxWithFilter.pressSequentially(text);
  }

  /** Кликнуть на элемент выпадающего списка в фильтре.
   *
   * @param elementName Название элемента.
   * @param nth Порядковый номер элемента.
   */
  public async clickOnElementInComboBoxInFilter(elementName: string, nth: number = 0): Promise<void> {
    const locatorElement: Locator = this.page
      .locator(BasePage.ELEMENT_COMBO_BOX_IN_FILTER)
      .getByText(elementName, { exact: true })
      .nth(nth);

    await expect(locatorElement, `В выпадающем списке элемент '${elementName}' не отображается`).toBeVisible();
    await expect(locatorElement, `В выпадающем списке элемент '${elementName}' недоступен`).toBeEnabled();
    await locatorElement.click();
  }

  /** Кликнуть на иконку в виде крестика (закрывает блок фильтра). */
  public async clickOnCloseFilterBlockIcon(): Promise<void> {
    const locatorCloseFilterBlockIcon: Locator = this.page.locator(BasePage.CLOSE_FILTER_BLOCK_ICON);

    await expect(
      locatorCloseFilterBlockIcon,
      "Иконка в виде крестика, которая закрывает блок фильтра, не отображается",
    ).toBeVisible();
    await expect(
      locatorCloseFilterBlockIcon,
      "Иконка в виде крестика, которая закрывает блок фильтра, недоступна",
    ).toBeEnabled();
    await locatorCloseFilterBlockIcon.click();
  }

  /** Проверить заголовки таблицы.
   *
   * @param titles Список заголовков.
   */
  public async checkTableHeadings(titles: string[]): Promise<void> {
    await allure.step(`Проверить заголовки таблицы.`, async () => {
      for (let i: number = 0; i < titles.length; i++) {
        await expect(
          this.locatorColumnHeader.nth(i),
          `Заголовок в столбце номер ${i + 1} не отображается или значение не соответствует ожидаемому '${titles[i]}'`,
        ).toHaveText(titles[i], { timeout: Settings.DEFAULT_TIMEOUT });
      }
    });
  }

  /** Проверить текстовые значения таблицы в первой или в последней строке.
   *
   * @param values Список текстовых значений таблицы в первой или в последней строке.
   * @param firstString Проверяется первая строка (если 'False', то проверяется последняя строка).
   */
  public async checkTableTextValues(values: (string | RegExp)[], firstString: boolean = true): Promise<void> {
    let locator: Locator;

    for (let i: number = 0; i < values.length; i++) {
      locator = firstString ? this.locatorTableFirstRowAndColumn.nth(i) : this.locatorTableLastRowAndColumn.nth(i);

      await expect(
        locator,
        `Значение в первой строке в столбце номер ${i + 1} не отображается или значение не 
соответствует ожидаемому '${values[i]}'`,
      ).toContainText(values[i], { timeout: Settings.DEFAULT_TIMEOUT });
    }
  }

  /** Проверить видимость input'а поиска. */
  public async checkVisibilitySearchInput(): Promise<void> {
    await expect(this.locatorSearchInput, "Поле поиска не отображается").toBeVisible();
  }

  /** Ввести в input поиска текст.
   *
   * @param text Текст, который будет введён в поле поиска.
   */
  public async fillInSearchInput(text: string): Promise<void> {
    await allure.step(`Ввести в input поиска текст '${text}'.`, async () => {
      await this.checkVisibilitySearchInput();
      await expect(this.locatorSearchInput, "Поле поиска недоступно").toBeEnabled();
      await this.locatorSearchInput.fill(text);
      await this.page.waitForLoadState(LoadStates.LOAD);
    });
  }

  /** Проверить атрибут 'href' у ссылки.
   *
   * @param linkText Текст ссылки.
   * @param href URL ссылки.
   * @param inTable Ссылка находится в таблице (если 'False', то будет проверка ссылки вне таблицы).
   * @param exact Частичное совпадение по тексту (если 'True', то будет точное совпадение).
   * @param nth Порядковый номер (по умолчанию первая ссылка (nth = 0)).
   */
  public async checkHref(
    linkText: string,
    href: string,
    inTable: boolean = true,
    exact: boolean = false,
    nth: number = 0,
  ): Promise<void> {
    let locatorLink: Locator;

    if (inTable) {
      locatorLink = this.locatorTableRowAndColumn.getByRole(Roles.LINK, { name: linkText, exact: exact }).nth(nth);
    } else {
      locatorLink = this.page.getByRole(Roles.LINK, { name: linkText, exact: exact }).nth(nth);
    }
    await expect(
      locatorLink,
      `Ссылка с текстом '${linkText}' не отображается или атрибут href не соответствует ожидаемому '${href}'`,
    ).toHaveAttribute("href", href, { timeout: Settings.DEFAULT_TIMEOUT });
  }

  /** Проверить, что ссылка открывается в новой вкладке.
   *
   * @param linkText Текст ссылки.
   * @param nth Порядковый номер (по умолчанию первая ссылка (nth = 0)).
   */
  public async checkTargetBlank(linkText: string, nth: number = 0): Promise<void> {
    const locatorLink: Locator = this.page.getByRole(Roles.LINK, { name: linkText }).nth(nth);

    await expect(
      locatorLink,
      `Ссылка с текстом '${linkText}' не отображается или она не открывается в новой вкладке`,
    ).toHaveAttribute("target", "_blank");
  }

  /** Проверить видимость иконки в виде крестика.
   *
   * @param visible Видимость иконки (если 'False', то иконка должна отсутствовать на странице).
   */
  public async checkCrossIcon(visible: boolean = true): Promise<void> {
    if (visible) {
      await expect(this.locatorCrossIcon, "Иконка в виде крестика не отображается.").toBeVisible();
    } else {
      await expect(this.locatorCrossIcon, "Иконка в виде крестика не должна отображаться.").not.toBeVisible();
    }
  }

  /** Кликнуть на иконку в виде крестика. */
  public async clickOnCrossIcon(): Promise<void> {
    await this.checkCrossIcon();
    await expect(this.locatorCrossIcon, "Иконка в виде крестика недоступна").toBeEnabled();
    await this.locatorCrossIcon.click();
  }

  /** Кликнуть на все иконки в виде крестика. */
  public async clickOnAllCrossIcons(): Promise<void> {
    await expect(this.locatorCrossIcon.first(), "Первая иконка в виде крестика не отображается.").toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });

    while ((await this.locatorCrossIcon.count()) > 0) {
      await expect(this.locatorCrossIcon.first(), "Первая иконка в виде крестика недоступна").toBeEnabled();
      await this.locatorCrossIcon.first().click();
      await this.page.waitForTimeout(500);
    }
  }

  /** Проверить видимость иконки для закрытия сообщения в правом нижнем углу. */
  public async checkVisibilityCloseMessageIcon(): Promise<void> {
    await expect(
      this.locatorCloseMessageIcon,
      "Иконка закрытия всплывающего сообщения в правом нижнем углу не отображается.",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Закрыть сообщение в правом нижнем углу. */
  public async clickOnCloseMessageIcon(): Promise<void> {
    await this.checkVisibilityCloseMessageIcon();
    await expect(
      this.locatorCloseMessageIcon,
      "Иконка закрытия всплывающего сообщения в правом нижнем углу недоступна",
    ).toBeEnabled();
    await this.locatorCloseMessageIcon.click();
  }

  /** Проверить input поиска.
   *
   * @param inputText Текст, который должен присутствовать в поле поиска.
   */
  public async checkSearchInput(inputText: string): Promise<void> {
    await expect(this.locatorSearchInput, `Поле поиска не содержит текст '${inputText}'`).toHaveValue(inputText);
  }

  /** Проверить что текст имеет жёлтую подсветку.
   *
   * @param yellowText Текст, который должен быть подсвечен жёлтым цветом.
   */
  public async checkYellowBacklight(yellowText: string): Promise<void> {
    await expect(
      this.page.locator(BasePage.YELLOW_BACKLIGHT),
      `Текст '${yellowText}' не подсвечен жёлтым.`,
    ).toContainText(yellowText);
  }

  /** Ввести значение в input поиска.
   *
   * @param textWithExpander Текст рядом с которым находится экспандер.
   */
  public async clickOnExpander(textWithExpander: string): Promise<void> {
    const locatorExpander: Locator = this.locatorTableRowAndColumn
      .filter({ hasText: textWithExpander })
      .locator(BasePage.EXPANDER);

    await expect(locatorExpander, `Экспандер рядом с текстом '${textWithExpander}' не отображается`).toBeVisible();
    await expect(locatorExpander, `Экспандер рядом с текстом '${textWithExpander}' недоступен`).toBeEnabled();
    await locatorExpander.click();
  }

  /** Кликнуть на иконку избранного (включенную).
   *
   * @param textFavoritesIcon Текст рядом с иконкой избранного.
   */
  public async clickOnFavoritesIconOn(textFavoritesIcon: string): Promise<void> {
    const locatorFavoritesIconOn: Locator = this.locatorTableRow
      .filter({ hasText: textFavoritesIcon })
      .locator(BasePage.FAVORITES_INDICATOR_ON);

    await expect(
      locatorFavoritesIconOn,
      `Иконка избранного рядом с текстом '${textFavoritesIcon}' не отображается`,
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(
      locatorFavoritesIconOn,
      `Иконка избранного рядом с текстом '${textFavoritesIcon}' недоступна`,
    ).toBeEnabled();
    await locatorFavoritesIconOn.click();
  }

  /** Кликнуть на иконку избранного (выключенную).
   *
   * @param textFavoritesIcon Текст рядом с иконкой избранного.
   */
  public async clickOnFavoritesIconOff(textFavoritesIcon: string): Promise<void> {
    const locatorFavoritesIconOff: Locator = this.locatorTableRow
      .filter({ hasText: textFavoritesIcon })
      .locator(BasePage.FAVORITES_INDICATOR_OFF);

    await expect(
      locatorFavoritesIconOff,
      `Иконка избранного рядом с текстом '${textFavoritesIcon}' не отображается`,
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(
      locatorFavoritesIconOff,
      `Иконка избранного рядом с текстом '${textFavoritesIcon}' недоступна`,
    ).toBeEnabled();
    await locatorFavoritesIconOff.click();
  }

  /** Проверить видимость иконки избранного (выключенную). */
  public async checkFavoritesIconOff(): Promise<void> {
    await expect(
      this.page.locator(BasePage.FAVORITES_INDICATOR_OFF),
      "Выключенная иконка избранного не отображается",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Проверить видимость иконки избранного (включенную). */
  public async checkFavoritesIconOn(): Promise<void> {
    await expect(
      this.page.locator(BasePage.FAVORITES_INDICATOR_ON),
      "Включенная иконка избранного не отображается",
    ).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
  }

  /** Кликнуть на иконку избранного (выключенную или включенную). */
  public async clickOnFavoritesIcon(): Promise<void> {
    await expect(this.locatorFavoritesIndicator, "Иконка избранного не отображается").toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(this.locatorFavoritesIndicator, "Иконка избранного недоступна").toBeEnabled();
    await this.locatorFavoritesIndicator.click();
  }

  /** Кликнуть на все иконки избранного и иконки 'Закрыть сообщение' в правом нижнем углу. */
  public async clickOnAllFavoritesIconsAndAllCloseMessageIcons(): Promise<void> {
    await this.page.waitForLoadState(LoadStates.NETWORK_IDLE);
    const allCloseMessageIcons = this.page.getByTitle(BasePage.CLOSE_MESSAGE_ICON);

    while ((await this.locatorFavoritesIndicator.count()) > 0) {
      await this.locatorFavoritesIndicator.first().click();
      await allCloseMessageIcons.first().click();
    }
  }

  /** Проверить, что экспандер в списке не отображается.
   *
   * @param listWithExpander Список рядом с которым проверяется отображение экспандеров.
   */
  public async checkInvisibleExpanders(listWithExpander: string[]): Promise<void> {
    for (const textWithExpander of listWithExpander) {
      const locatorExpander = this.locatorTableRowAndColumn
        .filter({ hasText: textWithExpander })
        .locator(BasePage.EXPANDER);

      await expect(
        locatorExpander,
        `Экспандер рядом с текстом '${textWithExpander}' не должен отображаться`,
      ).not.toBeVisible();
    }
  }

  /** Проверить таблицу компонентов или продуктов.
   *
   * @param strings Список строк.
   */
  public async checkTableComponentsOrProducts(strings: string[]): Promise<void> {
    await this.checkVisibilityCoordinatorIg4();
    await this.page.waitForTimeout(2_000);

    for (let i: number = 0; i < strings.length; i++) {
      await expect(
        this.locatorTableRowAndColumn.locator(BasePage.LINK).nth(i),
        `Значение в строке номер ${i + 1} не отображается или не соответствует ожидаемому '${strings[i]}'`,
      ).toHaveText(strings[i], { timeout: Settings.DEFAULT_TIMEOUT });
    }
  }

  /** Кликнуть на элемент с определённым текстом.
   *
   * @param elementText Текст элемента.
   * @param nth Порядковый номер элемента.
   */
  public async clickOnElementWithText(elementText: string, nth: number = 0): Promise<void> {
    const locatorElement = this.page.getByText(elementText, { exact: true }).nth(nth);

    await expect(locatorElement, `Элемент с текстом '${elementText}' не отображается`).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorElement, `Элемент с текстом '${elementText}' недоступен`).toBeEnabled();
    await locatorElement.click();
    await this.page.waitForLoadState(LoadStates.NETWORK_IDLE);
  }

  /** Перейти на предыдущую или следующую страницу.
   *
   * @param count Количество итераций цикла.
   * @param previous Переход на предыдущую страницу (если значение False, тогда переход будет на следующую).
   */
  public async goToPreviousOrNextPage(count: number = 1, previous: boolean = true): Promise<void> {
    await allure.step(`Перейти на ${previous ? `предыдущую` : `следующую`} страницу ${count} раз(а).`, async () => {
      for (let i: number = 0; i < count; i++) {
        if (previous) {
          await this.page.goBack({ waitUntil: LoadStates.NETWORK_IDLE });
        } else {
          await this.page.goForward({ waitUntil: LoadStates.NETWORK_IDLE });
        }
      }
    });
  }

  /** Проверить checkbox с текстом.
   *
   * @param text Текст рядом с которым расположен checkbox.
   * @param marked Отмечен checkbox или нет (если 'False', то checkbox должен быть не отмечен).
   * @param nth Порядковый номер checkbox'а.
   */
  public async checkCheckboxWithTextInComboBoxInFilter(
    text: string,
    marked: boolean = true,
    nth: number = 0,
  ): Promise<void> {
    const locatorCheckbox = this.page
      .locator(BasePage.LABEL)
      .filter({ hasText: text })
      .locator(BasePage.CHECKBOX)
      .nth(nth);

    if (marked) {
      await expect(locatorCheckbox, `Checkbox '${text}' не отмечен`).toBeVisible();
    } else {
      await expect(locatorCheckbox, `Checkbox '${text}' не должен быть отмечен`).not.toBeVisible();
    }
  }

  /** Проверить текст в панели навигации.
   *
   * @param text Текст, который отображается в панели навигации.
   */
  public async checkTextInNavigationBar(text: string): Promise<void> {
    await expect(
      this.page.locator(BasePage.NAVIGATION_BAR),
      `Текст не отображается в панели навигации или не соответствует ожидаемому '${text}'`,
    ).toHaveText(text);
  }

  /** Проверить заголовок и текст на вкладке 'Общая информация'.
   *
   * @param title Заголовок строки в таблице.
   * @param text Текст в строке, который соответствует заголовку.
   */
  public async checkTitleAndTextInTabGeneralInformation(title: string, text: string | RegExp): Promise<void> {
    await expect(
      this.page.locator(BasePage.DT).filter({ hasText: title }).locator(BasePage.DD),
      `Заголовок или текст во вкладке 'Общая информация' не отображаются или не соответствуют 
ожидаемым (заголовок: '${title}', текст: '${text}')`,
    ).toHaveText(text);
  }

  /** Получить текст на вкладке 'Общая информация' по заголовку строки.
   *
   * @param title Заголовок строки в таблице.
   * @return Текст на вкладке 'Общая информация' по заголовку строки.
   */
  public async getTextInTabGeneralInformation(title: string): Promise<string> {
    const locator: Locator = this.page.locator(BasePage.DT).filter({ hasText: title }).locator(BasePage.DD);

    await expect(
      locator,
      `Заголовок строки во вкладке 'Общая информация' не отображается или не соответствует ожидаемому 
(заголовок: '${title}')`,
    ).toBeVisible();
    return locator.innerText();
  }

  /** Кликнуть на иконку в виде дискеты. */
  public async clickOnIconFloppyDisk(): Promise<void> {
    const locatorIconFloppyDisk = this.page.locator(BasePage.ICON_FLOPPY_DISK);

    await this.page.waitForTimeout(1_000);

    await expect(locatorIconFloppyDisk, "Иконка в виде дискеты не отображается").toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorIconFloppyDisk, "Иконка в виде дискеты недоступна").toBeEnabled();
    await locatorIconFloppyDisk.click();
  }

  /** Проверить жёлтую индикацию у окна подтверждения.
   *
   * @param visible Элемент должен присутствовать на странице или нет (если 'False', то должен отсутствовать).
   */
  public async checkTitleModal(visible: boolean = true): Promise<void> {
    const locatorTitleModal: Locator = this.page.locator(BasePage.TITLE_MODAL);

    if (visible) {
      await expect(locatorTitleModal, "Жёлтая индикация у окна подтверждения не отображается").toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    } else {
      await expect(locatorTitleModal, "Жёлтая индикация у окна подтверждения не должна отображаться").not.toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    }
  }

  /** Проверить сортировку ссылок на странице.
   *
   * @param numberOfFirstElement С какой ссылки начать проверку (по умолчанию: с первой (с 0)).
   * @param reverse Сортировка в порядке возрастания или в порядке убывания (по умолчанию 'False': по возрастанию).
   */
  public async checkLinksSorting(numberOfFirstElement: number = 0, reverse: boolean = false): Promise<void> {
    // TODO подумать, как сделать другие проверки сортировки без хардкода, как в этом методе
    // Ожидание в одну секунду
    await this.page.waitForTimeout(1_000);
    const listLinks = await this.locatorLink.evaluateAll((elements) =>
      // eslint-disable-next-line no-undef
      elements.map((el) => (el as HTMLElement).innerText.trim()),
    );
    const slicedLinks: string[] = listLinks.slice(numberOfFirstElement);
    const sortedLinks: string[] = [...slicedLinks].sort();
    const reverseSortedLinks: string[] = reverse ? sortedLinks.reverse() : sortedLinks;

    if (JSON.stringify(slicedLinks) !== JSON.stringify(reverseSortedLinks)) {
      throw new Error("Ссылки неправильно отсортированы");
    }
  }

  /** Кликнуть на checkbox в таблице.
   *
   * @param nth Порядковый номер checkbox'а.
   */
  public async clickOnCheckboxInTable(nth: number): Promise<void> {
    const locatorCheckboxInTable = this.page.locator(BasePage.CHECKBOX_IN_TABLE).nth(nth);

    await expect(locatorCheckboxInTable, `Checkbox с порядковым номером '${nth}' не отображается`).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorCheckboxInTable, `Checkbox с порядковым номером '${nth}' недоступен`).toBeEnabled();
    await locatorCheckboxInTable.click();
  }

  /** Кликнуть на checkbox в таблице (по тексту).
   *
   * @param text Текст в таблице справа от checkbox'а.
   */
  public async clickOnCheckboxByTextInTable(text: string): Promise<void> {
    const locatorCheckboxByTextInTable: Locator = this.page
      .getByRole(Roles.LINK, { name: text, exact: true })
      .locator("xpath=../preceding-sibling::td[1]/label");

    await expect(locatorCheckboxByTextInTable, `Checkbox с текстом '${text}' не отображается`).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorCheckboxByTextInTable, `Checkbox с текстом '${text}' недоступен`).toBeEnabled();
    await locatorCheckboxByTextInTable.click();
  }

  /** Проверить галочку у checkbox'а в таблице.
   *
   * @param nth Порядковый номер checkbox'а.
   */
  public async checkCheckboxInTable(nth: number): Promise<void> {
    await expect(
      this.page.locator(BasePage.TR).nth(nth).locator(BasePage.TABLE_COLUMN).first().locator(BasePage.PATH),
      `Checkbox с порядковым номером '${nth}' не отмечен галочкой`,
    ).toHaveCSS(CssKeysAndValues.DISPLAY, CssKeysAndValues.INLINE);
  }

  /** Проверить закрашен или нет checkbox 'Компонент' в таблице.
   *
   * @param marked Checkbox 'Компонент' должен быть закрашен или нет (если 'False', то не закрашен).
   */
  public async checkCheckboxComponentInTable(marked: boolean = true): Promise<void> {
    const locatorCheckboxComponentInTable = this.page.locator(BasePage.CHECKBOX_COMPONENT_IN_TABLE);

    if (marked) {
      await expect(locatorCheckboxComponentInTable, "Checkbox 'Компонент' не закрашен").toBeVisible();
    } else {
      await expect(locatorCheckboxComponentInTable, "Checkbox 'Компонент' не должен быть закрашен").not.toBeVisible();
    }
  }

  /** Кликнуть на элемент с определённым placeholder'ом.
   *
   * @param placeholder Placeholder элемента.
   */
  public async clickOnElementWithPlaceholder(placeholder: string): Promise<void> {
    const locatorElementByPlaceholder = this.page.getByPlaceholder(placeholder);

    await expect(locatorElementByPlaceholder, `Элемент с placeholder'ом '${placeholder}' не отображается`).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorElementByPlaceholder, `Элемент с placeholder'ом '${placeholder}' недоступен`).toBeEnabled();
    await locatorElementByPlaceholder.click();
  }

  /** Отключить сеть.
   *
   * @param offline Сеть отключена (если 'False', то сеть будет включена).
   */
  public async disconnectNetwork(offline: boolean = true): Promise<void> {
    await this.page.context().setOffline(offline);
  }

  /** Проверить видимость индикации у тоста переноса разметки.
   *
   * @param color Цвет индикации у тоста (возможные значения: green, red, yellow)
   */
  public async checkVisibilityIndication(color: string): Promise<void> {
    const validColors: string[] = [Colors.GREEN, Colors.RED, Colors.YELLOW];
    if (!validColors.includes(color as any)) {
      throw new Error(`Недопустимое значение ('${color}'). Выберите из: ${validColors}`);
    }

    if (color === Colors.GREEN) {
      await expect(
        this.page.locator(BasePage.GREEN_INDICATION),
        "Зеленая индикация у тоста переноса разметки не отображается",
      ).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    } else if (color === Colors.RED) {
      await expect(
        this.page.locator(BasePage.RED_INDICATION),
        "Красная индикация у тоста переноса разметки не отображается",
      ).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    } else {
      await expect(
        this.page.locator(BasePage.YELLOW_INDICATION),
        "Жёлтая индикация у тоста переноса разметки не отображается",
      ).toBeVisible({
        timeout: Settings.DEFAULT_TIMEOUT,
      });
    }
  }

  /** Проверить видимость и доступность кнопки с определённым текстом.
   *
   * @param buttonText Текст кнопки.
   */
  public async checkButtonWithText(buttonText: string): Promise<void> {
    const locatorButton: Locator = this.page.getByRole(Roles.BUTTON, { name: buttonText, exact: true });

    await expect(locatorButton, `Кнопка с текстом '${buttonText}' не отображается`).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorButton, `Кнопка с текстом '${buttonText}' недоступна`).toBeEnabled();
  }

  /** Кликнуть на кнопку с определённым текстом.
   *
   * @param buttonText Текст кнопки.
   */
  async clickOnButtonWithText(buttonText: string): Promise<void> {
    await this.checkButtonWithText(buttonText);
    await this.page.getByRole(Roles.BUTTON, { name: buttonText, exact: true }).click();
  }

  /** Кликнуть ComboBox 'Версия' в модальном окне переноса разметки. */
  async clickOnComboBoxVersionTransferOfMarkings(): Promise<void> {
    const locatorComboBoxVersion: Locator = this.page.locator(BasePage.COMBO_BOX_IN_WINDOW_TRANSFER_OF_MARKINGS).last();

    await expect(locatorComboBoxVersion, "ComboBox 'Версия' не отображается").toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorComboBoxVersion, "ComboBox 'Версия' недоступен").toBeEnabled();
    await locatorComboBoxVersion.click();
  }

  /** Проверить галку в checkbox'е 'Компонент' в таблице.
   *
   * @param marked Если 'false', то галка не отображается (По умолчанию 'true').
   */
  async checkCheckMarkInCheckboxComponentInTable(marked: boolean = true): Promise<void> {
    const locatorCheckMark: Locator = this.page.locator(BasePage.CHECK_MARK_IN_CHECKBOX_COMPONENT_IN_TABLE);

    if (marked)
      await expect(locatorCheckMark, "Галка в checkbox'е 'Компонент' в таблице не отображается").toBeVisible();
    else
      await expect(
        locatorCheckMark,
        "Галка в checkbox'е 'Компонент' в таблице не должна отображаться",
      ).not.toBeVisible();
  }

  /** Проверить вертикальный скролл в списке элементов в окне переноса разметки. */
  async checkVerticalScrolling(): Promise<void> {
    await expect(
      this.page.locator(BasePage.ELEMENTS_IN_PRODUCT_FIELD_IN_MARKUP_TRANSFER_WINDOW),
      "Вертикальный скролл в списке элементов в окне переноса разметки не отображается",
    ).toHaveClass(RegularExpressions.PATTERN_CLASS_SCROLL_THIN);
  }

  /** Ввести текст в поле продукт в окне переноса разметки.
   *
   * @param text Текст вводимый в combobox.
   */
  async fillInProductFieldInMarkupTransferWindow(text: string): Promise<void> {
    await this.page.locator(BasePage.PRODUCT_FIELD_IN_MARKUP_TRANSFER_WINDOW).pressSequentially(text);
  }

  /** Проверить элементы списка в поле 'Продукт' или в поле 'Версия' в окне переноса разметки.
   *
   * @param listElements Список элементов.
   */
  async checkElementsInFieldInMarkupTransferWindow(listElements: string[]): Promise<void> {
    const locatorElement: Locator = this.page.locator(BasePage.ELEMENT_IN_PRODUCT_FIELD_IN_MARKUP_TRANSFER_WINDOW);

    let i: number = 0;
    for (const element of listElements) {
      await expect(
        locatorElement.nth(i),
        `Элемент в строке номер ${i + 1} не отображается или значение не соответствует ожидаемому '${element}'`,
      ).toHaveText(element, { timeout: Settings.DEFAULT_TIMEOUT });
      i++;
    }
  }

  /** Кликнуть на элемент с определённым titl'ом.
   *
   * @param title Title элемента.
   * @param nth Порядковый номер элемента (по умолчанию `nth = 0`).
   */
  async clickOnElementWithTitle(title: string, nth: number = 0): Promise<void> {
    const locatorElementByTitle: Locator = this.page.getByTitle(title).nth(nth);

    await expect(locatorElementByTitle, `Элемент с titl'ом '${title}' не отображается`).toBeVisible({
      timeout: Settings.DEFAULT_TIMEOUT,
    });
    await expect(locatorElementByTitle, `Элемент с titl'ом '${title}' недоступен`).toBeEnabled();
    await locatorElementByTitle.click();
  }
}
