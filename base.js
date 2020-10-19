function Dictionary() {
    this.datastore = new Object();
    this.textCount = 0;
    this.buttonCount = 0;
    this.pathCount = 0;
    this.add = function (key, value) {
        this.datastore[key] = value;
    };
    this.remove = function (key) {
        delete this.datastore[key];
    };
    this.get = function (key) {
        return this.datastore[key];
    };
    this.count = function () {
        var n = 0;
        for (var key in this.datastore) {
            ++n;
        }
        return n;
    };
    this.clear = function () {
        for (var key in this.datastore) {
            delete this.datastore[key];
        }
    };
    this.forEach = function (fun) {
        for (var key in this.datastore) {
            fun(this.datastore[key]);
        }
    };
    this.getNewId = function (type) {
        switch (type) {
            case "text":
                this.textCount++;
                return "text" + this.textCount;
            case "button":
                this.buttonCount++;
                return "button" + this.buttonCount;
            case "path":
                this.pathCount++;
                return "path" + this.pathCount;
        }
    };
}
function AnimeItem(duration) {
    this.duration = duration;
    this.timingFunction = "";
    this.animeContent = new Object();
}
AnimeItem.prototype = {
    copy: function () {
        let newAnimeItem = new AnimeItem(this.duration);
        newAnimeItem.timingFunction = this.timingFunction;
        newAnimeItem.animeContent = JSON.parse(
            JSON.stringify(this.animeContent)
        );
        return newAnimeItem;
    },
};
Object.defineProperty(AnimeItem.prototype, "constructor", {
    enumerable: false,
    value: AnimeItem,
});
function Text(id) {
    this.id = id;
    this.name = id;
    this.isShowingAnimeTrack = false;
    this.animeList = [];
    this.animeList.push(new AnimeItem(0));
}
Text.prototype = {
    type: "text",
    x: 0,
    y: 0,
    zIndex: 0,
    scale: 1,
    duration: null,
    content: "请输入内容",
    alpha: 1,
    color: "0xffffff",
    anchorX: 0,
    anchorY: 0,
    fontSize: 25,
    fontFamily: null,
    bold: 1,
    textShadow: 1,
    strokeWidth: 0,
    strokeColor: "0xffffff",
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    parent: null,
    copy: function () {
        let newText = new Text(this.id);
        for (const prop in this) {
            if (this.hasOwnProperty(prop)) {
                newText[prop] = this[prop];
            }
        }
        newText.id = null;
        return newText;
    },
};
Object.defineProperty(Text.prototype, "constructor", {
    enumerable: false,
    value: Text,
});
function Button(id) {
    this.id = id;
    this.name = id;
    this.isShowingAnimeTrack = false;
    this.animeList = [];
    this.animeList.push(new AnimeItem(0));
}
Button.prototype = {
    type: "button",
    x: 0,
    y: 0,
    zIndex: 0,
    scale: 1,
    duration: null,
    text: "请输入内容",
    fontSize: 25,
    textColor: "0x000000",
    textAlpha: 1,
    fillColor: "0xffffff",
    fillAlpha: 1,
    target: null,
    copy: function () {
        let newButton = new Button(this.id);
        for (const prop in this) {
            if (this.hasOwnProperty(prop)) {
                newButton[prop] = this[prop];
            }
        }
        newButton.id = null;
        return newButton;
    },
};
Object.defineProperty(Button.prototype, "constructor", {
    enumerable: false,
    value: Button,
});
function Path(id) {
    this.id = id;
    this.name = id;
    this.isShowingAnimeTrack = false;
    this.animeList = [];
    this.animeList.push(new AnimeItem(0));
}
Path.prototype = {
    type: "path",
    x: 0,
    y: 0,
    zIndex: 0,
    scale: 1,
    duration: null,
    d: "",
    borderWidth: 0,
    borderColor: 0,
    borderAlpha: 1,
    fillColor: "0xffffff",
    fillAlpha: 1,
    viewBox: null,
    width: null,
    height: null,
    copy: function () {
        let newPath = new Path(this.id);
        for (const prop in this) {
            if (this.hasOwnProperty(prop)) {
                newPath[prop] = this[prop];
            }
        }
        newPath.id = null;
        return newPath;
    },
};
Object.defineProperty(Path.prototype, "constructor", {
    enumerable: false,
    value: Path,
});

var basObjects = new Dictionary();

