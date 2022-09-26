<template>
  <v-container class="pa-5">
    <h3 class="my-6">Update Profile</h3>
    <v-card tile rounded="lg" class="py-8 px-4" outlined>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            v-model="firstName"
            hide-details
            dense
            label="First Name"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            v-model="lastName"
            hide-details
            dense
            label="Last Name"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            v-model="phone"
            hide-details
            dense
            label="Phone"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            v-model="email"
            hide-details
            dense
            label="Email"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-btn :loading="profileBtnLoading" width="100%" @click="updateUser" color="primary"
            >Update Profile</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <h3 class="my-6">Change password</h3>
    <v-card tile rounded="lg" class="py-8 px-4" outlined>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            v-model="currentPassword"
            hide-details
            :type="showCurrentPassword ? 'text' : 'password'"
            dense
            label="Current Password"
            append-icon="mdi-eye"
            @click:append="showCurrentPassword = !showCurrentPassword"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            v-model="newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            hide-details
            dense
            label="New Password"
            append-icon="mdi-eye"
            @click:append="showNewPassword = !showNewPassword"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            hide-details
            dense
            label="Confirm Password"
            append-icon="mdi-eye"
            @click:append="showConfirmPassword = !showConfirmPassword"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-btn
          color="primary"
            width="100%"
            @click="changePassword"
            :disabled="isNotValidForm()"
            :loading="passwordBtnLoading"
            >Change Password</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import gql from "graphql-tag";
import { changePasswordGql, updateUserGql } from '../api';
export default {
  data() {
    return {
      loading: false,
      firstName: this.$store.state.user?.firstName,
      lastName: this.$store.state.user?.lastName,
      phone: this.$store.state.user?.phone,
      email: this.$store.state.user?.email,

      currentPassword: "",
      newPassword: "",
      confirmPassword: "",

      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,

      profileBtnLoading: false,
      passwordBtnLoading: false,
    };
  },
  methods: {
    updateUser() {
      this.profileBtnLoading = true;
      this.$apollo
        .mutate({
          // Query
          mutation: gql`${updateUserGql} `,
           // Parameters
          variables: {
            input: {
              id: this.$store.state.user?._id,
              firstName: this.firstName,
              lastName: this.lastName,
              phone: this.phone,
              email: this.email,
            },
          },
        })
        .then((data) => {
          this.profileBtnLoading = false;
          let user = data.data.updateUser;
          localStorage.setItem('GYM_USER', JSON.stringify(user))
          this.$store.commit("setUser", user);
          this.$store.commit("setSnackBar", {
            color: "success",
            text: "Staff info updated",
          });
          this.loading = false;
          this.isDrawer = false;
        })
        .catch(() => {
          this.profileBtnLoading = false;
          this.$store.commit("setSnackBar", {
            color: "error",
            text: "Something Went wrong",
          });
        });
    },
    isNotValidForm() {
      return (
        !this.currentPassword || !this.newPassword || !this.confirmPassword
      );
    },
    resetForm() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
    changePassword() {
          this.passwordBtnLoading = false;
      if (this.confirmPassword !== this.newPassword) {
        this.$store.commit("setSnackBar", {
          color: "warning",
          text: "New password and confirm password should be same",
        });
        return false;
      }

      this.$apollo
        .mutate({
          // Query
          mutation: gql`${changePasswordGql}`,
          // Parameters
          variables: {
            input: {
              phone: this.$store.state.user?.phone,
              currentPassword: this.currentPassword,
              newPassword: this.newPassword,
            },
          },
        })
        .then(() => {
          this.passwordBtnLoading = false;
          this.$store.commit("setSnackBar", {
            color: "success",
            text: "Password Changed",
          });
          this.resetForm();
        })
        .catch((error) => {
          this.passwordBtnLoading = false;
          let errorMessage = error.graphQLErrors[0].message;
          this.$store.commit("setSnackBar", {
            color: "error",
            text: errorMessage,
          });
        });
    },
  },
};
</script>

<style></style>