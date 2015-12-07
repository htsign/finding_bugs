var BUG_CONTENTS =[];
	//ゴールド
	BUG_CONTENTS["SEND_APPER_COUNTER"]			= "投稿で入力をしないとカウンターが現れない";
	BUG_CONTENTS["RECCOMEND_VIEW_FRIEND"] 		= "おすすめで同じ人が表示される";
	BUG_CONTENTS["LIST_DATE"] 					= "リストで月が１ヶ月前表示";

	//シルバー
	BUG_CONTENTS["SEND_MAX_LENGTH_OVER"] 		= "投稿で文字数オーバーなのに投稿可能";
	BUG_CONTENTS["LIST_DELETE_OTHER"] 			= "リストで人の記事を削除できる";
	BUG_CONTENTS["LIST_COMMENTS"] 				= "２個目のコメントを書き込むことができない";
	BUG_CONTENTS["LIST_DONT_CLOSE_COMMENTS"] 	= "リストで出したコメント欄を消せない";
	BUG_CONTENTS["LIST_DONT_CLOSE_DELETE"] 		= "リストで出した削除ボタンを消せない";
	BUG_CONTENTS["PROFILE_MAX_LENGTH"] 			= "プロフィールで文字数オーバーでも名前を変更できる";
	BUG_CONTENTS["PROFILE_DONT_CHANGE_HEADER"] 	= "プロフィールで名前を変更してもヘッダの名前が変更されていない";

	//ブロンズ
	BUG_CONTENTS["DISABLE_UPLOAD"] 				= "画像がアップロードできない";
	BUG_CONTENTS["SEND_CANT_DELETE"] 			= "投稿で、投稿した後に文字が消えない";
	BUG_CONTENTS["RECCOMEND_ADD_FRIEND"] 		= "おすすめで同じフォロワーをフォローできる";
	BUG_CONTENTS["LIST_LIKES"] 					= "リストで何度も「良いね！」ができる";
	BUG_CONTENTS["PROFILE_DELETE_FOLLOWER"] 	= "プロフィールでフォロー解除をキャンセルしてもフォロー解除される";

	//隠し
	BUG_CONTENTS["SEND_TAG"] 					= "HTMLタグが反映されているッ！";
	BUG_CONTENTS["SEND_SQL"] 					= "SQLインジェクションッ！！";


//バグ発見告知をするか
var bugFindNotification = true;

//見つけたバグを保持
var saveConfirmedBugId = [];
if (localStorage) {
	var saved = localStorage["finding-bugs-trophies"];
	if (saved) saveConfirmedBugId = JSON.parse(saved);
}

function viewBugEffect(bugId){
	if(!bugFindNotification) return;

	//見つけたバグを確認し、なかったら登録。あったらなし
	if(!checkBug(bugId)) return;

	var html = "";
	html += '<div class="labelAnimation labelFindBug radius">';
	html += '<div class="labelFindBugTitle fontFrame">バグ発見！</div>';
	html += '<hr>';
	html += '<div class="labelFindBugMessage fontFrame">' + getBugContents(bugId) + '</div>';
	html += '<hr>';
	html += '</div>';


	document.getElementById("ID_BUG_LABEL").innerHTML = html;
	//終了イベント登録
	document.getElementById("ID_BUG_LABEL").addEventListener('webkitAnimationEnd', handleTransitionEnd, false);
	document.getElementById("ID_BUG_LABEL").addEventListener('AnimationEnd', handleTransitionEnd, false);
	//Divを画面の中央に移動
	setDivCenter("ID_BUG_LABEL_POS", 200);
}

///////////////////////////////////////
//真ん中にポジショニング
function setDivCenter(idName, divHeight){
	var height = Math.floor((window.innerHeight - divHeight) / 2) + getScrollY();
	document.getElementById(idName).style.left = "0px";
	document.getElementById(idName).style.top =  height + "px";
	document.getElementById(idName).style.display = "inline";
}

function getScrollY(){
	// 現在位置の取得
	var dElm = document.documentElement , dBody = document.body ;
	//var nX = dElm.scrollLeft || dBody.scrollLeft ;	// 現在位置のX座標
	var nY = dElm.scrollTop || dBody.scrollTop ;		// 現在位置のY座標

	return nY;
}

function handleTransitionEnd() {
    document.getElementById("ID_BUG_LABEL").innerHTML = "";
    document.getElementById("ID_BUG_LABEL_POS").style.display = "none";
}


