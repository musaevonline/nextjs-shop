// import Logo from '../../images/logo.svg';
import {ssrMode, STOREFRONT_URL} from "@temp/constants";

interface ISchemaLogo {
    "@context": "https://schema.org";
    "@type": "Organization";
    url: string;
    logo: string
}

export const logoStructuredData = () => {
    // FIXME logo
    const data: ISchemaLogo = {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: !ssrMode ? location.origin : STOREFRONT_URL,
        logo: !ssrMode ? location.origin + 'LogoUrl' : STOREFRONT_URL

    };
    return JSON.stringify(data);
};
