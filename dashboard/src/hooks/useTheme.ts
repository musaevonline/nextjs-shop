import { ThemeContext } from "@temp/components/Theme";
import { useContext } from "react";

function useTheme() {
  const themeInfo = useContext(ThemeContext);
  return themeInfo;
}
export default useTheme;
