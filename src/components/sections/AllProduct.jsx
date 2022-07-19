import { Link, Image, gql, useShopQuery, CacheLong, Money } from "@shopify/hydrogen";

export function AllProduct () {

    const {
        data: { products },
      } = useShopQuery({
        query: QUERY_ALL_PRODUCT,
        cache: CacheLong(),
      });


    return (
        <div className="container bg-orange-300 max-w-[1440px] mx-auto">
            <marquee>
            <div className="flex">
                {
                    products.nodes.map((row) => {
                        return <div className="flex-1 mr-8">
                                <Link to={`/products/${row.handle}`}>

                                <div className="card-image aspect-[4/5] bg-[#a667f4] p-4">
                                    <div className="shadow-sm rounded relative h-[300px] w-[300px]" >
                                        <img className="w-[full] h-[280px]" src={row.featuredImage.url} alt="" />
                                    </div>
                                    <div>
                                        <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-[800] text-[#f8e5e5]">
                                            {row.title.length > 29 ? row.title.slice(0, 30).concat(' ...') : row.title }
                                            <div className="">IDR 129</div>
                                        </div>
                                        
                                    </div>
                                </div>

                                </Link>
                        </div>
                    })
                }
            </div>
            </marquee>
        </div>
        
    )
}

const QUERY_ALL_PRODUCT = gql`
query FeaturedProduct {
    products(first: 10) {
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
    }
  }
  
`;

// query FeaturedProduct {
//     products(first: 50) {
//     nodes{
//       id
//       title
//     }
//   }
//   } 