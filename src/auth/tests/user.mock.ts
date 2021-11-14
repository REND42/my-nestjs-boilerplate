import Address from "../../users/address.entity";
import { User } from "../../users/user.entity";

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  username: 'john',
  password: 'hash',
  // @ts-ignore
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'countryName'
  }
}

export default mockedUser