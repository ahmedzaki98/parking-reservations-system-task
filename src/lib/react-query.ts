import type { DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    retry: false,
    staleTime: 1000, // 1 second
  },
} satisfies DefaultOptions;
