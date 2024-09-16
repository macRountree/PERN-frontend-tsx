import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
  //   useLocation,
} from 'react-router-dom';
import {ErrorMessage} from '../components/ErrorMessage';
import {
  // addProduct,
  getProductById,
  updateProduct,
} from '../services/ProductService';
import {Product} from '../interfaces';
import {ProductForm} from '../components/ProductForm';
// import {loader} from './Products';

export async function loader({params}: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const productById = await getProductById(+params.id); //*params could be undefined and string

    if (!productById) {
      //   throw new Response('', {
      //     status: 404,
      //     statusText: 'Product not found or not available',
      //   }); //*throw an error if the product is not found
      return redirect('/');
    }
    return productById;

    console.log(productById, 'from loader');
  }

  return {};
}
export async function action({request, params}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()); //*convert form data to object using Object.fromEntries

  let error = ''; //*initialize error that will be rendered in the component
  if (Object.values(data).includes('')) {
    error = 'All fields are required';
  }
  if (error.length) {
    return error;
  }
  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    //* call the addProduct function from the service
    return redirect('/'); //*always return
  }
}
const availabilityOptions = [
  {name: 'Available', value: true},
  {name: 'Not Available', value: false},
];

export const EditProduct = () => {
  const product = useLoaderData() as Product;
  const error = useActionData() as string; //*useActionData is a hook that returns the data from the action function
  //   console.log(error);
  //   const {state} = useLocation(); //*useLocation returns the current location object
  //   console.log(state);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-cyan-500">Edit Product</h2>
        <Link
          to="/"
          className="rounded-md bg-cyan-800 text-white font-bold p-3 text-sm shadow-sm hover:shadow-lg hover:bg-cyan-500 transition duration-300"
        >
          {' '}
          Home{' '}
        </Link>
      </div>
      {/* {Form i a component from react-router-dom} */}

      {error && <ErrorMessage> {error} </ErrorMessage>}
      <Form className="mt-10" method="POST" action="">
        {' '}
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-cyan-800 hover:bg-cyan-500 transition duration-300 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Save Product"
        />
      </Form>
    </>
  );
};
