import {Suspense} from 'react';
import { Section } from '../../components/elements/Section';
import { Layout } from '../../components/Layout.server';
import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';
import { ProductGrid } from '../../components/product/ProductGrid.client';

const pageBy = 48;

export default function Collection({params}) { 
    
  const {handle} = params;
  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();
  const {
    data: {collection},
  } = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
      pageBy,
    },
    preload: true,
  });


    return (
        <Layout >
            
            <Section>
                <ProductGrid
                key={collection.id}
                collection={collection}
                url={`/collections/${handle}?country=${country}`}
                />
            </Section>
        </Layout>

        
    )
}

const COLLECTION_QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  )@inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $pageBy) {
        nodes {
            id
            title
            tags
            handle
            availableForSale
            publishedAt
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
              width
              height
              id
            }
          }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`