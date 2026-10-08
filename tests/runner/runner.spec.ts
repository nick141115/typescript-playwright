import { test } from "@playwright/test";
import { TestVerifiedVersionAttribute } from "../e2e/test-verified-version-attribute";
import { TestProductPassport } from "../e2e/test-product-passport";
import { TestProductObjects } from "../e2e/test-product-objects";
import { TestComponentConfiguration } from "../e2e/test-component-configuration";
import { TestComponentVersion } from "../e2e/test-component-version";
import { TestGroupMarkup } from "../e2e/test-group-markup";
import { TestComponentType } from "../e2e/test-component-type";
import { TestConsumerComponentsTab } from "../e2e/test-consumer-components-tab";
import { TestChangeTeamResponsibleForComponent } from "../e2e/test-change-team-responsible-for-component";
import { TestComponentRegistry } from "../e2e/test-component-registry";
import { TestComponentPackage } from "../e2e/test-component-package";
import { TestProductVersionPassport } from "../e2e/test-product-version-passport";
import { TestProductAssemblyPassport } from "../e2e/test-product-assembly-passport";
import { TestComponentPassport } from "../e2e/test-component-passport";
import { TestProductRegistry } from "../e2e/test-product-registry";
import { TestTransferOfMarkings } from "../e2e/test-transfer-of-markings";
import * as allure from "allure-js-commons";

// Инициализация классов
const testVerifiedVersionAttribute = new TestVerifiedVersionAttribute();
const testProductPassport = new TestProductPassport();
const testProductObjects = new TestProductObjects();
const testComponentConfiguration = new TestComponentConfiguration();
const testComponentVersion = new TestComponentVersion();
const testGroupMarkup = new TestGroupMarkup();
const testComponentType = new TestComponentType();
const testConsumerComponentsTab = new TestConsumerComponentsTab();
const testChangeTeamResponsibleForComponent = new TestChangeTeamResponsibleForComponent();
const testComponentRegistry = new TestComponentRegistry();
const testComponentPackage = new TestComponentPackage();
const testProductVersionPassport = new TestProductVersionPassport();
const testProductAssemblyPassport = new TestProductAssemblyPassport();
const testComponentPassport = new TestComponentPassport();
const testProductRegistry = new TestProductRegistry();
const testTransferOfMarkings = new TestTransferOfMarkings();

