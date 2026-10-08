import { Browser, BrowserContext, Page } from "@playwright/test";
import { BasePage } from "../../src/pages/base-page";
import { ComponentPage } from "../../src/pages/component-page";
import { LoginPage } from "../../src/pages/login-page";
import { ImpersonationPage } from "../../src/pages/impersonation-page";
import { Settings } from "../../settings";
import { Usernames } from "../../src/constants/usernames";
import { ComponentInformationPage } from "../../src/pages/component-information-page";
import { ProductInformationPage } from "../../src/pages/product-information-page";
import { ProductPage } from "../../src/pages/product-page";
import { ComponentVersionInformationPage } from "../../src/pages/component-version-information-page";
import { ProductVersionInformationPage } from "../../src/pages/product-version-information-page";
import { ComponentPackageInformationPage } from "../../src/pages/component-package-information-page";
import { ComponentAssemblyByConfigurationPage } from "../../src/pages/component-assembly-by-configuration-page";
import { ProductAssemblyInformationPage } from "../../src/pages/product-assembly-information-page";
import { UITextElements } from "../../src/constants/ui-text-elements";
import { Versions } from "../../src/constants/versions";
import { Products } from "../../src/constants/products";

export class BaseTest {
  protected page!: Page;
  protected context!: BrowserContext;

  protected basePage!: BasePage;
  protected componentPage!: ComponentPage;
  protected loginPage!: LoginPage;
  protected impersonationPage!: ImpersonationPage;
  protected componentInformationPage!: ComponentInformationPage;
  protected productInformationPage!: ProductInformationPage;
  protected productPage!: ProductPage;
  protected componentVersionInformationPage!: ComponentVersionInformationPage;
  protected productVersionInformationPage!: ProductVersionInformationPage;
  protected componentPackageInformationPage!: ComponentPackageInformationPage;
  protected componentAssemblyByConfigurationPage!: ComponentAssemblyByConfigurationPage;
  protected productAssemblyInformationPage!: ProductAssemblyInformationPage;

  /** Необходимо выполнять перед автотестами */
  public async beforeAutotests(browser: Browser): Promise<void> {
    // await setTimeout(500); // пауза на 500 миллисекунд
    this.context = await browser.newContext({ ignoreHTTPSErrors: Settings.IGNORE_HTTPS_ERRORS });
    await this.context.tracing.start({
      screenshots: Settings.SCREENSHOTS,
      snapshots: Settings.SNAPSHOTS,
      sources: Settings.SOURCES,
    });
    await this.context.addInitScript(Settings.INIT_SCRIPT);

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(Settings.DEFAULT_TIMEOUT);

    this.basePage = new BasePage(this.page);
    this.componentPage = new ComponentPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.impersonationPage = new ImpersonationPage(this.page);
    this.componentInformationPage = new ComponentInformationPage(this.page);
    this.productInformationPage = new ProductInformationPage(this.page);
    this.productVersionInformationPage = new ProductVersionInformationPage(this.page);
    this.componentVersionInformationPage = new ComponentVersionInformationPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.componentPackageInformationPage = new ComponentPackageInformationPage(this.page);
    this.componentAssemblyByConfigurationPage = new ComponentAssemblyByConfigurationPage(this.page);
    this.productAssemblyInformationPage = new ProductAssemblyInformationPage(this.page);

    // Логин и имперсонация за пользователя с правами на запись перед каждым тестом
    await this.loginPage.goToLoginPage();
    await this.loginPage.checkUsernameInput();
    await this.loginPage.loginAsSettingsUser();

    await this.componentPage.checkTitle();
    await this.componentPage.clickOnUserMenuIcon();
    await this.componentPage.clickOnImpersonationButton();

    await this.impersonationPage.impersonateAsAnotherUser(Usernames.USER_WITH_WRITE_PERMISSIONS);
  }

  /**
   * Имперсонироваться за пользователя с правами на чтение или с правами на запись.
   * @param writePermissions Если 'True', то пользователь должен быть с правами на запись.
   */
  protected async impersonateAsUserWithReadOrWritePermissions(writePermissions: boolean): Promise<void> {
    await this.componentPage.fastLogout();
    await this.componentPage.refreshPage();

    await this.loginPage.checkUsernameInput();
    await this.loginPage.loginAsSettingsUser();

    await this.componentPage.clickOnUserMenuIcon();
    await this.componentPage.clickOnImpersonationButton();

    await this.impersonationPage.impersonateAsAnotherUser(
      writePermissions ? Usernames.USER_WITH_WRITE_PERMISSIONS : Usernames.USER_WITH_READ_PERMISSIONS,
    );
  }

  /** Очистка избранного после автотеста. */
  protected async cleanupFavorites(): Promise<void> {
    await this.impersonateAsUserWithReadOrWritePermissions(false);

    await this.componentPage.clickOnLinkProducts();
    await this.productPage.clickOnLink(UITextElements.FAVORITES);
    await this.productPage.checkActiveTab(UITextElements.FAVORITES);
    await this.productPage.clickOnAllFavoritesIconsAndAllCloseMessageIcons();
  }

  /** Проверить галочки у checkbox'ов в таблице. */
  protected async checkCheckboxesInTable(): Promise<void> {
    const firstCheckbox: number = 1;
    const lastCheckbox: number = 3;

    for (let i: number = firstCheckbox; i <= lastCheckbox; i++) {
      await this.productVersionInformationPage.checkCheckboxInTable(i);
    }
  }

  /** Предусловие: продукт → версия продукта → вкладка 'Компонентный состав'. */
  protected async setupVersionOfProductComponentComposition(): Promise<void> {
    await this.componentPage.clickOnLinkProducts();

    await this.productPage.clickOnLink(UITextElements.ALL_PRODUCTS);
    await this.productPage.clickOnLink(Products.COORDINATOR_HW_5);

    await this.productInformationPage.clickOnLink(UITextElements.VERSIONS_TAB);
    await this.productInformationPage.clickOnLink(Versions.VERSION_COORDINATOR_HW_5);

    await this.productVersionInformationPage.clickOnLink(UITextElements.COMPONENT_COMPOSITION);
  }
}
