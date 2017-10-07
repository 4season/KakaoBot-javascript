function catchMessage(room, sender, message) {
try {
  if(message === "Hello, JH") {
    Bot.send(room, "Hi, " + sender + "! We'll be able to meet soon...and what do you want? EX) I want number 1 command");
  }
  for(var a=1;a<4;a++) {
  if(("I want number " + a + " command") == message) {
  	if(a == 1) {
Bot.send(room, "Hi, " + sender + "! We'll be able to meet soon...and what do you want? EX) I want number 1 command");
  }
if(a == 2) {
  Bot.send(room, "Okay, let me know right away....");
  Bot.send(room, "1# Hello, Jh");
  Bot.send(room, "2# JH, Plz tell me the commands");
  Bot.send(room, "3# JH, how are you?");
  }
  if(a == 3) {
  	Bot.send(room, "Am...i am JunhoHuh made it!");
  }
}
if(message === "JH, Plz tell me the commands") {
  Bot.send(room, "Okay, let me know right away....");
  Bot.send(room, "1# Hello, JH");
  Bot.send(room, "2# JH, Plz tell me the commands");
  Bot.send(room, "3# JH, hwo are you?");
  }
  if(message === "JH, hwo are you?") {
  	Bot.send(room, "Am...i am JunhoHuh made it!");
	}
}}
  catch(err) {
  	Bot.send("[Code Error]" + err);
    }
}