var objectBox = document.getElementById("object-box");
var objectBox_table = document.getElementById("object-box__table");
var attrBox = document.getElementById("attr-box");
var attrBox_tables = new Dictionary();
attrBox_tables.add("text", document.getElementById("attr-table--text"));
attrBox_tables.add("button", document.getElementById("attr-table--button"));
attrBox_tables.add("path", document.getElementById("attr-table--path"));

var objectHoverTool = document.getElementById("object-box__hover-tool");

var animeTimelineBox = document.getElementById("anime-timeline-box");
var animeTimelineBox_leftTable = document.getElementById(
    "anime-timeline-box__left-table"
);
var animeTimelineBox_contentTable = document.getElementById(
    "anime-timeline-box__content-table"
);
animeTimelineBox_contentTable.parentNode.addEventListener("scroll", function (
    event
) {
    animeTimelineBox_leftTable.parentNode.scrollTop =
        animeTimelineBox_contentTable.parentNode.scrollTop;
});
var animeListBox = document.getElementById("anime-list-box");
var animeListBox_table = document.getElementById("anime-list-box__table");

var animeListHoverToolTD = document.getElementById(
    "anime-list-box__hover-tool-td"
);
var animeListHoverTool = document.getElementById("anime-list-box__hover-tool");
var animeHoverTool = document.getElementById("anime-timeline-box__hover-tool");
var showAnimeListHoverToolBtn = document.getElementById(
    "btn--show-anime-list-box-hover-tool"
);

