import {Link, Form, useActionData, ActionFunctionArgs} from 'react-router-dom';
import {ErrorMessage} from '../components/ErrorMessage';
import {addProduct} from '../services/ProductService';

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()); //*convert form data to object using Object.fromEntries

  let error = ''; //*initialize error that will be rendered in the component
  if (Object.values(data).includes('')) {
    error = 'All fields are required';
  }
  if (error.length) {
    return error;
  }

  //* call the addProduct function from the service
  addProduct(data);
  return {}; //*always return
}

export const NewProduct = () => {
  const error = useActionData() as string; //*useActionData is a hook that returns the data from the action function
  console.log(error);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-cyan-500">
          Register new product
        </h2>
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
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Name :
          </label>
          <input
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
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Price of the product, e.g. 300"
            name="price"
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-cyan-800 hover:bg-cyan-500 transition duration-300 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Register Product"
        />
      </Form>
    </>
  );
};
