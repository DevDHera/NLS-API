import { MailerOptions } from '@nestjs-modules/mailer';
import * as config from 'config';

const smtpConfig = config.get('smtp');

export const smtpMailerConfig: MailerOptions = {
  transport: {
    host: process.env.SMTP_HOST || smtpConfig.host,
    port: process.env.SMTP_PORT || smtpConfig.port,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL || smtpConfig.email,
      pass: process.env.SMTP_PASSWORD || smtpConfig.password,
    },
  },
  defaults: {
    from: `"${process.env.SMTP_FROM_NAME || smtpConfig.from.name}" <${
      process.env.SMTP_FROM_EMAIL || smtpConfig.from.email
    }>`,
  },
};
