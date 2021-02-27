/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum AccountErrorCode {
  ACTIVATE_OWN_ACCOUNT = "ACTIVATE_OWN_ACCOUNT",
  ACTIVATE_SUPERUSER_ACCOUNT = "ACTIVATE_SUPERUSER_ACCOUNT",
  ASSIGN_NON_STAFF_MEMBER = "ASSIGN_NON_STAFF_MEMBER",
  DEACTIVATE_OWN_ACCOUNT = "DEACTIVATE_OWN_ACCOUNT",
  DEACTIVATE_SUPERUSER_ACCOUNT = "DEACTIVATE_SUPERUSER_ACCOUNT",
  DELETE_NON_STAFF_USER = "DELETE_NON_STAFF_USER",
  DELETE_OWN_ACCOUNT = "DELETE_OWN_ACCOUNT",
  DELETE_STAFF_ACCOUNT = "DELETE_STAFF_ACCOUNT",
  DELETE_SUPERUSER_ACCOUNT = "DELETE_SUPERUSER_ACCOUNT",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INVALID = "INVALID",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  NOT_FOUND = "NOT_FOUND",
  PASSWORD_ENTIRELY_NUMERIC = "PASSWORD_ENTIRELY_NUMERIC",
  PASSWORD_TOO_COMMON = "PASSWORD_TOO_COMMON",
  PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_SIMILAR = "PASSWORD_TOO_SIMILAR",
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
}

/**
 * An enumeration.
 */
export enum AttributeInputTypeEnum {
  DROPDOWN = "DROPDOWN",
  MULTISELECT = "MULTISELECT",
}

export enum AttributeSortField {
  AVAILABLE_IN_GRID = "AVAILABLE_IN_GRID",
  FILTERABLE_IN_DASHBOARD = "FILTERABLE_IN_DASHBOARD",
  FILTERABLE_IN_STOREFRONT = "FILTERABLE_IN_STOREFRONT",
  IS_VARIANT_ONLY = "IS_VARIANT_ONLY",
  NAME = "NAME",
  SLUG = "SLUG",
  STOREFRONT_SEARCH_POSITION = "STOREFRONT_SEARCH_POSITION",
  VALUE_REQUIRED = "VALUE_REQUIRED",
  VISIBLE_IN_STOREFRONT = "VISIBLE_IN_STOREFRONT",
}

/**
 * An enumeration.
 */
export enum AuthorizationKeyType {
  FACEBOOK = "FACEBOOK",
  GOOGLE_OAUTH2 = "GOOGLE_OAUTH2",
}

export enum BlogArticleOrderField {
  DATE = "DATE",
  PUBLISHED = "PUBLISHED",
  TITLE = "TITLE",
}

/**
 * An enumeration.
 */
export enum BlogArticleStatus {
  COMPLETED = "COMPLETED",
  DRAFT = "DRAFT",
}

export enum BlogCategoryOrderField {
  NAME = "NAME",
  PUBLISHED = "PUBLISHED",
}

export enum CategorySortField {
  NAME = "NAME",
  PRODUCT_COUNT = "PRODUCT_COUNT",
  SUBCATEGORY_COUNT = "SUBCATEGORY_COUNT",
}

/**
 * An enumeration.
 */
export enum CheckoutErrorCode {
  BILLING_ADDRESS_NOT_SET = "BILLING_ADDRESS_NOT_SET",
  CHECKOUT_NOT_FULLY_PAID = "CHECKOUT_NOT_FULLY_PAID",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INSUFFICIENT_STOCK = "INSUFFICIENT_STOCK",
  INVALID = "INVALID",
  INVALID_SHIPPING_METHOD = "INVALID_SHIPPING_METHOD",
  NOT_FOUND = "NOT_FOUND",
  PAYMENT_ERROR = "PAYMENT_ERROR",
  QUANTITY_GREATER_THAN_LIMIT = "QUANTITY_GREATER_THAN_LIMIT",
  REQUIRED = "REQUIRED",
  SHIPPING_ADDRESS_NOT_SET = "SHIPPING_ADDRESS_NOT_SET",
  SHIPPING_METHOD_NOT_APPLICABLE = "SHIPPING_METHOD_NOT_APPLICABLE",
  SHIPPING_METHOD_NOT_SET = "SHIPPING_METHOD_NOT_SET",
  SHIPPING_NOT_REQUIRED = "SHIPPING_NOT_REQUIRED",
  TAX_ERROR = "TAX_ERROR",
  UNIQUE = "UNIQUE",
  VOUCHER_NOT_APPLICABLE = "VOUCHER_NOT_APPLICABLE",
  ZERO_QUANTITY = "ZERO_QUANTITY",
}

