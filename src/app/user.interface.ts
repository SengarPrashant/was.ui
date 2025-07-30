export interface UserInterface{
    email: string;
    usernames: string;
}

export interface MenuInterface{
    label: string;
    icon?: string;
    route?:string;
    type?:string;
    children?:MenuInterface[]
    roles?:string[]
}