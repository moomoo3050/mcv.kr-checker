async function getDNS(domain, type, service){
    if (type === "A") {
        await fetch(`https://1.1.1.1/dns-query?name=${domain}.mcv.kr&type=${type}`, {headers: {"accept": "application/dns-json"}})
        .then(response=>response.json())
        .then(data=>{ return (data.Answer[0].data); }); // return ip
    } else if (type === "SRV") {
        // mcv.kr은 TCP연결을 지원하지 않기에 추후 수정 예정
        await fetch(`https://1.1.1.1/dns-query?name=_${service}._tcp.${domain}.mcv.kr&type=SRV`, {headers: {"accept": "application/dns-json"}})
        .then(response=>response.json())
        .then(data=>{ return data.Answer[0].data.split(' ').at(-1); }); // 
    } else {
        alert("오류");
    }
}

async function getIPaddr(){
    await fetch('https://api.ipify.org?format=json')
    .then(response=>response.json())
    .then(data=>{
        document.querySelector("#ip").value = data.ip;
    }); 
}

async function getMCVKRInfo(domain, service, ip_addr){
            await fetch(`https://1.1.1.1/dns-query?name=${await getDNS(domain, "SRV", service) /* 보안 주소(추정) 리턴 */}&type=A`, {headers: {"accept": "application/dns-json"}}) //보안 주소 질의
            .then(response=>response.json())
            .then(data=>{  
                if (data.Answer[0].data === "pipefiler.mcv.kr"){ // pipefiler.mcv.kr(보안주소)라면 서버 고유번호 리턴
                    fetch(`https://1.1.1.1/dns-query?name=_${service}._tcp.${domain}.mcv.kr&type=SRV`, {headers: {"accept": "application/dns-json"}})
                    .then(response=>response.json())
                    .then(data=>{
                        return data.Answer[0].data.split(' ').at(-2);
                    });
                } else if (data.Answer[0].data === ip_addr) { //보안 주소 아니라면 ip 주소 여부
                    return -1;
                } else { // 아무것도 아닐 때
                    return false
                }
            });
}

function check(){
    
    var result = {"A":"","SRV":"","SRV_A":""}

    // input 수집
    var sv_addr = document.querySelector("#sv-addr").value; // 서버 주소(mcv.kr 제외)
    var ip_addr = document.querySelector("#ip").value; //ip 주소
    var service = document.querySelector("#service").options[e.selectedIndex].text;

    // 설명 수집
    var reshtml = document.querySelector("#result");
    var desc = document.querySelector("#desc");

    //동일 확인
    if (getDNS(sv_addr, "A") === ip_addr) { //서버주소 A레코드
        result
    } else if () { // 서버주소 SRV레코드
        
    } else if () {// SRV레코드에 연결된 A레코드

    } else {
        
    }
}