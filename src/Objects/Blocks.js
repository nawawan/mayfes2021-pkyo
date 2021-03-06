import Blockly, { CollapsibleToolboxCategory__Class } from 'blockly';
import mahojin_b from "../images/mahojin_b.png";
import mahojin_w from "../images/mahojin_w2.png";

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
  Blockly.JavaScript['move'] = function(block) {
    var dropdown_direction = block.getFieldValue('move_direction');
    var code = `this.tryMove(this.player,${dropdown_direction});yield "${block.id}";this.ismoving=false;\n`;
    return code;
  };
  Blockly.Blocks['moveforward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("前に１マス動く")
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setColour(270);
      this.setTooltip("");
      this.setHelpUrl("");
    }
};
  Blockly.JavaScript['moveforward'] = function(block) {
    var code = `this.tryMove(this.player,this.getDirection(this.player));yield "${block.id}";this.ismoving=false;\n`;
    return code;
  };
  Blockly.Blocks['turn'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("次の方向を向く:")
          .appendField(new Blockly.FieldDropdown([["右", "0"],["左", "1"],["後ろ", "2"]]), "turn_direction");
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setColour(270);
      this.setTooltip("");
      this.setHelpUrl("");
    }
};
  Blockly.JavaScript['turn'] = function(block) {
    var dropdown_direction = block.getFieldValue('turn_direction');
    var code = `this.changeDirection(this.player,${dropdown_direction});yield "${block.id}";\n`;
    return code;
  };
  Blockly.Blocks['while'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable("この中をくりかえします"), "string");
      this.appendStatementInput("NAME")
          .setCheck(null);
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['while'] = function(block) {
    var childblock=Blockly.JavaScript.statementToCode(block, 'NAME');
    var code = `while(true){${childblock}}\n`;
    return code;
  };

  Blockly.Blocks['remove'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("岩を取り除く")
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setColour(300);
      this.setTooltip("");
      this.setHelpUrl("");
    }
};
  Blockly.JavaScript['remove'] = function(block) {
    var code = `this.removeObstacle(this.player);yield "${block.id}";\n`;
    return code;
  };

