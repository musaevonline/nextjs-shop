import * as React from "react";
import { Helmet } from "react-helmet";

import { Consumer as MetaConsumer } from "./context";

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <MetaConsumer>
      {({ title, description, image, type, url, custom }) => (
          <>
            <Helmet title={title}>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta name="og:url" content={url} />
              <meta name="og:title" content={title} />
              <meta name="og:description" content={description} />
              <meta name="og:type" content={type} />
              <meta name="og:image" content={image} />
              <meta name="google-site-verification" content="mSVa4XmnP_RfM5M9HmsHch3lb-1kukQwy9Lrcy9eoww" />
              {custom?.map(el => el)}
            </Helmet>
            {children}
          </>
      )}
    </MetaConsumer>
);

export default Consumer;