<script lang="ts" setup>
const time = useTimeUtils();

type ActivityDisplay = {
  start_date_local: string;
  name: string;
  distance: string;
  moving_time: string;
};

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
});

const { data } = await useFetch<ActivityDisplay[]>(
  `/api/strava/activities/list?token=${props.token}`
);
if (!data.value) {
  console.error("No data returned from API");
}
console.log(data);

const tableData = computed(() => {
  return data.value?.map((activity) => {
    const kms = parseFloat(activity.distance) / 1000;
    const seconds = parseInt(activity.moving_time);
    return {
      date: activity.start_date_local,
      name: activity.name,
      distance: `${kms.toFixed(2)} km`,
      time: time.displayTime(seconds),
      "5k Pace": time.displayTime(
        (5 * seconds) / (kms || 1) // Avoid division by zero
      ),
      "10k Pace": time.displayTime(
        (10 * seconds) / (kms || 1) // Avoid division by zero
      ),
      "Half Marathon Pace": time.displayTime(
        (0.5 * time.MILES_PER_MARATHON * seconds) /
          (kms / time.KILOMETERS_PER_MILE || 1) // Avoid division by zero
      ),
      "Marathon Pace": time.displayTime(
        (time.MILES_PER_MARATHON * seconds) /
          (kms / time.KILOMETERS_PER_MILE || 1) // Avoid division by zero
      ),
    };
  });
});
</script>

<template>
  <UTable :data="tableData" class="flex-1" />
</template>
