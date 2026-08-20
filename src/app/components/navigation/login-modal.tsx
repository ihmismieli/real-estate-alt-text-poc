import { signIn } from '@/auth';
import { Button, Stack, Text } from '@mantine/core';

export default function LoginModal() {
  return (
    <Stack gap="md">
      <Text c="dimmed" size="sm">
        Ylläpitonäkymä on tarkoitettu vain ylläpitäjälle.
      </Text>

      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/admin' });
        }}
      >
        <Button type="submit" fullWidth radius="xl" color="#c4a29e">
          Kirjaudu Googlella
        </Button>
      </form>
    </Stack>
  );
}
