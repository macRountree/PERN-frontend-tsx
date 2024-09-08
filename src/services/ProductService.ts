import {safeParse} from 'valibot';
import {DraftProductSchema} from '../interfaces';
import axios from 'axios';

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
      const {data} = await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
      console.log(data);
    } else {
      throw new Error('Invalid data');
    }

    console.log(result, 'from result');
  } catch (error) {
    console.log(error);
  }
}
