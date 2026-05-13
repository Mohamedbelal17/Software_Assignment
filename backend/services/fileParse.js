const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function pareFile(filePath, type) {
    const ext = path.extname(filePath).toLowerCase();
    let workbook;

    if(ext === '.csv'){
        const content = fs.readFileSync(filePath,'utf-8');
        workbook = xlsx.read(content, { type: 'string' });
    } else if(ext === '.xlsx'){
        workbook = xlsx.readFile(filePath);
    } else {
        throw new Error('worng file type');
    }

    
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, {header: 1});
    const datarows = rows.slice(1).filter(row => row.length > 0);

    if(type === 'sales') {
        return datarows.filter(r => r[0]).map(r => ({
            branchCode: String(r[0]  || '').trim(),
            branchName: String(r[1]  || '').trim(),
            deptCode:   String(r[2]  || '').trim(),
            deptName:   String(r[3]  || '').trim(),
            MainGroup:  String(r[4]  || '').trim(),
            MainGroupName:   String(r[5]  || '').trim(),
            SubGroup:   String(r[6]  || '').trim(),
            SubGroupName:String(r[7]  || '').trim(),
            itemCode:   String(r[8]  || '').trim(),
            BarCode:   String(r[9]  || '').trim(),
            itemName:   String(r[10] || '').trim(),
            quantity:   String(r[11] || '').trim(),
            totalValue: String(r[12] || '').trim(),
        }))
    }
    if(type === 'purchase') {
        const datarows = rows.slice(5).filter(row => row.length > 0);  
        return datarows.filter(r => r[0]).map(r => ({
            NetPurchases:    String(r[0]  || '').trim(),
            ReturnRatio:    String(r[1]  || '').trim(),
            ReturnAmount:  String(r[3]  || '').trim(),
            TotalValue:  String(r[4]  || '').trim(),
            PurchaseBouin:      String(r[6]  || '').trim(),
            PurchaseQuantity:       String(r[10]  || '').trim(),
            ItemName:      String(r[11]  || '').trim(),
        }));
    }
    throw new Error('use sales')
}


module.exports = { pareFile }   