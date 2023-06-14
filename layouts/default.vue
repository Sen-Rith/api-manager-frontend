<template>
  <div class="h-100">
    <v-app-bar>
      <template v-slot:prepend>
        <nuxt-link to="/">
          <v-avatar color="primary" variant="outlined">
            <v-icon size="small" icon="mdi-webhook"></v-icon>
          </v-avatar>
        </nuxt-link>
      </template>

      <v-app-bar-title>Api Manager</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-if="!user"
        prepend-icon="mdi-google"
        color="primary"
        variant="outlined"
        class="mr-2"
        @click="signIn"
      >
        Sign in
      </v-btn>

      <v-menu min-width="200px" v-if="user">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            color="primary"
            variant="outlined"
            class="mr-2"
          >
            <v-avatar color="primary">
              <v-img
                v-if="user.photoURL"
                :src="user.photoURL"
                alt="NaN"
              ></v-img>
              <v-icon v-else icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="primary">
                <v-img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  alt="NaN"
                ></v-img>
                <v-icon v-else icon="mdi-account-circle"></v-icon>
              </v-avatar>
              <h3>{{ user.displayName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn color="primary" variant="outlined" @click="signOut">
                Sign Out
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

      <v-btn
        :icon="theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        color="primary"
        variant="outlined"
        class="mr-2"
        @click="toggleTheme"
      ></v-btn>
    </v-app-bar>

    <slot />
  </div>
</template>

<script setup>
const { signIn, signOut } = useAuth();
const { user, updateUser } = useUser();
const theme = useTheme();
const cookieTheme = useCookie("theme");

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  cookieTheme.value = theme.value;
  if (user.value) updateUser({ ...user.value, theme: theme.value });
}
</script>
