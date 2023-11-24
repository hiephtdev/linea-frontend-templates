type AsyncFunction<T extends any[], U> = (...args: T) => Promise<U>;

export function useAsync<T extends any[], U>(
  asyncFunction: AsyncFunction<T, U>
) {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);
  const result: Ref<U | null> = ref(null);

  async function execute(...args: T): Promise<U | void> {
    loading.value = true;
    error.value = null;
    try {
      const response = await asyncFunction(...args);
      result.value = response;
      return response;
    } catch (e) {
      error.value =
        e instanceof Error ? e : new Error("An unexpected error occurred.");
    } finally {
      loading.value = false;
    }
  }

  return {
    result,
    loading,
    error,
    execute,
  };
}
