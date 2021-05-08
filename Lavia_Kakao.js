//카톡봇 기본 이벤트함수
function response(room, msg, sender, isGroupChat, replier) {
    try {
        //명령어모음
        var eList = ["1. /명령어목록","2. /수로확인","3. /캐릭터정보","4. /이벤트목록"];
        if (msg == "/명령어목록") {
            for (var n = 0; n < eList.length; n++) {
                var comText = eList[n];
                replier.reply(comText);
            }
        }
        //수로일정체크&알림
        var timeSet = new Date();
        var daySet = timeSet.getDay();
        var hourSet = timeSet.getHours();
        var minuteSet = timeSet.getMinutes();
        var dayList = ["월", "화", "수", "목", "금", "토", "일"];
        var dayMatch = (daySet-1);
        var comText = dayList[dayMatch];
        if (room == "스카니아 Lavia길드" && msg == "/수로확인") {
            if (dayMatch == "5" && hourSet == "21" && minuteSet >= "30") {
                replier.reply("토요일 10시 수로 "+(60-minuteSet)+"분전 입니다.");
                replier.reply("간부분들께서는 진행을 위해 미리 준비해주시고. 노예분들께서는 도핑과 같은것들을 미리 준비해주시기 바랍니다.");
                //함수추가로 기능추가 예정
            } else if (dayMatch == "5" && hourSet > "21") {
                var timeSum = (23-hourSet)+"시간"+(60-minuteSet)+"분";
                replier.reply("수로진행예정 시간으로부터 "+timeSet+" 초과되었습니다.");
            } else if (dayMatch == "5") {
                var timeSum = (21-hourSet)+"시간"+(60-minuteSet)+"분";
                replier.reply("오늘은 "+comText+"요일 이기에 수로 진행일은 맞지만 진행시간이 아닙니다.");
                replier.reply("진행예정 시간까지 앞으로 "+timeSum+" 남았습니다.");
                replier.reply("진행예정 시간: 오후10시");
            } else if (dayMatch <= "4") {
                replier.reply("오늘은 "+comText+"요일 이기에 수로 진행일이 아닙니다.");
                replier.reply("수로는 매주 토요일 오후 10시로 고정이며, "+(6-daySet)+"일 남았습니다.");
            } else {
                replier.reply("오늘은 "+comText+"요일 이기에 수로 진행일이 아닙니다.");
                replier.reply("수로는 매주 토요일 오후 10시로 고정이며, "+dayMatch+"일 남았습니다.");
            }
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
                var talkPush = "이름: "+rankName+"\n"+"직업: "+rankWork+"\n"+"기록정보: "+dataResolve1[0]+"레벨, "+dataResolve1[1]+"층, "+dataResolve1[2]+dataResolve1[3]+"\n"+"현제순위: "+rankIn+"\n"+"순위변동사항: "+rankDrop;
                replier.reply(talkPush);
            }
        }
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