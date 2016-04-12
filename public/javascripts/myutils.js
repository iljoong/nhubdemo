function showConfirm(msg, url) {
  var yes = confirm('Are you sure to delete "' + msg +'"?');
  
  if (yes)
  {
    window.location = url;
  }
}

function _getInstId(str)
{
    var tags = str.split(',');
    var _inst = "$InstallationId:";
    var _n = _inst.length;
    
    for (var i = 0; i < tags.length; i++)
    {
        if (tags[i].substring(0, _n) == _inst)
        {
            // simple conversion
            var id = tags[i].slice(_n+1, -1);
            
            //alert( id ) ;
            return id;            
        }
    }   
    return null;
}

function setTag(str) {
    var iid = _getInstId(str);
    if (iid != null)
        window.location = "/tag/" + iid;    
}

function setTemplate(str) {
    var iid = _getInstId(str);
    if (iid != null)
        window.location = "/temp/" + iid;
}

function setTemplate2(regid) {
    if (regid != null)
        window.location = "/temp2/" + regid;
}

function delTag(tag, url) {
    showConfirm(tag, url);
}

function delTemp(tag, url) {
    showConfirm(tag, url);
}

function delReg(reg, url) {
    showConfirm(reg, url);
}
