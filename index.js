/**
 * Created by luoming on 2018/5/3
 */
const http = require('http');
const cheerio = require('cheerio');
const request = require('request');
const getHtml =(url)=> {
    // if (ipac >= iplist.length){
    //     return console.log('page:'+ppp+'all died');
    // }
    //设置代理
    let proxy = {
        url: url,
        // proxy: 'http://61.135.217.7:80',
        timeout: 4000,
        headers: {
            'Host': 'sou.zhaopin.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
        }
    }
    return new Promise(function(resolve,reject){
        request(proxy, function (err, res, body) {
            if (err) {
                reject(url)//继续请求当前页
            } else {
                resolve(body, url)
            }
        })
    })
}
const {query}=require('./util/db');
const url = 'http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%B9%BF%E5%B7%9E&kw=web%E5%89%8D%E7%AB%AF&p=1&isadv=0';

const getInfo=(html)=>{
    let res = [];
    let $ = cheerio.load(html,{decodeEntities: false});
    // if($('title').text().indexOf('招聘') === -1) {    //根据title判断是否被重定向
    //     //console.log('删除假代理:'+ iplist[noww[2]] + $('title').text());
    //     //iplist.splice(noww[2],1);
    //     return lhlh(noww[0],noww[1],noww[2]+1);
    // }
    $('.newlist').each(function(item){
        let zwmc = $(this).find('.zwmc').find('div').text().replace(/\s+/g,"").replace(/\n/g,'');
        let gsmc = $(this).find('.gsmc').find('a').eq(0).text().replace(/\s+/g,"").replace(/\n/g,'');
        let zwyx = $(this).find('.zwyx').text().replace(/\s+/g,"").replace(/\n/g,'');
        let gzdd = $(this).find('.gzdd').text().replace(/\s+/g,"").replace(/\n/g,'');
        let gxsj = $(this).find('.gxsj').find('span').text().replace(/\s+/g,"").replace(/\n/g,'');
        let detailTwo = $(this).find('.newlist_deatil_two').html();
        let detailsLast = $(this).find('.newlist_deatil_last').html();
        let details=detailTwo+detailsLast;
        res.push({
            zwmc,
            gsmc,
            zwyx,
            gzdd,
            gxsj,
            details
        })
        console.log(detailTwo+detailsLast);
        query(`insert into jobs (zwmc,gsmc, zwyx,gzdd,gxsj,details) values ('${zwmc}','${gsmc}','${zwyx}','${gzdd}','${gxsj}','${details}')`)
    })
    res.shift();
}

getHtml(url).then((html)=>{
    console.log(html);
    getInfo(html);
})