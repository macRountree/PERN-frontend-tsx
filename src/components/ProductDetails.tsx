import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
} from 'react-router-dom';
import {Product} from '../interfaces/index';
import {formatPrice} from '../helpers/index';
import {deleteProduct} from '../services/ProductService';

interface ProductDetailProps {
  product: Product;
}

export async function action({params}: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect('/');
  }
}

export const ProductDetails = ({product}: ProductDetailProps) => {
  const navigate = useNavigate();

  const isAvailable = product.availability;
  return (
    <tr className="border-b text-center ">
      <td className="p-3 text-lg text-gray-800">{product.name} </td>
      <td className="p-3 text-lg text-gray-800">
        {formatPrice(product.price)}{' '}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <form action="" method="POST">
          <button
            type="button"
            name="availability"
            value={product.availability.toString()}
            className={`${
              isAvailable ? 'text-black' : 'text-red-600'
            } rounded-lg p-2 text-sm font-bold w-full uppercase shadow-sm border border-black  hover: cursor-pointer hover:bg-gray-200 transition duration-300`}
          >
            {isAvailable ? 'In Stock' : ' Out of Stock'}{' '}
          </button>
        </form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className=" flex gap-2 items-center">
          {' '}
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="w-full rounded-md bg-cyan-800 text-white font-bold p-2 text-sm shadow-sm hover:shadow-lg hover:bg-cyan-500 transition duration-300"
          >
            Edit
          </button>{' '}
          <Form
            method="POST"
            className="w-full "
            action={`products/${product.id}/delete`}
            onSubmit={e => {
              if (!confirm('Are you sure you want to delete this product?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Delete"
              className="w-full rounded-md bg-red-800 text-white font-bold p-2 text-sm shadow-sm hover:shadow-lg hover:bg-red-500 transition duration-300"
            />
          </Form>{' '}
        </div>
      </td>
    </tr>
  );
};
