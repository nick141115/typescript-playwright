import { BaseTest } from "../base/base-test";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import { Products } from "../../src/constants/products";
import { Versions } from "../../src/constants/versions";
import { Colors } from "../../src/constants/colors";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { TestInputs } from "../../src/constants/test-inputs";
import { Lists } from "../../src/constants/lists";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { AgreementValues } from "../../src/constants/agreement-values";

/** Перенос разметки. */
export class TestTransferOfMarkings extends BaseTest {
  private readonly VERSION_FIVE_NINE: string = "4.5.9";
  private readonly VERSION_SIX_ZERO: string = "4.6.0";
  private readonly RELOCATE: string = "Перенести";
  private readonly EXPAND: string = "Раскрыть";
  private readonly TRANSFERRING_MARKUP: string = "Перенос разметки";
  private readonly MESSAGE: string = "Выберите версию продукта с которой необходимо перенести разметку.";
  private readonly TRANSFER_ERROR: string = "Ошибка переноса. Выбранные компоненты отсутствуют в исходной версии.";

  /** Паспорт продукта, ручной перенос разметки по статусу согласования. */
  public async testProductPassportManualTransferOfMarkingsAccordingToApprovalStatus(): Promise<void> {
    const message: string = "Выберите продукт из которого необходимо перенести разметку.";
    const selectProduct: string = "Выберите продукт";
    const amqpCpp: string = "AMQP-CPP";
    const markupHasBeenSuccessfullyMigrated: string = "Разметка успешно перенесена.";
    const transferError: string = "Ошибка переноса. Выбранные компоненты отсутствуют в исходном продукте.";
    const markupHasBeenPartiallyMoved: string =
      "Разметка частично перенесена. Некоторые компоненты отсутствуют в исходном продукте.";

    const titles: string[] = [
      " ",
      UITextElements.COMPONENT,
      UITextElements.TECHNICAL_RADAR_AREA,
      UITextElements.AGREEMENT,
      "Обоснование/Комментарий",
    ];

    // Шаг 1: Подготовка компонентов и разметки
    let components: string[] = [
      Components.UTIL_LINUX,
      Components.BZIP2,
      Components.CRYPTO_UNDERGROUND_V2,
      Components.ZLIB1G,
      Components.CRYPT_CPU_FEATURES,
      Components.ACCORDSDK,
      Components.ACETAO,
      Components.ACPID,
    ];

    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

    for (const component of components) {
      await this.clearingMarkup(component);
    }

    await this.productInformationPage.fillInSearchInput(Components.ATOP);
    await this.productInformationPage.clickOnElementWithText(UITextElements.EDIT);
    await this.productInformationPage.checkCheckboxAgreementAndClick();
    await this.productInformationPage.fillInTextareaJustificationComment(UITextElements.TEXT_JUSTIFICATION);
    await this.productInformationPage.clickOnIconFloppyDisk();
    await this.productInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productInformationPage.checkText({ pageText: UITextElements.QUESTION, visible: false });
    await this.productInformationPage.clickOnCloseMessageIcon();

    await this.componentPage.clickOnLinkProducts();
    await this.clickOnLinks();

    components = [Components.LIBC6, Components.CRYPT_CPU_FEATURES, Components.ACPID];

    for (const component of components) {
      await this.productInformationPage.fillInSearchInput(component);
      await this.productInformationPage.clickOnElementWithText(UITextElements.EDIT);
      await this.productInformationPage.checkCheckboxAgreementAndClick();
      await this.productInformationPage.fillInTextareaJustificationComment(UITextElements.TEXT_JUSTIFICATION);
      await this.productInformationPage.clickOnIconFloppyDisk();
      await this.productInformationPage.clickOnElementWithText(UITextElements.YES);
      await this.productInformationPage.checkText({ pageText: UITextElements.QUESTION, visible: false });
      await this.productInformationPage.clickOnCloseMessageIcon();
    }

    components = [Components.UTIL_LINUX, Components.ZLIB1G, Components.ACETAO];

    for (const component of components) {
      await this.productInformationPage.fillInSearchInput(component);
      await this.productInformationPage.clickOnElementWithText(UITextElements.EDIT);
      await this.productInformationPage.checkCheckboxAgreementAndClick(false);
      await this.productInformationPage.fillInTextareaJustificationComment(UITextElements.TEXT_JUSTIFICATION);
      await this.productInformationPage.clickOnIconFloppyDisk();
      await this.productInformationPage.clickOnElementWithText(UITextElements.YES);
      await this.productInformationPage.checkText({ pageText: UITextElements.QUESTION, visible: false });
      await this.productInformationPage.clickOnCloseMessageIcon();
    }

    components = [Components.BZIP2, Components.CRYPTO_UNDERGROUND_V2, Components.ACCORDSDK, Components.ATOP];

    for (const component of components) {
      await this.clearingMarkup(component);
    }

    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

    // Шаг 2: Выбор компонентов
    components = [
      Components.BASH,
      Components.LIBC6,
      Components.UTIL_LINUX,
      Components.BZIP2,
      Components.CRYPTO_UNDERGROUND_V2,
      Components.ZLIB1G,
      Components.CRYPT_CPU_FEATURES,
      Components.ACCORDSDK,
      Components.ACETAO,
      Components.ACPID,
    ];

    let selected: string = `выбрано: ${components.length}`;

    for (const component of components) {
      await this.productInformationPage.clickOnCheckboxByTextInTable(component);
    }

    await this.productInformationPage.checkCheckboxComponentInTable();
    await this.productInformationPage.checkText({ pageText: UITextElements.EDIT, visible: false });
    await this.productInformationPage.checkText({ pageText: selected });

    // Шаг 3: Нажать 'Перенести разметку'
    await this.productInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productInformationPage.checkText({ pageText: message });
    await this.productInformationPage.checkButtonWithText(UITextElements.CANCEL);

    // Шаг 4: Выбор исходного продукта
    await this.productInformationPage.clickOnElementWithPlaceholder(selectProduct);
    await this.productInformationPage.clickOnElementWithText(Products.COORDINATOR_HW_4);
    await this.productInformationPage.checkText({ pageText: Products.COORDINATOR_HW_4 });

    // Шаг 5: Нажать 'Перенести'
    await this.productInformationPage.clickOnButtonWithText(this.RELOCATE);
    await this.productInformationPage.checkText({ pageText: message, visible: false });
    await this.productInformationPage.checkVisibilityIndication(Colors.GREEN);
    await this.productInformationPage.checkText({ pageText: this.TRANSFERRING_MARKUP });
    await this.productInformationPage.checkText({ pageText: markupHasBeenSuccessfullyMigrated });
    await this.productInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productInformationPage.checkVisibilityCloseMessageIcon();
    await this.productInformationPage.checkText({
      pageText: markupHasBeenSuccessfullyMigrated,
      visible: false,
      timeout: 6_000,
    });
    await this.productInformationPage.checkText({ pageText: selected, visible: false });
    await this.productInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP, visible: false });
    await this.productInformationPage.checkText({ pageText: UITextElements.EDIT });
    await this.productInformationPage.checkCheckboxComponentInTable(false);

    // Шаг 6: Проверка корректности переноса
    await this.productInformationPage.checkTableHeadings(titles);

    const listValues: string[][] = [
      Lists.VALUES_BASH,
      [
        " ",
        Components.UTIL_LINUX,
        RadarAreaValues.PILOTED_BY,
        AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
        UITextElements.TEXT_JUSTIFICATION,
      ],
      [" ", Components.BZIP2, RadarAreaValues.INTERESTED_IN, AgreementValues.DEVIATION_IS_NOT_AGREED_UPON, ""],
      Lists.VALUES_CRYPTO_UNDERGROUND_V2,
      [
        " ",
        Components.ZLIB1G,
        RadarAreaValues.AVOID,
        AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
        UITextElements.TEXT_JUSTIFICATION,
      ],
      Lists.VALUES_CRYPT_CPU_FEATURES,
      Lists.VALUES_ACCORDSDK,
      [
        " ",
        Components.ACETAO,
        RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
        AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
        UITextElements.TEXT_JUSTIFICATION,
      ],
      Lists.VALUES_ACPID,
    ];

    const secondElementOfList: number = 1;

    for (const values of listValues) {
      await this.productInformationPage.fillInSearchInput(values[secondElementOfList]);
      await this.productInformationPage.checkTableTextValues(values);
    }

    const valuesLibc6: string[] = [
      " ",
      Components.LIBC6,
      RadarAreaValues.PILOTED_BY,
      AgreementValues.DEVIATION_IS_AGREED,
      UITextElements.TEXT_JUSTIFICATION,
    ];

    await this.productInformationPage.fillInSearchInput(Components.LIBC6);
    await this.productInformationPage.checkTableTextValues(valuesLibc6, false);
    await this.productInformationPage.clickOnLinkProducts();

    await this.clickOnLinks();

    for (const values of listValues) {
      await this.productInformationPage.fillInSearchInput(values[1]);
      await this.productInformationPage.checkTableTextValues(values);
    }

    await this.productInformationPage.fillInSearchInput(Components.LIBC6);
    await this.productInformationPage.checkTableTextValues(valuesLibc6, false);
    await this.productInformationPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

    // Шаг 7: Выбор AMQP-CPP
    selected = "выбран: 1";

    await this.productInformationPage.clickOnCheckboxByTextInTable(amqpCpp);
    await this.productInformationPage.checkText({ pageText: selected });

    // Шаг 8: Перенос AMQP-CPP
    await this.productInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productInformationPage.clickOnElementWithPlaceholder(selectProduct);
    await this.productInformationPage.clickOnElementWithText(Products.COORDINATOR_HW_4);
    await this.productInformationPage.clickOnButtonWithText(this.RELOCATE);
    await this.productInformationPage.checkVisibilityIndication(Colors.RED);
    await this.productInformationPage.checkText({ pageText: this.TRANSFERRING_MARKUP });
    await this.productInformationPage.checkText({ pageText: transferError });
    await this.productInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productInformationPage.checkVisibilityCloseMessageIcon();
    await this.productInformationPage.checkText({ pageText: transferError, visible: false, timeout: 6_000 });
    await this.productInformationPage.checkText({ pageText: selected, visible: false });
    await this.productInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP, visible: false });
    await this.productInformationPage.checkText({ pageText: UITextElements.EDIT });
    await this.productInformationPage.checkCheckboxComponentInTable(false);

    // Шаг 9: Проверка AMQP-CPP
    await this.productInformationPage.clickOnLinkProducts();
    await this.clickOnLinks();
    await this.productInformationPage.fillInSearchInput(amqpCpp);
    await this.productInformationPage.checkText({ pageText: UITextElements.NOTHING_FOUND });
    await this.productInformationPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);
    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

    // Шаг 10: Выбор AMQP-CPP и atop
    await this.productInformationPage.clickOnCheckboxByTextInTable(amqpCpp);
    await this.productInformationPage.clickOnCheckboxByTextInTable(Components.ATOP);

    // Шаг 11: Перенос AMQP-CPP и atop
    await this.productInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productInformationPage.clickOnElementWithPlaceholder(selectProduct);
    await this.productInformationPage.clickOnElementWithText(Products.COORDINATOR_HW_4);
    await this.productInformationPage.clickOnButtonWithText(this.RELOCATE);

    await this.productInformationPage.checkVisibilityIndication(Colors.YELLOW);
    await this.productInformationPage.checkText({ pageText: this.TRANSFERRING_MARKUP });
    await this.productInformationPage.checkText({ pageText: markupHasBeenPartiallyMoved });
    await this.productInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productInformationPage.checkVisibilityCloseMessageIcon();
    await this.productInformationPage.checkText({
      pageText: markupHasBeenPartiallyMoved,
      visible: false,
      timeout: 6000,
    });
    await this.productInformationPage.checkText({ pageText: selected, visible: false });
    await this.productInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP, visible: false });
    await this.productInformationPage.checkText({ pageText: UITextElements.EDIT });
    await this.productInformationPage.checkCheckboxComponentInTable(false);

    // Шаг 12: Проверка atop
    const values: string[] = [
      " ",
      Components.ATOP,
      RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
      AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
      "",
    ];

    await this.productInformationPage.fillInSearchInput(Components.ATOP);
    await this.productInformationPage.checkTableTextValues(values);
    await this.productInformationPage.clickOnLinkProducts();
    await this.clickOnLinks();
    await this.productInformationPage.fillInSearchInput(amqpCpp);
    await this.productInformationPage.checkText({ pageText: UITextElements.NOTHING_FOUND });
    await this.productInformationPage.fillInSearchInput(Components.ATOP);
    await this.productInformationPage.checkTableTextValues(values);
  }

  /** Ручной перенос ПА и ФБ, окно 'Перенос разметки', Отмена. */
  public async testTransferOfMarkingsCancel(): Promise<void> {
    // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе. Открыт
    // паспорт версии продукта, вкладка 'Компонентный состав'
    await this.setupVersionOfProductComponentComposition();

    // 2. В списке компонентов выбрать не менее одного компонента
    for (let i: number = 1; i <= 3; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productInformationPage.checkCheckboxComponentInTable();
    await this.productInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });

    await this.checkCheckboxesInTable();

    // 3. Нажать 'Перенести разметку'
    await this.clickTransferMarkup();

    // 4. Заполнить обязательные поля валидными значениями
    await this.productVersionInformationPage.clickOnComboBoxVersionTransferOfMarkings();
    await this.productVersionInformationPage.clickOnElementWithText(Versions.VERSION_FIVE_FIVE_ZERO);
    await this.productVersionInformationPage.checkText({ pageText: Versions.VERSION_FIVE_FIVE_ZERO });

    // 5. Нажать 'Отмена'
    await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.CANCEL);
    await this.productVersionInformationPage.checkText({ pageText: this.MESSAGE, visible: false });

    await this.checkCheckboxesInTable();

    // 6. Повторно нажать 'Перенести разметку'
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productVersionInformationPage.checkText({ pageText: this.MESSAGE });
    await this.productVersionInformationPage.checkText({ pageText: Products.COORDINATOR_HW_5 });
    await this.productVersionInformationPage.checkText({ pageText: Versions.VERSION_FIVE_FIVE_ZERO, visible: false });
    await this.productVersionInformationPage.clickOnComboBoxVersionTransferOfMarkings();
  }

  /** Ручной перенос ПА и ФБ в рамках версии одного продукта, ошибка переноса. */
  public async testTransferOfMarkingsWithinVersionOfOneProductTransferError(): Promise<void> {
    // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе. Открыт
    // паспорт версии продукта, вкладка 'Компонентный состав' (паспорт версии в которую переносим разметку). В
    // исходной версии отсутствуют компоненты, которые есть в версии назначения
    await this.setupVersionOfProductComponentComposition();

    // 2. В списке компонентов версии назначения выбрать компоненты, которые ОТСУТСТВУЮТ в исходной версии
    for (let i: number = 1; i <= 3; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productInformationPage.checkCheckboxComponentInTable();
    await this.productInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.checkCheckboxesInTable();

    // 3. Нажать 'Перенести разметку'
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productVersionInformationPage.checkText({ pageText: this.MESSAGE });
    await this.productVersionInformationPage.checkButtonWithText(this.RELOCATE);
    await this.productVersionInformationPage.checkButtonWithText(UITextElements.CANCEL);

    // 4. Поле 'Продукт' оставить без изменений (перенос осуществляется в рамках разных версий одного продукта)
    await this.productVersionInformationPage.checkText({ pageText: Products.COORDINATOR_HW_5 });

    // 5. В поле 'Версия' указать номер версии продукта из которой будет перенесена разметка
    await this.productVersionInformationPage.clickOnComboBoxVersionTransferOfMarkings();
    await this.productVersionInformationPage.clickOnElementWithText(Versions.VERSION_ONE_ONE);
    await this.productVersionInformationPage.checkText({ pageText: Versions.VERSION_ONE_ONE });

    // 6. Нажать 'Перенести'
    await this.productVersionInformationPage.clickOnButtonWithText(this.RELOCATE);
    await this.productVersionInformationPage.checkText({ pageText: this.MESSAGE, visible: false });
    await this.productVersionInformationPage.checkVisibilityIndication(Colors.RED);
    await this.productVersionInformationPage.checkText({ pageText: this.TRANSFERRING_MARKUP });
    await this.productVersionInformationPage.checkText({ pageText: this.TRANSFER_ERROR });
    await this.productVersionInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productVersionInformationPage.checkVisibilityCloseMessageIcon();
    await this.productVersionInformationPage.checkText({
      pageText: this.TRANSFER_ERROR,
      visible: false,
      timeout: 6_000,
    });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN, visible: false });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP, visible: false });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.EDIT });
    await this.productVersionInformationPage.checkCheckboxComponentInTable(false);
  }

  /** Перенос разметки, поля 'Продукт' и 'Версия', валидация. */
  public async testTransferOfMarkingsFieldsProductAndVersionValidation(): Promise<void> {
    // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе.
    // Открыт паспорт версии продукта, вкладка 'Компонентный состав', выбраны компоненты для переноса разметки
    await this.setupVersionOfProductComponentComposition();

    for (let i: number = 1; i <= 3; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productInformationPage.checkCheckboxComponentInTable();
    await this.productInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.checkCheckboxesInTable();

    // 2. Нажать 'Перенести разметку'
    await this.clickTransferMarkup();

    // 3. Нажать 'Перенести'
    await this.productVersionInformationPage.clickOnButtonWithText(this.RELOCATE);
    await this.productVersionInformationPage.checkText({ pageText: "Выберите версию продукта" });
    await this.productVersionInformationPage.checkVisibilityRedBacklightFieldVersion();
    await this.productVersionInformationPage.checkVisibilityRedFontError();
  }

  /** Перенос разметки, поле 'Продукт'. */
  public async testTransferOfMarkingsFieldProduct(): Promise<void> {
    // 1. Пользователь с правами на редактирование ВСЕХ паспортов компонентов и ВСЕХ продуктов авторизован в
    // сервисе. Открыт паспорт версии продукта, вкладка 'Компонентный состав', выбраны компоненты для переноса
    // разметки, открыто окно 'Перенос разметки'
    await this.setupVersionOfProductComponentComposition();

    for (let i: number = 1; i <= 3; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productInformationPage.checkCheckboxComponentInTable();
    await this.productInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.checkCheckboxesInTable();
    await this.clickTransferMarkup();

    // 2. Установить курсор в поле 'Продукт'
    await this.productVersionInformationPage.clickOnElementWithTitle(this.EXPAND);
    await this.productVersionInformationPage.checkVerticalScrolling();

    // 3. Ввести название несуществующего продукта
    await this.productVersionInformationPage.fillInProductFieldInMarkupTransferWindow(TestInputs.SPECIAL_CHARACTERS);
    await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.CANCEL);

    // 4. Ввести часть названия продукта в нижнем/верхнем/смешанном регистре
    const listProducts: string[] = [Products.COORDINATOR_HW_4, Products.COORDINATOR_HW_5];

    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productVersionInformationPage.clickOnElementWithTitle(this.EXPAND);
    await this.productVersionInformationPage.fillInProductFieldInMarkupTransferWindow(
      Products.COORDINATOR_HW_5.toUpperCase().slice(0, -1),
    );
    await this.productVersionInformationPage.checkElementsInFieldInMarkupTransferWindow(listProducts);
    await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.CANCEL);

    // 5. Ввести название продукта, поставить пробел до/после названия
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productVersionInformationPage.clickOnElementWithTitle(this.EXPAND);
    await this.productVersionInformationPage.fillInProductFieldInMarkupTransferWindow(` ${Products.COORDINATOR_HW_4} `);

    // 6. Выбрать искомый продукт
    await this.productVersionInformationPage.clickOnElementWithText(Products.COORDINATOR_HW_4);
    await this.productVersionInformationPage.checkText({ pageText: Products.COORDINATOR_HW_4 });
  }

  /** Перенос разметки, поле 'Версия'. */
  public async testTransferOfMarkingsFieldVersion(): Promise<void> {
    const versionFourEight: string = "4.4.8";

    // 1. Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в сервисе. Открыт
    // паспорт версии продукта, вкладка 'Компонентный состав', выбраны компоненты для переноса разметки
    await this.setupVersionOfProductComponentComposition();

    for (let i: number = 1; i <= 3; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productInformationPage.checkCheckboxComponentInTable();
    await this.productInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.checkCheckboxesInTable();

    // 2. Нажать 'Перенести разметку'
    await this.clickTransferMarkup();

    // 3. Нажать на экспандер в поле 'Версия'
    let listVersions: string[] = [this.VERSION_SIX_ZERO, this.VERSION_FIVE_NINE, "4.5.8"];
    await this.productVersionInformationPage.clickOnElementWithTitle(this.EXPAND);
    await this.productVersionInformationPage.clickOnElementWithText(Products.COORDINATOR_HW_4);
    await this.productVersionInformationPage.clickOnComboBoxVersionTransferOfMarkings();
    await this.productVersionInformationPage.checkElementsInFieldInMarkupTransferWindow(listVersions);

    // 4. В поле 'Продукт' выбрать любой другой продукт
    await this.productVersionInformationPage.clickOnElementWithTitle(this.EXPAND);
    await this.productVersionInformationPage.clickOnElementWithText(Products.CSP_WINDOWS_4);
    await this.productVersionInformationPage.checkText({ pageText: Products.CSP_WINDOWS_4 });

    // 5. Нажать на экспандер в поле 'Версия'
    listVersions = ["4.4.10", versionFourEight, "4.4.4"];
    await this.productVersionInformationPage.clickOnComboBoxVersionTransferOfMarkings();
    await this.productVersionInformationPage.checkElementsInFieldInMarkupTransferWindow(listVersions);

    // 6. Выбрать любую версию
    await this.productVersionInformationPage.clickOnElementWithText(versionFourEight);
    await this.productVersionInformationPage.checkText({ pageText: versionFourEight });
  }

  /** Ручной перенос разметки ПА и ФБ в рамках разных продуктов. */
  public async testTransferOfMarkingsWithinDifferentProducts(): Promise<void> {
    const checkboxFirst: number = 0;
    const chosen: string = "выбрано: 309";
    const markupHasBeenPartiallyMoved: string =
      "Разметка частично перенесена. Некоторые компоненты отсутствуют в исходной версии.";

    // 1. Предусловие: Пользователь с правами на редактирование паспортов компонентов и продуктов авторизован в
    // сервисе. Открыт паспорт версии продукта, вкладка 'Компонентный состав' (паспорт версии в которую переносим
    // разметку). В исходной версии продукта есть только часть компонентов от версии назначения.
    await this.setupVersionOfProductComponentComposition();

    // 2. Выбрать ВСЕ используемые компоненты в версии назначения
    await this.productVersionInformationPage.clickOnCheckboxInTable(checkboxFirst);
    await this.productVersionInformationPage.checkText({ pageText: chosen });
    await this.productVersionInformationPage.checkCheckMarkInCheckboxComponentInTable();

    await this.checkCheckboxesInTable();

    // 3. Нажать 'Перенести разметку'
    await this.clickTransferMarkup();

    // 4. В поле 'Продукт' указать название продукта отличного от текущего
    await this.productVersionInformationPage.clickOnElementWithTitle(this.EXPAND);
    await this.productVersionInformationPage.clickOnElementWithText(Products.COORDINATOR_HW_4);
    await this.productVersionInformationPage.checkText({ pageText: Products.COORDINATOR_HW_4 });

    // 5. В поле 'Версия' указать версию из которой будем переносить разметку
    await this.productVersionInformationPage.clickOnComboBoxVersionTransferOfMarkings();
    await this.productVersionInformationPage.clickOnElementWithText(this.VERSION_FIVE_NINE);
    await this.productVersionInformationPage.checkText({ pageText: this.VERSION_FIVE_NINE });

    // 6. Нажать 'Перенести'
    await this.productVersionInformationPage.clickOnButtonWithText(this.RELOCATE);
    await this.productVersionInformationPage.checkVisibilityIndication(Colors.YELLOW);
    await this.productVersionInformationPage.checkText({ pageText: this.TRANSFERRING_MARKUP });
    await this.productVersionInformationPage.checkText({ pageText: markupHasBeenPartiallyMoved });
    await this.productVersionInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productVersionInformationPage.checkVisibilityCloseMessageIcon();
    await this.productVersionInformationPage.checkText({
      pageText: markupHasBeenPartiallyMoved,
      visible: false,
      timeout: 6_000,
    });
    await this.productVersionInformationPage.checkText({ pageText: chosen, visible: false });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP, visible: false });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.EDIT });
    await this.productVersionInformationPage.checkCheckboxComponentInTable(false);
    await this.productVersionInformationPage.checkCheckMarkInCheckboxComponentInTable(false);

    // 7. Повторить шаги тест-кейса для переноса разметки между версиями разных продуктов для получения тостов
    // 'Разметка успешно перенесена.' и 'Ошибка переноса. Выбранные компоненты отсутствуют в исходной версии.'
    await this.productVersionInformationPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);
    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnCheckboxInTable(checkboxFirst);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productVersionInformationPage.clickOnElementWithTitle(this.EXPAND);
    await this.productVersionInformationPage.clickOnElementWithText(Products.COORDINATOR_HW_4);
    await this.productVersionInformationPage.clickOnComboBoxVersionTransferOfMarkings();
    await this.productVersionInformationPage.clickOnElementWithText(this.VERSION_SIX_ZERO);
    await this.productVersionInformationPage.clickOnButtonWithText(this.RELOCATE);
    await this.productVersionInformationPage.checkText({ pageText: this.TRANSFER_ERROR });
  }

  /** Нажать 'Перенести разметку'. */
  private async clickTransferMarkup(): Promise<void> {
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.TRANSFER_MARKUP);
    await this.productVersionInformationPage.checkText({ pageText: this.MESSAGE });
    await this.productVersionInformationPage.checkText({ pageText: Products.COORDINATOR_HW_5 });
    await this.productVersionInformationPage.checkButtonWithText(this.RELOCATE);
    await this.productVersionInformationPage.checkButtonWithText(UITextElements.CANCEL);
  }

  /** Кликнуть по ссылкам: 'Все продукты', 'Coordinator HW 4' и 'Компонентный состав'. */
  private async clickOnLinks(): Promise<void> {
    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_4);

    await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
  }

  /** Очистка разметки компонента.
   *
   * @param componentName Название компонента.
   */
  private async clearingMarkup(componentName: string): Promise<void> {
    await this.productInformationPage.fillInSearchInput(componentName);
    await this.productInformationPage.clickOnElementWithText(UITextElements.EDIT);
    await this.productInformationPage.checkCheckboxAgreementAndClick(false);
    await this.productInformationPage.fillInTextareaJustificationComment("");
    await this.productInformationPage.clickOnIconFloppyDisk();
    await this.productInformationPage.clickOnElementWithText(UITextElements.YES);
    await this.productInformationPage.checkText({ pageText: UITextElements.QUESTION, visible: false });
    await this.productInformationPage.clickOnCloseMessageIcon();
  }
}
