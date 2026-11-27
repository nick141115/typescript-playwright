# Allure

Для начала [скачиваем](https://www.oracle.com/cis/java/technologies/downloads/) и устанавливаем JDK, он необходим для работы Allure.

Устанавливаем Allure, для создания отчёта после выполнения тестов:
* [Скачиваем релизную сборку Allure.](https://github.com/allure-framework/allure2/releases)
* Распаковываем в `C:\Users\<USERNAME>\Allure`
* Прописываем в Path путь до каталога bin, **указав актуальное имя пользователя**:
```shell
$Env:Path += ";C:\Users\<USERNAME>\Allure\bin"; setx PATH "$Env:Path"
```

---

- [Назад (Установка Git)](git.md)
- [Далее (Форматтер Black)](black.md)