import { Loader } from '@mantine/core';

export default function LoadingIndicator() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Ladataan"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        width: '100%',
      }}
    >
      <Loader color="#c4a29e" />
    </div>
  );
}
