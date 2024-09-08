import {Link} from 'react-router-dom';

export const Products = () => {
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
    </>
  );
};
