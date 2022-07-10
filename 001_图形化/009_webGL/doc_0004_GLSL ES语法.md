## attribute变量
是一种GLSL ES变量，被用来从外部向顶点着色器内传输数据，只有顶点着色器能使用它。
属性变量是一种GLSL es变量，被用来从外部向顶点着色器内传输数据，只有顶点着色器能使用它。


sampler 取样器, 从纹理图像中获取纹素颜色的过程, 相当于从纹理图像中取样, 即输入纹理坐标, 返回颜色值,由于纹理像素也是有大小的,取样处的纹理坐标很可能不偶在某个像素的中心所以取样通常并不是直接获取纹理图像某个像素的样色, 而是通过附近若干个像素共同计算而得

关键字
attribute bool break bvec2 bvec3 bvec4 const continue discard do else false float for highp if in inout Int invariant ivec2 ivec3 ivec4 lowp mat2 mat3 mat4 medium out precision return sampler2D samplerCube struct true uniform varying vec2 vec3 vec4 void while 
保留字
asm cast class default double dvec2 dvec3 dvec4 enum extern external fixed flat fvec2 fvec3 fvec4 goto half hvec2 hvec3 hvec4 inline input interface long namespace noinline output packed public sampler1D sampler1DShadow sampler2DRect sampler2DRectShadow sampler3D sampler3DRect short sizeof static superp switch template this typedef union unsigned using volatile

数据类型
- int
- float
- bool

转换函数
int 传入浮点数会自动转为正整数 传入布尔值 会转为 0 或 1 
float 传入整数 会转为 .0 比如传入8 会转为 8.0 传入布尔值 0.0 或 1.0
bool 整数 0 会转为 false 其他转为 true 布尔值 0.0为false 其他为true

运算符
\-
\*
\/
\+
++
--
= 
+= 
-= 
*= 
/=
< 
\>
<=
\>=
== 
!== 
!
&& 
|| 
^^
矢量
vec2 vec3 vec4 具有多个浮点数元素的矢量
ivec2 ivec3 ivec4 具有多个整数元素的矢量
bvec2 bvec3 bvec4 具有多个布尔值的矢量

矩阵
mat2 mat3 mat4 2x2 3x3 4x4 浮点数元素的矩阵

## 流程控制
if if-else
for 
    continue break discard
## 函数 参数限定词
in 向函数中传入值 参数传入函数, 函数内可以使用参数的值, 也可以膝盖其值, 但函数内部的修改并不会影响到传入的变量
const in 向函数传入值 函数内部可以使用, 但是不能修改
out 在函数中被赋值,并传出 传入变量的引用, 若其在函数内被修改, 会影响到函数外部传入的变量
inout 传入函数, 同时在函数中被赋值,并被传出 传入变量的引用 函数会用到变量的初始值, 然后修改变量的值, 会影响函数外部传入的变量
默认: in

## 内置函数
### 角度函数
radians 角度值 转 弧度制 
degrees 弧度制 转 角度值
### 三角函数
sin 正弦
cos 余弦
tan 正切
asin 反正弦
acos 反余弦
atan 反正切
### 指数函数
pow exp 自然指数
log exp2 log2
sqrt 开平方 inversesqrt 开平方的倒数
### 通用函数
abs 绝对值
min 最小值
max 最大值
mod 取余数
sign 取正负号
floor 向下取整
ceil 向上取整
clamp 限定范围
mix 线性内插
step 步进函数
smoothstep 艾米内插步进
fract 获取小数部分
### 几何函数
length矢量长度
distance 两点间距离
dot 内积
cross 外积
nor-malize 归一化
reflect 矢量反射 
faceforward 使向量朝前
### 矩阵函数
matrixCmpMult 逐元素乘法
### 矢量函数
lessThan 逐元素小于
lessThanEqual 逐元素小于等于
greaterThan 逐元素大于
greaterThanEqual 逐元素大于等于
equal 逐元素相等
notEqual 逐元素不相等 
any 任一元素为 true 则为 true
all 所有元素为true 则为 true
not 逐元素取补

### 纹理查询函数
texture2D 在二维纹理中获取纹素
textureCube 在立方体纹理中获取纹素
texture2Dproj texture2D 的投影版本
texture2Dlod texture2D 的金字塔版本
textureCubeProjLod textureCube的投影版本
textureCubeLod textureCube的金字塔版本

## 存储限定字
const 限定值不能被改变
attribute 只能出现在顶点着色器中, 只能被声明为全局变量, 用来表示逐顶点的信息
uniform 可以用在盯点着色器和片元着色器中, 且必须是全局变量, uniform 是只读的, 可以是除了数组和结构体之外的任意内里, 如果顶点着色器和片元着色器声明了同名的uniform变量, 那么他就会被两个着色器共享, uniform 变量包含了一致(非逐顶点,逐片元的 , 各顶点和片元共享的数据)
varying 必须是全局变量,他的任务是从顶点着色器向片元着色器传输数据,我们必须在两种着色器中声明同名,同类型的varying变量 且类似只能是 float vec2 vec3 vrc4 mat2 mat3 mat4 
precision 精度限定字 目的是帮助着色器提高运行效率, 减少内存开支,
    highp 高精度   float -2的62次方,2的65次方 int -2的16次方,2的16次方
    mediump 中精度 float -2的14次方,2的14次方 int -2的10次方,2的10次方
    lowp 低精度    float -2,-2              int -2的8次方, 2的8次方
在某些webgl 环境中,片元着色器不支持highp 精度
precison 精度限定字 类型名称
### 默认精度
#### 顶点着色器
int highp 
float highp
sampler2D lowp
samplerCube lowp
#### 片元着色器
int mediump 
float 无
sampler2D lowp
samplerCube lowp
### 数目限制
attribute 变量 gl_MaxVertexAttribute   最小值: 8
uniform 顶点着色器 gl_MaxVertexUniformVectors 最小值: 128
uniform  片元着色器 gl_MaxFragmentUniformVEctors 最小值: 16
varying 变量 gl_MaxVaryingVectors 最小值: 8

### 预处理
#ifdef GL_ES
precision mediump float;
#endif
