let roleMap = {
    1: {
        name: '勇者',
        url: 'role/hero'
    },
    2: {
        name: '骷髅王',
        url: 'role/npc'
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        picScript: cc.Sprite,
        nameLabel: cc.Label,
        textLabel: cc.Label,
    },

    onLoad () {
        /*
        this.init([
            {role: 2, content: '我是魔王啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'},
            {role: 1, content: '大家好，我是勇者'},
            
        ]);
        */

        // exposed to global
        window.dialog = this.node;

        cc.systemEvent.on('keydown', this.onKeyDown, this);
    },

    onKeyDown (e) {
        switch (e.keyCode) {
            case cc.macro.KEY.space: {
                this.nextTextData();
                break;
            }
        }
    },

    init (textDataArr) {
        this.nowText = null;
        this.textEnd = true;
        this.tt = 0;

        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.node.active = true;
        this.nextTextData();

    },

    nextTextData () {
        // while textEnd is true, can we load the next dialog
        if (!this.textEnd) return;
        if (++this.textIndex < this.textDataArr.length) {
            this.setTextData(this.textDataArr[this.textIndex]);
        } else {
            this.closeDialog();
        }
    },

    setTextData (textData) {
        //if (!this.textEnd) return;  
        
        this.textEnd = false;

        this.nameLabel.string = roleMap[textData.role].name;
        //init string is null string, and end up with show content completely
        this.textLabel.string = '';
        // nowText as an temp string to store the full content
        this.nowText = textData.content;

        // cc.loader is widely use to load dynamic sources
        // texture receive the url and find the content 
        cc.loader.loadRes(roleMap[textData.role].url, cc.SpriteFrame, (err, texture) => {
            this.picScript.spriteFrame = texture;
        });
    },

    closeDialog () {
        this.node.active = false; 
    },

    //start () { },

    // invoked from start, dt increase linearly
    update (dt) {
        if (!this.nowText) return;
        this.tt += dt;

        
        if (this.tt > 0.03) {
            if (this.textLabel.string.length < this.nowText.length) {
                this.textLabel.string = this.nowText.slice(0, this.textLabel.string.length + 1)
            } else {
                // reset nowText, and set textEnd to true
                this.textEnd = true;
                this.nowText = null;
            }
            //console.log(this.tt);
            // reset tt to pop out a character every time dt pass through 0.03
            this.tt = 0;
        }
        
    },
});
