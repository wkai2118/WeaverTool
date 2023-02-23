$(function () {
    /**
     * 绑定表单管理菜单tab页切换事件
     */
    $("#tableset .tab_menu #tab01,#tab02,#tab04,#tab05").click(function () {
        // console.log($("#tableset .tab_menu .current").attr("id"));//tab02为编辑字段
        var currentTabId = $("#tableset .tab_menu .current").attr("id");
        if (currentTabId == "tab02") {
            addExportFlowFieldsBtnFore8();
        } else {
            removeExportFlowFieldsBtnFore8();
        }
    })
});

/**
 * 添加导出当前页字段按钮E8
 */
function addExportFlowFieldsBtnFore8() {
    try {
        var exportBtn = `<input id="exportBtn" type="button" value="导出当前页字段" class="e8_btn_top_first" title="导出当前页字段" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">`;
        $(exportBtn).insertAfter("#tab05");
        $("#exportBtn").unbind("click").click(function () {
            exportFieldsFore8();
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 移除导出当前页字段按钮E8
 */
function removeExportFlowFieldsBtnFore8() {
    try {
        $("#exportBtn").remove();
    } catch (error) {
        console.log(error);
    }
}

/**
 * 导出当前字段逻辑E8
 */
function exportFieldsFore8() {
    var title = "字段id" + "\t" + "字段显示名" + "\t" + "数据库字段名称" + "\t" + "字段位置" + "\t" + "表现形式" + "\t" + "字段类型" + "\t" + "显示顺序" + "\n";
    $("iframe[src^='/workflow/form/editformfield.jsp']").contents().find("input[checkboxid]").each(function () {
        var currentTd = $(this).closest("td");

        //字段ID
        var fieldId = (this.id).split("_")[(this.id).split("_").length - 1];
        //字段显示名

        var fieldlabel = currentTd.next().attr("title");

        //数据库字段名称
        var fieldName = currentTd.next().next().attr("title");

        //字段位置
        var viewtype = currentTd.next().next().next().attr("title");

        //表现形式
        var fieldhtmltype = currentTd.next().next().next().next().attr("title");

        //字段类型
        var type = currentTd.next().next().next().next().next().html().replaceAll("&nbsp;", " ");

        //显示顺序
        var showOrder = currentTd.next().next().next().next().next().next().attr("title");

        title = title + fieldId + "\t" + fieldlabel + "\t" + fieldName + "\t" + viewtype + "\t" + fieldhtmltype + "\t" + type + "\t" + showOrder + "\n";
    });
    //导出到剪贴板
    copyPlainToClipboard(title);
}
