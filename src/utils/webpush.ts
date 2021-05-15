import * as webpush from 'web-push';
import * as config from 'config';

const publicVapidKey =
  process.env.PUBLIC_VAPID_KEY || config.get('vapid.public');
const privateVapidKey =
  process.env.PRIAVTE_VAPID_KEY || config.get('vapid.private');

export default (): void => {
  webpush.setVapidDetails(
    'mailto:noreply@nls.com',
    publicVapidKey,
    privateVapidKey,
  );
};
