const scriptName = "Junho_Bot2"; 
 /** 
  * (string) room 
  * (string) sender 
  * (boolean) isGroupChat 
  * (void) replier.reply(message) 
  * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환 
  * (string) imageDB.getProfileBase64() 
  * (string) packageName 
  */ 
 const Jsoup = org.jsoup.Jsoup; 
  
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) { 
        try {  
                var data = msg.split(" "); 
                if (data[0] == "/링크줄이기") { 
                        replier.reply("줄여진 링크 : "+naverUrl(data[1])); 
                }
                if (msg.startsWith("/사전 ")) {
                        msg.slice(4);
                        //replier.reply("사전 검색 결과\n"+JSON.stringify(naverSearch(data[1], data[2])));
                        replier.reply(naverSearch(data[1], data[2]));
                }
                if (msg.startsWith("/Eval ")) {
                        msg.slice(6);
                        replier.reply(eval(data[1]));
                }
        } catch(err) { 
                Log.e(err); 
                replier.reply(err); 
        }
}

 naverUrl = (query) => { 
        try { 
                res = JSON.parse( 
                        Jsoup.connect("https://openapi.naver.com/v1/util/shorturl") 
                        .data('url',query) 
                        .header('X-Naver-Client-Id', naverId) 
                        .header('X-Naver-Client-Secret', naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get() 
                        .text()).result.url; 
                return res; 
        } catch (err) { 
                Log.e(err); 
                return err;
        } 
 }; 

  naverSearch = (query, num) => { 
        try { 
                links = "https://openapi.naver.com/v1/search/encyc.json";
                res0 = JSON.parse( 
                        Jsoup.connect(links) 
                        .data('query',query)
                        .header('X-Naver-Client-Id',naverId) 
                        .header('X-Naver-Client-Secret',naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get().text()).items.length;

                res1 = JSON.parse( 
                        Jsoup.connect(links) 
                        .data('query',query)
                        .header('X-Naver-Client-Id',naverId) 
                        .header('X-Naver-Client-Secret',naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get().text()).items[num].title;
                                
                res2 = JSON.parse( 
                        Jsoup.connect(links) 
                        .data('query',query)
                        .header('X-Naver-Client-Id',naverId) 
                        .header('X-Naver-Client-Secret',naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get().text()).items[num].link;

                res3 = JSON.parse( 
                        Jsoup.connect(links) 
                        .data('query',query)
                        .header('X-Naver-Client-Id',naverId) 
                        .header('X-Naver-Client-Secret',naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get().text()).items[num].description;

                res4 = JSON.parse( 
                        Jsoup.connect(links) 
                        .data('query',query)
                        .header('X-Naver-Client-Id',naverId) 
                        .header('X-Naver-Client-Secret',naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get().text()).items[num].thumbnail;

                        var Response = num+" / "+res0+" 페이지\n"+"검색결과 : "+newR1+"\n"+"링크 : "+newR2+"\n"+"내용 : "+newR3+"\n"+"미리보기 : "+newR4;
                        //var ResNum = JSON.stringify(Response).length;
                        var newR1 = JSON.stringify(res1).replace("</b>","");
                        var newR2 = JSON.stringify(res2).replace("</b>","");
                        var newR3 = JSON.stringify(res3).replace("</b>","");
                        var newR4 = JSON.stringify(res4).replace("</b>","");
                        Result = Response.replace("</b>","");
                return Result;
        } catch (err) { 
                Log.e(err); 
                return err;
        } 
 };