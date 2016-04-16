#NHub Demo
[English](/README.md)

NHub Demo 앱은 Azure Notification Hub의 태그와 템플릿을 이용하여 푸쉬 메시지를 전송하는 데모 앱입니다.
Node.js 모듈로 제공되는 [`azure-mobile-app`](https://www.npmjs.com/package/azure-mobile-apps)의 숨겨진 기능을 이용하여 간편한 백앤드 프로그래밍을 구현합니다.
즉, SAS 토근 생성 및 복잡한 REST API 코딩이 요구되지 않습니다.

[![Watch NHubDemo](https://img.youtube.com/vi/qaDy-E1eKkM/0.jpg)](https://youtu.be/qaDy-E1eKkM)

##기능
1. 모든 디바이스의 등록 확인 (with RegistrationId)
2. 디바이스의 등록 정보 확인
3. 등록 정보 수정 (with InstallationId)
    * 태그 추가/삭제
    * 템플릿 추가/삭제
4. 템플릿/태그로 푸쉬 전송

##로컬 테스트
* `$ CMD` 실행
* `appenv.bat` 편집 및 실행
* `$ npm install`
* `$ npm start`
* 브라우저 실행 및 `http://localhost:3000/home` 이동

##Azure Web App으로 배포
* Web App 인스턴스 생성
* 기존 Notification Hub을 Web App에 연결 
* Web App의 git 저장소 생성
* git 리포트를 구성하고 Web App에 배포
    * `$ git remote add origin <git url>`
    * `$ git push origin master`
* authentication/authorization 기능 활성화

##참고
* NH REST API: https://msdn.microsoft.com/en-us/library/azure/dn495827.aspx
* Template 작성 가이드: https://msdn.microsoft.com/en-us/library/azure/dn530748.aspx
* ush object(Mobile Services) 문서: https://msdn.microsoft.com/en-us/library/azure/jj554217.aspx

##Terms & Conditions
* MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
