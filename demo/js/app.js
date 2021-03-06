var Widget = Intact.extend({
    defaults: {
        name: 'Javey'
    },

    template: '<div ev-click={_.bind(self.change, self)}>{self.get("name")}</div>',

    change: function() {
        this.set('name', 'Hello Javey!');
    }
});

Intact.mount(Widget, document.body);

/**
 * 继承
 */

var Card = Intact.extend({
    defaults: {
        title: 'card'
    },

    template: '<div ev-click={_.bind(self.click, this)}>{self.get("title")}</div>',

    click: function() {
        alert('click card');
    }
});

// 继承Card组件
var TableCard = Card.extend({
    click: function() {
        alert('click tableCard');
    }
});

Intact.mount(TableCard, $('body')[0]);

var Card1 = Intact.extend({
    defaults: {
        title: 'card'
    },

    template: $('#card_template').html(),

    click: function() {
        alert('click card');
    }
});

// 继承Card组件
var TableCard1 = Card1.extend({
    template: $('#tableCard_template').html(),

    click: function() {
        alert('click tableCard');
    }
});

Intact.mount(TableCard1, $('body')[0]);

// 继承Card组件
var TableCardThis = Card1.extend({
    template: $('#tableCard_template_this').html(),

    _init: function() {
        // 注入card模板函数
        this.card = Vdt.compile($('#card_template').html());
        // 调用父类_init
        this._super();
    },

    click: function() {
        alert('click tableCard');
    }
});

Intact.mount(TableCardThis, $('body')[0]);

// 通过require.js加载模板
require(['/demo/tpl/tableCard.js'], function(template) {
    // 继承Card组件
    var TableCard = Card1.extend({
        template: template,

        click: function() {
            alert('click tableCard which is required by require.js');
        }
    });

    Intact.mount(TableCard, $('body')[0]);
});

/**
 * 组合
 */
var ComponentCard = Intact.extend({
    template: '<Card title="component card" />',

    _init: function() {
        this.Card = Card;
        this._super();
    }
});

Intact.mount(ComponentCard, $('body')[0]);

var ComponentCard1 = Intact.extend({
    template: '<div><Card title="component card" widget="card" /><div ev-click={_.bind(self.click, this)}>Click Me</div></div>',

    _init: function() {
        // 注入Card组件
        this.Card = Card;
        this._super();
    },

    click: function() {
        // 调用Card的click方法
        this.widgets.card.click();
        alert('You click me');
    }
});
Intact.mount(ComponentCard1, $('body')[0]);


var ComponentCard2 = Intact.extend({
    template: $('#event_template').html(),

    _init: function() {
        // 注入Card组件
        this.Card = Card;
        this._super();
    },

    click: function() {
        // 改变Card组件的title
        this.widgets.card.set('title', 'The title has changed');
    },

    onChangeTitle: function(widget, title) {
        alert('The title has changed to "' + title + '"');
    }
});
Intact.mount(ComponentCard2, $('body')[0]);
