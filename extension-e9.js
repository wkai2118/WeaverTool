$(function () {
    window.onhashchange = function (e) {
        var url = new URL(e.newURL);
        var hash = url.hash;
        var re = "#/workflowengine/path/pathSet/pathDetail/flowSet/nodeLinkInfo";
        var fi = '#/workflowengine/path/pathSet/pathDetail/formManage/editField';
        // console.log(hash);
        if (hash.startsWith(re)) {
            addFillLinknameBtn();
        } else if (hash.startsWith(fi)) {
            // console.log(1);
            addExportFlowFieldsBtn();
        } else {
            removeFillLinknameBtn();
            removeExportFlowFieldsBtn();
        }
    }



    // let flag = 1;
    // $("body").mousedown(function (event) {
    //     if (event.button == 0) {
    //         //鼠标左键
    //         console.log("您点击了鼠标左键!");
    //         window.setTimeout(function () {
    //             if (flag == 1) {
    //                 addExportModeFieldsBtn();
    //                 alert(1);
    //                 flag = 0;
    //                 $(`[ecid='_EditFormFrame@e9e1os_WeaDialog@1utgcz_Modal@dlbnq3_Dialog@wo4l61_span@ekl553']`).one("click", function () {
    //                     flag = 1;
    //                 })
    //             }
    //         }, 500);
    //     }
    // });
})

/**
 * 添加一键填充出口按钮
 */
function addFillLinknameBtn() {
    window.setTimeout(function () {
        try {
            if ($("[ecid='wea_auto_exportname']").length == 0) {
                $(`
                        <span style="display: inline-block; line-height: 28px; vertical-align: middle; margin-left: 10px;">
                            <button type="button" ecid="wea_auto_exportname" class="ant-btn"><span>一键填充出口</span>
                            </button>
                        </span>
                    `).insertAfter(`[ecid='_Route@y7eejl_Button@x1gncy@save_button@xq1ea3']`);
                $("[ecid='wea_auto_exportname']").click(function () {
                    quickFillLinkname();
                })
            }
        } catch (error) {
            console.log(error);
        }
    }, 200);
}

/**
 * 移除一键填充出口按钮
 */
function removeFillLinknameBtn() {
    if ($("[ecid='wea_auto_exportname']").length != 0) {
        $("[ecid='wea_auto_exportname']").parent().remove();
        // $("[ecid='testmodal']").parent().remove();
    }
}

/**
 * 一键填充出口逻辑实现
 */
function quickFillLinkname() {
    $(".wea-table-edit-linkname").each(function () {
        var linkname = $(this).attr("stsdata");
        if (typeof (linkname) != "undefined") {
            var nodename = $(this).parent().find(".wea-table-edit-nodename").attr("stsdata");
            var descnode = $(this).parent().find(".wea-table-edit-descnode").find(".ant-select-selection-selected-value").attr("title");
            var isback = $(this).parent().find(".wea-table-edit-code").find("input[type='hidden']").val();
            $(this).find(".ant-input-wrapper input").focus();
            var newLinkname = "";
            if (isback != 1) {
                newLinkname = `${nodename} 至 ${descnode}`;
            } else {
                newLinkname = `${nodename} 退回 ${descnode}`;
            }
            $(this).find(".ant-input-wrapper input").val(newLinkname);
            $(this).find(".ant-input-wrapper input").attr("value", newLinkname);
            $(this).find(".ant-input-wrapper input").blur();//模拟鼠标点击，将数据写入内存，否则保存失败
        }
    })
}


// /**
//  * 导出建模表单字段
//  */
// function addExportModeFieldsBtn() {
//     $(`<span style="margin-left: 15px;">
//                     <div class="wea-button-icon undefined">
//                         <button ecid="wea_auto_exportfield" buttontype="export" type="button" class="ant-btn ant-btn-primary">
//                             <span title="导出建模字段" class="icon-portal-content-o">
//                             </span>
//                         </button>
//                     </div>
//                 </span>`).insertBefore(`[ecid='_EditFormFrame@e9e1os_WeaTab@23kif2_span@6ll4by@0']`);
// }


