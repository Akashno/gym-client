export const clientsGql = `
  query clients($input: PageInput!, $filter: FilterInput) {
    clients(input: $input, filter: $filter) {
      clients{
      _id
      userCode
      firstName
      lastName
      phone
      email
      gender
      dob
      isActive
      doj
      }
      totalClients
    }
  }`;
export const clientByIdGql = `
  query clientById($id: ID!) {
    clientById(id: $id) {
      _id
      firstName
      lastName
      phone
      email
      gender
      dob
      isActive
      doj
      payments {
        year
        month
        amount
      }
    }
  }
`;
export const createClientGql = `
  mutation createClient($input: UserInput) {
    createClient(input: $input) {
      _id
      userCode
      firstName
      lastName
      phone
      gender
      isActive
      email
      dob
      doj
    }
  }
`;

export const updateClientGql= `
  mutation updateClient($input: UserInput) {
    updateClient(input: $input) {
      _id
      firstName
      lastName
      phone
      email
      gender
      isActive
      dob
      doj
    }
  }
`