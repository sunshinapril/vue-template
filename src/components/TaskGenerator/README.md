我们要怎么去认识这个玩意呢.

它的功能是, 创建或者编辑一个任务. 
它和外界的交互有几个

1, 点击创建之后, 需要刷新列表, 所以需要有一个 emit event
2, 接受来自外界传递进来的一些配置项目

除此之外, 弹窗的展示, 隐藏, 其实都是怎么说呢?
我们可以通过 refs 来做, 也可以放一个变量, 放一个变量, 也是监控变量, 也挺扯淡的, 所以暂时不做, 去他吗的. 


应用范围存起来对应的结构就可以了. 
但是其他的东西呢.

标签的存起来, 我们要怎么存起来的问题

1, 你存的值是 item.id + group.id
2, 但是后端返回给你的是什么, 也是 item.id + group.id
3, 现在就是, 以 item.id + group.id 为唯一索引, 我需要对应出来它的 label 是什么玩意.
那么这个 label 要怎么获取, 怎么记录的问题. 

是否可以就说, 点击的时候去存呢. 