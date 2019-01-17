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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio = __importStar(require("cheerio"));
class BillBoardParser {
    constructor() {
        this.BB_BASE_URL = 'https://www.billboard.com';
        this.CHART_URL = `${this.BB_BASE_URL}/charts`;
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
    parseChartTitle(parentElement) {
        return parentElement.find('.charts-grid__title').text().trim();
    }
    parseChartLink(parentElement) {
        return parentElement.attr('href').trim();
    }
    parseChartImage(parentElement) {
        return parentElement.find('.charts-grid__image').attr('src');
    }
    parseCharts() {
        return __awaiter(this, void 0, void 0, function* () {
            let chartHTML = yield this.getHTML(this.CHART_URL);
            let charts = [];
            if (chartHTML == "") {
                // There isnt anything to show
                // return charts
            }
            let $ = cheerio.load(chartHTML);
            let chartlisting = [];
            // need to parse, the first stuff
            $('.charts-grid').children('.charts-grid__block-wrapper').map((i, item) => {
                let dataElement = $(item).find('a');
                let link = `${this.BB_BASE_URL}${this.parseChartLink(dataElement)}`;
                let title = this.parseChartTitle(dataElement);
                let img = this.parseChartImage(dataElement);
                let chart = { title, link, img };
                chartlisting = [...chartlisting, chart];
            });
            return chartlisting;
            // console.log(JSON.stringify(parsedHTML, null, 2));
            // Parse hero title
            // parse normal blocks
            // return charts;
        });
    }
    parseChartList(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let chartListingHTML = yield this.getHTML(url);
            // return chartListingHTML;
            // the first one
            //get the llist
            const $ = cheerio.load(chartListingHTML);
            let chartTitleListing = [];
            // There are few edges cases here: considers
            let rankOneElement = $('.chart-number-one');
            let rankOneListing = {
                title: rankOneElement.find('.chart-number-one__info  .chart-number-one__title').text().trim(),
                artist: rankOneElement.find('.chart-number-one__info .chart-number-one__artist').text().trim(),
                thumbnail: JSON.parse(rankOneElement.find('.chart-video__wrapper').attr('data-brightcove-data'))['video_image'],
                rank: "1"
            };
            chartTitleListing.push(rankOneListing);
            $('.chart-details .chart-list').children('.chart-list-item').map((i, item) => {
                let dataElement = $(item);
                let rank = dataElement.find('.chart-list-item__rank').text();
                let title = dataElement.find('.chart-list-item__title-text').text();
                let artist = dataElement.find('.chart-list-item__artist').text();
                let thumbnail = dataElement.find('.chart-list-item__image-wrapper img.chart-list-item__image').attr('data-src');
                let listing = { title, artist, thumbnail, rank };
                chartTitleListing = [...chartTitleListing, listing];
            });
            return chartTitleListing;
        });
    }
}
exports.default = new BillBoardParser();
