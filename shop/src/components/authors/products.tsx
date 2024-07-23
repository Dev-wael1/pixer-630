import { useProducts } from '@/data/product';
import Grid from '@/components/product/grid';

const Products = ({ shopId }: { shopId: string }) => {
  const { products, isLoading, loadMore, isLoadingMore, hasNextPage } =
    useProducts({
      shop_id: shopId,
    });
  return (
    <Grid
      products={products}
      isLoading={isLoading}
      onLoadMore={loadMore}
      isLoadingMore={isLoadingMore}
      hasNextPage={hasNextPage}
    />
  );
};

export default Products;
