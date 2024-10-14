import { createReducer, on } from "@ngrx/store";
import { User } from "../../../shared/models/users";
import { setAutenticatedUser, unsetAutenticateduser } from "./autentication.actions";

export const autenticatedFeatureName = 'auth';

export interface AutenticatedState {
    autenticatedUser: User | null;
}

const inicialState: AutenticatedState = {
    autenticatedUser: null,
}

export const autenticatedReducer = createReducer(
    inicialState,
    on(setAutenticatedUser, (state, action) => {
        return {
            ...state,
            autenticatedUser: action.payload,
        };
    }),
    on(unsetAutenticateduser, () => inicialState)
);