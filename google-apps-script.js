function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const users = data.slice(1).map(row => {
    const user = {};
    headers.forEach((header, i) => user[header] = row[i]);
    return user;
  });
  
  return ContentService.createTextOutput(JSON.stringify(users))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const userData = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  
  sheet.appendRow([
    userData.name,
    userData.email,
    userData.password,
    userData.department,
    userData.year
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}