export const paymentsGql = `
    query payments($input: PageInput!, $filter: FilterInput) {
      payments(input: $input, filter: $filter) {
        _id
        paymentCode
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
`
export const addPaymentGql = `
    mutation addPayment($input: PaymentInput) {
        addPayment(input: $input) {
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
`