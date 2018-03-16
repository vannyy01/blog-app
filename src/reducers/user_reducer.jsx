import {SET_CURRENT_USER, GET_CURRENT_USER, GET_USER_INFO, UPDATE_USER_INFO} from "../actions";
import isEmpty from 'lodash/isEmpty';
import AuthService from "../client/Auth";

const Auth = new AuthService();
const initialState = {};

export function UserReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO:
            const data = action.payload.data;
            const newData = [];
            let name = '';
            _.map(data, ((item, i) => {
                    if (i === 'name') name = "ім'я";
                    else if (i === 'email') name = "електронна пошта";
                    else if (i === 'male') name = "стать";
                    else if (i === 'birth') name = "дата народження";
                    else if (i === 'favour_desc') name = "Коротко про себе";
                    newData.push({
                        key: i,
                        row: _.capitalize(name),
                        value: item,
                    })
                }
            ));
            const info = newData[3]["value"];
            const avatar = newData[3]["value"]["avatar"];
            delete newData[3]["value"]["avatar"];
            newData.pop();
            _.map(info, (item, i) => {
                if (i === 'name') name = "ім'я";
                else if (i === 'email') name = "електронна пошта";
                else if (i === 'male') name = "стать";
                else if (i === 'birth') name = "дата народження";
                else if (i === 'favour_desc') name = "Коротко про себе";

                newData.push({
                    key: i,
                    row: _.capitalize(name),
                    value: item
                })
            });
            newData.shift();
            return {data: newData , avatar: avatar};
        case UPDATE_USER_INFO:
            alert(action.payload.data);
        default:
            return state;
    }
}
