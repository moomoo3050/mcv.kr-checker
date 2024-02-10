# MCV.KR IP Checker
## info
mcv.kr공식 [가이드라인](https://cafe.naver.com/mcvkr/136)에 따른 간단한 IP유출 여부를 확인하는 웹사이트 입니다.  
**이 프로젝트는 현재 제작 중입니다**
## todo
- [ ] IPv6 지원
- [ ] 프론트엔드 개편(애니메이션 추가 등)
- [ ] Minecraft 이외의 서비스 지원

## report
버그 제보 및 관련 의견은 Issue로 부탁 드리며 이메일 문의는 받지 않습니다.

## notice
- 기본적으로 IP주소와 기타 개인정보를 수집하지 않으며, 그럴 수 있게 설계되어 있지 않습니다.
- 개인적인 취미와 공익 목적으로 작성했으며, 이 사이트를 이용하며 산출되는 결과 등에 대해서는 책임을 일절 지지 않음을 알려드립니다. 이는 MIT라이선스에도 작성되어 있습니다.
- 해당 프로젝트는 [mcv.kr](mcv.kr)과 연관되어 있지 않습니다
- 예기치 못한 상황이나 개인사정으로 프로젝트는 언제든 종료될 수 있음을 알립니다.
## used API
### Ipify
https://www.ipify.org/  
IP 주소 수집 지원 
### Cloudflare DoH(DNS over HTTPS)
https://www.cloudflare.com/ko-kr/learning/dns/dns-over-tls/ (소개 문서)  
DNS Query 지원
