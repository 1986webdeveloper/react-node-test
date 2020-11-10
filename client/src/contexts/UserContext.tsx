import React, { createContext, Dispatch, useReducer, useContext } from 'react';

export type User = {
    name: string,
    token: string
};

export type UsersState = User;

const UsersStateContext = createContext<UsersState | undefined>(undefined);

type Action =
    | { type: 'LOGIN'; data: object }
    | { type: 'REGISTER'; data: any }
    | { type: 'FORGOT'; data: object }
    | { type: 'CLEAR_DATA' }
    | { type: 'RESET'; data: object };

type UsersDispatch = Dispatch<Action>;
const UsersDispatchContext = createContext<UsersDispatch | undefined>(
    undefined
);

function usersReducer(state: UsersState, action: Action): UsersState {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            localStorage.setItem("_u_token_", action.data.token);
            state = action.data;
            return state;
        case 'CLEAR_DATA':
            localStorage.removeItem("_u_token_");
            state = { token: "", name: "" };
            return state;
        case 'FORGOT':
            return state;
        case 'RESET':
            return state;
        default:
            throw new Error('Unhandled action');
    }
}

export function UserContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [user, dispatch] = useReducer(usersReducer, { token: "", name: "" });

    return (
        <UsersDispatchContext.Provider value={dispatch}>
            <UsersStateContext.Provider value={user}>
                {children}
            </UsersStateContext.Provider>
        </UsersDispatchContext.Provider>
    );
}

export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) throw new Error('UsersProvider not found');
    return state;
}

export function useUserDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) throw new Error('UsersProvider not found');
    return dispatch;
}
