<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui/runtime/components/Table.vue.js";

type GoalDisplay = {
  event: string;
  goal: string;
  kilometer_pace: string;
  mile_pace: string;
};

const goalStore = useGoalsStore();
const time = useTimeUtils();

await useAsyncData(() => goalStore.fetch());

const tableData = computed(() => {
  if (!goalStore.goals) return [];

  return goalStore.goals.map((goal): GoalDisplay => {
    return {
      event: goal.event ?? "",
      goal: time.displayTime(goal.goal ?? 0),
      kilometer_pace: time.displayTime(
        time.kilometerSeconds(goal.goal ?? 0, goal.event ?? "")
      ),
      mile_pace: time.displayTime(
        time.mileSeconds(goal.goal ?? 0, goal.event ?? "")
      ),
    };
  });
});

const tableColumns: TableColumn<GoalDisplay>[] = [
  {
    accessorKey: "event",
    header: "Event",
  },
  {
    accessorKey: "goal",
    header: "Goal Time",
  },
  {
    accessorKey: "kilometer_pace",
    header: "Kilometer Pace",
  },
  {
    accessorKey: "mile_pace",
    header: "Mile Pace",
  },
];
</script>

<template>
  <UTable :data="tableData" :columns="tableColumns" class="flex-1" />
</template>