function checkBug(bugId){
	for(var i = 0; i < saveConfirmedBugId.length; i++){
		if(saveConfirmedBugId[i] == bugId){
			return false;
		}
	}
	saveConfirmedBugId.unshift(bugId);
	if (localStorage) localStorage["finding-bugs-trophies"] = JSON.stringify(saveConfirmedBugId);
	return true;
}
///////////////////////////////////////////
//
function getBugContents(bugId){

	return BUG_CONTENTS[bugId];
}

///////////////////////////////////////////
//実績表示
function viewTrophy(){
	var html = "";
	html += '<div class="listMain">';
		html += '<div class="floatLeft profileTitle fontFrame">実績</div>';
		html += '<div class="floatLeft profileClose" onClick="closeProfile()"><img src="data/close.png"></div>';
		html += '<div class="clear"></div>';
		if((getTrophy("SEND_TAG") != "？") || (getTrophy("SEND_SQL") != "？")){
			html += '<hr>';
			html += '<div class="trophyHiddenTitle fontFrame">隠し</div>';
			html += '<div class="trophyHiddenList"><img src="data/hidden.gif" align="middle">' + getTrophy("SEND_TAG") + '</div>';
			html += '<div class="trophyHiddenList"><img src="data/hidden.gif" align="middle">' + getTrophy("SEND_SQL") + '</div>';
		}

		html += '<hr>';
		html += '<div class="trophyGoldTitle fontFrame">ゴールド</div>';
		html += '<div class="trophyGoldList"><img src="data/gold.gif" align="middle">' + getTrophy("SEND_APPER_COUNTER") + '</div>';
		html += '<div class="trophyGoldList"><img src="data/gold.gif" align="middle">' + getTrophy("RECCOMEND_VIEW_FRIEND") + '</div>';
		html += '<div class="trophyGoldList"><img src="data/gold.gif" align="middle">' + getTrophy("LIST_DATE") + '</div>';
		html += '<hr>';
		html += '<div class="trophySilverTitle fontFrame">シルバー</div>';
		html += '<div class="trophySilverList"><img src="data/silver.gif" align="middle">' + getTrophy("SEND_MAX_LENGTH_OVER") + '</div>';
		html += '<div class="trophySilverList"><img src="data/silver.gif" align="middle">' + getTrophy("LIST_DELETE_OTHER") + '</div>';
		html += '<div class="trophySilverList"><img src="data/silver.gif" align="middle">' + getTrophy("LIST_COMMENTS") + '</div>';
		html += '<div class="trophySilverList"><img src="data/silver.gif" align="middle">' + getTrophy("LIST_DONT_CLOSE_COMMENTS") + '</div>';
		html += '<div class="trophySilverList"><img src="data/silver.gif" align="middle">' + getTrophy("LIST_DONT_CLOSE_DELETE") + '</div>';
		html += '<div class="trophySilverList"><img src="data/silver.gif" align="middle">' + getTrophy("PROFILE_MAX_LENGTH") + '</div>';
		html += '<div class="trophySilverList"><img src="data/silver.gif" align="middle">' + getTrophy("PROFILE_DONT_CHANGE_HEADER") + '</div>';
		html += '<hr>';
		html += '<div class="trophyBlonsTitle fontFrame">ブロンズ</div>';
		html += '<div class="trophyBlonsList"><img src="data/blons.gif" align="middle">' + getTrophy("DISABLE_UPLOAD") + '</div>';
		html += '<div class="trophyBlonsList"><img src="data/blons.gif" align="middle">' + getTrophy("SEND_CANT_DELETE") + '</div>';
		html += '<div class="trophyBlonsList"><img src="data/blons.gif" align="middle">' + getTrophy("RECCOMEND_ADD_FRIEND") + '</div>';
		html += '<div class="trophyBlonsList"><img src="data/blons.gif" align="middle">' + getTrophy("LIST_LIKES") + '</div>';
		html += '<div class="trophyBlonsList"><img src="data/blons.gif" align="middle">' + getTrophy("PROFILE_DELETE_FOLLOWER") + '</div>';

	html += '</div>';

	document.getElementById("ID_EDIT_AREA").innerHTML = html;


}

///////////////////////////////
//実績取得済みなら文字列、それ以外なら？で返す
function getTrophy(bugId){
	for(var i = 0; i < saveConfirmedBugId.length; i++){
		if(saveConfirmedBugId[i] == bugId){
			return BUG_CONTENTS[bugId];
		}
	}
	return "？";
}


function clearTrophies(){
	var result = confirm("本当にクリアしてよろしいですか？");
	if (result) {
		saveConfirmedBugId = [];
		localStorage && localStorage.removeItem("finding-bugs-trophies");
		alert("クリアしました");
	}
}