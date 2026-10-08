import { BaseTest } from "../base/base-test";
import { Versions } from "../../src/constants/versions";
import { Assemblies } from "../../src/constants/assemblies";
import { Products } from "../../src/constants/products";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Components } from "../../src/constants/components";
import * as allure from "allure-js-commons";

/** Объекты продукта. */
export class TestProductObjects extends BaseTest {
  /** Объекты продукта, сортировка. */
  async testProductObjectsSorting(): Promise<void> {
    await allure.suite(`Объекты продукта, сортировка.`);
    await allure.allureId("1565398");
    await allure.tms("https://tfs.example.ru/tfs/exampletc1/DEP_PMO/_workitems/edit/1565398", "TestCase 1565398");
    await allure.link(
      "https://tfs.example.ru/tfs/exampletc1/DEP_PMO/_workitems/edit/1590620",
      "TASK 1590620",
      "link",
    );
    await allure.severity("normal");

    const bind9Dnsutils: string = "bind9-dnsutils";
    const baseFiles: string = "base-files";
    const coordinatorHw5Assembly: string = "5.4.0.5177";

    try {
      await allure.step(`1. Пользователь авторизован в сервисе, открыта страница 'Продукты'.`, async () => {
        await this.impersonateAsUserWithReadOrWritePermissions(false);

        await this.componentPage.clickOnLinkProducts();
      });

      await allure.step(`2. Проверить сортировку на вкладке 'Избранное'.`, async () => {
        const listFavorites: string[] = [
          Products.COORDINATOR_HW_5,
          Versions.VERSION_FIVE_FOUR_ONE,
          Versions.VERSION_COORDINATOR_HW_5,
          Assemblies.ASSEMBLY_COORDINATOR_HW_5,
          coordinatorHw5Assembly,
          Products.COORDINATOR_IG_4,
        ];

        await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
        await this.productPage.clickOnFavoritesIconOff(Products.COORDINATOR_HW_5);
        await this.productPage.checkText({ pageText: Products.COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES });
        await this.productPage.clickOnCloseMessageIcon();
        await this.productPage.clickOnFavoritesIconOff(Products.COORDINATOR_IG_4);
        await this.productPage.checkText({ pageText: Products.COORDINATOR_IG_4 + UITextElements.ADDED_TO_FAVORITES });
        await this.productPage.clickOnCloseMessageIcon();
        await this.productPage.clickOnExpander(Products.COORDINATOR_HW_5);
        await this.productPage.clickOnFavoritesIconOff(Versions.VERSION_FIVE_FOUR_ONE);
        await this.productPage.checkText({
          pageText: Versions.VERSION_FIVE_FOUR_ONE + UITextElements.ADDED_TO_FAVORITES,
        });
        await this.productPage.clickOnCloseMessageIcon();
        await this.productPage.clickOnFavoritesIconOff(Versions.VERSION_COORDINATOR_HW_5);
        await this.productPage.checkText({
          pageText: Versions.VERSION_COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES,
        });
        await this.productPage.clickOnCloseMessageIcon();
        await this.productPage.clickOnExpander(Versions.VERSION_COORDINATOR_HW_5);
        await this.productPage.clickOnFavoritesIconOff(Assemblies.ASSEMBLY_COORDINATOR_HW_5);
        await this.productPage.checkText({
          pageText: Assemblies.ASSEMBLY_COORDINATOR_HW_5 + UITextElements.ADDED_TO_FAVORITES,
        });
        await this.productPage.clickOnCloseMessageIcon();
        await this.productPage.clickOnFavoritesIconOff(coordinatorHw5Assembly);
        await this.productPage.checkText({ pageText: coordinatorHw5Assembly + UITextElements.ADDED_TO_FAVORITES });
        await this.productPage.clickOnCloseMessageIcon();
        await this.productPage.clickOnLink(UITextElements.FAVORITES);
        await this.productPage.checkSortingOnFavoritesTab(listFavorites);
      });

      await allure.step(`3. Проверить сортировку на вкладке 'Все продукты'.`, async () => {
        const listProducts: string[] = [
          UITextElements.TEXT_COMPONENTS_ENGLISH,
          UITextElements.CONNECT,
          Products.COORDINATOR_AR_2,
          Products.COORDINATOR_HW_4,
          Products.COORDINATOR_HW_5,
          Products.COORDINATOR_IG_4,
          Products.COORDINATOR_IG_5,
          "CryptoUnderground",
          Products.CSP_WINDOWS_4,
          "CSP Windows 5",
        ];

        await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
        await this.productPage.checkSortingOnAllProductsTab(listProducts);
      });

      await allure.step(`4. Проверить сортировку в паспорте продукта, вкладка 'Версии'.`, async () => {
        await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

        await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
        await this.productInformationPage.checkLinksSorting(9, true);
      });

      let listComponents: string[] = [
        Components.BONNIE_PLUS_PLUS,
        Components.BZIP2,
        Components.CRYPTO_UNDERGROUND_V2,
        Components.UTIL_LINUX,
        Components.ZLIB1G,
        Components.ACCORDSDK,
        Components.ACETAO,
        Components.ACPI_SUPPORT_BASE,
        Components.ADDRESSBOOK,
        Components.ADDUSER,
      ];

      await allure.step(`5. Проверить сортировку в паспорте продукта, вкладка 'Компонентный состав'.`, async () => {
        await this.productInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
        await this.productInformationPage.checkSortingInProductPassportComponentCompositionTab(listComponents);
      });

      await allure.step(`6. Проверить сортировку в паспорте версии продукта, вкладка 'Сборки'.`, async () => {
        const listAssemblies: string[] = [
          "5.4.0.7008",
          Assemblies.ASSEMBLY_COORDINATOR_HW_5,
          "5.4.0.5539",
          "5.4.0.5418",
          "5.4.0.5415",
          "5.4.0.5367",
          "5.4.0.5329",
          "5.4.0.5288",
          "5.4.0.5278",
          "5.4.0.5213",
        ];

        await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
        await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

        await this.productVersionInformationPage.checkSortingOnAssembliesTab(listAssemblies);
      });

      await allure.step(
        `7. Проверить сортировку в паспорте версии продукта, вкладка 'Компонентный состав'.`,
        async () => {
          listComponents = [
            Components.ACPI_SUPPORT_BASE,
            Components.ACPID,
            Components.ATOP,
            baseFiles,
            Components.BASH,
            Components.BIND9,
            bind9Dnsutils,
          ];

          await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
          await this.productVersionInformationPage.checkSortingInVersionPassportComponentCompositionTab(listComponents);
        },
      );

      await allure.step(`8. Проверить сортировку в паспорте сборки продукта.`, async () => {
        listComponents = [
          Components.ACPID,
          Components.ACPI_SUPPORT_BASE,
          Components.ATOP,
          baseFiles,
          Components.BASH,
          Components.BIND9,
          Components.BIND9_DEV,
          bind9Dnsutils,
        ];

        await this.productVersionInformationPage.clickOnLink(UITextElements.ASSEMBLIES);
        await this.productVersionInformationPage.clickOnLink(Assemblies.ASSEMBLY_COORDINATOR_HW_5);

        await this.productAssemblyInformationPage.checkSortingInAssemblyPassport(listComponents);
        await this.productAssemblyInformationPage.clickOnLinkProducts();
      });
    } finally {
      await allure.step(`Очистка избранного после автотеста.`, async () => {
        await this.cleanupFavorites();
      });
    }
  }
}