objectBox.addEventListener("click", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        let customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "attrBox_refresh",
            false,
            false,
            target.dataset.objId
        );
        attrBox.dispatchEvent(customEvent);

        customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "animeListBox_refresh",
            false,
            false,
            target.dataset.objId
        );
        animeListBox.dispatchEvent(customEvent);
    } else if (target.nodeName == "BUTTON") {
        let customEvent = document.createEvent("CustomEvent");
        switch (target.id) {
            case "btn--new-text":
                {
                    let id = basObjects.getNewId("text");
                    let newText = new Text(id);
                    basObjects.add(id, newText);
                    customEvent.initCustomEvent(
                        "objectBox_add",
                        false,
                        false,
                        newText
                    );
                    objectBox.dispatchEvent(customEvent);
                }
                break;
            case "btn--new-button":
                {
                    let id = basObjects.getNewId("button");
                    let newButton = new Button(id);
                    basObjects.add(id, newButton);
                    customEvent.initCustomEvent(
                        "objectBox_add",
                        false,
                        false,
                        newButton
                    );
                    objectBox.dispatchEvent(customEvent);
                }
                break;
            case "btn--new-path":
                {
                    let id = basObjects.getNewId("path");
                    let newPath = new Path(id);
                    basObjects.add(id, newPath);
                    customEvent.initCustomEvent(
                        "objectBox_add",
                        false,
                        false,
                        newPath
                    );
                    objectBox.dispatchEvent(customEvent);
                }
                break;
            case "btn--show-anime-track":
                {
                    const parentTD = target.parentNode.parentNode;
                    customEvent.initCustomEvent(
                        "animeTimelineBox-showAnimeTrack",
                        false,
                        false,
                        parentTD.dataset.objId
                    );
                    animeTimelineBox.dispatchEvent(customEvent);
                }
                break;
            case "btn--duplicate":
                {
                    const parentTD = target.parentNode.parentNode;
                    const obj = basObjects.get(parentTD.dataset.objId);
                    let newObj = obj.copy();
                    let newId = basObjects.getNewId(newObj.type);

                    let newRow = document.createElement("tr");
                    objectBox_table.tBodies[0].insertBefore(
                        newRow,
                        parentTD.parentNode.nextSibling
                    );
                    let newCell = document.createElement("td");
                    newRow.appendChild(newCell);
                    newCell.dataset.objId = newId;
                    newCell.className = "type-name--" + newObj.type;

                    // const newName =
                    //     newId +
                    //     " - (" +
                    //     parentTD.firstChild.nodeValue.trim() +
                    //     ") copy";
                    newCell.innerHTML = newId;

                    newObj.id = newId;
                    newObj.name = newId;
                    basObjects.add(newId, newObj);
                }
                break;
            case "btn--delete":
                {
                    const parentTD = target.parentNode.parentNode;
                    objectBox_table.tBodies[0].removeChild(parentTD.parentNode);
                    // basObjects里还有
                }
                break;
        }
    }
});
objectBox.addEventListener("dblclick", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        const inputText = target.firstChild.nodeValue.trim();
        target.innerHTML = "";

        let newInputBox = document.createElement("input");
        newInputBox.setAttribute("type", "text");
        newInputBox.className = "object-name-inputbox";
        newInputBox.value = inputText;
        newInputBox.addEventListener("blur", function (event) {
            if (this.value == "") {
                this.value = this.parentNode.dataset.objId;
            }
            this.parentNode.innerHTML = this.value.trim();
        });

        target.appendChild(newInputBox);
        newInputBox.select();
    }
});
objectBox.addEventListener("mouseover", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        if (
            target.parentNode.parentNode.nodeName == "TBODY" &&
            target.firstChild.nodeName != "INPUT"
        ) {
            target.appendChild(objectHoverTool);
            objectHoverTool.classList.remove("is-hidden");
        }
    }
});
objectBox.addEventListener("mouseout", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        if (!target.contains(event.relatedTarget)) {
            objectHoverTool.classList.add("is-hidden");
        }
    } else if (target.nodeName == "DIV") {
        objectHoverTool.classList.add("is-hidden");
    }
});
objectBox.addEventListener("objectBox_add", function (event) {
    const tbody = objectBox_table.tBodies[0];
    const newCell = tbody.insertRow(-1).insertCell(-1);
    newCell.dataset.objId = event.detail.id;
    newCell.className = "type-name--" + event.detail.type;

    let newInputBox = document.createElement("input");
    newInputBox.setAttribute("type", "text");
    newInputBox.className = "object-name-inputbox";
    newInputBox.addEventListener("blur", function (event) {
        if (this.value == "") {
            this.value = this.parentNode.dataset.objId;
        }
        const obj = basObjects.get(this.parentNode.dataset.objId);
        obj.name = this.value.trim();
        this.parentNode.innerHTML = this.value.trim();
    });

    newCell.appendChild(newInputBox);
    newInputBox.focus();
});
attrBox.addEventListener("focusin", function (event) {
    const target = event.target;
    if (target.nodeName == "INPUT") {
        if (target.classList.contains("is-defalt")) {
            target.value = "";
            target.classList.remove("is-defalt");
        }
    }
});
attrBox.addEventListener("focusout", function (event) {
    const target = event.target;
    if (target.nodeName == "INPUT") {
        const obj = basObjects.get(attrBox.dataset.objId);
        const attr = target.parentNode.previousElementSibling.innerHTML.trim();
        console.log(
            "attrBox.dataset.animeIndex =" + attrBox.dataset.animeIndex
        );
        if (attrBox.dataset.animeIndex == "0") {
            if (target.value == "") {
                target.value = target.dataset.defalt;
                target.classList.add("is-defalt");
                delete obj[attr];
            } else {
                target.classList.remove("is-defalt");
                obj[attr] = target.value;
            }
        } else {
            const animeItem =
                obj.animeList[attrBox.dataset.animeIndex.valueOf()];
            if (target.value == "") {
                target.value = target.dataset.defalt;
                target.classList.add("is-defalt");
                delete animeItem.animeContent[attr];
            } else {
                target.classList.remove("is-defalt");
                animeItem.animeContent[attr] = target.value;
            }
        }
    }
});
attrBox.addEventListener("attrBox_refresh", function (event) {
    console.log("attrBox_refresh");
    const obj = basObjects.get(event.detail);
    if (!obj) {
        console.log("obj不存在");
        return;
    }
    this.dataset.objId = event.detail;
    const ownerNameSpan = document.getElementById("attr-list-owner-name");
    ownerNameSpan.innerHTML = obj.name;
    const animeIndexSpan = document.getElementById("attr-list-anime-index");
    animeIndexSpan.innerHTML = "0";
    this.dataset.animeIndex = "0";

    attrBox_tables.forEach(function (attrBox_table) {
        attrBox_table.classList.add("is-hidden");
    });
    const attr_table = attrBox_tables.get(obj.type);
    attr_table.classList.remove("is-hidden");

    const rows = attr_table.tBodies[0].rows;
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        const attr = row.cells[0].innerHTML.trim();

        inputBox = row.cells[1].firstElementChild;
        inputBox.value = obj[attr];
        if (obj.hasOwnProperty(attr)) {
            inputBox.classList.remove("is-defalt");
        } else {
            inputBox.classList.add("is-defalt");
        }
    }
});
attrBox.addEventListener("attrBox_updateAnimeInfo", function (event) {
    console.log("attrBox_updateAnimeInfo");
    const obj = basObjects.get(this.dataset.objId);
    if (!obj) {
        console.log("obj不存在");
        return;
    }
    this.dataset.animeIndex = event.detail;
    const animeIndexSpan = document.getElementById("attr-list-anime-index");
    animeIndexSpan.innerHTML = event.detail;
    const animeItem = obj.animeList[event.detail];

    const attr_table = attrBox_tables.get(obj.type);
    const rows = attr_table.tBodies[0].rows;
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        row.classList.remove("is-changed-by-keyframe");
    }

    if (event.detail == "0") {
        return;
    } else {
        console.log("event.detail != 0");
        for (const key in animeItem.animeContent) {
            if (animeItem.animeContent.hasOwnProperty(key)) {
                const value = animeItem.animeContent[key];

                const attr_table = attrBox_tables.get(obj.type);
                const rows = attr_table.tBodies[0].rows;
                for (let index = 0; index < rows.length; index++) {
                    const row = rows[index];
                    const attr = row.cells[0].innerHTML.trim();
                    if (attr == key) {
                        inputBox = row.cells[1].firstElementChild;
                        inputBox.value = value;
                        inputBox.classList.remove("is-defalt");
                        row.classList.add("is-changed-by-keyframe");
                        break;
                    }
                }
            }
        }
    }
});

