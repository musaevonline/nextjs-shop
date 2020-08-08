import { LocaleContext } from "@temp/components/Locale";
import { useContext } from "react";

function useLocale() {
  const localeInfo = useContext(LocaleContext);
  return localeInfo;
}
export default useLocale;
