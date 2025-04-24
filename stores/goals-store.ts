import type { Database } from "~/database.types";

export const useGoalsStore = defineStore("goals", () => {
  const time = useTimeUtils();

  const goals = ref<Database["public"]["Tables"]["goals"]["Row"][]>([]);

  const create = async (event: string, goalString: string) => {
    const newGoal = await $fetch(`/api/goal/create`, {
      method: "POST",
      body: {
        event: event,
        goal: time.minutesStringToSeconds(goalString),
      },
    });
    if (!newGoal) {
      console.error("No new goal returned from API");
      return;
    }
    goals.value.push(newGoal);
  };

  const fetch = async () => {
    const data = await $fetch("/api/goal/list");
    if (!data) {
      console.error("No data returned from API");
      return;
    }
    goals.value = data;
  };

  return {
    create,
    fetch,
    goals,
  };
});