animeTimelineBox.addEventListener("click", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        let customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "attrBox_refresh",
            false,
            false,
            target.dataset.objId
        );
        attrBox.dispatchEvent(customEvent);

        customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "animeListBox_refresh",
            false,
            false,
            target.dataset.objId
        );
        animeListBox.dispatchEvent(customEvent);
    } else if (target.nodeName == "BUTTON") {
        switch (target.id) {
            case "btn--hide-anime-track":
                {
                    const parentTD =
                        target.parentNode.parentNode.previousElementSibling;

                    var index = [].indexOf.call(
                        animeTimelineBox_contentTable.tBodies[0].querySelectorAll(
                            "tr"
                        ),
                        parentTD.parentNode
                    );

                    const obj = basObjects.get(parentTD.dataset.objId);
                    obj.isShowingAnimeTrack = false;

                    animeTimelineBox_leftTable.tBodies[0].removeChild(
                        animeTimelineBox_leftTable.tBodies[0].querySelectorAll(
                            "tr"
                        )[index]
                    );
                    animeTimelineBox_contentTable.tBodies[0].removeChild(
                        parentTD.parentNode
                    );
                }
                break;
            case "btn--new-anime-item":
                {
                    const parentTD =
                        target.parentNode.parentNode.previousElementSibling;
                    const obj = basObjects.get(parentTD.dataset.objId);

                    const newAnimeItem = new AnimeItem(20);
                    obj.animeList.push(newAnimeItem);

                    let customEvent = document.createEvent("CustomEvent");
                    customEvent.initCustomEvent(
                        "animeTimelineBox-refreshAnimeTrack",
                        false,
                        false,
                        parentTD
                    );
                    animeTimelineBox.dispatchEvent(customEvent);

                    customEvent = document.createEvent("CustomEvent");
                    customEvent.initCustomEvent(
                        "animeListBox_refresh",
                        false,
                        false,
                        parentTD.dataset.objId
                    );
                    animeListBox.dispatchEvent(customEvent);

                    // customEvent = document.createEvent("CustomEvent");
                    // customEvent.initCustomEvent(
                    //     "animeListBox-addAnimeItem",
                    //     false,
                    //     false,
                    //     parentTD
                    // );
                    // animeListBox.dispatchEvent(customEvent);
                }
                break;
        }
    }
});
animeTimelineBox.addEventListener("animeTimelineBox-showAnimeTrack", function (
    event
) {
    const obj = basObjects.get(event.detail);
    if (!obj) {
        console.log("obj不存在");
        return;
    }
    if (!obj.isShowingAnimeTrack) {
        obj.isShowingAnimeTrack = true;

        let tbody = animeTimelineBox_leftTable.tBodies[0];
        let newCell = tbody.insertRow(-1).insertCell(-1);
        newCell.dataset.objId = obj.id;
        newCell.className = "type-name--" + obj.type;

        const newSpan = document.createElement("span");
        newCell.appendChild(newSpan);

        newSpan.innerHTML = obj.name.trim();

        tbody = animeTimelineBox_contentTable.tBodies[0];
        newCell = tbody.insertRow(-1).insertCell(-1);
        newCell.dataset.objId = obj.id;

        const animeList = obj.animeList;
        for (let index = 0; index < animeList.length; index++) {
            const animeItem = animeList[index];
            const newAnimeItemDiv = document.createElement("div");
            newAnimeItemDiv.style.width = animeItem.duration * 10 + "px";
            newAnimeItemDiv.dataset.animeIndex = index;
            newCell.appendChild(newAnimeItemDiv);
        }
    }
});
animeTimelineBox.addEventListener(
    "animeTimelineBox-refreshAnimeTrack",
    function (event) {
        const parentTD = event.detail;
        parentTD.innerHTML = "";

        const obj = basObjects.get(parentTD.dataset.objId);
        if (!obj) {
            console.log("obj不存在");
            return;
        }

        const animeList = obj.animeList;
        for (let index = 0; index < animeList.length; index++) {
            const animeItem = animeList[index];
            const newAnimeItemDiv = document.createElement("div");
            newAnimeItemDiv.style.width = animeItem.duration * 10 + "px";
            newAnimeItemDiv.dataset.animeIndex = index;
            parentTD.appendChild(newAnimeItemDiv);
        }
    }
);
animeTimelineBox_contentTable.addEventListener("mouseover", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        if (target.parentNode.parentNode.nodeName == "TBODY") {
            target.parentNode.appendChild(animeHoverTool.parentNode);
            animeHoverTool.classList.remove("is-hidden");
        }
    } else if (target.nodeName == "DIV") {
        if (target.parentNode.nodeName == "TD") {
            animeHoverTool.classList.remove("is-hidden");
        }
    }
});
animeTimelineBox_contentTable.addEventListener("mouseout", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        if (!target.parentNode.contains(event.relatedTarget)) {
            animeHoverTool.classList.add("is-hidden");
        }
    } else if (target.nodeName == "DIV") {
        if (!target.parentNode.contains(event.relatedTarget)) {
            animeHoverTool.classList.add("is-hidden");
        }
    }
});

