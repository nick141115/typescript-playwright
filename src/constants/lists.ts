import { UITextElements } from "./ui-text-elements";
import { RadarAreaValues } from "./radar-area-values";
import { Components } from "./components";
import { AgreementValues } from "./agreement-values";

/** Константы списков. */
export class Lists {
  public static readonly TITLES_TABLE_CONSUMER_PRODUCTS: string[] = [
    UITextElements.PRODUCT,
    UITextElements.TEXT_VERSION,
  ];
  public static readonly COMBO_BOX_LIST_FILTER_TECHNICAL_RADAR_AREA: string[] = [
    RadarAreaValues.RECOMMENDED,
    RadarAreaValues.PILOTED_BY,
    RadarAreaValues.INTERESTED_IN,
    RadarAreaValues.AVOID,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
  ];
  public static readonly TITLES_TABLE_COMPONENT_COMPOSITION: string[] = [
    " ",
    UITextElements.COMPONENT,
    UITextElements.TECHNICAL_RADAR_AREA,
    UITextElements.PACKAGE,
    UITextElements.SECURITY_FUNCTION,
    UITextElements.JUSTIFICATION_COMMENT,
    UITextElements.ATTACK_SURFACE,
    UITextElements.JUSTIFICATION_COMMENT,
  ];
  public static readonly VALUES_BASH: string[] = [
    " ",
    Components.BASH,
    RadarAreaValues.RECOMMENDED,
    AgreementValues.NOT_REQUIRED,
    "",
  ];
  public static readonly VALUES_ACPID: string[] = [
    " ",
    Components.ACPID,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    AgreementValues.CHOICE_IS_AGREED,
    UITextElements.TEXT_JUSTIFICATION,
  ];
  public static readonly VALUES_ACCORDSDK: string[] = [
    " ",
    Components.ACCORDSDK,
    RadarAreaValues.RADAR_AREA_IS_UNKNOWN,
    AgreementValues.CHOICE_IS_NOT_AGREED_UPON,
    "",
  ];
  public static readonly VALUES_CRYPT_CPU_FEATURES: string[] = [
    " ",
    Components.CRYPT_CPU_FEATURES,
    RadarAreaValues.AVOID,
    AgreementValues.DEVIATION_IS_AGREED,
    UITextElements.TEXT_JUSTIFICATION,
  ];
  public static readonly VALUES_CRYPTO_UNDERGROUND_V2: string[] = [
    " ",
    Components.CRYPTO_UNDERGROUND_V2,
    RadarAreaValues.AVOID,
    AgreementValues.DEVIATION_IS_NOT_AGREED_UPON,
    "",
  ];
}
