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
        document.querySelecter("#ip").value = data.ip;
    }); 
}

async function getMCVKRInfo(domain, service){
            await fetch(`https://1.1.1.1/dns-query?name=${await getDNS(domain, "SRV", service) /* 보안 주소 리턴 */}&type=A`, {headers: {"accept": "application/dns-json"}}) //보안 주소 질의
            .then(response=>response.json())
            .then(data=>{ return (data.Answer[0].data); });
                if (data.Answer[0].data === "pipefiler.mcv.kr"){ // pipefiler.mcv.kr(보안주소)라면 서버 고유번호 리턴
                    await fetch(`https://1.1.1.1/dns-query?name=_${service}._tcp.${domain}.mcv.kr&type=SRV`, {headers: {"accept": "application/dns-json"}})
                    .then(response=>response.json())
                    .then(data=>{
                        return data.Answer[0].data.split(' ').at(-2);
                    });
                } else {
                    return -1;
                }
        });
}

function check(){
    var sv-addr = document.querySelecter("#sv-addr").value;
    var ip-addr = document.querySelecter("#ip").value;
    
}