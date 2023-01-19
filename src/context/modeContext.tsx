import React, { createContext } from "react";
import { MODE } from "../utils/constants/enums";

export default createContext<MODE>(MODE.DARK);
