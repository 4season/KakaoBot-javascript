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
}} catch(err) {
Log.e(err);
replier.reply(err);
}
}
	
naverUrl = (query) => {
	try {
		res = JSON.parse(
			Jsoup.connect("https://openapi.naver.com/v1/util/shorturl")
			.data('url',query)
			.header('X-Naver-Client-Id','B6aSybGBcrJtMwP719DF')
			.header('X-Naver-Client-Secret','UvLZH2ToRM')
			.ignoreContentType(true)
			.ignoreHttpErrors(true)
			.get()
			.text()).result.url;
		return res;
	} catch (err) {
		Log.e(err);
	}
};

naverSearch = (year, month, day) => {
	try {
		res = JSON.parse(
			Jsoup.connet("https://openapi.naver.com/v1/datalab/search")
			.data('startDate', `${year}-${month}-${day}`)
			.data('endDate', `${year}-${month+1}-${day}`)
			.header('timeUnit', "month")
			.header('keywordGroups', [ { "groupName": "한글", "keywords": [ "한글", "korean" ] }, { "groupName": "영어", "keywords": [ "영어", "english" ]}])
			.ignoreContentType(true)
			.ignoreHttpErrors(true)
			.get()
			.text()).result.title;
		return res;
	} catch (err) {
      Log.e(err);
	}
};
