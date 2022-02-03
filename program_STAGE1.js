
let i = 0;
let j = 0;
let count=0;
var arr_q = new Array();
let arr_a = new Array();
var PassSec;   // 秒数カウント用変数
let PassageID;//秒数カウントの実行用

// リセット
function resetVariable(){
   i = 0;
   j = 0;
   arr_q = new Array();
   arr_a = new Array();
}

// 面接官画像
function imgSelect(){
  var imglist = new Array(
    "interviewer1.jpg",
    "interviewer2.jpg",
    "interviewer1_a.jpg",
    "interviewer2_a.jpg"
    // "./images/interviewer3.jpg",
    // "./images/interviewer4.jpg",
    // "./images/interviewer5.jpg",
    // "./images/interviewer6.jpg"
  );
  var selectnum_img = Math.floor(Math.random() * imglist.length);
  document.getElementById("img").src=imglist[selectnum_img];
}

function questionSelect(){
  var questions=[
    "志望動機はなんですか？",
    "学生時代に最も打ち込んだことは何ですか？",
    "自己PRをしてください。",
  ];

  var questions_ramdom1=[
    "就職したらやりたい仕事は何ですか？",
    "失敗した経験について教えてください。",
    "他社の選考状況を教えてください。",
    "アルバイト経験について教えてください。"
  ];

  var questions_ramdom2=[
    "あなたの趣味は何ですか？",
    "あなたの性格について教えてください。",
    "尊敬する人はいますか？",
    "学生と社会人の違いは何だと思いますか？"
  ];

  if(i<=2){
    document.getElementById("Q").innerText = questions[i];
    arr_q[i]=questions[i];
    i++;
  }
  else  if(i==3){
    var selectnum1 = Math.floor(Math.random() * questions_ramdom1.length);
    document.getElementById("Q").innerText = questions_ramdom1[selectnum1];
    arr_q[i]=questions_ramdom1[selectnum1];
    i++;
  }
  else  if(i==4){
    var selectnum2 = Math.floor(Math.random() * questions_ramdom2.length);
    document.getElementById("Q").innerText = questions_ramdom2[selectnum2];
    arr_q[i]=questions_ramdom2[selectnum2];
    i++;
  }
  else if(i>=5){
    // var output_white = "<img src=./images/white.jpg>";
    document.getElementById("Q").innerText = "以上となります。お疲れ様でした。";
    result();
  }
}

// 結果出力
function result(){
  var stockList = [];　//ここが配列になる
  for (var k=0; k<arr_a.length; k++){
    stockList.push('<li>「'+ arr_q[k]+'」という質問は、「'+ arr_a[k]+'」と答えました。</li>'); //ここにpush()がくる
    console.log( arr_q[k] )
    console.log( arr_a[k] )
  }
  document.getElementById("result").innerHTML = stockList.join('');

  clickResultBtn();
}


// 音声入力
function voice(){
  const stopBtn = document.querySelector('#stop-btn');
  const resultDiv = document.querySelector('#result-div');

resultDiv.innerHTML = '<div>' +  " " + '</div>';
if(j>=5){
  return;
}

  SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  let recognition = new SpeechRecognition();

  recognition.lang = 'ja-JP';
  recognition.interimResults = true;
  recognition.continuous = true;

  if(0<count && count<6){
    recognition.start();
  }
  count++;

  let finalTranscript = ''; // 確定した(黒の)認識結果

  recognition.onresult = (event) => {
    let interimTranscript = ''; // 暫定(灰色)の認識結果
    for (let i = event.resultIndex; i < event.results.length; i++) {
      let transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript = transcript;
      }

      // 時間計る
      const countUp = () => {
        PassSec++;
        console.log(PassSec);
        if(PassSec==3){
          recognition.stop();
          // clickNextBtn();
          j++;
          imgSelect();
          questionSelect();
          voice();
          return;
        }
      }
      console.log(event.results[i].isFinal);

      // 黙っている時間が3秒になると録音停止
      if(event.results[i].isFinal==true){
        PassSec = 0;   // カウンタのリセット
      PassageID=setInterval(countUp, 1000);
      }else{
        clearInterval(PassageID);
      }
    }
    resultDiv.innerHTML = finalTranscript + '<div>' + interimTranscript + '</div>';
    arr_a[j]=finalTranscript;
  }
}


// カメラ
function camera(){
  const video = document.getElementById("video")
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  }).then(stream => {
    video.srcObject = stream;
    video.play()
  }).catch(e => {
    console.log(e)
  })
}

// ボタンの表示、非表示
function clickNextBtn(){
	const p2 = document.getElementById("nextq");
	if(p2.style.visibility=="visible"){
		// hiddenで非表示
		p2.style.visibility ="hidden";
	}else{
		// visibleで表示
		p2.style.visibility ="visible";
	}
}
function clickResultBtn(){
	const p2 = document.getElementById("button1");

	if(p2.style.visibility=="visible"){
		// hiddenで非表示
		p2.style.visibility ="hidden";
	}else{
		// visibleで表示
		p2.style.visibility ="visible";
	}
}
