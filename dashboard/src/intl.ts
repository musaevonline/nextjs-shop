import { defineMessages, IntlShape } from "react-intl";

export const commonMessages = defineMessages({
  dashboard: {
    id: 'dashboard',
    defaultMessage: "Dashboard"
  },
  description: {
    id:'description',
    defaultMessage: "Description"
  },
  email: {
    id:'email',
    defaultMessage: "E-mail Address"
  },
  password: {
    id:'password',
    defaultMessage: "Password"
  },
  newPassword: {
    id:'new_password',
    defaultMessage: "New password"
  },
  endDate: {
    id:'end_date',
    defaultMessage: "End Date"
  },
  endHour: {
    id:'end_hour',
    defaultMessage: "End Hour"
  },
  firstName: {
    id:'first_name',
    defaultMessage: "First Name"
  },
  generalInformations: {
    id:'general_info',
    defaultMessage: "General Informations"
  },
  lastName: {
    id:'last_name',
    defaultMessage: "Last Name"
  },
  no: {
    id:'no',
    defaultMessage: "No"
  },
  properties: {
    id:'properties',
    defaultMessage: "Properties"
  },
  readOnly: {
    id:'readonly',
    defaultMessage: "Saleor runs in read-only mode. Changes not saved."
  },
  savedChanges: {
    id:'save_changes',
    defaultMessage: "Saved changes"
  },
  sessionExpired: {
    id:'session_expired',
    defaultMessage: "Your session has expired. Please log in again to continue."
  },
  somethingWentWrong: {
    id:'something_went_wrong',
    defaultMessage: "Custorama ran into an unexpected problem"
  },
  startDate: {
    id:'start_date',
    defaultMessage: "Start Date"
  },
  startHour: {
    id:'start_hour',
    defaultMessage: "Start Hour"
  },
  status: {
    id:'status',
    defaultMessage: "Status"
  },
  summary: {
    id:'summary',
    defaultMessage: "Summary"
  },
  uploadImage: {
    id:'upload_image',
    defaultMessage: "Upload image",
    description: "button"
  },
  yes: {
    id:'yes',
    defaultMessage: "Yes"
  },
  login: {
    id: 'login',
    defaultMessage: 'Login'
  },
  resetPassword: {
    id: 'reset_password',
    defaultMessage: 'Reset password'
  },
  confirmPassword: {
    id: 'confirm_password',
    defaultMessage: 'Confirm password'
  },
  emailDoesNotExist: {
    id: 'email_does_not_exist',
    defaultMessage: 'Provided email address does not exist in our database.'
  },
  searchProducts:{
    id: "search_products",
    defaultMessage: "Search Products..."
  },
  allProducts:{
    id: "all_products",
    defaultMessage: "All Products",
    description: "tab name"
  },
  customFilter:{
    id: "custom_filter",
    defaultMessage: "Custom Filter"
  },
  saveSearch:{
    id: "save_search",
    defaultMessage: "Save search"
  },
  deleteSearch:{
    id: "delete_search",
    defaultMessage: "Delete search"
  },
  saveCustomSearch:{
    id: "save_custom_search",
    defaultMessage: "Save custom search",
    description:"save filter tab, header"
  },
  productName:{
    id: "product_name",
    defaultMessage: "Name",
    description:"product name"
  },
  productType:{
    id: "product_type",
    defaultMessage: "Type",
    description:"product type"
  },
  productStatus:{
    id: "product_status",
    defaultMessage: "Publish",
    description:"product status"
  },
  price:{
    id: "price",
    defaultMessage: "Price",
    description:"price"
  },
  selectedItems:{
    id: "selected_items",
    defaultMessage: "Selected {number} items",
    description:"selected items"
  },
  numberOfRows:{
    id: "number_of_rows",
    defaultMessage: "No of Rows:",
    description:"no rows"
  },
  published:{
    id: "published",
    defaultMessage: "Published",
    description: "product status"
  },
  notPublished:{
    id: "not_published",
    defaultMessage: "Not published",
    description: "product status"
  },
  unpublish:{
    id: "unpublish",
    defaultMessage: "Unpublish",
    description: "product status button"
  },
  noProductsFound:{
    id: "no_products_found",
    defaultMessage: "No products Found"
  }
});
export const formMessages = defineMessages({
  optionalField: {
    id:'optional',
    defaultMessage: "Optional",
    description: "field is optional"
  },
  requiredField: {
    id:'required_field',
    defaultMessage: "This field is required"
  },
  invalidEmail: {
    id:'invalid_email',
    defaultMessage: "Email is invalid"
  },
  incorrectPasswordUsername: {
    id:'incorrect_password_username',
    defaultMessage: "Sorry, your email and/or password are incorrect. Please try again."
  },
  passwordsNotMatch: {
    id:'passwords_not_match',
    defaultMessage: "Passwords not match"
  },
  setNewPassword: {
    id:'set_new_password',
    defaultMessage: "Set new password"
  },
  minLength8: {
    id:'min_length_8',
    defaultMessage: "Too short! Min length is 8"
  },
  searchName: {
    id: "search_name",
    defaultMessage: "Search Name",
    description: "save search tab"
  }
})

