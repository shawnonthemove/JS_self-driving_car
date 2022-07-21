## 项目：使用原生JS实现直线版自动驾驶模型
## 要点记录：
## 1.使用canvas绘制小车和道路，小车使用四点定位法绘制，前后影响速度，左右影响方向，确定一个最大速度，之后每次更新的时候小车的x和y变化；
## 2.确定是否小车毁坏的情况，是使用线段与线段的交点来确定，getIntrsection方法实现；
## 3.control文件用来实现键盘对小车的控制；
## 4.道路的更新由bestcar的y值作为基准，每次更新时将ctx移动该值，实现道路的移动动画；
## 5.network的输入来源于sensor的值，即与sensor线段接触的物体长度，经过一个hidden layer和输出层完成动作映射。