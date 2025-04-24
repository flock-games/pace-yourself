export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
});
