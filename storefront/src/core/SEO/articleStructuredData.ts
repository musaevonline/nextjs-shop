import Logo from '../../images/logo.svg';
import {BlogArticle_blogArticle} from "@sdk/queries/types/BlogArticle";
import {ShopInfo_shop} from "@sdk/queries/types/ShopInfo";

interface ISchemaArticle {
    "@context": "https://schema.org";
    "@type": "NewsArticle";
    headline: string;
    datePublished: string;
    dateModified: string;
    image: string[];
    author: {
        "@type": "Person";
        name: string;
    };
    publisher: {
        "@type": "Organization";
        name: string;
        logo: {
            "@type": "ImageObject";
            url: string;
        }
    }
}

export const articleStructuredData = (article: BlogArticle_blogArticle | null, site: ShopInfo_shop | null) => {
    if (!article || !site) return null;
    const data: ISchemaArticle = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        image: [article.thumbnail.url],
        datePublished: article.datePublished || article.dateAdded,
        dateModified: article.dateAdded,
        author: {
            "@type": "Person",
            name: article.authorName
        },
        publisher: {
            "@type": "Organization",
            name: site.headerText,
            logo: {
                "@type": "ImageObject",
                url: location.origin + Logo
            }
        }
    };
    return JSON.stringify(data);
};
