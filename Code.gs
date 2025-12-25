// Google Apps Script for Google Spreadsheet Integration
// このコードをGoogle Apps Scriptエディタにコピーして使用してください

function doPost(e) {
  try {
    // スプレッドシートを取得（IDを自分のスプレッドシートIDに置き換えてください）
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // ここにスプレッドシートIDを入力
    const SHEET_NAME = '出席記録'; // シート名

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // シートが存在しない場合は作成
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // ヘッダー行を追加
      sheet.appendRow(['学籍番号', '氏名', '日付', '時刻', '記録日時']);
      sheet.getRange('A1:E1').setFontWeight('bold').setBackground('#4285f4').setFontColor('#ffffff');
    }

    // POSTデータを解析
    const data = JSON.parse(e.postData.contents);

    // スプレッドシートに行を追加
    const timestamp = new Date();
    sheet.appendRow([
      data.id,
      data.name,
      data.date,
      data.time,
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy/MM/dd HH:mm:ss')
    ]);

    // 成功レスポンスを返す
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'データを追加しました'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // エラーレスポンスを返す
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用関数
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        id: '2025001',
        name: '山田太郎',
        date: '2025/12/25',
        time: '10:30:45'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