export const buttonMessages = defineMessages({
  accept: {
    id: "accept",
    defaultMessage: "Accept",
    description: "button"
  },
  back: {
    id: "back",
    defaultMessage: "Back",
    description: "button"
  },
  cancel: {
    id: "cancel",
    defaultMessage: "Cancel",
    description: "button"
  },
  clear: {
    id: "clear",
    defaultMessage: "Clear",
    description: "button"
  },
  confirm: {
    id: "confirm",
    defaultMessage: "Confirm",
    description: "button"
  },
  create: {
    id: "create",
    defaultMessage: "Create",
    description: "button"
  },
  delete: {
    id: "delete",
    defaultMessage: "Delete",
    description: "button"
  },
  done: {
    id: "done",
    defaultMessage: "Done",
    description: "button"
  },
  edit: {
    id: "edit",
    defaultMessage: "Edit",
    description: "button"
  },
  manage: {
    id: "manage",
    defaultMessage: "Manage",
    description: "button"
  },
  ok: {
    id: "ok",
    defaultMessage: "OK",
    description: "button"
  },
  remove: {
    id: "remove",
    defaultMessage: "Remove",
    description: "button"
  },
  save: {
    id: "save",
    defaultMessage: "Save",
    description: "button"
  },
  show: {
    id: "show",
    defaultMessage: "Show",
    description: "button"
  },
  undo: {
    id: "undo",
    defaultMessage: "Undo",
    description: "button"
  },
  createProduct: {
    id: "create_product",
    defaultMessage: "Create Product",
    description: "button"
  }
});

export const sectionNames = defineMessages({
  configuration: {
    id:'configuration',
    defaultMessage: "Configuration",
    description: "configuration section name"
  },
  customers: {
    id:'customers',
    defaultMessage: "Customers",
    description: "customers section name"
  },
  home: {
    id:'home',
    defaultMessage: "Home",
    description: "home section name"
  },
  catalog: {
    id:'catalog',
    defaultMessage: "Catalog",
    description: "Catalog section name"
  },
  navigation: {
    id:'navigation',
    defaultMessage: "Navigation",
    description: "navigation section name"
  },
  pages: {
    id:'pages',
    defaultMessage: "Pages",
    description: "pages section name"
  },

  products: {
    id:'products',
    defaultMessage: "Products",
    description: "products section name"
  },
  translations: {
    id:'translations',
    defaultMessage: "Translations",
    description: "translations section name"
  },
});

export function translateBoolean(value: boolean, intl: IntlShape): string {
  return value
      ? intl.formatMessage(commonMessages.yes)
      : intl.formatMessage(commonMessages.no);
}
