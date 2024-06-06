import store from '@/state/store';
import publicRouter from './public';
import authRouter from './auth';
import appRouter from './app';

export default [
    ...authRouter,
    ...appRouter,
    ...publicRouter,
];
