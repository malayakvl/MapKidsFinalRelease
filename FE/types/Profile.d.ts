declare namespace Profile {
  interface Root {
    profile: Profile;
    crudStatus: string | null;
    validEmail: string | null;
    isPasswordChanged: boolean;
    existEmail: string | null;
  }

  interface Profile {
    id: number;
    role_id: number;
    email: string;
    photo: string | null;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    identification_number: string | null;
    phone: string | null;
    address: Address;
    created_at: any;
    updated_at: any;
  }
}
