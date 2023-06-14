<template>
  <div class="d-flex justify-center align-center h-100">
    <v-card class="mx-2 pa-2" width="600" variant="outlined">
      <v-card-item>
        <v-card-title>Create a Workspace</v-card-title>
      </v-card-item>

      <v-form v-model="isFormValid" @submit.prevent="onSubmit">
        <v-card-text>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Workspace Name"
            placeholder="Enter a name for your workspace"
            variant="outlined"
            class="mb-2"
            @update:model-value="onNameChange"
          ></v-text-field>
          <v-text-field
            v-model="slug"
            :rules="[rules.required, rules.isSlugAvailable]"
            placeholder="workspace-name"
            variant="outlined"
            @update:model-value="onSlugChange"
          >
            <template #prepend-inner>
              <span class="text-primary font-weight-medium"
                >{{ config.public.CURRENT_DOMAIN }}/</span
              >
            </template>
          </v-text-field>

          <v-row>
            <v-col cols="12" sm="6">
              <p class="text-body-1 text-center mb-2">Pick color</p>
              <div class="d-flex justify-center align-center">
                <swatches v-model="color"></swatches>
              </div>
            </v-col>
            <v-col>
              <p class="text-body-1 text-center mb-2">Pick icon</p>
              <div class="d-flex justify-center align-center">
                <v-menu
                  location="end"
                  max-height="250"
                  max-width="250"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn :color="color" size="100" icon v-bind="props"
                      ><v-icon size="50">{{ icon }}</v-icon></v-btn
                    >
                  </template>
                  <v-card variant="outlined" class="pt-1">
                    <icons v-model="icon" :selected-color="color"></icons>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-row>
            <v-col v-if="!hasNoWorkspace">
              <v-btn variant="text" block @click="go(-1)"> Cancel </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                variant="flat"
                block
                :disabled="!isFormValid || isCheckingSlug || isCreating"
                :loading="isCreating"
                type="submit"
              >
                Create
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import Swatches from "~/components/swatches.vue";

definePageMeta({
  middleware: ["workspace-list"],
});

const config = useRuntimeConfig();
const { go } = useRouter();
const { workspaceList } = useWorkspaceList();
const { isWorkspaceSlugAvailable, createWorkspace } = useWorkspace();
const { $lodash } = useNuxtApp();

const rules = {
  required: (v: string) => !!v || "This field is required",
  isSlugAvailable: () => isSlugAvailable.value || "This slug is not available",
};

const name = ref("");
const slug = ref("");
const color = ref("#7352b5");
const icon = ref("mdi-account-group-outline");
const isFormValid = ref(false);
const isCreating = ref(false);
const isCheckingSlug = ref(false);
const isSlugAvailable = ref(false);

const hasNoWorkspace = computed(() => {
  return workspaceList.value?.workspaces.length === 0;
});

const onSlugChange = $lodash.debounce(async (value: string) => {
  isCheckingSlug.value = true;
  slug.value = value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  isSlugAvailable.value = await isWorkspaceSlugAvailable(slug.value);
  isCheckingSlug.value = false;
}, 500);

function onNameChange() {
  slug.value = name.value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  onSlugChange(slug.value);
}

async function onSubmit() {
  isCreating.value = true;
  await createWorkspace({
    name: name.value,
    slug: slug.value,
    color: color.value,
    icon: icon.value,
  });
  isCreating.value = false;
}
</script>
