import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: 'mysql://usuario:senha@localhost:3306/nome_do_banco',
  },
});
