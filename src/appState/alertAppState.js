import { atom } from "recoil";
import { AlertTypeEnum } from "../enums/alertTypeEnum";

export const AlertAppState = atom({
    key: 'AlertAppState',
    default: { message: '', type: AlertTypeEnum.success, open: false },
});