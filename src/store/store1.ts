import { atom } from "recoil";

const loadStateFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    const savedData = localStorage.getItem(key);
    if (savedData === null) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
    return JSON.parse(savedData);
};

const saveStateToLocalStorage = <T>(key: string, state: T): void => {
    localStorage.setItem(key, JSON.stringify(state));
};

export interface Transactions {
    type: string;
    category: string;
    date: Date | null;
    amount: string;
    description: string;
}

export interface User {
    username: string;
    name: string;
    password: string;
    transactions: Transactions[];
}

export interface UserArray {
    users: User[]
}

export const user = atom<User>({
    key: "user",
    default: loadStateFromLocalStorage<User>("storedUser", {
        username: "",
        name: "",
        password: "",
        transactions: []
    }),
    effects: [
        ({ onSet }) => {
            onSet(newValue => {
                saveStateToLocalStorage("storedUser", newValue);
            });
        }
    ]
});

export const boolUser = atom({
    key: "boolUser",
    default: false
});