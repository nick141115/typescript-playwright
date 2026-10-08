import { BaseTest } from "../base/base-test";
import { Components } from "../../src/constants/components";
import { RadarAreaValues } from "../../src/constants/radar-area-values";
import { Packages } from "../../src/constants/packages";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Products } from "../../src/constants/products";
import { Versions } from "../../src/constants/versions";
import { Colors } from "../../src/constants/colors";
import { RegularExpressions } from "../../src/constants/regular-expressions";
import { Lists } from "../../src/constants/lists";

/** Групповая разметка. */
export class TestGroupMarkup extends BaseTest {
  private readonly CHECKBOX_ALL: number = 0;
  private readonly FIRST_CHECKBOX: number = 14;
  private readonly LAST_CHECKBOX: number = 16;
  private readonly GROUP_MARKUP: string = "Групповая разметка";
  private readonly ERROR_MESSAGE: string = "Во время обновления информации о компонентах произошла ошибка";
  private readonly INFORMATION_MESSAGE_SECURITY_FUNCTION: string =
    'Для выбранных компонентов в параметре "Функция безопасности" будет установлено значение "Косвенно".Продолжить?';
  private readonly INFORMATION_MESSAGE_ATTACK_SURFACE: string =
    'Для выбранных компонентов в параметре "Поверхность атаки" будет установлено значение "Косвенно".Продолжить?';
  private readonly VALUES: string[] = [
    " ",
    Components.ACPI_SUPPORT_BASE,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    Packages.PACKAGE_ACPI_SUPPORT_BASE,
    UITextElements.NOT_SPECIFIED,
    "",
    UITextElements.NOT_SPECIFIED,
    "",
  ];

