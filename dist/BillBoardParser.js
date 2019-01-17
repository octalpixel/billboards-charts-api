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
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_html_parser_1 = require("node-html-parser");
class BillBoardParser {
    constructor() {
        this.CHART_URL = 'https://www.billboard.com/charts';
    }
    getHTML(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let headers = {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                };
                let requestOptions = {
                    method: 'GET',
                    headers
                };
                let htmlData = yield node_fetch_1.default(url, requestOptions);
                if (htmlData != null || htmlData != undefined) {
                    let content = yield htmlData.text();
                    return content;
                }
                return "";
            }
            catch (error) {
                console.log(error);
                return "";
            }
        });
    }
    parseCharts() {
        return __awaiter(this, void 0, void 0, function* () {
            let chartHTML = yield this.getHTML(this.CHART_URL);
            let charts = [];
            if (chartHTML == "") {
                // There isnt anything to show
                // return charts
            }
            let parsedHTML = node_html_parser_1.parse(chartHTML);
            let summa = parsedHTML.childNodes[0].childNodes.filter(x => {
                if ((x.nodeType == 1 && x.tagName == "body")) {
                    return x.toString();
                }
            });
            return summa;
            // console.log(JSON.stringify(parsedHTML, null, 2));
            // Parse hero title
            // parse normal blocks
            // return charts;
        });
    }
    parseChartList(url) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new BillBoardParser();
