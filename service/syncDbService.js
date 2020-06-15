const auth = require('./authService')
function generateHtmlFrom(createData,updateData){
    if(!auth.isEmpty(createData)){
        if (auth.isEmpty(updateData)) { return }

    }
}
module.exports = {
    generateHtml: generateHtml,

};
