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
const naverId = `${'YOUR KEY'}`;
const naverPw = `${'YOUR KEY'}`;
const kakaoRes = `${'YOUR KEY'}`;
const imageBb = `${'YOUR KEY'}`;

let securityBox = new Array();
let securityName = (['YOUR NAME']);

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
                                msgsData = msgS.split("|");
                                korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
                                if (korean.test(msgsData[0]) == true) {
                                        translate0 = naverPapago(msgsData[0]);
                                        translate1 = naverPapago(msgsData[1]);
                                        replier.reply("이미지를 생성중입니다...\n잠시만 기다려주세요. (약 ±15초)\n한국어도 가능합니다. 하지만 번역이므로 가능한 영어를 입력해 주세요.\n\n"+"키워드: "+translate0+"\n\n제거키워드: "+translate1);
                                        replier.reply(kakaoKarlo(translate0, translate1));
                                        
                                } else {
                                        replier.reply("이미지를 생성중입니다...\n잠시만 기다려주세요. (약 ±15초)\n한국어도 가능합니다. 하지만 번역이므로 가능한 영어를 입력해 주세요.\n\n"+"키워드: "+msgsData[0]+"\n\n제거키워드: "+msgsData[1]);
                                        replier.reply(kakaoKarlo(msgsData[0], msgsData[1]));
                                }
                        } else {
                        replier.reply("잘못된 문장 입니다.\nex) /Karlo A cat whit white fur.ugly face, human\n한국어도 사용가능하지만 번역이므로 가능한 영어 사용을 추천드립니다.\n추가할문장과 제거할 문장은 '.'으로 구분합니다.");
                        }
                }

                if (msg.startsWith("/Papago ")) {
                        if (msg.indexOf('/Papago') != -1) {
                                replier.reply(naverPapago(msg.slice(8)));
                        } else {
                                replier.reply("잘못된 문장 입니다.\nex) /Papago 네이버");
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

                if (msg.startsWith("/명령어")) {
                        replier.reply("1. /링크줄이기 (링크) - 링크를 줄입니다.\n2. /사전 (검색어) (페이지) - 사전검색을 진행합니다.\n3. /Karlo (추가할 키워드)|(제거할 키워드) - AI그림을 그립니다.\n4. /Papago (한국어) - 한국어를 영어로 번역합니다.\n5. /이미지 (키워드) - 키워드에 해당하는 이미지를 검색합니다.\n6. /영상 (키워드) - 키워드에 해당하는 영상을 검색합니다.\n7. /웹검색 (키워드) - 키워드에 해당하는 웹문서를 검색합니다.\n");
                }

                if (msg.startsWith("/Eval ")) {
                        if (msg.indexOf('/Eval') != -1) {
                                if (msg.search(/naverId\;|naverPw\;|kakaoRes\;|securityBox\;|securityName\;/g) != -1 && securityName.indexOf(sender) == -1) {
                                        replier.reply("경고!\n보안접근 발생. "+sender+"님은 접근권한이 없습니다.");
                                        securityBox.push([sender, ' '+msg+'\n']);
                                } else if (securityName.indexOf(sender) != -1) {
                                        replier.reply(eval(msg.slice(6)));
                                } else {
                                        replier.reply(sender+"님은 접근권한이 없습니다.");
                                }
                        }
                }

                if (msg.startsWith("/Security check")) {
                        if (msg.indexOf('/Security check') != -1) {
                                replier.reply(securityBox);
                        }
                }

        } catch (err) { 
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
                "prior_guidance_scale": 5,
                "image_quality": 100,
                "num_inference_steps": 100,
                "guidance_scale": 8.5,
                "scheduler": "decoder_ddpm_v_prediction",
                "width": 400,
                "height": 200,
                "upscale": true,
                "nsfw_checker": false,
                "return_type": "base64_string"
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
              
        resBb = JSON.parse( 
                Jsoup.connect('https://api.imgbb.com/1/upload')
                .data('key', imageBb)
                .data('image', res)
                .header('Content-Type', 'application/x-www-form-urlencoded')
                .ignoreContentType(true) 
                .ignoreHttpErrors(true)
                .post()
                .text()).data.url_viewer;
                
                sumBb = JSON.stringify(resBb);
                
                result = naverUrl(sumBb);

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
                
                result = JSON.stringify(res);
                resultUrl = naverUrl(result);

                if (strRes === "undefined" && res === undefined) {
                  kakaoVclip(query);
                } else {
                  return resultUrl;
                }

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

naverPapago = (text) => {
        try {
                
                data = "source=ko&target=en&text="+text;
                dataStr = data.toString();
                
                res = JSON.parse(
                        Jsoup.connect("https://openapi.naver.com/v1/papago/n2mt")
                        .requestBody(dataStr)
                        .header('X-Naver-client-Id', naverId)
                        .header('X-Naver-client-Secret', naverPw)
                        .ignoreContentType(true)
                        .ignoreHttpErrors(true)
                        .post()
                        .text()
                ).message.result.translatedText;
                return res;

        } catch (err) {
                Log.e(err);
                return err;
        }
 };