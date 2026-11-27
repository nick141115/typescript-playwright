# Написание теста

При написании новых автотестов следовать структуре:

```python
class TestTestcaseTitle(BaseTest):
    """test_suite."""

    @allure.parent_suite("test_suite")
    @allure.suite("Название тест-кейса.")
    @allure.sub_suite("test_suite")
    @allure.epic("test_suite")
    @allure.title("Название тест-кейса.")
    @allure.id("1111111") # Идентификатор тест-кейса
    @allure.link("URL-ссылка на задачу", "link", "TASK 0000001") # Идентификатор задачи для автоматизации тест-кейса
    @allure.testcase("URL-ссылка на тест-кейс", "TestCase 1111111")
    @allure.severity(allure.severity_level.CRITICAL) # CRITICAL > NORMAL > MINOR > TRIVIAL
    def test_testcase_title(self, example_fixture: None) -> None:
        """Название тест-кейса.

        :param example_fixture: Описание.
        """
        with allure.step("1. Предусловие: Описание предусловия из тест-кейса"):
        ...

        with allure.step("2. Описание шага 2 из тест-кейса."):
        ...

        with allure.step("3. Описание шага 3 из тест-кейса."):
        ...

```

---

- [Назад (Ссылки на документации)](documentation.md)
- [Далее (Как выставлять версии для изменений в Autotests?)](versions.md)