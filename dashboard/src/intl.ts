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
  }
})

export const buttonMessages = defineMessages({
  accept: {
    defaultMessage: "Accept",
    description: "button"
  },
  back: {
    defaultMessage: "Back",
    description: "button"
  },
  cancel: {
    defaultMessage: "Cancel",
    description: "button"
  },
  clear: {
    defaultMessage: "Clear",
    description: "button"
  },
  confirm: {
    defaultMessage: "Confirm",
    description: "button"
  },
  create: {
    defaultMessage: "Create",
    description: "button"
  },
  delete: {
    defaultMessage: "Delete",
    description: "button"
  },
  done: {
    defaultMessage: "Done",
    description: "button"
  },
  edit: {
    defaultMessage: "Edit",
    description: "button"
  },
  manage: {
    defaultMessage: "Manage",
    description: "button"
  },
  ok: {
    defaultMessage: "OK",
    description: "button"
  },
  remove: {
    defaultMessage: "Remove",
    description: "button"
  },
  save: {
    defaultMessage: "Save",
    description: "button"
  },
  show: {
    defaultMessage: "Show",
    description: "button"
  },
  undo: {
    defaultMessage: "Undo",
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
