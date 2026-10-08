/** Константы базовых настроек. */
export class Settings {
  /** Логин для авторизации. */
  public static readonly LOGIN: string = "";
  /** Пароль для авторизации. */
  public static readonly PASSWORD: string = "";
  /** URL сервиса. */
  public static readonly URL: string = "";
  /** Игнорировать любые ошибки SSL-сертификатов при посещении веб-сайтов. */
  public static readonly IGNORE_HTTPS_ERRORS: boolean = true;
  /** Делать снимки экрана при выполнении автотестов. */
  public static readonly SCREENSHOTS: boolean = true;
  /** Сохранять полные слепки состояния DOM (HTML и CSS) для каждого действия. */
  public static readonly SNAPSHOTS: boolean = true;
  /** Включить исходный код автотестов в файл трассировки. */
  public static readonly SOURCES: boolean = true;
  /** JavaScript-код, который будет выполняться до встроенных скриптов сайта и до загрузки самой страницы. */
  public static readonly INIT_SCRIPT: string = ";";
  /** Таймаут для всех действий по умолчанию. */
  public static readonly DEFAULT_TIMEOUT: number = 15_000;
}