animeListBox.addEventListener("click", function (event) {
    const target = event.target;
    const obj = basObjects.get(this.dataset.objId);
    if (target.nodeName == "TD") {
        let customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "attrBox_refresh",
            false,
            false,
            this.dataset.objId
        );
        attrBox.dispatchEvent(customEvent);

        const index = target.parentNode.firstChild.innerHTML.trim();
        customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "attrBox_updateAnimeInfo",
            false,
            false,
            index
        );
        attrBox.dispatchEvent(customEvent);
    } else if (target.nodeName == "BUTTON") {
        const parentTR = target.parentNode.parentNode.parentNode;
        let index = [].indexOf.call(
            animeListBox_table.tBodies[0].querySelectorAll("tr"),
            parentTR
        );
        switch (target.id) {
            case "btn--duplicate-anime-item":
                {
                    if (index == -1) {
                        console.log("tfoot");
                        return;
                    }
                    obj.animeList.splice(index, 0, obj.animeList[index].copy());
                }
                break;
            case "btn--insert-anime-item":
                {
                    const newAnimeItem = new AnimeItem(20);
                    obj.animeList.splice(index, 0, newAnimeItem);
                }
                break;
            case "btn--delete-anime-item":
                {
                    if (index == -1) {
                        console.log("tfoot");
                        return;
                    }
                    obj.animeList.splice(index, 1);
                }
                break;
        }
        let customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "animeListBox_refresh",
            false,
            false,
            this.dataset.objId
        );
        animeListBox.dispatchEvent(customEvent);

        const rows = animeTimelineBox_contentTable.tBodies[0].rows;
        index = 0;
        for (; index < rows.length; index++) {
            if (rows[index].cells[0].dataset.objId == this.dataset.objId) {
                break;
            }
        }

        console.log(index);
        customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(
            "animeTimelineBox-refreshAnimeTrack",
            false,
            false,
            rows[index].cells[0]
        );
        animeTimelineBox.dispatchEvent(customEvent);
    }
});
animeListBox.addEventListener("mouseover", function (event) {
    const target = event.target;
    if (target.nodeName == "TD") {
        if (
            target.parentNode.parentNode.nodeName == "TBODY" ||
            target.parentNode.parentNode.nodeName == "TFOOT"
        ) {
            target.parentNode.appendChild(animeListHoverToolTD);
            showAnimeListHoverToolBtn.classList.remove("is-hidden");
        }
    } else if (target.id == "btn--show-anime-list-box-hover-tool") {
        // const rect = animeListHoverToolTD.getBoundingClientRect();
        // animeListHoverTool.style.left = rect.left - 100 + "px";
        // animeListHoverTool.style.top = rect.top + "px";
        animeListHoverTool.classList.remove("is-hidden");
    }
});
animeListBox.addEventListener("mouseout", function (event) {
    const target = event.target;
    // console.log(target.nodeName + "   > " + event.relatedTarget.nodeName);
    if (target.nodeName == "TD") {
        if (target.parentNode.contains(event.relatedTarget)) {
            return;
        }
        // console.log("11");
        animeListHoverTool.classList.add("is-hidden");
        showAnimeListHoverToolBtn.classList.add("is-hidden");
    }
});
animeListBox.addEventListener("focusin", function (event) {
    const target = event.target;
    if (target.nodeName == "INPUT") {
        if (target.classList.contains("is-defalt")) {
            target.value = "";
            target.classList.remove("is-defalt");
        }
    }
});
animeListBox.addEventListener("focusout", function (event) {
    const target = event.target;
    if (target.nodeName == "INPUT") {
        const obj = basObjects.get(animeListBox.dataset.objId);
        const attr = target.parentNode.dataset.attr;
        const index = target.parentNode.parentNode.firstChild.innerHTML.trim();
        if (target.value == "") {
            target.value = target.parentNode.dataset.defalt;
            obj.animeList[index][attr] = target.parentNode.dataset.defalt;
            target.classList.add("is-defalt");
        } else {
            target.classList.remove("is-defalt");
            obj.animeList[index][attr] = target.value;
        }
        console.log(obj.animeList);
    }
});
animeListBox.addEventListener("animeListBox_refresh", function (event) {
    const obj = basObjects.get(event.detail);
    if (!obj) {
        console.log("obj不存在");
        return;
    }
    this.dataset.objId = event.detail;
    const ownerNameSpan = document.getElementById("anime-list-owner-name");
    ownerNameSpan.innerHTML = obj.name;

    const tbody = animeListBox_table.tBodies[0];
    const animeList = obj.animeList;
    tbody.innerHTML = "";
    for (let index = 0; index < animeList.length; index++) {
        const animeItem = animeList[index];

        const newRow = tbody.insertRow(-1);
        let newCell = newRow.insertCell(-1);
        newCell.innerHTML = index;

        let newInput = document.createElement("input");
        newInput.type = "text";
        newInput.value = animeItem.duration;
        newInput.classList.add("is-defalt");
        newCell = newRow.insertCell(-1);
        newCell.dataset.attr = "duration";
        newCell.dataset.defalt = 20;
        newCell.appendChild(newInput);

        newInput = document.createElement("input");
        newInput.type = "text";
        newInput.value = animeItem.timingFunction;
        newInput.classList.add("is-defalt");
        newCell = newRow.insertCell(-1);
        newCell.dataset.attr = "timingFunction";
        newCell.dataset.defalt = "";
        newCell.appendChild(newInput);
    }
});
// animeListBox.addEventListener("animeListBox-addAnimeItem", function (event) {
//     const parentTD = event.detail;
//     const obj = basObjects.get(parentTD.dataset.objId);
//     if (!obj) {
//         console.log("obj不存在");
//         return;
//     }

