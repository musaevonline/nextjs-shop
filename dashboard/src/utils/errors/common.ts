import { defineMessages } from "react-intl";

const commonErrorMessages = defineMessages({
  graphqlError: {
    id: 'api_error',
    defaultMessage: "API error"
  },
  invalid: {
    id: 'invalid_value',
    defaultMessage: "Invalid value"
  },
  invalidToken: {
    id: 'invalid_token',
    defaultMessage: "Invalid token"
  },
  unknownError: {
    id: 'unknown_error',
    defaultMessage: "Unknown error"
  }
});

export default commonErrorMessages;
