export const REDUX_ACTIONS_TYPE = ['PROGRESS_DOWNLOAD_FILES'] as const;

interface Action {
  type: string;
  payload: any;
}

interface State {
  data: any[];
  loading: boolean;
}

const initialSate = {
  data: [],
  loading: false,
};

type ActionsTypesRedux = typeof REDUX_ACTIONS_TYPE[number];

export default (state: State = initialSate, action: Action) => {
  switch (action.type as ActionsTypesRedux) {
    case 'PROGRESS_DOWNLOAD_FILES':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
