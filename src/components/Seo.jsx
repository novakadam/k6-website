import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://k6alkotohaz.hu';
const SITE_NAME = 'K6 Alkotó Műhelyház';

const Seo = ({ title, description }) => {
  const { pathname } = useLocation();
  const url = SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
  useEffect(() => {
    // Az index.html statikus meta tagjei a közösségi crawlereknek kellenek; a renderelt oldalon a Helmet-féle marad.
    document
      .querySelectorAll('meta[name="description"]:not([data-react-helmet]), meta[property="og:title"]:not([data-react-helmet]), meta[property="og:description"]:not([data-react-helmet]), meta[property="og:url"]:not([data-react-helmet])')
      .forEach((el) => el.remove());
  }, []);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | kortárs alkotói tér Szentendrén`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default Seo;