test.describe(`Автотесты АР`, (): void => {
  // test.afterEach(async ({ context }): Promise<void> => {
  //   // Автоматически выполнится после каждого теста во всех вложенных блоках
  //   await context.close();
  // });

  test.describe(`Объекты продукта`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testProductObjects.beforeAutotests(browser);
      await allure.parentSuite(`Объекты продукта.`);
    });

    test(`Объекты продукта, сортировка.`, async (): Promise<void> => {
      await testProductObjects.testProductObjectsSorting();
    });
  });

  test.describe(`Атрибут 'Верифицированная версия'`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testVerifiedVersionAttribute.beforeAutotests(browser);
      await allure.parentSuite(`Атрибут 'Верифицированная версия'.`);
    });

    test(`Атрибут 'Верифицированная версия', отображение в паспорте компонента/версии компонента/пакете 
компонента.`, async (): Promise<void> => {
      await testVerifiedVersionAttribute.testVerifiedVersionAttributeDisplay();
    });
  });

  test.describe(`Вкладка 'Компоненты-потребители'`, (): void => {
    // Выполнится автоматически перед каждым тестом только внутри этой группы
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testConsumerComponentsTab.beforeAutotests(browser);
    });

    test(`Сброс значений фильтров, обновление страницы.`, async (): Promise<void> => {
      await testConsumerComponentsTab.testConsumerComponentsTabResettingFilterValuesRefreshPage();
    });

    test(`Фильтр 'Зона техрадара', отображение.`, async (): Promise<void> => {
      await testConsumerComponentsTab.testComponentPassportConsumerComponentsTabTechnicalRadarZoneFilterDisplay();
    });
  });

  test.describe(`Изменить команду, ответственную за компонент`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testChangeTeamResponsibleForComponent.beforeAutotests(browser);
    });

    test(`Изменить команду, ответственную за компонент.`, async (): Promise<void> => {
      await testChangeTeamResponsibleForComponent.testChangeTeamResponsibleForComponent();
    });

    test(`Добавить ответственного за реализацию.`, async (): Promise<void> => {
      await testChangeTeamResponsibleForComponent.testAddPersonResponsibleForImplementation();
    });

    test(`Удалить ответственного за реализацию.`, async (): Promise<void> => {
      await testChangeTeamResponsibleForComponent.testRemovePersonResponsibleForImplementation();
    });
  });

  test.describe(`Тип компонента`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testComponentType.beforeAutotests(browser);
    });

    test(`Установить тип компонента.`, async (): Promise<void> => {
      await testComponentType.testSetComponentType();
    });

    test(`Удалить тип компонента.`, async (): Promise<void> => {
      await testComponentType.testDeleteComponentType();
    });

    test(`Изменить тип компонента.`, async (): Promise<void> => {
      await testComponentType.testChangeComponentType();
    });

    test(`Тип компонента, значение по умолчанию.`, async (): Promise<void> => {
      await testComponentType.testComponentTypeDefaultValue();
    });
  });

  test.describe(`Версия компонента`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testComponentVersion.beforeAutotests(browser);
    });

    test(`Версия компонента, посмотреть сведения.`, async (): Promise<void> => {
      await testComponentVersion.testComponentVersionViewInformation();
    });

    test(`Версия компонента, редактирование статуса.`, async (): Promise<void> => {
      await testComponentVersion.testComponentVersionEditingStatus();
    });

    test(`Паспорт версии компонента, посмотреть сведения.`, async (): Promise<void> => {
      await testComponentVersion.testComponentVersionViewDetails();
    });
  });

  test.describe(`Конфигурация компонента`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testComponentConfiguration.beforeAutotests(browser);
    });

    test(`Конфигурация компонента.`, async (): Promise<void> => {
      await testComponentConfiguration.testComponentConfiguration();
    });

    test(`Конфигурация компонента, посмотреть сведения (все вкладки).`, async (): Promise<void> => {
      await testComponentConfiguration.testComponentConfigurationViewDetailsAllTabs();
    });
  });

  test.describe(`Групповая разметка`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testGroupMarkup.beforeAutotests(browser);
    });

    test(`Групповая разметка, функция безопасности, отказ.`, async (): Promise<void> => {
      await testGroupMarkup.testGroupMarkupSecurityFunctionRejection();
    });

    test(`Групповая разметка, поверхность атаки, отказ.`, async (): Promise<void> => {
      await testGroupMarkup.testGroupMarkupAttackSurfaceRejection();
    });

    test(`Групповая разметка, поверхность атаки, неудачно.`, async (): Promise<void> => {
      await testGroupMarkup.testGroupMarkupAttackSurfaceUnsuccessful();
    });

    test(`Групповая разметка, функция безопасности, неудачно.`, async (): Promise<void> => {
      await testGroupMarkup.testGroupMarkupSecurityFunctionUnsuccessful();
    });

    test(`Групповая разметка, функция безопасности.`, async (): Promise<void> => {
      await testGroupMarkup.testGroupMarkupSecurityFunction();
    });
  });

  test.describe(`Реестр компонентов`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testComponentRegistry.beforeAutotests(browser);
    });

    test(`Реестр компонентов, переход по ссылкам.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentRegistryClickingOnLinks();
    });

    test(`Поиск компонента, валидные данные.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentSearchValidData();
    });

    test(`Поиск компонента, невалидные данные.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentSearchInvalidData();
    });

    test(`Реестр компонентов, вкладка 'Избранное', нет избранного.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentRegistryFavoritesTabNoFavorites();
    });

    test(`Реестр компонентов, фильтр 'Зона техрадара'.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentRegistryFilterTechnicalRadarArea();
    });

    test(`Реестр компонентов, блок фильтра, отображение.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentRegistryFilterBlockDisplay();
    });

    test(`Реестр компонентов, фильтр 'Верифицированная версия', отображение.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentRegistryFilterVerifiedVersionDisplay();
    });

    test(`Реестр компонентов, отображение.`, async (): Promise<void> => {
      await testComponentRegistry.testComponentRegistryDisplay();
    });
  });

  test.describe(`Паспорт продукта`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testProductPassport.beforeAutotests(browser);
    });

    test(`Паспорт продукта, вкладка 'Компонентный состав', отображение фильтра.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportComponentCompositionTabDisplayFilter();
    });

    test(`Паспорт продукта, вкладка 'Компонентный состав', сброс значений фильтров, обновление 
страницы.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportComponentCompositionTabResettingFilterValuesRefreshPage();
    });

    test(`Паспорт продукта, вкладка 'Компонентный состав', фильтр 'Статус согласования', 
отображение.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportComponentCompositionTabFilterApprovalStatusDisplay();
    });

    test(`Паспорт продукта, вкладка 'Компонентный состав', фильтр 'Зона техрадара', 
отображение.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportComponentCompositionTabFilterTechnicalRadarAreaDisplay();
    });

    test(`Фильтр 'Компонентный состав', паспорт продукта, вкладка 'Версии'.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportFilterComponentCompositionVersionsTab();
    });

    test(`Паспорт продукта, вкладка 'Компонентный состав', 
фильтр 'Статус согласования'.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportComponentCompositionTabFilterApprovalStatus();
    });

    test(`Паспорт продукта, вкладка 'Компонентный состав', фильтр 'Зона техрадара'.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportComponentCompositionTabFilterTechnicalRadarArea();
    });

    test(`Паспорт продукта, вкладка 'Компонентный состав', комбинация фильтров.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportComponentCompositionTabFilterCombination();
    });

    test(`Паспорт объекта продукта, удалить из избранного.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportDeleteFromFavorites();
    });

    test(`Паспорт объекта продукта, добавить в Избранное.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportAddToFavorites();
    });

    test(`Паспорт продукта, согласование отклонения от техрадара.`, async (): Promise<void> => {
      await testProductPassport.testProductPassportApprovalOfDeviationsFromTechnicalRadar();
    });
  });

  test.describe(`Пакет компонента`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testComponentPackage.beforeAutotests(browser);
    });

    test(`Пакет компонента, посмотреть сведения.`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageViewInformation();
    });

    test(`Паспорт пакета компонента, отображение ЯП, нет ссылки на исходный код.`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageNoLinkToSourceCode();
    });

    test(`Паспорт пакета компонента, отображение ЯП, есть ссылка на исходный код.`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageThereIsLinkToSourceCode();
    });

    test(`Паспорт пакета компонента, добавить ЯП.`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageAddProgrammingLanguage();
    });

    test(`Паспорт пакета компонента, удалить ручную ссылку на исходный код, подтвердить 
удаление.`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageRemoveManualSourceCodeLinkConfirmDeletion();
    });

    test(`Паспорт пакета компонента, ручной ввод ссылки на исходный код.`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageManuallyEnteringLinkToSourceCode();
    });

    test(`Паспорт пакета компонента, редактирование ссылки на исходный код (Исходный код 
внутренний).`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageEditingSourceCodeLinkSourceCodeIsInternal();
    });

    test(`Паспорт пакета компонента, вернуть автоссылку на исходный код, подтвердить изменение (Исходный код 
внутренний).`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageReturnAutolinkToSourceCodeConfirmChangeSourceCodeIsInternal();
    });

    test(`Паспорт пакета компонента, посмотреть сведения (все вкладки).`, async (): Promise<void> => {
      await testComponentPackage.testComponentPackageViewDetailsAllTabs();
    });
  });

  test.describe(`Паспорт версии продукта`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testProductVersionPassport.beforeAutotests(browser);
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', отображение 
фильтра.`, async (): Promise<void> => {
      await testProductVersionPassport.testProductVersionPassportComponentCompositionTabDisplayFilter();
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', сброс значений фильтров, обновление 
страницы.`, async (): Promise<void> => {
      await testProductVersionPassport.testComponentCompositionTabResettingFilterValuesRefreshPage();
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', фильтр 'Зона техрадара', 
отображение.`, async (): Promise<void> => {
      await testProductVersionPassport.testComponentCompositionTabFilterTechnicalRadarAreaDisplay();
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', фильтр 'Функция безопасности', 
отображение.`, async (): Promise<void> => {
      await testProductVersionPassport.testProductVersionPassportComponentCompositionTabFilterSecurityFunctionDisplay();
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', фильтр 'Поверхность атаки', 
отображение.`, async (): Promise<void> => {
      await testProductVersionPassport.testProductVersionPassportComponentCompositionTabFilterAttackSurfaceDisplay();
    });

    test(`Фильтр 'Компонентный состав', паспорт версии продукта, вкладка 'Сборки'.`, async (): Promise<void> => {
      await testProductVersionPassport.testProductVersionPassportFilterComponentCompositionAssembliesTab();
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', фильтр 'Зона 
техрадара'.`, async (): Promise<void> => {
      await testProductVersionPassport.testProductVersionPassportComponentCompositionTabFilterTechnicalRadarArea();
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', фильтр 'Поверхность 
атаки'.`, async (): Promise<void> => {
      await testProductVersionPassport.testProductVersionPassportComponentCompositionTabFilterAttackSurface();
    });

    test(`Паспорт версии продукта, вкладка 'Компонентный состав', фильтр 'Функция 
безопасности'.`, async (): Promise<void> => {
      await testProductVersionPassport.testProductVersionPassportComponentCompositionTabFilterSecurityFunction();
    });
  });

  test.describe(`Паспорт сборки продукта`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testProductAssemblyPassport.beforeAutotests(browser);
    });

    test(`Паспорт сборки продукта, блок фильтра, отображение.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterBlockDisplay();
    });

    test(`Паспорт сборки продукта, сброс значений фильтров, обновление страницы.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportResettingFilterValuesRefreshPage();
    });

    test(`Паспорт сборки продукта, фильтр 'Тип компонента'.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterComponentType();
    });

    test(`Паспорт сборки продукта, фильтр 'Зона техрадара'.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterTechnicalRadarArea();
    });

    test(`Паспорт сборки продукта, фильтр 'Функция безопасности'.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterSecurityFunction();
    });

    test(`Паспорт сборки продукта, фильтр 'Поверхность атаки'.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterAttackSurface();
    });

    test(`Паспорт сборки продукта, фильтр 'Верифицированная версия'.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterVerifiedVersion();
    });

    test(`Паспорт сборки продукта, фильтр 'Ссылки'.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterLinks();
    });

    test(`Паспорт сборки продукта, фильтр 'Статус согласования'.`, async (): Promise<void> => {
      await testProductAssemblyPassport.testProductAssemblyPassportFilterApprovalStatus();
    });
  });

  test.describe(`Паспорт компонента`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testComponentPassport.beforeAutotests(browser);
    });

    test(`Паспорт компонента уникален.`, async (): Promise<void> => {
      await testComponentPassport.testComponentPassportIsUnique();
    });

    test(`Паспорт компонента, общая информация.`, async (): Promise<void> => {
      await testComponentPassport.testComponentPassportGeneralInformation();
    });

    test(`Паспорт компонента, вкладка 'Продукты-потребители'.`, async (): Promise<void> => {
      await testComponentPassport.testComponentPassportConsumerProductTab();
    });

    test(`Паспорт компонента, вкладка 'Компоненты-потребители'.`, async (): Promise<void> => {
      await testComponentPassport.testComponentPassportConsumerComponentTab();
    });

    test(`Уникальная ссылка на паспорт компонента.`, async (): Promise<void> => {
      await testComponentPassport.testUniqueLinkToComponentPassport();
    });

    test(`Паспорт компонента, вкладка 'Компоненты-потребители', отображение фильтра.`, async (): Promise<void> => {
      await testComponentPassport.testConsumerComponentsTabFilterDisplay();
    });

    test(`Паспорт компонента, вкладка 'Версии'.`, async (): Promise<void> => {
      await testComponentPassport.testComponentPassportVersionTab();
    });

    test(`Перейти по внешним ссылкам из паспорта компонента.`, async (): Promise<void> => {
      await testComponentPassport.testFollowExternalLinksFromComponentPassport();
    });

    test(`Паспорт компонента, вкладка 'Компоненты-потребители', фильтр 'Зона техрадара' 
(работа).`, async (): Promise<void> => {
      await testComponentPassport.testConsumerComponentsTabFilterTechnicalRadarArea();
    });

    test(`Перечень версий компонента, отображение неподдерживаемых версий.`, async (): Promise<void> => {
      await testComponentPassport.testListOfComponentVersionsDisplayUnsupportedVersions();
    });

    test(`Паспорт компонента, дата последнего изменения данных о компоненте.`, async (): Promise<void> => {
      await testComponentPassport.testComponentPassportDateOfLastChangeOfComponentData();
    });
  });

  test.describe(`Реестр продуктов`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testProductRegistry.beforeAutotests(browser);
    });

    test(`Реестр продуктов, переход по ссылкам.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryClickingOnLinks();
    });

    test(`Реестр продуктов, отображение.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryDisplay();
    });

    test(`Реестр продуктов, фильтр 'Верифицированная версия', отображение.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterVerifiedVersionDisplay();
    });

    test(`Реестр продуктов, вкладка 'Избранное', нет избранного.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFavoritesTabNoFavorites();
    });

    test(`Реестр продуктов, фильтр 'Компонентный состав'.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterComponentComposition();
    });

    test(`Реестр продуктов, добавить продукт/версию/сборку в избранное.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryAddProductVersionBuildToFavorites();
    });

    test(`Реестр продуктов, удалить продукт/версию/сборку из избранного.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryRemoveProductVersionBuildFromFavorites();
    });

    test(`Реестр продуктов, блок фильтра, отображение.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterBlockDisplay();
    });

    test(`Реестр продуктов, фильтр 'Поверхность атаки'.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterAttackSurface();
    });

    test(`Реестр продуктов, фильтр 'Верифицированная версия'.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterVerifiedVersion();
    });

    test(`Реестр продуктов, фильтр 'Язык программирования'.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterProgrammingLanguageText();
    });

    test(`Реестр продуктов, фильтр 'Пакетный менеджер'.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterPackageManager();
    });

    test(`Реестр продуктов, фильтр 'Ответственный за реализацию'.`, async (): Promise<void> => {
      await testProductRegistry.testProductRegistryFilterResponsibleForImplementation();
    });

    test(`Реестр продуктов, поле поиска, невалидные данные.`, async (): Promise<void> => {
      await testProductRegistry.testProductSearchInvalidData();
    });

    test(`Реестр продуктов, поле поиска, валидные данные.`, async (): Promise<void> => {
      await testProductRegistry.testProductSearchValidData();
    });
  });

  test.describe(`Перенос разметки`, (): void => {
    test.beforeEach(async ({ browser }): Promise<void> => {
      await testTransferOfMarkings.beforeAutotests(browser);
    });

    test(`Паспорт продукта, ручной перенос разметки по статусу согласования.`, async (): Promise<void> => {
      await testTransferOfMarkings.testProductPassportManualTransferOfMarkingsAccordingToApprovalStatus();
    });

    test(`Ручной перенос ПА и ФБ, окно 'Перенос разметки', Отмена.`, async (): Promise<void> => {
      await testTransferOfMarkings.testTransferOfMarkingsCancel();
    });

    test(`Ручной перенос ПА и ФБ в рамках версии одного продукта, ошибка переноса.`, async (): Promise<void> => {
      await testTransferOfMarkings.testTransferOfMarkingsWithinVersionOfOneProductTransferError();
    });

    test(`Перенос разметки, поля 'Продукт' и 'Версия', валидация.`, async (): Promise<void> => {
      await testTransferOfMarkings.testTransferOfMarkingsFieldsProductAndVersionValidation();
    });

    test(`Перенос разметки, поле 'Продукт'.`, async (): Promise<void> => {
      await testTransferOfMarkings.testTransferOfMarkingsFieldProduct();
    });

    test(`Перенос разметки, поле 'Версия'.`, async (): Promise<void> => {
      await testTransferOfMarkings.testTransferOfMarkingsFieldVersion();
    });

    test(`Ручной перенос разметки ПА и ФБ в рамках разных продуктов.`, async (): Promise<void> => {
      await testTransferOfMarkings.testTransferOfMarkingsWithinDifferentProducts();
    });
  });
});
