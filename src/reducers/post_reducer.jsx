import {FETCH_POSTS} from "../actions";
import {FETCH_POST} from "../actions";
import _ from 'lodash';

const sortByRait = (object, field) => {
    if (typeof field === 'string' && typeof object === 'object') {
        let keys = Object.keys(object);
        keys.map(
            (key, index) => {
                keys[index] = parseInt(key);
            }
        );
        for (let i = 0; i = keys.length - 1; --i) {
            if (keys.indexOf(i)) {
                let key = keys[i];

                if (object[key - 1][field] < object[key][field]) {
                    let val = object[j + 1];
                    object[j + 1] = object[j];
                    object[j] = val;
                }
            }

        }
        /**
         keys.forEach(
         (key) => {
                if(object[key][field] < object[key+1][field]){
                    let val = object[key+1];
                    object[key+1] = object[key];
                    object[key] = val;
                }
            }
         );**/
        return object;
    } else {
        throw new DOMException('parameter field must be string value and object must be object')
    }
};

export function PostReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload.data;
        case FETCH_POST:
            const data = action.payload.data[0];
            return {data};
        default:
            return state;
    }
}