Blockly.Blocks['if'] = {
  init: function() {
    this.appendDummyInput().appendField("もし");
    this.appendValueInput("condition")
        .setCheck(null);
    this.appendDummyInput().appendField("なら");
    this.appendStatementInput("iftrue");
    this.appendDummyInput().appendField("そうでないなら");
    this.appendStatementInput("iffalse");
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['if'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_iftrue = Blockly.JavaScript.statementToCode(block, 'iftrue');
  var statements_iffalse = Blockly.JavaScript.statementToCode(block, 'iffalse');
  if(value_condition == "") value_condition = "true";
  // TODO: Assemble JavaScript into code variable.
  var code = `yield "${block.id}";\n
              if(${value_condition}){
                ${statements_iftrue}
              }
              else{
                ${statements_iffalse}
              }`
  return code;
};
Blockly.Blocks['check'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["前","0"], ["右","1"], ["左","2"],["後ろ","3"]]), "direction")
        .appendField("が")
        .appendField(new Blockly.FieldDropdown([["道","this.movableLayer"], ["岩","this.obstacleLayer"]]), "thing");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['check'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_thing = block.getFieldValue('thing');
  // TODO: Assemble JavaScript into code variable.
  var code = `this.checkIf(this.player,${dropdown_direction},${dropdown_thing}, 0)`;
  return  [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['check2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["前","0"], ["右","1"], ["左","2"],["後ろ","3"]]), "direction")
        .appendField("が")
        .appendField(new Blockly.FieldDropdown([["草","this.movableLayer"], ["岩","this.obstacleLayer"]]), "thing");
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['check2'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var dropdown_thing = block.getFieldValue('thing');
  // TODO: Assemble JavaScript into code variable.
  var code;
  if(dropdown_thing === "this.movableLayer") code = `this.checkIf(this.player,${dropdown_direction},${dropdown_thing}, 1)\n`;
  else code = `this.checkIf(this.player,${dropdown_direction},${dropdown_thing}, 0)\n`;
  return  [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['grouping'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("グループの名前：")
        .appendField(new Blockly.FieldTextInput('group1'),'group_name');
    this.appendDummyInput()
        .appendField("内容");
    this.appendStatementInput("group_code");
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['grouping'] = function(block) {
  var group_name = "group-"+block.getFieldValue('group_name');
  var group_code = Blockly.JavaScript.statementToCode(block,'group_code');
  // TODO: Assemble JavaScript into code variable.
  var code = `
    this.funcs['${group_name}']=function*(){
      ${group_code}
    }.bind(this);
    yield null;
    `;
  return  code;
};
Blockly.Blocks['callgroup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("グループ")
        .appendField(new Blockly.FieldTextInput('group1'),'group_name')
        .appendField("を実行");
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['callgroup'] = function(block) {
  var raw_group_name=block.getFieldValue('group_name');
  var group_name = "group-"+raw_group_name;
  // TODO: Assemble JavaScript into code variable.
  var code = `
      yield "${block.id}";
      if(typeof this.funcs['${group_name}']!="function"){alert("${raw_group_name}というグループはありません！");return;}
      else{
        let tmp_gen=this.funcs['${group_name}']();
        while(true){
          let gen_res=tmp_gen.next();
          if(gen_res.done){
            break;
          }else{
            yield gen_res.value;
          }
        }
      }
    `;
  return  code;
};

Blockly.Blocks['and'] = {
  init: function() {
    this.appendValueInput("a")
        .setCheck(null);
    this.appendDummyInput().appendField("かつ");
    this.appendValueInput("b")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['and'] = function(block) {
  var value_a = Blockly.JavaScript.valueToCode(block, 'a', Blockly.JavaScript.ORDER_ATOMIC);
  var value_b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `(${value_a} && ${value_b})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['or'] = {
  init: function() {
    this.appendValueInput("a")
        .setCheck(null);
    this.appendDummyInput().appendField("または");
    this.appendValueInput("b")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['or'] = function(block) {
  var value_a = Blockly.JavaScript.valueToCode(block, 'a', Blockly.JavaScript.ORDER_ATOMIC);
  var value_b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `(${value_a} || ${value_b})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['if_and'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("もし");
    this.appendValueInput("cond1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("かつ");
    this.appendValueInput("cond2")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("なら");
    this.appendStatementInput("iftrue")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("そうでないなら");
    this.appendStatementInput("iffalse")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['if_and'] = function(block) {
  var value_condition1 = Blockly.JavaScript.valueToCode(block, 'cond1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condition2 = Blockly.JavaScript.valueToCode(block, 'cond2', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_iftrue = Blockly.JavaScript.statementToCode(block, 'iftrue');
  var statements_iffalse = Blockly.JavaScript.statementToCode(block, 'iffalse');
  console.log(value_condition2 == "");
  if(value_condition1 == "") value_condition1 = "true";
  if(value_condition2 == "") value_condition2 = "true";
  // TODO: Assemble JavaScript into code variable.
  var code = `yield "${block.id}";\nif(${value_condition1} && ${value_condition2}){${statements_iftrue}}\nelse{${statements_iffalse}};\n`;
  return code;
};

Blockly.Blocks['if_or'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("もし");
    this.appendValueInput("cond1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("または");
    this.appendValueInput("cond2")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("なら");
    this.appendStatementInput("iftrue")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("そうでないなら");
    this.appendStatementInput("iffalse")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['if_or'] = function(block) {
  var value_condition1 = Blockly.JavaScript.valueToCode(block, 'cond1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condition2 = Blockly.JavaScript.valueToCode(block, 'cond2', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_iftrue = Blockly.JavaScript.statementToCode(block, 'iftrue');
  var statements_iffalse = Blockly.JavaScript.statementToCode(block, 'iffalse');
  if(value_condition1 == "") value_condition1 = "true";
  if(value_condition2 == "") value_condition2 = "true";
  // TODO: Assemble JavaScript into code variable.
  var code = `yield "${block.id}";\nif(${value_condition1} || ${value_condition2}){${statements_iftrue}}\nelse{${statements_iffalse}}\n`;
  return code;
};

Blockly.Blocks['can_teleport'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[{"src":mahojin_b,"width":15,"height":15,"alt":"*"},"black"], [{"src":mahojin_w,"width":15,"height":15,"alt":"*"},"white"]]), "place")
        .appendField("にいる");
    this.setOutput(true, null);
    this.setColour(40);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['can_teleport'] = function(block) {
  var dropdown_place = block.getFieldValue('place');
  // TODO: Assemble JavaScript into code variable.
  let id = 0;
  console.log(dropdown_place);
  if(dropdown_place == "white") id = 557;
  else id = 556;
  var code = `this.teleportLayer.hasTileAt(this.player.gridX, this.player.gridY) && this.teleportLayer.getTileAt(this.player.gridX, this.player.gridY).index == ${id}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['teleportation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("同じマークがある場所に");
    this.appendDummyInput()
        .appendField("テレポートする");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['teleportation'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = `
      //関数を呼びます
      this.run_teleport();
      yield "${block.id}";`;
  return code;
};

Blockly.Blocks['while_if'] = {
  init: function() {
    this.appendValueInput("if_true")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("であるかぎり");
    this.appendStatementInput("child")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("をくりかえす");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['while_if'] = function(block) {
  var if_true = Blockly.JavaScript.valueToCode(block, 'if_true', Blockly.JavaScript.ORDER_ATOMIC);
  var childblock = Blockly.JavaScript.statementToCode(block, 'child');
  // TODO: Assemble JavaScript into code variable.
  var code = `yield "${block.id}"; while(${if_true}){${childblock}}\n`;
  return code;
};

Blockly.Blocks['check_energy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("体力が")
        .appendField(new Blockly.FieldDropdown([["0以上","more"], ["0より小さい","less"]]), "cond")
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['check_energy'] = function(block) {
  var cond = block.getFieldValue('cond');
  var code;
  if(cond == "more") code = 'this.leftenergy >= 0';
  else code = 'this.leftenergy < 0';
  return  [code, Blockly.JavaScript.ORDER_NONE];
};