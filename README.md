#NHub Demo

NHub Demo app demonstrates how to use Azure Notification Hub to send a push with tags and template.
It leverage [`azure-mobile-app`](https://www.npmjs.com/package/azure-mobile-apps) node.js module and undocumented features to simplify backend programming.
That is, No SAS token generation and NO complex REST API call are needed.

[![NHubDemo](https://img.youtube.com/vi/qaDy-E1eKkM/0.jpg)](https://youtu.be/qaDy-E1eKkM)

##FEATURE
1. View all devices' registration (with RegistrationId)
2. Show registration detail
3. Edit registration with InstallationId
    * Add/Remove tag
    * Add/Remove Template
4. Send a push using Template

##Local Test
* Launch `$ CMD`
* Edit `appenv.bat` and run
* `$ npm install`
* `$ npm start`
* Launch browser and goto `http://localhost:3000/home`

##How to deploy to Azure Web App
* Create a Web App instance
* Connect your existing Notification Hub to the Web App 
* Create git repository on Web App
* Add git remote on your client and deploy to the Web App
    * `$ git push origin master`
* Recommend to setup authentication/authroization

##REFERENCE
* For NH REST API: https://msdn.microsoft.com/en-us/library/azure/dn495827.aspx
* For Template guide: https://msdn.microsoft.com/en-us/library/azure/dn530748.aspx
* For Push object documentation: https://msdn.microsoft.com/en-us/library/azure/jj554217.aspx

##Terms & Conditions
* MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
