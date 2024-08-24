import { ActionReducerMap } from '@ngrx/store';
import { inscriptionsReducer, State as InscriptionsState, inscriptionsFeatureKey } from '../../features/dashboard/inscriptions/store/inscriptions.reducer';

export const counterFeatureName = 'counter';
export const authFeatureName = 'auth';

export interface RootState {
  [inscriptionsFeatureKey]: InscriptionsState;
}

export const rootReducer: ActionReducerMap<RootState> = {
    [inscriptionsFeatureKey]: inscriptionsReducer,
};