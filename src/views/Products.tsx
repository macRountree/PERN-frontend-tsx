import {Link, useLoaderData} from 'react-router-dom';
import {getProducts} from '../services/ProductService';
import {ProductDetails} from '../components/ProductDetails';
import {Product} from '../interfaces';

export const loader = async () => {
  const products = await getProducts();
  // console.log(products, 'from loader');
  return products;
};
export async function action() {
  console.log('from action');
  return {};
}

export const Products = () => {
  //*need hook useLoaderData to get the data from the loader
  const products = useLoaderData() as Product[];
  // console.log(products, 'from Products view');
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-cyan-500">Products</h2>
        <Link
          to="products/new"
          className="rounded-md bg-cyan-800 text-white font-bold p-3 text-sm shadow-sm hover:shadow-lg hover:bg-cyan-500 transition duration-300"
        >
          {' '}
          Add Product{' '}
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
