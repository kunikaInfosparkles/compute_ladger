import { MyGroup, Sheets } from "../pages";
import Ledger from "../pages/ledger";


export const RoutesArray = [
  { path: "/my-group", element: <MyGroup /> },
  { path: "/sheets", element: <Sheets /> },
  { path: "/ledger", element: <Ledger /> },
];


