

import fetch from 'node-fetch';
import { parse as htmlParser } from 'node-html-parser';
import { IBBCharts } from './interfaces/IBBCharts';



class BillBoardParser {



    private CHART_URL = 'https://www.billboard.com/charts'

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


    async parseCharts() {


        let chartHTML = await this.getHTML(this.CHART_URL);

        let charts: IBBCharts[] = []

        if (chartHTML == "") {
            // There isnt anything to show
            // return charts
        }


        let parsedHTML = htmlParser(chartHTML)


        let summa = parsedHTML.childNodes[0].childNodes.filter(x => {
            if ((x.nodeType == 1 && x.tagName == "body")) {

                return x.toString()
            }

        })


        return summa
        // console.log(JSON.stringify(parsedHTML, null, 2));


        // Parse hero title

        // parse normal blocks


        // return charts;


    }


    async parseChartList(url: string) { }


}


export default new BillBoardParser();