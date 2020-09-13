import {defineMessages, IntlShape} from "react-intl";

export const commonMessages = defineMessages({
  dashboard: {
    id: 'dashboard',
    defaultMessage: "Dashboard"
  },
  description: {
    id:'description',
    defaultMessage: "Description"
  },
  categoryCreated: {
    id:'category_created',
    defaultMessage: "Category created"
  },
  createNewCategory: {
    id: "create_new_category",
    defaultMessage: "Create New Category",
    description: "page header"
  },
  deleteCategoriesTitle: {
    id:'delete_categories_title',
    defaultMessage: "Delete categories"
  },
  categoryDeleted: {
    id: "category_deleted",
    defaultMessage: "Category deleted"
  },
  productsInCategory: {
    id: "products_in_category",
    defaultMessage: "Products in {categoryName}",
    description: "header"
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
  generalInformation: {
    id:'general_info',
    defaultMessage: "General Information"
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
  search:{
    id: "search",
    defaultMessage: "Search..."
  },
  allProducts:{
    id: "all_products",
    defaultMessage: "All Products",
    description: "tab name"
  },
  all:{
    id: "all",
    defaultMessage: "All",
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
  },
  noFound:{
    id: "no_found",
    defaultMessage: "No Found"
  },
  delete:{
    id: "delete",
    defaultMessage: "Delete"
  },
  name: {
    id: "name",
    defaultMessage: "Name",
    description: "table col"
  },
  subcategories:{
    id: "subcategories",
    defaultMessage: "Subcategories"
  },
  numberOfProducts:{
    id: "number_of_products",
    defaultMessage:"No. of Products",
    description:"number of products"
  },
  sureDeleteCategory:{
    id: "sure_delete_category",
    defaultMessage: "Are you sure you want to delete {categoryName}?",
    description:"are you sure?"
  },
  rememberDeleteAssignedProducts:{
    id: "remember_delete_assigned_products",
    defaultMessage: "Remember this will also delete all products assigned to this category."
  },
  deleteCategories:{
    id: "delete_categories",
    defaultMessage: "{counter,plural,one{Are you sure you want to delete this category?} other{Are you sure you want to delete {displayQuantity} categories?}}"
  },
  deleteProducts:{
    id: "delete_products",
    defaultMessage: "{counter,plural,one{Are you sure you want to delete this product?} other{Are you sure you want to delete {displayQuantity} products?}}"
  },
  deleteProductsTitle:{
    id: "delete_products_title",
    defaultMessage: "Delete Products"
  },
  backgroundImgTitle:{
    id: "background_img_title",
    defaultMessage: "Background Image (optional)",
    description: "section header"
  },
  dropHere:{
    id: "drop_here",
    defaultMessage:"Drop here to upload",
    description:"image upload"
  },
  addImageLinkTitle: {
    id: "add_image_lin_title",
    defaultMessage: "Add image link",
    description: "dialog title"
  },
  invalidContent: {
    id: "invalid_content",
    defaultMessage: "Invalid content"
  },
  unpublishProductsTitle: {
    id:'unpublish_products_title',
    defaultMessage: "Unpublish products",
    description: "modal title"
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
  },
  categoryName: {
    id: "category_name",
    defaultMessage: "Category Name",
    description: "field name"
  },
  categoryDescription: {
    id: "category_description",
    defaultMessage: "Category Description",
    description: "field name"
  },
  urlLinked: {
    id: "url_linked",
    defaultMessage: "URL Linked",
    description: "field name"
  },
  imageUrl: {
    id: "image_url",
    defaultMessage: "Image URL"
  },
  min0: {
    id: "min0",
    defaultMessage: "Min value is 0"
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
  },
  createCategory: {
    id: "create_category",
    defaultMessage: "Create Category",
    description: "button"
  },
  createSubcategory: {
    id: "create_subcategory",
    defaultMessage: "Create Subcategory",
    description: "button"
  },
  addProduct: {
    id: "add_product",
    defaultMessage: "Add product",
    description: "button"
  },
  logout: {
    id: "logout",
    defaultMessage: "Logout",
    description: "button"
  },
  accountSettings: {
    id:"account_settings",
    defaultMessage:"Account Settings",
    description:"button"
  },
  backHome:{
    id:"back_home",
    defaultMessage:"Back to home",
    description:"button"
  },
  replace:{
    id:"replace",
    defaultMessage:"Replace",
    description:"button"
  },
  addOrEditLink:{
    id:"add_or_edit_link",
    defaultMessage:"Add or Edit link",
    description:"button"
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
  categories: {
    id:'categories',
    defaultMessage: "Categories",
    description: "categories section name"
  },
  attributes: {
    id:'attributes',
    defaultMessage: "Attributes",
    description: "settings section name"
  },
  productTypes: {
    id:'productTypes',
    defaultMessage: "Product Types",
    description: "settings section name"
  },
  staff: {
    id:'staff',
    defaultMessage: "Staff",
    description: "settings section name"
  },
  permissionGroups: {
    id:'permission_groups',
    defaultMessage: "Permission groups",
    description: "settings section name"
  },
  siteSettings: {
    id:'site_settings',
    defaultMessage: "Site settings",
    description: "settings section name"
  },
  orders: {
    id:'orders',
    defaultMessage: "Orders",
    description: "settings section name"
  },
  drafts: {
    id:'drafts',
    defaultMessage: "Drafts",
    description: "settings section name"
  },
  draftOrders: {
    id:'draftOrders',
    defaultMessage: "Draft orders",
    description: "settings section name"
  },
  shipping: {
    id:'shipping',
    defaultMessage: "Shipping",
    description: "settings section name"
  },
  paymentMethods: {
    id:'paymentMethods',
    defaultMessage: "Payment methods",
    description: "settings section name"
  },
  blog: {
    id:'blog',
    defaultMessage: "Blog",
    description: "settings section name"
  },
  blogCategories: {
    id:'blogCategories',
    defaultMessage: "Blog Categories",
    description: "settings section name"
  },
  blogArticles: {
    id:'blogArticles',
    defaultMessage: "Blog Articles",
    description: "settings section name"
  }
});

export function translateBoolean(value: boolean, intl: IntlShape): string {
  return value
      ? intl.formatMessage(commonMessages.yes)
      : intl.formatMessage(commonMessages.no);
}
