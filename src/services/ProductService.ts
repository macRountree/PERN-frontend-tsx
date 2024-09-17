import {safeParse, number, parse, string, transform, pipe} from 'valibot';
import {
  DraftProductSchema,
  ProductsSchema,
  Product,
  ProductSchema,
} from '../interfaces';
import axios from 'axios';
import {toBoolean} from '../helpers';

interface ProductData {
  [k: string]: FormDataEntryValue; //*FormDataEntryValue is a type from the FormData API from react router dom
}
export async function addProduct(data: ProductData) {
  //*Use valibot to validate the data instead zod
  //   console.log('from addProduct in ProductService', data);

  try {
    const result = safeParse(DraftProductSchema, {
      //*parse the data to the schema from string to number
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products `;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
      //   console.log(data);
    } else {
      throw new Error('Invalid data');
    }

    // console.log(result, 'from result');
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products `;
    const {data} = await axios.get(url);
    // console.log(data.data, 'from data getProducts');
    const result = safeParse(ProductsSchema, data.data); //*ProductsSchema is an array of ProductSchema(objects)

    if (result.success) {
      return result.output;
    } else {
      throw new Error('Invalid data');
    }

    console.log(result, 'from result getProducts');
  } catch (error) {
    console.log(error);
  }
}
export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const {data} = await axios.get(url);
    // console.log(data.data, 'from data getProducts');
    const result = safeParse(ProductSchema, data.data); //*ProductSchema
    // console.log(result, 'from result getProductById');
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Invalid data');
    }

    // console.log(result, 'from result getProducts');
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    console.log(result, 'from result updateProduct');
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
