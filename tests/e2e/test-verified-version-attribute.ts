import { UITextElements } from "../../src/constants/ui-text-elements";
import { BaseTest } from "../base/base-test";
import * as allure from "allure-js-commons";

/** Атрибут 'Верифицированная версия'. */
export class TestVerifiedVersionAttribute extends BaseTest {
  /** Атрибут 'Верифицированная версия', отображение в паспорте компонента/версии компонента/пакете компонента. */
  public async testVerifiedVersionAttributeDisplay(): Promise<void> {
    await allure.suite(`Атрибут 'Верифицированная версия'.`);
    await allure.allureId("1567178");
    await allure.tms("https://tfs.example.ru/tfs/exampletc1/DEP_PMO/_workitems/edit/1567178", "TestCase 1567178");
    await allure.link(
      "https://tfs.example.ru/tfs/exampletc1/DEP_PMO/_workitems/edit/1568356",
      "TASK 1568356",
      "link",
    );
    await allure.severity("critical");
    // await allure.epic(`Атрибут 'Верифицированная версия'.`);
    // await allure.subSuite(`Атрибут 'Верифицированная версия'.`);
    // await allure.description(`Атрибут 'Верифицированная версия'.`);
    // await allure.displayName(`Атрибут 'Верифицированная версия'.`);

    const componentAbab: string = "abab";
    const ababVersion: string = "2.0";
    const ababPackage: string = "2.0.6";

    await allure.step(
      `1. Предусловие: Пользователь с правами на чтение паспортов компонентов авторизован в 
сервисе. В определенном пакете установлен атрибут 'Верифицированная версия'. Открыт паспорт пакета 
компонента.`,
      async () => {
        await this.impersonateAsUserWithReadOrWritePermissions(false);

        await this.componentPage.clickOnTitle();
        await this.componentPage.clickOnLink(UITextElements.ALL_COMPONENTS_TAB);
        await this.componentPage.fillInSearchInput(componentAbab);
        await this.componentPage.clickOnLink(componentAbab);

        await this.componentInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
        await this.componentInformationPage.clickOnLink(ababVersion);

        await this.productVersionInformationPage.clickOnLink(UITextElements.PACKAGES_TAB);
        await this.productVersionInformationPage.clickOnLink(ababPackage);
      },
    );

    await allure.step(`2. Проверить отображение атрибута 'Верифицированная версия'.`, async () => {
      await this.componentPackageInformationPage.checkText({ pageText: UITextElements.VERIFIED_VERSION });
    });

    await allure.step(
      `3. Подняться на уровень выше (открыть паспорт версии компонента) → Проверить отображение 
атрибута 'Верифицированная версия'.`,
      async () => {
        await this.componentPackageInformationPage.goToPreviousOrNextPage(1, true);

        await this.productVersionInformationPage.goToPreviousOrNextPage(1, true);
        await this.productVersionInformationPage.checkText({
          pageText: UITextElements.VERIFIED_VERSION,
          visible: false,
        });
      },
    );

    await allure.step(
      `4. Перейти на вкладку 'Пакеты' паспорта версии компонента → Проверить отображение 
атрибута 'Верифицированная версия'.`,
      async () => {
        const tableHeadings: string[] = [
          UITextElements.PACKAGE,
          UITextElements.VERIFIED_VERSION,
          UITextElements.PACKAGE_MANAGER,
        ];
        await this.productVersionInformationPage.goToPreviousOrNextPage(1, false);
        await this.productVersionInformationPage.checkTableHeadings(tableHeadings);
      },
    );

    await allure.step(
      `5. Подняться на уровень паспорта компонента → Проверить отображение атрибута 'Верифицированная версия'.`,
      async () => {
        await this.productVersionInformationPage.goToPreviousOrNextPage(2, true);

        await this.componentInformationPage.goToPreviousOrNextPage(1, true);
        await this.componentInformationPage.checkText({ pageText: "Содержит верифицированную версию" });
      },
    );
  }
}
