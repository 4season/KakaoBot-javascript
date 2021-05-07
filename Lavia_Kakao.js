var listChak = "0";
var arrayTest;
var tagData = [];

//모바일커밋테스트
//카톡봇 기본 이벤트함수
function response(room, msg, sender, isGroupChat, replier) {
try {

//명령어모음
var eList = ["1. /명령어목록","2. /수로확인","3. /캐릭터정보","4. /이벤트목록"];
if (msg == "/명령어목록") {
for (var n = 0; n < eList.length; n++) {
var comText = eList[n];
replier.reply(comText);
}}

//수로일정체크&알림
var timeSet = new Date();
var daySet = timeSet.getDay();
var hourSet = timeSet.getHours();
var minuteSet = timeSet.getMinutes();

if (daySet == "6") {
listChak++;
} else {
listChak = "0";
}
if (hourSet == "21" && minuteSet == "30") {
listChak++;
} else if (listChak == "3" && daySet == "6") {
	var timeSum = 21-hourSet+"시"+60-minuteSet+"분";
replier.reply("Fals, 수로 진행일은 맞지만 진행시간이 아닙니다.");
replier.reply("진행예정 시간:오후10시");
replier.reply("진행예정 시간까지 앞으로 "+timeSum+" 남았습니다.");
}
else {
listChak = "0";
}
if (room == "스카니아 Lavia길드") {
listChak++;
} else {
listChak = "0";
}
if (msg == "/수로확인") {
listChak++;
if (listChak == "4") {
replier.reply("True, 10시 수로 30분전 입니다. 간부분들께서는 진행을 위해 미리 준비해주시고. 노예분들께서는 도핑과 같은것들을 미리 준비해주시기 바랍니다.");
}
else {
replier.reply("Fals, 수로 진행일이 아닙니다.");
}
listChak = "0";
return listChak;
}

//캐릭터정보파싱
var chatData = msg.split(" ");
if (chatData[0] == "/캐릭터정보") {
var result = Utils.parse("https://maplestory.nexon.com/Ranking/World/Dojang/ThisWeek?c="+chatData[1]+"&t=2");
result = result.select("tr.search_com_chk").select("td");

if (result == "") {
    replier.reply('"'+chatData[1]+'"'+" 의 최근 무릉기록이 존재하지 않습니다.");
} else {
var rankName = result.select("td.left").select("dl").select("dt").select("a").text();
var rankWork = result.select("td.left").select("dl").select("dd").text();
var rankDatas = result.not("td.left").not("p").text();
var dataResolve0 = rankDatas.split("Lv.");
var dataResolve1 = dataResolve0[1].split(" ");
var rankIn = result.select("p.ranking_other").text();
var rankDrop = result.select("p.flu").select("span.down").text();
var talkPush = "이름: "+rankName+"\n"+"직업: "+rankWork+"\n"+"기록정보: "+dataResolve1[0]+"레벨, "+dataResolve1[1]+"층, "+dataResolve1[2]+dataResolve1[3]+"\n"
+"현제순위: "+rankIn+"\n"+"순위변동사항: "+rankDrop;
replier.reply(talkPush);
}}

//이벤트목록파싱
if (msg == "/이벤트목록") {
    var result = Utils.parse("https://maplestory.nexon.com/News/Event");
    result = result.select("div.event_board").select("ul").select("li").text();
    replier.reply(result);
}
//addScript
} catch (Err) {
Log.e(Err);
}
}

/*
var arr = [1, 2, 3]; arr[0] = 4; //배열의 0번째 요소에 4 대입. 순서는 0부터 시작 결과 : [4, 2, 3] 
var arr = [1, 2, 3]; arr.push(4); //배열의 가장 뒤에 4 추가 결과 : [1, 2, 3, 4] 
var arr = [1, 2, 3]; arr.unshift(4); //배열의 가장 앞에 4 추가 결과 : [4, 1, 2, 3] 
var arr = [1, 2, 3]; arr.pop(); //배열의 가장 뒤에 있는 요소 삭제 결과 : [1, 2] 
var arr = [1, 2, 3]; arr.shift(4); //배열의 가장 앞에 있는 요소 삭제 결과 : [2, 3] 
var arr = [1, 2, 3, 4, 5]; arr.splice(1, 2); //배열의 1번째 요소부터 2개 요소 삭제 결과 : [1, 4, 5] 
var arr = [1, 2, 3, 4, 5]; arr.splice(1, 0, 6); //배열의 1번째에 6 추가 .splice();에서 0개 지우면 됨 결과 : [1, 6, 2, 3, 4, 5] 
var arr = [1, 2, 3, 4, 5]; arr.indexOf(3); //3이라는 값이 어디에 있는지 가져옴 값이 없으면 -1 반환 결과 : 2
*/