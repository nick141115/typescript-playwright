/** Константы состояний загрузки. */
export class LoadStates {
  /** Ждёт отсутствия сетевых запросов в течение 500 мс. */
  public static readonly NETWORK_IDLE = "networkidle";
  /** Ждёт, когда загружена сама страница, а также все внешние ресурсы: картинки, стили, скрипты и т.д. */
  public static readonly LOAD = "load";
}
