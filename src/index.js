import Blockly from 'blockly';
import Phaser from 'phaser';
import map1 from './stage/tilemap.json';
import tiles from './stage/map.png';
import player1 from './stage/player.png';
var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 600,
    parent: 'phaserDiv',
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 0,
            },
            debug: false,
        }
    },
    //ここにシーンを追加(preloadとかはここで定義しなくても良い)
    scene: {
        preload: preload, // 以下に定義する preload 関数をセットする
        create: create, // 以下に定義する create 関数をセットする
        update: update // 以下に定義する update 関数をセットする
    },
    render: {
        transparent: true,
    },
};

const blocklyDiv = document.getElementById("blocklyDiv");
blocklyDiv.style.left = config.width;
var player;
// ゲーム開始!!!
var game = new Phaser.Game(config);
// ゲーム開始前に呼び出される関数定義
function preload ()
{ // アセット（画像とか）の取得を行う
    //ここのthisはおそらくPhaser.AUTOのこと
    this.load.tilemapTiledJSON('map1', map1);
    this.load.image("tiles", tiles);
    this.load.spritesheet("player", player1, { frameWidth: 32, frameHeight: 48});
}
var mapDat;
var map2Img;
// ゲーム開始時に呼び出される関数
function create ()
{ // 背景を設定したり、プレイヤーの初期配置をしたりする
    //canvasとmapの大きさは比率も合わせて一致している必要があります。
    mapDat = this.add.tilemap("map1");
    let tileset = mapDat.addTilesetImage("tileset", "tiles");
    this.backgroundLayer = mapDat.createLayer("ground", tileset);
    map2Img = game.canvas.width / this.backgroundLayer.width;
    this.backgroundLayer.setScale(map2Img);

    let playerX=0;
    let playerY=0;
    //これ、このままではまずくて、ステージとキャラクターのズレをなくすためにステージと同じ座標軸でキャラクターを配置したい
    player = this.add.sprite(mapDat.tileWidth * playerX * map2Img, mapDat.tileWidth * (playerY+0.9) * map2Img, "player");
    //player.setOrigin(0, 1);
    player.gridX=playerX;
    player.gridY=playerY;
    player.targetX = player.x;
    player.targetY = player.y;

    //ボタンを押すと発火するようにする
    const executeButton = document.getElementById("executeButton");
    executeButton.onclick = LoadBlocksandGenerateCommand;
}

//ゲーム再生用変数
const cmdDelta=45;
var tick=0;
var isRunning=false;
let commandGenerator=undefined;
// ゲーム進行時に呼び出される関数
function update ()
{ //プレイヤーを動かしたり、衝突判定からのロジックを回したり
    //ここでblockが使われたらこの動作をします的なことを書きます
    //多分キャラクターの座標更新だけなので難しくなさそう。

    //キャラクターの座標更新
    if (player.targetX != player.x) {
        const difX = player.targetX - player.x;
        player.x += difX / Math.abs(difX) * 1;  // とてもよくない(画像サイズ規定を設けるor微分方程式なので減衰覚悟でやる)
    }
    if (player.targetY != player.y) {
        const difY = player.targetY - player.y;
        player.y += difY / Math.abs(difY) * 1;
    }
    //コマンドが生成されている時それを実行する
    runCode();
}
//これでブロックを追加
Blockly.Blocks['lightswitch'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Turn")
          .appendField(new Blockly.FieldDropdown([["red","R"], ["blue","B"]]), "lightcolor")
          .appendField(new Blockly.FieldDropdown([["on","T"], ["off","F"]]), "switch");
      this.setColour(270);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};
Blockly.Blocks['move'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Move")
          .appendField(new Blockly.FieldDropdown([["→", "0"],["←", "1"],["↑", "2"],["↓", "3"]]), "move_direction");
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setColour(270);
      this.setTooltip("");
      this.setHelpUrl("");
    }
};
  //ブロックの実際の機能を定義
  Blockly.JavaScript['stoplightswitch'] = function(block) {
    var dropdown_colorlist = block.getFieldValue('colorlist');
    var dropdown_switch = block.getFieldValue('switch');
    var value_lightno = Blockly.JavaScript.valueToCode(block, 'lightno', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  Blockly.JavaScript['move'] = function(block) {
    var dropdown_direction = block.getFieldValue('move_direction');
    var code = `tryMove(player,${dropdown_direction});yield true;\n`;
    return code;
  };

function tryMove(player, dir) {
    // ここはこれでいいの？ってなるけど
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, -1, 1];
    const nextGX = player.gridX + dx[dir];
    const nextGY = player.gridY + dy[dir];
    //if (mapDat.isWall[nextGY][nextGX])    return;//壁には進めない
    player.targetX += dx[dir] * mapDat.tileWidth * map2Img;
    player.gridX = nextGX;
    player.targetY += dy[dir] * mapDat.tileHeight * map2Img;
    player.gridY = nextGY;
    
}
  var options = {
    toolbox: document.getElementById('toolbox'),
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    grid: {
      spacing: 20,
      length: 1,
      colour: '#888',
      snap: true
    }
  }

  //put the toolbox in the workspace
  var workspace = Blockly.inject('blocklyDiv', options);
  // take the text generated by the blocks and run it as code
  function runCode() {
    if (isRunning) {
        if (++tick === cmdDelta) {
            console.log(commandGenerator);
            let gen = commandGenerator.next();//yieldで止まってたコマンドを再開する
            if (!gen.done) tick = 0;
            else {
                console.log("end command");
                endRunning();
            }
        }
    }
  }
  function endRunning(){
      isRunning=false;
      tick=0;
  }
function LoadBlocksandGenerateCommand(){//ボタンを押すと発火
    //多分player位置の初期化もしないといけない
    window.LoopTrap = 1000;
      Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";¥n';
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      console.log(code);
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
      try{
        commandGenerator=eval("(function* () {" + code + "})()");
        if(!isRunning)isRunning=true;
      }catch(e){
          console.log(e);
      }
      
}