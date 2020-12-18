
function generateData() {
    var j;
    var lunghezza= Math.random() * (8 - 3) + 3; 
    var list=[];
    for (j=1; j<=lunghezza; j++) {
        if (j%2==0) {
            list.push({"id": j, "status": "ok", "desc":""});
        }
        else {
            list.push({"id": j, "status": "warning", "desc":`Die cutter ${j} in a critical status, click for details`});
        }
    }
    return list;
}

export default generateData;