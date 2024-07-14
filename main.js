/*
    1 {domain}.mcv.kr 의 A레코드가 IP주소와 일치하는가?
    2 _{service}._tcp.{domain}.mcv.kr 의 SRV레코드가 IP주소와 일치하는가?
    3 _{service}._tcp.{domain}.mcv.kr 의 SRV레코드의 목적지 도메인의 A레코드가 IP 주소와 일치하는가?
    4 _{service}._tcp.{domain}.mcv.kr 의 SRV레코드의 목적지 도메인이 mcv.kr서비스와 연결되어 있는가?
*/

function DNSquery(domain, type){
    fetch(`https://1.1.1.1/dns-query?name=${domain}&type=${type}`, {headers: {"accept": "application/dns-json"}}) //query
        .then(response=>response.json()) // json
        .then(resp=>{
            if (resp.Answer != undefined){ // if non-exist domain
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
    var sv_addr = document.querySelector("#sv-addr").value+"mcv.kr"; // 서버 주소(mcv.kr 제외)
    var ip_addr = document.querySelector("#ip").value; //ip 주소
    var service = document.querySelector("#service").options[document.querySelector("#service").selectedIndex].text;

    // 설명 수집
    
    let A = document.querySelector("#A")
    let SRV = document.querySelector("#SRV")
    let MCV = document.querySelector("#MCV")

    //동일 확인
    /*
    1 {domain}.mcv.kr 의 A레코드가 IP주소와 일치하는가?
    2 _{service}._tcp.{domain}.mcv.kr 의 SRV레코드가 IP주소와 일치하는가?
    3 _{service}._tcp.{domain}.mcv.kr 의 SRV레코드의 목적지 도메인의 A레코드가 IP 주소와 일치하는가?
    4 _{service}._tcp.{domain}.mcv.kr 의 SRV레코드의 목적지 도메인이 mcv.kr서비스와 연결되어 있는가?
    */

    DNSquery(sv_addr, "A")
    DNSquery(
}
