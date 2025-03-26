export type Customer = {
    id: number
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    street_address: string;
    postal_code: string;
    city: string;
    country: string;
    created_at: string;
}

export type CustomerCreate = Omit<Customer, "id" | "created_at">

export type CustomerPublic = Omit<CustomerCreate, "password">;
