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
                        replier.reply("사전 검색 결과\n"+JSON.stringify(naverSearch(data[1])));
                        replier.reply(naverSearch(data[1]));
                }
                if (msg.startsWith("/Eval ")) {
                        msg.slice(6);
                        replier.reply(eval(data[1]));
                }
        } catch(err) { 
                Log.e(err); 
                replier.reply(err); 
        }
};
  
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
  
 naverSearch = (query) => { 
        try { 
                res0 = JSON.parse( 
                        Jsoup.connect("https://openapi.naver.com/v1/search/encyc.json") 
                        .data('query',query)
                        .header('X-Naver-Client-Id',naverId) 
                        .header('X-Naver-Client-Secret',naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get().text()).items.length;
                
                res1 = JSON.parse( 
                        Jsoup.connect("https://openapi.naver.com/v1/search/encyc.json") 
                        .data('query',query)
                        .header('X-Naver-Client-Id',naverId) 
                        .header('X-Naver-Client-Secret',naverPw) 
                        .ignoreContentType(true) 
                        .ignoreHttpErrors(true) 
                        .get().text()).items[0, ...res0];        
                return res1; 
        } catch (err) { 
                Log.e(err); 
                return err;
        } 
 };