//     const animeList = obj.animeList;
//     const tbody = animeListBox_table.tBodies[0];
//     const newRow = tbody.insertRow(-1);
//     let newCell = newRow.insertCell(-1);
//     newCell.innerHTML = animeList[animeList.length - 1].duration;
//     newCell = newRow.insertCell(-1);
//     newCell.innerHTML = animeList[animeList.length - 1].timingFunction;
// });
document.getElementById("basRun").addEventListener("click", function () {
    let skipAttr = ["id", "name", "isShowingAnimeTrack", "animeList"];
    let basStrings = [];
    for (var id in basObjects.datastore) {
        obj = basObjects.datastore[id];
        basStrings.push("def " + obj.type + " " + obj.id + " {\n");
        for (const attr in obj) {
            if (skipAttr.indexOf(attr) != -1) {
                continue;
            }
            if (obj.hasOwnProperty(attr)) {
                const value = obj[attr];
                basStrings.push("    " + attr + " = " + value + "\n");
            }
        }
        basStrings.push("}\n");
    }
    let basString = basStrings.join("");
    console.log(basString);
    let url = encodeURI("bas/index.html#/playground?code=" + basString);
    document.getElementById("bas-iframe").src = url;
    document.getElementById('bas-iframe').contentWindow.location.reload();
    //window.frames["bas-iframe"].location.href = url;
});
