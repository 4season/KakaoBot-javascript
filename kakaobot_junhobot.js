const scriptName = "Junho_Bot2"; 
 /** 
  * (string) room 
  * (string) sender 
  * (boolean) isGroupChat 
  * (void) replier.reply(message) 
  * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환 
  * (string) imageDB.getProfileBase64() 
  * (string) packageName 
  
해야 할 일
1. 에러 뜨면 재검색 돌리기 -> 반정도 성공
2. 다음카페 뜨면 재검색 돌리기 -> 성공
3. 음식추천 db짜기 & 기능 만들기 -> 진행중
4. 음식추천 사용가 추가하는 기능 만들기 -> 예정
  
  */ 
const Jsoup = org.jsoup.Jsoup; 
  
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) { 
        try {  
          var data = msg.split(" ");
                if (msg.startsWith("/링크줄이기 ")) { 
                        replier.reply("줄여진 링크 : "+naverUrl(msg.slice(7))); 
                }
                if (msg.startsWith("/사전 ")) {
                        if (data[2] >= 0 && data[2] < 11) {
                                replier.reply(naverSearch(data[1], data[2]));
                        } else {
                                replier.reply("잘못된 페이지 입니다.\nex) /사전 네이버 0");
                        }
                }  
                if (msg.startsWith("/Karlo ")) {
                        if (msg.indexOf('/Karlo') != -1) {
                                msgS = msg.slice(7);
                                msgsData = msgS.split(".");
                                replier.reply(kakaoKarlo(msgsData[0], msgsData[1]));
                        } else {
                        replier.reply("잘못된 문장 입니다.\nex) /Karlo .A cat whit white fur.ugly face, human\n영어만 사용 가능하며, 추가할문장과 제거할 문장은 '.'으로 구분합니다.");
                        }
                }

                if (msg.startsWith("/이미지 ")) {
                        if (msg.indexOf('/이미지') != -1) {
                                replier.reply(kakaoImege(msg.slice(5)));
                        } else {
                        replier.reply("잘못된 이미지 검색 입니다.\nex) /이미지 카카오");
                        }
                }
                if (msg.startsWith("/영상 ")) {
                        if (msg.indexOf('/영상') != -1) {
                                replier.reply(kakaoVclip(msg.slice(4)));
                        } else {
                        replier.reply("잘못된 영상 검색 입니다.\nex) /영상 카카오");
                        }
                }

                if (msg.startsWith("/웹검색 ")) {
                        if (msg.indexOf('/웹검색') != -1) {
                            replier.reply(naverWebs(msg.slice(5)));
                        } else {
                              replier.reply("잘못된 검색 입니다.\nex) /웹검색 네이버");        
                        }
                }

                if (msg.startsWith("/Eval ")) {
                        replier.reply(eval(msg.slice(6)));
                        if (msg.search(/g\//)) {

                        }
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

kakaoKarlo = (prompt, negative_prompt) => {
        try {

        Links = "https://api.kakaobrain.com/v2/inference/karlo/t2i";
        jsons = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "prior_num_inference_steps": 100,
                "prior_guidance_scale": 5.5,
                "image_quality": 100,
                "num_inference_steps": 100,
                "guidance_scale": 12.5,
                "scheduler": "decoder_ddim_v_prediction",
                "upscale": true,
                "nsfw_checker": false
        };
        promptJson = JSON.stringify(jsons);

        res = JSON.parse( 
                Jsoup.connect(Links)
                .requestBody(promptJson)
                .header('Authorization', 'KakaoAK '+kakaoRes)
                .header('Content-Type', 'application/json')
                .ignoreContentType(true) 
                .ignoreHttpErrors(true)
                .post()
                .text()).images[0].image;

                sum = JSON.stringify(res);
                result = naverUrl(sum)+"\n\n"+promptJson;
                
                return result;
        } catch (err) {
                Log.e(err);
                return err;
        }
 };

kakaoImege = (query) => {
        try {
          
        Links = "https://dapi.kakao.com/v2/search/image";

        let Ran = Math.floor(Math.random()*(80-1)+1);
        
        res = JSON.parse(
                Jsoup.connect(Links)
                .data('query', query) 
                .data('sort', 'accuracy')
                .header('Authorization', 'KakaoAK '+kakaoRes)
                .ignoreContentType(true) 
                .ignoreHttpErrors(true) 
                .get() 
                .text()).documents[Ran].doc_url;
              
                strRes = JSON.stringify(res);
                
                if (strRes.search(/cafe.daum.net/g) != -1) {
                  kakaoImege(query);
                }
                
                resultUrl = naverUrl(strRes);
                
                if (strRes === "undefined" && res === undefined) {
                  kakaoImege(query);
                } else {
                  return resultUrl;
                }
                
            } catch (err) {
                Log.e(err);
                //return err;
        }
 };

kakaoVclip = (query) => {
        try {

        Ran = Math.floor(Math.random()*(50-1)+1);

        res = JSON.parse( 
                Jsoup.connect("https://dapi.kakao.com/v2/search/vclip") 
                .data('query',query) 
                .data('sort', 'accuracy')
                .header('Authorization', 'KakaoAK '+kakaoRes)
                .ignoreContentType(true) 
                .ignoreHttpErrors(true) 
                .get() 
                .text()).documents[Ran].url;
                
                while (res == 'undefined') {
                  kakaoVclip(query);
                }

                result = JSON.stringify(res);
                resultUrl = naverUrl(result);

                return resultUrl;
        } catch (err) {
                Log.e(err);
                return err;
        }
 };

naverWebs = (query) => {
        try {
          res = JSON.parse( 
                Jsoup.connect("https://openapi.naver.com/v1/search/webkr.json") 
                .data('query',query) 
                .header('X-Naver-Client-Id', naverId) 
                .header('X-Naver-Client-Secret', naverPw) 
                .ignoreContentType(true) 
                .ignoreHttpErrors(true) 
                .get() 
                .text()).items;
                 return res;

        } catch (err) {
                Log.e(err);
                return err;
        }
 };