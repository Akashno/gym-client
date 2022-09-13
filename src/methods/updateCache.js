import gql from "graphql-tag";
export const updatePaymentCache = (store,addPayment,client) => {
  const PAYMENTS = gql`
    query payments($input: PageInput!, $filter: FilterInput) {
      payments(input: $input, filter: $filter) {
        _id
        user {
          _id
        }
        createdAt
        firstName
        lastName
        phone

        year
        month
        amount
      }
    }
  `;
  let variables = {
    input: {
      limit: 10,
      skip: 0,
    },
    filter: {
      search: "",
    },
  };
  let data 
  try{
   data = store.readQuery({ query: PAYMENTS, variables });
  }catch(error){
    console.log(error)
  }
  if (data && data.payments) {
    data.payments.push(addPayment);
    store.writeQuery({ query: PAYMENTS, data, variables });
  }
  const CLIENTBYID = gql`
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
  const data2 = store.readQuery({

    query: CLIENTBYID,
    variables: { id: client._id },
  });
  debugger
  if (data2 && data2.clientById) {
    data2.clientById.payments.push(addPayment);
    store.writeQuery({ query: CLIENTBYID, data:data2,variables:{id:client._id} });
  }
  // dashboard data change
  const DASHBOARD = gql`
          query dashboard {
            dashboard{
            totalClients
            totalClientsThisMonth
            feePaymentsToday {
                _id
                firstName
                lastName
                dob
                doj
            }
            latestJoins {
                _id
                firstName
                lastName
                dob
                doj
            }
            }
          }
  `
};
