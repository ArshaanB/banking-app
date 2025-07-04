import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**'],
    // Clear mock state between tests
    clearMocks: true,
    // Restore mock state between tests
    restoreMocks: true
  }
});
