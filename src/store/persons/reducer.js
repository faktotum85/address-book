import * as actionTypes from '../actionTypes';

const initialState = {
    config: {
        firstName: {
            label: 'First name',
            type: 'text',
            required: true
        },
        lastName: {
            label: 'Last name',
            type: 'text',
            required: true
        },
        address: {
            label: 'Address',
            type: 'text',
            required: true
        },
        zipcode: {
            label: 'Zip code',
            type: 'text',
            required: true
        },
        city: {
            label: 'City',
            type: 'text',
            required: true
        }
    },
    persons: [],
    person: {},
    loading: false,
    error: null,
    pagination_first: null,
    pagination_prev: null,
    pagination_next: null,
    pagination_last: null,
    pagination_count: null,
    pagination_start: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PERSONS:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FETCH_PERSONS_RESPONSE:
            return {
                ...state,
                loading: false,
                error: null,
                persons: action.data.results,
                pagination_first: action.data._links.first,
                pagination_prev: action.data._links.prev,
                pagination_next: action.data._links.next,
                pagination_last: action.data._links.last,
                pagination_count: action.data.count,
                pagination_start: action.data.start
            }
        case actionTypes.FETCH_PERSONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_PERSON:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FETCH_PERSON_RESPONSE:
            return {
                ...state,
                loading: false,
                error: null,
                person: action.data
            }
        case actionTypes.FETCH_PERSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.CLEAR_PERSON:
            return {
                ...state,
                person: {}
            }
        case actionTypes.CHANGE_PERSON_PROPERTY:
            return {
                ...state,
                person: {
                    ...state.person,
                    [action.name]: action.value
                }
            }
        case actionTypes.SAVE_PERSON:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.SAVE_PERSON_RESPONSE:
            return {
                ...state, 
                loading: false,
                error: null
            };
        case actionTypes.SAVE_PERSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.DELETE_PERSON: 
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.DELETE_PERSON_RESPONSE:
            return {
                ...state,
                loading: false,
                error: null
            }
        case actionTypes.DELETE_PERSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export default reducer;