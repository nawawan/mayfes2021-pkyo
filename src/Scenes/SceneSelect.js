import Phaser from 'phaser';
import {RoundedButton, SimpleButton, Simpleimage} from '../Objects/Objects.js';
import stageinfo from '../stage/stageinfo.json';
class SceneSelect extends Phaser.Scene {
    constructor(){
        super({key:"select"});
    }
    preload(){
        let sta = new Array(15);
        let ofs = 0;
        for(let i = 0; i < 15; ++i){
            let str = "stage" + i;
            sta[i] = document.getElementById(str);
            sta[i].style.left = 360 + 500 * (i % 2) + 'px';
            sta[i].style.top = ofs + 180 + 40*Math.floor(i / 2) + 'px';
            sta[i].style.visibility = "visible";
            if(i == 5) ofs += 50;
            else if(i == 9) ofs += 50;
        }
        var alert = document.getElementById("alert");
        alert.style.visibility = "hidden";
        let restraint = document.getElementById("stage11_res");
        restraint.style.visibility = "visible";
        restraint.style.left=920 + 'px';
        restraint.style.top=463 + 'px';
    }
    create(){
        this.game.scale.setGameSize(1300, 700);
        this.add.text(250, 30, 'ス テ ー ジ せ ん た く', {fontFamily: "PixelMplus10", fontSize: 70, color: 'lime'});
        this.add.text(160, 100, 'チュートリアル & 初級', {fontFamily: "PixelMplus10", fontSize: 35, color: 'maroon'});
        this.add.text(160, 270, '中級', {fontFamily: "PixelMplus10", fontSize: 35, color: 'aqua'});
        this.add.text(160, 400, '上級', {fontFamily: "PixelMplus10", fontSize: 35, color: 'purple'});
        let ofs = 0;
        var buttons = new Array(stageinfo.stages.length);
        for (let index = 0; index < stageinfo.stages.length; ++index) {
            buttons[index]=new RoundedButton(this, 200 + 500 * (index % 2), ofs + 150+40*Math.floor(index / 2), 120, 30, 0xffff00, "STAGE"+index, "red", 15);
            let discription=new SimpleButton(this, 320 + 500 * (index % 2), ofs + 150+40*Math.floor(index / 2), 150, 18, stageinfo.stages[index].description, "black");
            buttons[index].button.on('pointerdown', function(){
                this.scene.start("game",{stage_num:index});
            }.bind(this));
            let of2 = ofs;
            //ここ、カス実装
            buttons[index].button.on('pointerover', function(){
                buttons[index].button.clear();
                buttons[index].button.fillStyle(0xaff000, 1);
                buttons[index].button.fillRoundedRect(200 + 500 * (index % 2) - 13, of2 + 150+40*Math.floor(index / 2) - 2, 125, 35, 15);
                buttons[index].button.stroke();
                buttons[index].button.strokeRoundedRect(200 + 500 * (index % 2) - 13, of2 + 150+40*Math.floor(index / 2) - 2, 125, 35, 15);
                buttons[index].button.lineStyle(4, 0x000000, 1);
            });
            buttons[index].button.on('pointerout', function(){
                buttons[index].button.clear();
                buttons[index].button.fillStyle(0xffff00, 1);
                buttons[index].button.fillRoundedRect(200 + 500 * (index % 2) - 10, of2 + 150+40*Math.floor(index / 2), 120, 30, 15);
                buttons[index].button.stroke();
                buttons[index].button.strokeRoundedRect(200 + 500 * (index % 2) - 10, of2 + 150+40*Math.floor(index / 2), 120, 30, 15);
                buttons[index].button.lineStyle(4, 0x000000, 1);
            });
            if(index == 5) ofs += 50;
            else if(index == 9) ofs += 50;
        }
        let num = stageinfo.stages.length;
        let ofs3 = 40*Math.floor(num / 2);
        if(window.savenum>-1){
            var LoadButton=new RoundedButton(this, 200, 320+ofs3, 120, 30, 0xfffff00, "Load", "red", 15);
            LoadButton.button.on('pointerdown', function(){
                this.scene.start("game",{stage_num:window.savenum});
            }.bind(this));
            LoadButton.button.on('pointerover', function(){
                LoadButton.button.clear();
                LoadButton.button.fillStyle(0xaff000, 1);
                LoadButton.button.fillRoundedRect(187, 318+ofs3, 125, 35, 15);
                LoadButton.button.stroke();
                LoadButton.button.strokeRoundedRect(187, 318+ofs3, 125, 35, 15);
                LoadButton.button.lineStyle(4, 0x000000, 1);
            });
            LoadButton.button.on('pointerout', function(){
                LoadButton.button.clear();
                LoadButton.button.fillStyle(0xffff00, 1);
                LoadButton.button.fillRoundedRect(190, 320+ofs3, 120, 30, 15);
                LoadButton.button.stroke();
                LoadButton.button.strokeRoundedRect(190, 320+ofs3, 120, 30, 15);
                LoadButton.button.lineStyle(4, 0x000000, 1);
            });
        }else{
            var LoadButton=new RoundedButton(this, 200, 320+ofs3, 120, 30, 0xfffff00, "Load", "gray", 15);
            LoadButton.button.on('pointerover', function(){
                LoadButton.button.clear();
                LoadButton.button.fillStyle(0xaff000, 1);
                LoadButton.button.fillRoundedRect(187, 318+ofs3, 125, 35, 15);
                LoadButton.button.stroke();
                LoadButton.button.strokeRoundedRect(187, 318+ofs3, 125, 35, 15);
                LoadButton.button.lineStyle(4, 0x000000, 1);
            });
            LoadButton.button.on('pointerout', function(){
                LoadButton.button.clear();
                LoadButton.button.fillStyle(0xffff00, 1);
                LoadButton.button.fillRoundedRect(190, 320+ofs3, 120, 30, 15);
                LoadButton.button.stroke();
                LoadButton.button.strokeRoundedRect(190, 320+ofs3, 120, 30, 15);
                LoadButton.button.lineStyle(4, 0x000000, 1);
            });
        }
        var gototitlebottun = new RoundedButton(this, 700, 320+ofs3, 120, 30, 0xfffff00, "Title", "red", 15);
        gototitlebottun.button.on('pointerdown', function(){
            this.scene.start("title");
        }.bind(this));
        gototitlebottun.button.on('pointerover', function(){
            gototitlebottun.button.clear();
            gototitlebottun.button.fillStyle(0xaff000, 1);
            gototitlebottun.button.fillRoundedRect(687, 318+ofs3, 125, 35, 15);
            gototitlebottun.button.stroke();
            gototitlebottun.button.strokeRoundedRect(687, 318+ofs3, 125, 35, 15);
            gototitlebottun.button.lineStyle(4, 0x000000, 1);
        });
        gototitlebottun.button.on('pointerout', function(){
            gototitlebottun.button.clear();
            gototitlebottun.button.fillStyle(0xffff00, 1);
            gototitlebottun.button.fillRoundedRect(690, 320+ofs3, 120, 30, 15);
            gototitlebottun.button.stroke();
            gototitlebottun.button.strokeRoundedRect(690, 320+ofs3, 120, 30, 15);
            gototitlebottun.button.lineStyle(4, 0x000000, 1);
        });
        //いらないボタンなどを隠す(クソ実装)
        const executeButton = document.getElementById("executeButton");
        executeButton.style.visibility="hidden";
        const playerChangeButton = document.getElementById("playerChangeButton");
        playerChangeButton.style.visibility="hidden";
        const blocklyDiv = document.getElementById("blocklyDiv");
        blocklyDiv.style.visibility="hidden";
        const ButtonDiv = document.getElementById("ButtonDiv");
        ButtonDiv.style.visibility="hidden";
        const resetbutton = document.getElementById("resetbutton");
        resetbutton.style.visibility="hidden";
        const titlebutton = document.getElementById("titlebutton");
        titlebutton.style.visibility="hidden";
    }
    update(){}
} 
export default SceneSelect;