"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const { app, build } = app_1.default;
build();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port number ${port}`);
});
//# sourceMappingURL=server.js.map