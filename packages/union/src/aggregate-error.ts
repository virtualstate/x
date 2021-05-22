export function aggregateError(errors: unknown[]): unknown {
  if (errors.length === 1) {
    return errors[0];
  }
  return new AggregateError(flatten(errors));

  function flatten(errors: unknown[]) {
    return errors.reduce<unknown[]>(
      (flat, error): unknown[] => {
        if (error instanceof AggregateError) {
          return flat.concat(flatten(error.errors));
        } else {
          return flat.concat(error);
        }
      },
      []
    );
  }
}
