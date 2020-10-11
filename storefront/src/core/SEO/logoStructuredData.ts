import Logo from '../../images/logo.svg';

interface ISchemaLogo {
    "@context": "https://schema.org";
    "@type": "Organization";
    url: string;
    logo: string
}

export const logoStructuredData = () => {

    const data: ISchemaLogo = {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: location.origin,
        logo: location.origin + Logo

    };
    return JSON.stringify(data);
};
