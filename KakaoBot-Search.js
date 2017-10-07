function catchMessage(room, sender, message) {
try {
  var deta = message.split(".");

  if(message === "/셔치봇정보") {
    Bot.send(room, "사계절(허준호)가 만든 검색용 카카오봇(v1.1.0)이다.");
    Bot.send(room, "/cl 를 통해서 커맨드를 확인 가능하니 한번 시도해보자.");
    }
  if(message === "/cl") {
    Bot.send(room, "셔치봇 커맨드 리스트 출력.");
    Bot.send(room, "/gs: 구글검색을 합니다. ex)/gs.구글");
    Bot.send(room, "/gi: 구글이미지검색을 합니다. ex)/gi.구글");
    Bot.send(room, "/nw: 나무위키검색을 합니다. ex)/nw.나무위키");
    Bot.send(room, "/hg: 국립국어원링크를 전송합니다. (for 마잼)");
    Bot.send(room, "/bg: 배그전적을 검색합니다. ex)/bg.배그");
    Bot.send(room, "/ow: 옵치전적을 검색합니다. ex)/ow.옵치");
    }
  if(deta[0] === "/gs") {
    Bot.send(room, "구글검색:"+"https://www.google.co.kr/search?q="+deta[1]);
    }
  if(deta[0] === "/gi") {
    Bot.send(room, "구글이미지검색:"+"https://www.google.co.kr/search?hl=ko&tbm=isch&source=hp&ei=cs3YWd3tEIT18QWv5piQBw&q="+deta[1]);
    }
  if(deta[0] === "/nw") {
    Bot.send(room, "나무위키검색:"+"https://namu.wiki/w/"+deta[1]);
    }
  if(deta[0] === "/hg") {
    Bot.send(room, "국립국어원검색링크:http://www.korean.go.kr/front/search/searchAllList.do");
    }
  if(deta[0] ==="/bg") {
    Bot.send(room, sender+"님의 배그전적은"+"https://dak.gg/search?name="+deta[1]+" 입니다.");
    }
  if(deta[0] === "/ow") {
    Bot.send(room, sender+"님의 옵치전적은"+"https://overlog.gg/search?playerName="+deta[1]+" 입니다.");
    }}
  catch(err) {
    Bot.send("[Code Error]" + err);
    }
}
