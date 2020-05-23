const Input = {};

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this._speed = 200;
        //v2 is a 2D Vector which has x and y
        this.sp = cc.v2(0, 0);

        this.state = '';
        

        //GET Animation State
        this.heroAni = this.node.getComponent(cc.Animation);

        cc.systemEvent.on('keydown', this.onKeydown, this);
        cc.systemEvent.on('keyup', this.onKeyup, this);
    },

    setState(state){
        if(this.state == state) return;

        this.state = state;
        
        //RESET Animation State to one clip
        this.heroAni.play(this.state);
        //.play('the name of Animation clip')
    },

    onKeydown(e) {
        Input[e.keyCode] = 1;
    },

    onKeyup(e) {
        Input[e.keyCode] = 0;
        
    },

    // start () { },
    
    update (dt) {
        // when there are dialogs running, player can't move
        if (window.dialog && window.dialog.active) return;
        if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]){
            this.sp.x = -1;
        } else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]){
            this.sp.x = 1;
        } else {
            this.sp.x = 0;
        }
        
        if (Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up]){
            this.sp.y = 1;
        } else if (Input[cc.macro.KEY.s] || Input[cc.macro.KEY.down]){
            this.sp.y = -1;
        } else {
            this.sp.y = 0;
        }    

        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

        if (this.sp.x) {
            //this.node.x += this.sp.x * this._speed * dt;
            this.lv.y = 0;
            this.lv.x = this.sp.x * this._speed;
        } else if (this.sp.y) {
            //this.node.y += this.sp.y * this._speed * dt;
            this.lv.x = 0;
            this.lv.y = this.sp.y * this._speed;
        } else {
            this.lv.x = this.lv.y = 0;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;

        let state = '';//state is a string connect with animation clip

        if (this.sp.x == 1) {
            state = 'hero_right';
        } else if (this.sp.x == -1) {
            state = 'hero_left';
        } else if (this.sp.y == 1) {
            state = 'hero_up';
        } else if (this.sp.y == -1) {
            state = 'hero_down';
        }
        
        if(state != null) this.setState(state);
        
    },

}); 