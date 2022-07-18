import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';
import { Text } from '../elements/Text';
import {isDiscounted, isNewArrival} from '../../lib/utils'
import {getProductPlaceholder} from '../../lib/placeholder'
// import {isDiscounted, isNewArrival} from '~/lib/utils';
// import {getProductPlaceholder} from '~/lib/placeholders';

export function ProductCard({product, label, className, loading, onClick}) {
    let cardLabel;

  const cardData = product?.variants ? product : getProductPlaceholder();

  const {
    image,
    priceV2: price,
  } = flattenConnection(cardData?.variants)[0] || {};

  cardLabel = label;

  const styles = clsx('grid gap-6', className);

  return (
    <Link onClick={onClick} to={`/products/${product.handle}`}>
      <div className={styles}>
        <div className="card-image aspect-[4/5] bg-primary/5">
          <Text
            as="label"
            size="fine"
            className="absolute top-0 right-0 m-4 text-right text-notice"
          >
            {cardLabel}
          </Text>
          {image && (
            // <Image
            //   className="aspect-[4/5] w-full object-cover fadeIn"
            //   widths={[320]}
            //   sizes="320px"
            //   loaderOptions={{
            //     crop: 'center',
            //     scale: 2,
            //     width: 320,
            //     height: 400,
            //   }}
            //   // @ts-ignore Stock type has `src` as optional
            //   data={image}
            //   alt={image.altText || `Picture of ${product.title}`}
            //   loading={loading}
            // />
            <img src={product.featuredImage.url} alt="" />
          )}
        </div>
        <div className="grid gap-1">
          <Text
            className="w-full overflow-hidden whitespace-nowrap text-ellipsis "
            as="h3"
          >
            {product.title}
          </Text>
          <div className="flex gap-4">
            <Text className="flex gap-4">
              <Money withoutTrailingZeros data={price} />
              
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
}


