import React, { useEffect } from 'react';

const SITE_URL = 'https://smokymtnpooperscooper.com';

const upsertMeta = (attribute, key, content) => {
  let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, key);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  let node = document.head.querySelector('link[rel="canonical"]');
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', 'canonical');
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
};

const SEO = ({ title, description, path = '/', image = null, type = 'website', service = null, noindex = false }) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`;
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertCanonical(canonicalUrl);

    if (image) {
      upsertMeta('property', 'og:image', image);
    }

    const id = 'seo-jsonld';
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Smoky Mountain Pooper Scoopers',
      url: SITE_URL,
      telephone: '+1-865-343-1142',
      email: 'smokymtnpooperscoopers@protonmail.com',
      priceRange: '$',
      description: 'Pet waste removal, recurring poop scooping, one-time yard cleanups, and commercial pet waste service in Knoxville and East Tennessee.',
      areaServed: [
        { '@type': 'City', name: 'Knoxville' },
        { '@type': 'AdministrativeArea', name: 'East Tennessee' }
      ]
    };

    const graph = [localBusiness];
    if (service) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        serviceType: service.serviceType,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: { '@type': 'AdministrativeArea', name: 'East Tennessee' },
        description: service.description,
        url: canonicalUrl
      });
    }

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);

    return () => {
      const current = document.getElementById(id);
      if (current) current.remove();
    };
  }, [title, description, path, image, type, service, noindex]);

  return null;
};

export default SEO;
