import {Product} from '../interfaces';

interface ProductFormProps {
  product?: Product;
}
export const ProductForm = ({product}: ProductFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Name :
        </label>
        <input
          defaultValue={product?.name}
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Name of the product"
          name="name"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Price:
        </label>
        <input
          defaultValue={product?.price}
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Price of the product, e.g. 300"
          name="price"
        />
      </div>
    </>
  );
};
