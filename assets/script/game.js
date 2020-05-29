cc.Class({
    extends: cc.Component,

    properties: {
        // Binding tiledMap(the property) to cc.TiledMap(allow us to add file in Cocos Creator)
        //tiledMap: cc.TiledMap,
        
        //mapNode to read the node in Cocos as map
        mapNode: cc.Node,
        // allow game.js to access the "dialog" node
        dialogNode: cc.Node,
    },

    onLoad () {
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        // Draw collider space 绘制碰撞区域
        //p.debugDrawFlags = true;
        p.gravity = cc.v2(0, 0);
        
    },

    start () { 
        // get data from TiledMap, tiledMap is what we select in Cocos Creator
        for (let mapNode of this.mapNode.children) {

            let tiledMap = mapNode.getComponent(cc.TiledMap);
            let tiledSize = tiledMap.getTileSize();
            let layer = tiledMap.getLayer('wall');
            let layerSize = layer.getLayerSize();

            for (let i = 0; i < layerSize.width; i++){
                for (let j = 0; j < layerSize.height; j++){
                    // set every tiled's arttribute
                    let tiled = layer.getTiledTileAt(i, j, true);
                    //check if there exists a block in map
                    if (tiled.gid != 0){
                        // set tiled's group in order to make collision
                        tiled.node.group = 'wall';

                        // add an component to each tiled and bind it with "body"
                        let body = tiled.node.addComponent(cc.RigidBody);
                        //use body. to set RigidBody's arttribute
                        body.type = cc.RigidBodyType.Static;
                        //PhysicsBoxCollider's defult anthor is center point
                        let collider =tiled.node.addComponent(cc.PhysicsBoxCollider);
                        //since the anchor in map we set is left-down, we add offset to collider
                        collider.offset = cc.v2(tiledSize.width / 2 ,tiledSize.height / 2);
                        collider.size = tiledSize;
                        // we need to apply the collider
                        collider.apply();
                    }
                }
            }
        }

        // to catch the script (which called "dialog" in dialog-bubble)
        this.dialog = this.dialogNode.getComponent('dialog');

        /*

        this.dialog.init([
            {role: 2, content: '我是魔王啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'},
            {role: 1, content: '大家好，我是勇者'},
        ]);
        
        */

    },

    // update (dt) {},
});