/**
 * 添加导出流程表单字段按钮
 */
function addExportFlowFieldsBtn() {
    window.setTimeout(function () {
        try {
            if ($("[ecid='wea_auto_exportname']").length == 0) {
                $(`
                <span style="display: inline-block; line-height: 28px; vertical-align: middle; margin-left: 10px;">
                    <button type="button" ecid="wea_auto_exportfield" class="ant-btn"><span>导出表单字段</span>
                    </button>
                </span>
                `).insertBefore(`[ecid='_Route@n4jpza_PathSetTop@33xct8_WeaTop@jfws6j_RightColCom@a10dl7_span_dropIcon@w5r91g']`);
                $("[ecid='wea_auto_exportfield']").click(function () {
                    exportFields();
                })
            }
        } catch (error) {
            console.log(error);
        }
    }, 200);
}

/**
 * 移除导出流程表单字段按钮
 */
function removeExportFlowFieldsBtn() {
    if ($("[ecid='wea_auto_exportfield']").length != 0) {
        $("[ecid='wea_auto_exportfield']").parent().remove();
        // $("[ecid='testmodal']").parent().remove();
    }
}

/**
 * 导出表单字段逻辑
 */
function exportFields() {
    //@fieldlabel_td@ 字段显示名         _Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@fieldlabel_td@h1t8te@fieldlabel
    //@fieldName_td@  数据库字段名称     _Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@fieldName_td@h1t8te@fieldName
    //@viewtype_td@   字段位置          _Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@viewtype_td@h1t8te@viewtype"
    //@fieldhtmltype_td@  表现形式      _Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@fieldhtmltype_td@h1t8te@fieldhtmltype
    //@type_td@ 字段类型                _Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@type_td@h1t8te@type
    var title = "字段id" + "\t" + "字段显示名" + "\t" + "数据库字段名称" + "\t" + "字段位置" + "\t" + "表现形式" + "\t" + "字段类型" + "\n";
    $(`[stsdata="\[object Object\]"]`).each(function () {
        var selectionName = $(this).attr("ecid");   //check框ecid值，包含字段id

        //字段ID
        var fieldId = (selectionName.split("@")[5]).split("_")[0];

        //字段显示名
        var fieldlabel = $(`[ecid='_Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@fieldlabel_td@h1t8te@fieldlabel']`).find(".wea-url").attr("title");

        //数据库字段名称
        var fieldName = $(`[ecid='_Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@fieldName_td@h1t8te@fieldName']`).find(".wea-url").attr("title");

        //字段位置
        var viewtype = $(`[ecid='_Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@viewtype_td@h1t8te@viewtype']`).find(".wea-url").attr("title");

        //表现形式
        var fieldhtmltype = $(`[ecid='_Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@fieldhtmltype_td@h1t8te@fieldhtmltype']`).find(".wea-url").attr("title");

        //字段类型
        var type = $(`[ecid='_Route@v9trkn_WeaTable@pg2aw3_RcTable@n00qc4_TableRow@z1kkd4@${fieldId}_TableCell@d0pgy3@type_td@h1t8te@type']`).find(".wea-url").attr("title");

        title = title + fieldId + "\t" + fieldlabel + "\t" + fieldName + "\t" + viewtype + "\t" + fieldhtmltype + "\t" + type + "\n";
    })
    copyPlainToClipboard(title);
}

/**
 * 复制文本到剪切板
 */

function copyPlainToClipboard(result) {
    var inputObj = document.createElement("textarea");
    document.body.appendChild(inputObj);
    inputObj.value = result;
    inputObj.select();
    document.execCommand("Copy");
    document.body.removeChild(inputObj);
    alert("表单字段已复制到剪切板,可粘贴至表格查看");
}