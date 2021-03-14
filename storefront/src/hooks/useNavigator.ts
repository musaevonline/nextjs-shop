import useRouter from "use-react-router";
import {ssrMode} from "@temp/constants";

export type UseNavigatorResult = (
  url: string,
  replace?: boolean,
  preserveQs?: boolean
) => void;
function useNavigator(): UseNavigatorResult {
  const {
    location: { search },
    history
  } = useRouter();

  return (url: string, replace = false, preserveQs = false) => {
    const targetUrl = preserveQs ? url + search : url;
    if (replace) {
      history.replace(targetUrl);
    } else {
      history.push(targetUrl);
    }

    if (!ssrMode) {
      window.scrollTo({behavior: "smooth", top: 0});
    }
  };
}

export default useNavigator;
