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
        this.init([
            {role: 2, content: '我是魔王'},
            {role: 1, content: '大家好，我是勇者'},
            
        ]);

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
        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.node.active = true;
        this.nextTextData();

    },

    nextTextData () {
        if (++this.textIndex < this.textDataArr.length) {
            this.setTextData(this.textDataArr[this.textIndex]);
        } else {
            this.closeDialog();
        }
    },

    setTextData (textData) {
        this.nameLabel.string = roleMap[textData.role].name;
        this.textLabel.string = textData.content;

        cc.loader.loadRes(roleMap[textData.role].url, cc.SpriteFrame, (err, texture) => {
            this.picScript.spriteFrame = texture;
        });
    },

    closeDialog () {
        this.node.active = false; 
    }

    //start () { },

    // update (dt) {},
});