/**
 * An enumeration.
 */
export enum CountryCode {
  AD = "AD",
  AE = "AE",
  AF = "AF",
  AG = "AG",
  AI = "AI",
  AL = "AL",
  AM = "AM",
  AO = "AO",
  AQ = "AQ",
  AR = "AR",
  AS = "AS",
  AT = "AT",
  AU = "AU",
  AW = "AW",
  AX = "AX",
  AZ = "AZ",
  BA = "BA",
  BB = "BB",
  BD = "BD",
  BE = "BE",
  BF = "BF",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BJ = "BJ",
  BL = "BL",
  BM = "BM",
  BN = "BN",
  BO = "BO",
  BQ = "BQ",
  BR = "BR",
  BS = "BS",
  BT = "BT",
  BV = "BV",
  BW = "BW",
  BY = "BY",
  BZ = "BZ",
  CA = "CA",
  CC = "CC",
  CD = "CD",
  CF = "CF",
  CG = "CG",
  CH = "CH",
  CI = "CI",
  CK = "CK",
  CL = "CL",
  CM = "CM",
  CN = "CN",
  CO = "CO",
  CR = "CR",
  CU = "CU",
  CV = "CV",
  CW = "CW",
  CX = "CX",
  CY = "CY",
  CZ = "CZ",
  DE = "DE",
  DJ = "DJ",
  DK = "DK",
  DM = "DM",
  DO = "DO",
  DZ = "DZ",
  EC = "EC",
  EE = "EE",
  EG = "EG",
  EH = "EH",
  ER = "ER",
  ES = "ES",
  ET = "ET",
  FI = "FI",
  FJ = "FJ",
  FK = "FK",
  FM = "FM",
  FO = "FO",
  FR = "FR",
  GA = "GA",
  GB = "GB",
  GD = "GD",
  GE = "GE",
  GF = "GF",
  GG = "GG",
  GH = "GH",
  GI = "GI",
  GL = "GL",
  GM = "GM",
  GN = "GN",
  GP = "GP",
  GQ = "GQ",
  GR = "GR",
  GS = "GS",
  GT = "GT",
  GU = "GU",
  GW = "GW",
  GY = "GY",
  HK = "HK",
  HM = "HM",
  HN = "HN",
  HR = "HR",
  HT = "HT",
  HU = "HU",
  ID = "ID",
  IE = "IE",
  IL = "IL",
  IM = "IM",
  IN = "IN",
  IO = "IO",
  IQ = "IQ",
  IR = "IR",
  IS = "IS",
  IT = "IT",
  JE = "JE",
  JM = "JM",
  JO = "JO",
  JP = "JP",
  KE = "KE",
  KG = "KG",
  KH = "KH",
  KI = "KI",
  KM = "KM",
  KN = "KN",
  KP = "KP",
  KR = "KR",
  KW = "KW",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LB = "LB",
  LC = "LC",
  LI = "LI",
  LK = "LK",
  LR = "LR",
  LS = "LS",
  LT = "LT",
  LU = "LU",
  LV = "LV",
  LY = "LY",
  MA = "MA",
  MC = "MC",
  MD = "MD",
  ME = "ME",
  MF = "MF",
  MG = "MG",
  MH = "MH",
  MK = "MK",
  ML = "ML",
  MM = "MM",
  MN = "MN",
  MO = "MO",
  MP = "MP",
  MQ = "MQ",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MU = "MU",
  MV = "MV",
  MW = "MW",
  MX = "MX",
  MY = "MY",
  MZ = "MZ",
  NA = "NA",
  NC = "NC",
  NE = "NE",
  NF = "NF",
  NG = "NG",
  NI = "NI",
  NL = "NL",
  NO = "NO",
  NP = "NP",
  NR = "NR",
  NU = "NU",
  NZ = "NZ",
  OM = "OM",
  PA = "PA",
  PE = "PE",
  PF = "PF",
  PG = "PG",
  PH = "PH",
  PK = "PK",
  PL = "PL",
  PM = "PM",
  PN = "PN",
  PR = "PR",
  PS = "PS",
  PT = "PT",
  PW = "PW",
  PY = "PY",
  QA = "QA",
  RE = "RE",
  RO = "RO",
  RS = "RS",
  RU = "RU",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SC = "SC",
  SD = "SD",
  SE = "SE",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SJ = "SJ",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SV = "SV",
  SX = "SX",
  SY = "SY",
  SZ = "SZ",
  TC = "TC",
  TD = "TD",
  TF = "TF",
  TG = "TG",
  TH = "TH",
  TJ = "TJ",
  TK = "TK",
  TL = "TL",
  TM = "TM",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TT = "TT",
  TV = "TV",
  TW = "TW",
  TZ = "TZ",
  UA = "UA",
  UG = "UG",
  UM = "UM",
  US = "US",
  UY = "UY",
  UZ = "UZ",
  VA = "VA",
  VC = "VC",
  VE = "VE",
  VG = "VG",
  VI = "VI",
  VN = "VN",
  VU = "VU",
  WF = "WF",
  WS = "WS",
  YE = "YE",
  YT = "YT",
  ZA = "ZA",
  ZM = "ZM",
  ZW = "ZW",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum OrderSortField {
  CREATION_DATE = "CREATION_DATE",
  CUSTOMER = "CUSTOMER",
  FULFILLMENT_STATUS = "FULFILLMENT_STATUS",
  NUMBER = "NUMBER",
  PAYMENT = "PAYMENT",
  TOTAL = "TOTAL",
}

/**
 * An enumeration.
 */
export enum OrderStatus {
  CANCELED = "CANCELED",
  DRAFT = "DRAFT",
  FULFILLED = "FULFILLED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  UNFULFILLED = "UNFULFILLED",
}

export enum OrderStatusFilter {
  CANCELED = "CANCELED",
  FULFILLED = "FULFILLED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  READY_TO_CAPTURE = "READY_TO_CAPTURE",
  READY_TO_FULFILL = "READY_TO_FULFILL",
  UNFULFILLED = "UNFULFILLED",
}

export enum PageSortField {
  CREATION_DATE = "CREATION_DATE",
  PUBLICATION_DATE = "PUBLICATION_DATE",
  SLUG = "SLUG",
  TITLE = "TITLE",
  VISIBILITY = "VISIBILITY",
}

/**
 * An enumeration.
 */
export enum PaymentChargeStatusEnum {
  FULLY_CHARGED = "FULLY_CHARGED",
  FULLY_REFUNDED = "FULLY_REFUNDED",
  NOT_CHARGED = "NOT_CHARGED",
  PARTIALLY_CHARGED = "PARTIALLY_CHARGED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}

/**
 * An enumeration.
 */
export enum ProductErrorCode {
  ALREADY_EXISTS = "ALREADY_EXISTS",
  ATTRIBUTE_ALREADY_ASSIGNED = "ATTRIBUTE_ALREADY_ASSIGNED",
  ATTRIBUTE_CANNOT_BE_ASSIGNED = "ATTRIBUTE_CANNOT_BE_ASSIGNED",
  ATTRIBUTE_VARIANTS_DISABLED = "ATTRIBUTE_VARIANTS_DISABLED",
  DUPLICATED_INPUT_ITEM = "DUPLICATED_INPUT_ITEM",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INVALID = "INVALID",
  NOT_FOUND = "NOT_FOUND",
  NOT_PRODUCTS_IMAGE = "NOT_PRODUCTS_IMAGE",
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
  VARIANT_NO_DIGITAL_CONTENT = "VARIANT_NO_DIGITAL_CONTENT",
}

export enum ProductOrderField {
  DATE = "DATE",
  NAME = "NAME",
  ORDER_COUNT = "ORDER_COUNT",
  PUBLISHED = "PUBLISHED",
  TYPE = "TYPE",
}

/**
 * An enumeration.
 */
export enum ProductReviewRating {
  A_1 = "A_1",
  A_2 = "A_2",
  A_3 = "A_3",
  A_4 = "A_4",
  A_5 = "A_5",
}

/**
 * An enumeration.
 */
export enum ProductReviewStatus {
  CANCELED = "CANCELED",
  IN_PROGRESS = "IN_PROGRESS",
  PUBLISHED = "PUBLISHED",
}

export enum ReportingPeriod {
  THIS_MONTH = "THIS_MONTH",
  TODAY = "TODAY",
}

/**
 * An enumeration.
 */
export enum ShippingMethodTypeEnum {
  PRICE = "PRICE",
  WEIGHT = "WEIGHT",
}

export enum StockAvailability {
  IN_STOCK = "IN_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

/**
 * An enumeration.
 */
export enum WeightUnitsEnum {
  G = "G",
  KG = "KG",
  LB = "LB",
  OZ = "OZ",
}

export interface AccountInput {
  firstName?: string | null;
  lastName?: string | null;
  defaultShippingAddress?: AddressInput | null;
}

export interface AccountRegisterInput {
  email: string;
  password: string;
  redirectUrl?: string | null;
}

export interface AddressInput {
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  cityArea?: string | null;
  postalCode?: string | null;
  country?: CountryCode | null;
  countryArea?: string | null;
  phone?: string | null;
}

export interface AttributeFilterInput {
  valueRequired?: boolean | null;
  isVariantOnly?: boolean | null;
  visibleInStorefront?: boolean | null;
  filterableInStorefront?: boolean | null;
  filterableInDashboard?: boolean | null;
  availableInGrid?: boolean | null;
  search?: string | null;
  ids?: (string | null)[] | null;
  inCategory?: string | null;
  inCategories?: (string | null)[] | null;
}

export interface AttributeInput {
  slug: string;
  values?: (string | null)[] | null;
}

export interface AttributeSortingInput {
  direction: OrderDirection;
  field: AttributeSortField;
}

export interface BlogArticleFilterInput {
  isPublished?: boolean | null;
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  category_Slug?: string | null;
  search?: string | null;
}

export interface BlogArticleOrder {
  direction: OrderDirection;
  field?: BlogArticleOrderField | null;
}

export interface BlogCategoryFilterInput {
  isPublished?: boolean | null;
  slug?: string | null;
  name?: string | null;
  search?: string | null;
}

export interface BlogCategoryOrder {
  direction: OrderDirection;
  field?: BlogCategoryOrderField | null;
}

export interface CategoryFilterInput {
  search?: string | null;
  ids?: (string | null)[] | null;
}

export interface CategorySortingInput {
  direction: OrderDirection;
  field: CategorySortField;
}

export interface CheckoutCreateInput {
  lines: (CheckoutLineInput | null)[];
  email?: string | null;
  shippingAddress?: AddressInput | null;
}

export interface CheckoutLineInput {
  quantity: number;
  variantId: string;
}

export interface DateRangeInput {
  gte?: any | null;
  lte?: any | null;
}

export interface OrderFilterInput {
  paymentStatus?: (PaymentChargeStatusEnum | null)[] | null;
  status?: (OrderStatusFilter | null)[] | null;
  customer?: string | null;
  created?: DateRangeInput | null;
  search?: string | null;
}

export interface OrderSortingInput {
  direction: OrderDirection;
  field: OrderSortField;
}

export interface PageFilterInput {
  search?: string | null;
}

export interface PageSortingInput {
  direction: OrderDirection;
  field: PageSortField;
}

export interface PriceRangeInput {
  gte?: number | null;
  lte?: number | null;
}

export interface ProductFilterInput {
  isPublished?: boolean | null;
  productType?: string | null;
  search?: string | null;
  stockAvailability?: StockAvailability | null;
  productTypes?: (string | null)[] | null;
  categories?: (string | null)[] | null;
  attributes?: (AttributeInput | null)[] | null;
  price?: PriceRangeInput | null;
}

export interface ProductOrder {
  direction: OrderDirection;
  attributeId?: string | null;
  field?: ProductOrderField | null;
}

export interface ProductReviewCreateInput {
  rating: number;
  title: string;
  content: string;
  advantages?: any | null;
  flaws?: any | null;
  orderLine: string;
}

export interface ProductReviewFilterInput {
  status?: string | null;
  rating?: string | null;
  createdAt?: any | null;
  product?: string | null;
}

export interface ProductReviewOrder {
  direction: OrderDirection;
  field?: ProductOrderField | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
