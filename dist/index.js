"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BillBoardParser_1 = __importDefault(require("./BillBoardParser"));
const express_1 = __importDefault(require("express"));
// const run = async () => {
//     // let content = await bbParser.getHTML('https://www.billboard.com/charts')
//     let content = await bbParser.parseCharts()
//     // console.log(content);
// }
// run();
const app = express_1.default();
app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let content = yield BillBoardParser_1.default.parseCharts();
    // console.log(content);
    return res.json(content);
}));
app.get('/listing', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let link = 'https://www.billboard.com/charts/latin-songs';
    let content = yield BillBoardParser_1.default.parseChartList(link);
    // console.log(content);
    return res.json(content);
}));
app.listen(3030, () => {
    console.log(`Listening to server on port 3030`);
});
