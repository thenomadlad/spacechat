import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

import { writable } from 'svelte/store';

// Database
export const db = GUN();

// Gun User and store
export const username = writable('');
export const user = db.user().recall({ sessionStorage: true });
user.get('alias').on(v => username.set(v));

// @ts-ignore: not sure why but the types for gun aren't quite getting recognized correctly here
db.on('auth', async () => {
    const alias: string = await user.get('alias') + '';
    username.set(alias);
});