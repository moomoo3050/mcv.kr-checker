async function getDNS(domain, type, service){
    if (type === "A") {
        await fetch(`https://1.1.1.1/dns-query?name=${domain}&type=${type}`, {headers: {"accept": "application/dns-json"}})
        .then(response=>response.json())
        .then(data=>{ return (data.Answer[0].data); }); // return ip
    } else if (type === "SRV") {
        // mcv.kr은 TCP연결을 지원하지 않기에 추후 수정 예정
        await fetch(`https://1.1.1.1/dns-query?name=_${service}._tcp.moomoo3050.mcv.kr&type=SRV`, {headers: {"accept": "application/dns-json"}})
        .then(response=>response.json())
        .then(data=>{ return data.Answer[0].data.split(' ').at(-1); });
    } else {
        alert("오류");
    }
}

async function getIPaddr(){
    await fetch('https://api.ipify.org?format=json')
    .then(response=>response.json())
    .then(data=>{ return (data.ip); }); 
}

async function getMCVKRInfo(){
    await fetch(`https://1.1.1.1/dns-query?name=_${service}._tcp.moomoo3050.mcv.kr&type=SRV`, {headers: {"accept": "application/dns-json"}})
        .then(response=>response.json())
        .then(data=>{ return data.Answer[0].data.split(' ').at(-2); });
}

function check(){
    
}