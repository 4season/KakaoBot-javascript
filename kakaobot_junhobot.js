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
          let data = msg.split(" ");
                if (msg.startsWith("/링크줄이기 ")) { 
                        replier.reply("줄여진 링크 : "+naverUrl(msg.slice(7))); 
                }
                if (msg.startsWith("/사전 ")) {
                        if (0 <= data[2] <= Res0) {
                                replier.reply(naverSearch(data[1], data[2]));
                        } 
                } else  {
                        replier.reply("잘못된 페이지 입니다.\nex) /사전 네이버 0");
                }
                if (msg.startsWith("/Eval ")) {
                        replier.reply(eval(msg.slice(6)));
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

                        
                        let Response = num+" / "+res0+" 페이지\n"+"검색결과 : "+res1+"\n"+"링크 : "+res2+"\n"+"내용 : "+res3+"\n"+"미리보기 : "+res4;

                        if (Response.search(/<\/b>/g) != -1) {
                                Result = Response.replace(/<\/b>/g,"");
                                return Result;
                        }
        } catch (err) { 
                Log.e(err); 
                return err;
        } 
 };