  /** Групповая разметка, функция безопасности, отказ. */
  async testGroupMarkupSecurityFunctionRejection(): Promise<void> {
    // Групповая разметка - Функция безопасности - отказ
    // 1. Предусловие: Пользователь с правами редактирования паспортов продуктов авторизован в сервисе, открыт
    // паспорт версии продукта на вкладке 'Компонентный состав', 'Функция безопасности' и 'Поверхность атаки'
    // не размечены
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 2);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 4);

    // 2. Выбрать 2-3 компонента с помощью чекбоксов
    for (let i: number = this.FIRST_CHECKBOX; i <= this.LAST_CHECKBOX; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productVersionInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.SECURITY_FUNCTION });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.ATTACK_SURFACE });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP });
    await this.productVersionInformationPage.checkCheckboxComponentInTable();

    await this.checkCheckboxesInTable();

    // 3. В списке выбрать произвольное значение функции безопасности
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY);
    await this.productVersionInformationPage.checkText({ pageText: this.INFORMATION_MESSAGE_SECURITY_FUNCTION });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.YES, nth: 1 });

    // 4. Нажать кнопку 'Нет'
    await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.NO);
    await this.productVersionInformationPage.checkText({
      pageText: this.INFORMATION_MESSAGE_SECURITY_FUNCTION,
      visible: false,
    });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.YES, visible: false, nth: 1 });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.INDIRECTLY, visible: false });

    await this.checkCheckboxesInTable();
  }

  /** Групповая разметка, поверхность атаки, отказ. */
  async testGroupMarkupAttackSurfaceRejection(): Promise<void> {
    // Групповая разметка - Поверхность атаки - отказ
    // 1. Предусловие: Пользователь с правами редактирования паспортов продуктов авторизован в сервисе, открыт
    // паспорт версии продукта на вкладке 'Компонентный состав', 'Функция безопасности' и 'Поверхность атаки'
    // не размечены
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 2);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 4);

    // 2. Выбрать 2-3 компонента с помощью чекбоксов
    for (let i: number = this.FIRST_CHECKBOX; i <= this.LAST_CHECKBOX; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productVersionInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.SECURITY_FUNCTION });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.ATTACK_SURFACE });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP });
    await this.productVersionInformationPage.checkCheckboxComponentInTable();

    await this.checkCheckboxesInTable();

    // 3. В списке выбрать произвольное значение поверхности атаки
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY);
    await this.productVersionInformationPage.checkText({ pageText: this.INFORMATION_MESSAGE_ATTACK_SURFACE });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.YES, nth: 1 });

    // 4. Нажать кнопку 'Нет'
    await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.NO);
    await this.productVersionInformationPage.checkText({
      pageText: this.INFORMATION_MESSAGE_ATTACK_SURFACE,
      visible: false,
    });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.YES, visible: false, nth: 1 });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.INDIRECTLY, visible: false });

    await this.checkCheckboxesInTable();
  }

  /** Групповая разметка, поверхность атаки, неудачно. */
  async testGroupMarkupAttackSurfaceUnsuccessful(): Promise<void> {
    // Групповая разметка - Поверхность атаки - неудачно
    // 1. Предусловие: Пользователь с правами редактирования паспортов продуктов авторизован в сервисе, открыт
    // паспорт версии продукта на вкладке 'Компонентный состав', 'Функция безопасности' и 'Поверхность атаки' не
    // размечены
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 2);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 4);

    // 2. Выбрать 2-3 компонента с помощью чекбоксов
    for (let i: number = this.FIRST_CHECKBOX; i <= this.LAST_CHECKBOX; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productVersionInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.SECURITY_FUNCTION });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.ATTACK_SURFACE });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP });
    await this.productVersionInformationPage.checkCheckboxComponentInTable();

    await this.checkCheckboxesInTable();

    // 3. В списке выбрать произвольное значение поверхности атаки
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY);
    await this.productVersionInformationPage.checkText({ pageText: this.INFORMATION_MESSAGE_ATTACK_SURFACE });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.YES, nth: 1 });

    // 4. Отключить сеть → Нажать кнопку 'Да'
    await this.productVersionInformationPage.disconnectNetwork();
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES, 1);
    await this.productVersionInformationPage.checkVisibilityIndication(Colors.RED);
    await this.productVersionInformationPage.checkText({ pageText: this.GROUP_MARKUP });
    await this.productVersionInformationPage.checkText({ pageText: this.ERROR_MESSAGE });
    await this.productVersionInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productVersionInformationPage.clickOnCloseMessageIcon();
    await this.productVersionInformationPage.checkTableHeadings(Lists.TITLES_TABLE_COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.checkTableTextValues(this.VALUES);

    await this.checkCheckboxesInTable();
  }

  /** Групповая разметка, функция безопасности, неудачно. */
  async testGroupMarkupSecurityFunctionUnsuccessful(): Promise<void> {
    // Групповая разметка Функция безопасности - неудачно
    // 1. Предусловие: Пользователь с правами редактирования паспортов продуктов авторизован в сервисе, открыт
    // паспорт версии продукта на вкладке 'Компонентный состав', 'Функция безопасности' и 'Поверхность атаки' не
    // размечены
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnFunnelIcon();
    await this.productVersionInformationPage.checkResetFiltersButton();
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementInComboBoxInFilter(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.checkComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnComboBoxInFilter(UITextElements.ATTACK_SURFACE);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 2);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED, 4);

    // 2. Выбрать 2-3 компонента с помощью чекбоксов
    for (let i: number = this.FIRST_CHECKBOX; i <= this.LAST_CHECKBOX; i++) {
      await this.productVersionInformationPage.clickOnCheckboxInTable(i);
    }

    await this.productVersionInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.SECURITY_FUNCTION });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.ATTACK_SURFACE });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP });
    await this.productVersionInformationPage.checkCheckboxComponentInTable();

    await this.checkCheckboxesInTable();

    // 3. В списке выбрать произвольное значение функции безопасности
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY);
    await this.productVersionInformationPage.checkText({ pageText: this.INFORMATION_MESSAGE_SECURITY_FUNCTION });
    await this.productVersionInformationPage.checkText({ pageText: UITextElements.YES, nth: 1 });

    // 4. Отключить сеть → Нажать кнопку 'Да'
    await this.productVersionInformationPage.disconnectNetwork();
    await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.YES);
    await this.productVersionInformationPage.checkVisibilityIndication(Colors.RED);
    await this.productVersionInformationPage.checkText({ pageText: this.GROUP_MARKUP });
    await this.productVersionInformationPage.checkText({ pageText: this.ERROR_MESSAGE });
    await this.productVersionInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
    await this.productVersionInformationPage.clickOnCloseMessageIcon();
    await this.productVersionInformationPage.checkTableHeadings(Lists.TITLES_TABLE_COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.checkTableTextValues(this.VALUES);

    await this.checkCheckboxesInTable();
  }

  /** Групповая разметка, функция безопасности. */
  async testGroupMarkupSecurityFunction(): Promise<void> {
    // Групповая разметка - Функция безопасности

    const first_checkbox: number = 1;
    const last_checkbox: number = 3;

    try {
      // 1. Предусловие: Пользователь с правами редактирования паспортов продуктов авторизован в сервисе, открыт
      // паспорт версии продукта на вкладке 'Компонентный состав', ФБ и ПА не размечены
      await this.componentPage.clickOnLinkProducts();

      await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
      await this.productPage.clickOnLink(Products.VIPNET_CLIENT_4_X_FOR_WINDOWS);

      await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
      await this.productInformationPage.clickOnLink(Versions.VERSION_VIPNET_CLIENT_4_X_FOR_WINDOWS);

      await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);

      // 2. Выбрать 2-3 компонента с помощью чекбоксов
      for (let i: number = first_checkbox; i <= last_checkbox; i++) {
        await this.productVersionInformationPage.clickOnCheckboxInTable(i);
      }

      await this.productVersionInformationPage.checkText({ pageText: UITextElements.THREE_CHOSEN });
      await this.productVersionInformationPage.checkText({ pageText: UITextElements.SECURITY_FUNCTION });
      await this.productVersionInformationPage.checkText({ pageText: UITextElements.ATTACK_SURFACE });
      await this.productVersionInformationPage.checkText({ pageText: UITextElements.TRANSFER_MARKUP });
      await this.productVersionInformationPage.checkCheckboxComponentInTable();

      await this.checkCheckboxesInTable();

      // 3. Открыть выпадающий список 'Функция безопасности'
      await this.productVersionInformationPage.clickOnElementWithText(UITextElements.SECURITY_FUNCTION);
      await this.productVersionInformationPage.checkIndicationInListSecurityFunction(Colors.GREEN);
      await this.productVersionInformationPage.checkIndicationInListSecurityFunction(Colors.YELLOW);
      await this.productVersionInformationPage.checkIndicationInListSecurityFunction(Colors.RED);
      await this.productVersionInformationPage.checkIndicationInListSecurityFunction(Colors.GREY);

      // 4. В списке выбрать произвольное значение функции безопасности
      await this.productVersionInformationPage.clickOnElementWithText(UITextElements.YES);
      await this.productVersionInformationPage.checkButtonWithText(UITextElements.NO);

      // 5. Нажать кнопку 'Да'
      const values: string[] = [
        " ",
        Components.ACETAO,
        RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
        "6.4.6.67",
        UITextElements.YES,
        "",
        UITextElements.NOT_SPECIFIED,
        "",
      ];

      await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.YES);
      await this.productVersionInformationPage.checkVisibilityIndication(Colors.GREEN);
      await this.productVersionInformationPage.checkText({ pageText: this.GROUP_MARKUP });
      await this.productVersionInformationPage.checkText({ pageText: "Информация о компонентах успешно обновлена" });
      await this.productVersionInformationPage.checkText({ pageText: RegularExpressions.PATTERN_STRING_TIME });
      await this.productVersionInformationPage.clickOnCloseMessageIcon();
      await this.productVersionInformationPage.checkTableHeadings(Lists.TITLES_TABLE_COMPONENT_COMPOSITION);
      await this.productVersionInformationPage.checkTableTextValues(values);

      for (let i: number = first_checkbox - 1; i <= last_checkbox - 1; i++) {
        await this.productVersionInformationPage.checkText({ pageText: UITextElements.YES, nth: i });
      }

      // 6. Повторить шаги кейса выставив одному компоненту функцию безопасности, используя чекбоксы
      await this.productVersionInformationPage.clickOnCheckboxInTable(first_checkbox);
      await this.productVersionInformationPage.clickOnElementWithText(UITextElements.SECURITY_FUNCTION);
      await this.productVersionInformationPage.clickOnElementWithText(UITextElements.INDIRECTLY);
      await this.productVersionInformationPage.checkText({ pageText: this.INFORMATION_MESSAGE_SECURITY_FUNCTION });
      await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.YES);

      // 7. Повторить шаги кейса выставив всем компонентам функцию безопасности
      await this.productVersionInformationPage.clickOnCheckboxInTable(this.CHECKBOX_ALL);
      await this.productVersionInformationPage.clickOnElementWithText(UITextElements.SECURITY_FUNCTION);
      await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NO);
      await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.YES);
      await this.productVersionInformationPage.clickOnCheckboxInTable(this.CHECKBOX_ALL);
    } finally {
      await this.returnSecurityFunctionToAllComponents();
    }
  }

  /** Возвращение первоначального значения функции безопасности всем компонентам. */
  private async returnSecurityFunctionToAllComponents(): Promise<void> {
    // Возвращаем стенд к первоначальному состоянию
    await this.impersonateAsUserWithReadOrWritePermissions(true);

    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.VIPNET_CLIENT_4_X_FOR_WINDOWS);

    await this.productVersionInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productVersionInformationPage.clickOnLink(Versions.VERSION_VIPNET_CLIENT_4_X_FOR_WINDOWS);
    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
    await this.productVersionInformationPage.clickOnCheckboxInTable(this.CHECKBOX_ALL);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.SECURITY_FUNCTION);
    await this.productVersionInformationPage.clickOnElementWithText(UITextElements.NOT_SPECIFIED);
    await this.productVersionInformationPage.clickOnButtonWithText(UITextElements.YES);
    await this.productVersionInformationPage.clickOnCheckboxInTable(this.CHECKBOX_ALL);
  }
}
