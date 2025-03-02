class SupabaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default SupabaseError;
