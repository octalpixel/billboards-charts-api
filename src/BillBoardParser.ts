

import fetch from 'node-fetch';
import * as cheerio from 'cheerio'
import { parse, stringify } from 'flatted';
import { IBBCharts, IChartListing } from './interfaces/IBBCharts';



class BillBoardParser {



    private BB_BASE_URL = 'https://www.billboard.com'
    private CHART_URL = `${this.BB_BASE_URL}/charts`

    constructor() { }


    async getHTML(url: string) {


        try {

            let headers = {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
            }

            let requestOptions = {
                method: 'GET',
                headers
            }

            let htmlData = await fetch(url, requestOptions)

            if (htmlData != null || htmlData != undefined) {
                let content = await htmlData.text()
                return content;
            }

            return "";
        } catch (error) {
            console.log(error);
            return ""

        }

    }




    private parseChartTitle(parentElement: Cheerio) {

        return parentElement.find('.charts-grid__title').text().trim();

    }
    private parseChartLink(parentElement: Cheerio) {
        return parentElement.attr('href').trim();
    }
    private parseChartImage(parentElement: Cheerio) {
        return parentElement.find('.charts-grid__image').attr('src')
    }

    async parseCharts() {


        let chartHTML = await this.getHTML(this.CHART_URL);

        let charts: IBBCharts[] = []

        if (chartHTML == "") {
            // There isnt anything to show
            // return charts
        }


        let $ = cheerio.load(chartHTML)


        let chartlisting: IBBCharts[] = []


        // need to parse, the first stuff

        $('.charts-grid').children('.charts-grid__block-wrapper').map((i, item) => {

            let dataElement = $(item).find('a')

            let link = `${this.BB_BASE_URL}${this.parseChartLink(dataElement)}`

            let title = this.parseChartTitle(dataElement)

            let img = this.parseChartImage(dataElement)

            let chart = { title, link, img }

            chartlisting = [...chartlisting, chart]

        })



        return chartlisting
        // console.log(JSON.stringify(parsedHTML, null, 2));


        // Parse hero title

        // parse normal blocks


        // return charts;


    }


    async parseChartList(url: string) {

        let chartListingHTML = await this.getHTML(url);

        // return chartListingHTML;

        // the first one


        //get the llist

        const $ = cheerio.load(chartListingHTML);


        let chartTitleListing: IChartListing[] = []



        // There are few edges cases here: considers
        let rankOneElement = $('.chart-number-one')

        let rankOneListing: IChartListing = {
            title: rankOneElement.find('.chart-number-one__info  .chart-number-one__title').text().trim(),
            artist: rankOneElement.find('.chart-number-one__info .chart-number-one__artist').text().trim(),
            thumbnail: JSON.parse(rankOneElement.find('.chart-video__wrapper').attr('data-brightcove-data'))['video_image'],
            rank: "1"

        }


        chartTitleListing.push(rankOneListing)





        $('.chart-details .chart-list').children('.chart-list-item').map((i, item) => {

            let dataElement = $(item)

            let rank = dataElement.find('.chart-list-item__rank').text()

            let title = dataElement.find('.chart-list-item__title-text').text();

            let artist = dataElement.find('.chart-list-item__artist').text();

            let thumbnail = dataElement.find('.chart-list-item__image-wrapper img.chart-list-item__image').attr('data-src')

            let listing: IChartListing = { title, artist, thumbnail, rank }

            chartTitleListing = [...chartTitleListing, listing]

        })


        return chartTitleListing;


    }


}


export default new BillBoardParser();