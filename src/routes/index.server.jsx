import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import { Suspense } from "react";
import {getHeroPlaceholder} from '../lib/placeholder';
import { FeaturedCollections, AllProduct, HeroMain } from "../components/sections/index";
import { Layout } from "../components/Layout.server";
export default function Homepage() {

  return (
      <Layout>
        <Suspense>
          <HomepageContent />
        </Suspense>
      </Layout>
  );
}

function HomepageContent () {

  const { data }= useShopQuery({
    query: QUERY,
    // cache: CacheLong(),
  });
  const { collections } = data
  const [primaryHero, secondaryHero, tertiaryHero] = getHeroPlaceholder(collections.nodes);
  return (
    <>
      {primaryHero && (
        <HeroMain {...primaryHero} height="full" top loading="eager" />
      )}
      <AllProduct data={collections} />
      {secondaryHero && <HeroMain {...secondaryHero} />}
      <FeaturedCollections
        data={collections}
      />
      {tertiaryHero && <HeroMain {...tertiaryHero} />}
    </>
  );

}


const QUERY = gql`
query homepage {

collections(first: 3, sortKey: UPDATED_AT) {
  nodes {
      id
      title
      handle
      image {
        altText
        width
        height
        url
      }
      
    }
  }
  
}
    
`;