/** 
 * 过滤特殊字符串
 * 
*/

export function VaildateScript(str){
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~! @#￥......&* () &;—|{}【】‘；：“”。，、？]") 
    var rs = ""
    for (let i = 0; i < str.length; i++) {
       rs = rs + str.substr(i,1).replace(pattern,'')      
    }
    return rs;
}