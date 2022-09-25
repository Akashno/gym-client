export const dashboardGql= `
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
export const signInGql = `
    mutation signIn($input: SignInInput) {
        signIn(input: $input){
        token
        user{
            _id
            firstName
            lastName
            phone
            email
        }
        }
    }
`
export const updateUserGql = `

            mutation updateUser($input: UserInput) {
              updateUser(input: $input) {
                _id
                firstName
                lastName
                phone
                email
              }
            }
`
export const changePasswordGql = `
            mutation changePassword($input: ChangePasswordInput) {
              changePassword(input: $input)
            }
`