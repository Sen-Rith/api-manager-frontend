<template>
  <div class="d-flex justify-center align-center h-100">
    <v-card class="mx-2 pa-2" width="600" variant="outlined">
      <v-card-item>
        <v-card-title>Update Workspace</v-card-title>
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
            :error="!isSlugAvailable"
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
                      ><v-icon size="50" color="white">{{
                        icon
                      }}</v-icon></v-btn
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

        <div class="pa-6">
          <v-btn
            color="primary"
            variant="outlined"
            block
            :disabled="!isFormValid || isCheckingSlug || isUpdating"
            :loading="isUpdating"
            type="submit"
          >
            Update
          </v-btn>

          <v-divider class="my-6" />

          <v-dialog v-model="deleteDialog" width="auto">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" color="error" variant="outlined" block>
                Delete
              </v-btn>
            </template>

            <v-card title="Delete Workspace">
              <v-card-text
                >Are you sure you want to delete workspace
                <b class="text-primary">{{ workspace?.name }}</b
                >?</v-card-text
              >
              <v-card-actions class="justify-end">
                <v-btn
                  variant="text"
                  @click="deleteDialog = false"
                  :disabled="isDeleting"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="error"
                  variant="outlined"
                  @click="onDelete"
                  :disabled="isDeleting"
                  :loading="isDeleting"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["workspace"],
});

const config = useRuntimeConfig();
const { workspaceList, getWorkspaceList } = useWorkspaceList();
const {
  workspace,
  isWorkspaceSlugAvailable,
  updateWorkspace,
  removeWorkspace,
} = useWorkspace();
const { $lodash } = useNuxtApp();

if (!workspace.value) {
  throw createError({ statusCode: 404, statusMessage: "Workspace not found" });
}

const currentWorkspaceList = await getWorkspaceList();
workspaceList.value = currentWorkspaceList;

const rules = {
  required: (v: string) => !!v || "This field is required",
  isSlugAvailable: () => isSlugAvailable.value || "This slug is not available",
};

const name = ref(workspace.value.name);
const slug = ref(workspace.value.slug);
const color = ref(workspace.value.color);
const icon = ref(workspace.value.icon);
const isFormValid = ref(false);
const isUpdating = ref(false);
const isDeleting = ref(false);
const isCheckingSlug = ref(false);
const isSlugAvailable = ref(true);
const deleteDialog = ref(false);

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
  if (!workspace.value) return;
  isUpdating.value = true;
  const updatedWorkspace = await updateWorkspace({
    id: workspace.value.id,
    name: name.value,
    slug: slug.value,
    color: color.value,
    icon: icon.value,
  });
  if (workspace.value.slug !== updatedWorkspace.slug) {
    return await navigateTo(`/workspace/${updatedWorkspace.slug}/setting`);
  }
  workspace.value = updatedWorkspace;
  isUpdating.value = false;
}

async function onDelete() {
  if (!workspace.value) return;
  isDeleting.value = true;
  await removeWorkspace(workspace.value.id);
  await navigateTo(`/workspace`);
}
</script>
