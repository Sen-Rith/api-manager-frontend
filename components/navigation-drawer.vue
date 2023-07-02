<template>
  <v-navigation-drawer v-model="navigation" class="pa-4">
    <v-menu v-if="workspace" @update:model-value="resetWorspaceList">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="outlined"
          size="large"
          append-icon="mdi-chevron-down"
          v-bind="props"
          ><template v-slot:prepend>
            <v-avatar :color="workspace.color" size="30.86">
              <v-icon size="20" :icon="workspace.icon" color="white"></v-icon>
            </v-avatar>
          </template>
          <template #default
            ><div class="text-body-1 text-truncate" style="max-width: 120px">
              {{ workspace.name }}
            </div></template
          >
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <v-btn
            block
            color="primary"
            variant="outlined"
            append-icon="mdi-cog"
            @click="onWorkspaceSettingClick"
          >
            Workspace Setting
          </v-btn>
          <v-divider class="my-3" />
          <v-btn
            block
            color="primary"
            variant="outlined"
            append-icon="mdi-plus"
            @click="onNewWorkspaceClick"
          >
            New workspace
          </v-btn>
          <v-divider class="mt-3" />
          <v-list-subheader>Other workspaces</v-list-subheader>
          <v-divider class="mt-1" />
          <v-infinite-scroll
            :height="300"
            :items="workspaces"
            :onLoad="loadWorkspaceList"
            color="primary"
          >
            <template v-for="workspace in workspaces" :key="workspace">
              <v-list-item @click="onWorkspaceClick(workspace)">
                <template v-slot:prepend>
                  <v-avatar :color="workspace.color" size="30.86">
                    <v-icon
                      size="22"
                      :icon="workspace.icon"
                      color="white"
                    ></v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title
                  class="text-truncate"
                  style="max-width: 162.7px"
                  v-text="workspace.name"
                ></v-list-item-title>
              </v-list-item>
            </template>
          </v-infinite-scroll>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { Workspace } from "~/generated/graphql";

const navigation = useNavigation();
const { workspace, unSubscribeToWorkspace } = useWorkspace();
const { workspaceList, getWorkspaceList, getMoreWorkspaces } =
  useWorkspaceList();

const workspaces = computed(() => workspaceList.value?.workspaces ?? []);

function resetWorspaceList() {
  workspaceList.value = undefined;
}

async function onNewWorkspaceClick() {
  return await navigateTo("/new-workspace");
}

async function onWorkspaceSettingClick() {
  return await navigateTo(`/workspace/${workspace.value?.slug}/setting`);
}

async function onWorkspaceClick(workspace: Workspace) {
  return await navigateTo(`/workspace/${workspace.slug}`);
}

async function loadWorkspaceList({
  done,
}: {
  done: (status: "ok" | "empty" | "loading" | "error") => void;
}) {
  if (!workspaceList.value) {
    const newWorkspaceList = await getWorkspaceList();
    workspaceList.value = newWorkspaceList;
  } else if (workspaceList.value.hasMore) {
    const newWorkspaceList = await getMoreWorkspaces();
    workspaceList.value = {
      ...newWorkspaceList,
      workspaces: [
        ...(workspaceList.value?.workspaces ?? []),
        ...newWorkspaceList.workspaces,
      ],
    };
  }

  if (workspaceList.value.hasMore) {
    done("ok");
  } else {
    done("empty");
  }
}
</script>

<style scoped lang="scss">
.v-list-item__prepend {
  text-align: center;
}
</style>
