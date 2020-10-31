/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SocialAuth
// ====================================================

export interface SocialAuth_socialAuth_social_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface SocialAuth_socialAuth_social_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: SocialAuth_socialAuth_social_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface SocialAuth_socialAuth_social_user_addresses_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface SocialAuth_socialAuth_social_user_addresses {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: SocialAuth_socialAuth_social_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface SocialAuth_socialAuth_social_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isActive: boolean;
  defaultShippingAddress: SocialAuth_socialAuth_social_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (SocialAuth_socialAuth_social_user_addresses | null)[] | null;
}

export interface SocialAuth_socialAuth_social {
  __typename: "SocialType";
  id: string;
  created: any;
  extraData: any | null;
  uid: string;
  provider: string;
  modified: any;
  user: SocialAuth_socialAuth_social_user;
}

export interface SocialAuth_socialAuth {
  __typename: "SocialAuthJWT";
  token: string | null;
  social: SocialAuth_socialAuth_social | null;
}

export interface SocialAuth {
  /**
   * Social Auth for JSON Web Token (JWT)
   */
  socialAuth: SocialAuth_socialAuth | null;
}

export interface SocialAuthVariables {
  provider: string;
  accessToken: string;
}
