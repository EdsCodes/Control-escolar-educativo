import { createAction, props } from "@ngrx/store";
import { User } from "../../../shared/models/users";

export const setAutenticatedUser = createAction(
    '[Autentication] set autenticated User',
    props <{ payload: User }>()
);

export const unsetAutenticateduser = createAction('[Autentication] unset autenticated user');