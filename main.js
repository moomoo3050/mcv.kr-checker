/*
1 query {domain}.mcv.kr type:A == IP?
2 query _{service}._tcp.{domain}.mcv.kr type:SRV == IP?
3 query 2 type:A == IP?
4 3 == pipefilter.mcv.kr?

*/

function DNSquery(domain, type){
    fetch(`https://1.1.1.1/dns-query?name=${domain}&type=${type}`, {headers: {"accept": "application/dns-json"}}) //query
        .then(response=>response.json()) // json
        .then(resp=>{
            if (resp.Answer != undefined){ // non-exist domain
                return resp.Answer[0].data;
            } else {
                return undefined
            }
        });
}

async function setIPaddr(){
    await fetch('https://api.ipify.org?format=json')
    .then(response=>response.json())
    .then(data=>{
        document.querySelector("#ip").value = data.ip;
    }); 
}

function check(){

    // input 수집
    var sv_addr = document.querySelector("#sv-addr").value; // 서버 주소(mcv.kr 제외)
    var ip_addr = document.querySelector("#ip").value; //ip 주소
    var service = document.querySelector("#service").options[document.querySelector("#service").selectedIndex].text;

    // 설명 수집
    
    let A = document.querySelector("#A")
    let SRV = document.querySelector("#SRV")
    let MCV = document.querySelector("#MCV")

    //동일 확인
    /*
    1 query {domain}.mcv.kr type:A == IP?
    2 query _{service}._tcp.{domain}.mcv.kr type:SRV == IP?
    3 query 2 type:A == IP?
    4 3 == pipefilter.mcv.kr?
    */
}
