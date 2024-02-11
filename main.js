var server_id = undefined

function getDNS(domain, type, service){
    if (type === "A") {
        fetch(`https://1.1.1.1/dns-query?name=${domain}.mcv.kr&type=${type}`, {headers: {"accept": "application/dns-json"}})
        .then(response=>response.json())
        .then(resp=>{
            return resp.Answer[0].data;
        }); // return ip
    } else if (type === "SRV") {
        // mcv.kr은 TCP연결을 지원하지 않기에 추후 수정 예정
        fetch(`https://1.1.1.1/dns-query?name=_${service}._tcp.${domain}.mcv.kr&type=SRV`, {headers: {"accept": "application/dns-json"}})
        .then(response=>response.json())
        .then(resp=>{
            return resp.Answer[0].data.split(' ').at(-1);
        }); // 
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

function getMCVKRInfo(domain, service, ip_addr){
            fetch(`https://1.1.1.1/dns-query?name=${getDNS(domain, "SRV", service).split(' ').at(-1) /* 보안 주소(추정) 리턴 */}&type=A`, {headers: {"accept": "application/dns-json"}}) //보안 주소 질의
            .then(response=>response.json())
            .then(resp=>{  
                if (resp.Answer[0].data === "pipefiler.mcv.kr"){ // pipefiler.mcv.kr(보안주소)라면 서버 고유번호 리턴
                    fetch(`https://1.1.1.1/dns-query?name=_${service}._tcp.${domain}.mcv.kr&type=SRV`, {headers: {"accept": "application/dns-json"}})
                    .then(response=>response.json())
                    .then(resp2=>{
                        return resp2.Answer[0].data.split(' ').at(-2);
                    });
                } else if (resp.Answer[0].data === ip_addr) { //보안 주소 아니라면 ip 주소 여부
                    return -1;
                } else { // 아무것도 아닐 때
                    return false
                }
            });
}

function check(){
    
    var result = {"A":"","SRV":"","SRV_A":""} // true: 위험
 
    // input 수집
    var sv_addr = document.querySelector("#sv-addr").value; // 서버 주소(mcv.kr 제외)
    var ip_addr = document.querySelector("#ip").value; //ip 주소
    var service = document.querySelector("#service").options[document.querySelector("#service").selectedIndex].text;

    // 설명 수집
    
    let A = document.querySelector("#A")
    let SRV = document.querySelector("#SRV")
    let MCV = document.querySelector("#MCV")

    //동일 확인
    if (getDNS(sv_addr, "A") === ip_addr) { //서버주소 A레코드
        result["A"] = true
    }
    if (getDNS(sv_addr, "SRV", service) === ip_addr) {
        result["SRV"] = true
    }
    mcv_data = getMCVKRInfo(sv_addr, service, ip_addr)
    if (mcv_data === false) { // ip 주소도 아니면서 보안주소도 아닐때
        result["SRV_A"] = -1 // -1: 확인되지 않음(ip주소가 일치하지 않으나 mcv.kr에 연결되지 않음)
    } else if (mcv_data === -1) { // ip일때
        result["SRV_A"] = true
    } else { // mcv.kr 서버 고유번호 리턴
        result["SRV_A"] = mcv_data
    }

    //설명 쓰기
    if (result["A"]) {
        A.innerHTML = "위험"
    } else {
        A.innerHTML = "안전"
    }
    if (result["SRV"]) {
        SRV.innerHTML = "위험" 
    } else {
        SRV.innerHTML = "안전" 
    }
    if (result["SRV_A"]) {
        MCV.innerHTML = "위험"
    }
    if (result["SRV_A"] === -1) {
        MCV.innerHTML = "mcv.kr에 연결되지 않음"
    } else {
        MCV.innerHTML = `안전(고유번호: ${result["SRV_A"]}`
    }
}