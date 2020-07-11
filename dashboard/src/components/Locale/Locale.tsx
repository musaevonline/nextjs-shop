import locale_RU from "@locale/ru.json";
import locale_UK from "@locale/uk.json";
import useLocalStorage from "@temp/hooks/useLocalStorage";
import React from "react";
import { IntlProvider } from "react-intl";

export enum Locale {
  EN = "en",
  RU = "ru",
  UK = "uk",
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;
const localeData: Record<Locale, LocaleMessages> = {
  // Default language
  [Locale.EN]: undefined,
  [Locale.RU]: locale_RU,
  [Locale.UK]: locale_UK,
};

export const localeNames: Record<Locale, string> = {
  [Locale.EN]: "English",
  [Locale.RU]: "Русский",
  [Locale.UK]: "Українська",
};

const dotSeparator = "_dot_";
const sepRegExp = new RegExp(dotSeparator, "g");

function getKeyValueJson(messages: LocaleMessages): Record<string, string> {
  if (messages) {
    const keyValueMessages: Record<string, string> = {};
    return Object.entries(messages).reduce((acc, [id, msg]) => {
      acc[id.replace(sepRegExp, ".")] = msg.string;
      return acc;
    }, keyValueMessages);
  }
}

export function getMatchingLocale(languages: readonly string[]): Locale {
  const localeEntries = Object.entries(Locale);

  for (const preferredLocale of languages) {
    for (const localeEntry of localeEntries) {
      if (localeEntry[1].toLowerCase() === preferredLocale.toLowerCase()) {
        return Locale[localeEntry[0]];
      }
    }
  }

  return undefined;
}

const defaultLocale = Locale.EN;

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
export const LocaleContext = React.createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined
});

const { Consumer: LocaleConsumer, Provider: RawLocaleProvider } = LocaleContext;

const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useLocalStorage(
    "locale",
    getMatchingLocale(navigator.languages) || defaultLocale
  );

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={getKeyValueJson(localeData[locale])}
      onError={(err)  => {
        if (err.message !== "[React Intl] Missing message: ") {
          console.error(err);
        }
      }}
      key={locale}
    >
      <RawLocaleProvider
        value={{
          locale,
          setLocale
        }}
      >
        {children}
      </RawLocaleProvider>
    </IntlProvider>
  );
};

export { LocaleConsumer, LocaleProvider, RawLocaleProvider };
