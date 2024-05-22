/*

1. 定位（Position）

  position: relative 相對定位
    - 相對於自身原始位置進行偏移。

  position: absolute 絕對定位
    - 相對於最近的已定位祖先元素進行偏移。

  position: fixed 固定定位
    - 相對於瀏覽器窗口進行偏移。

  position: sticky 粘滯定位
    - 在滾動時相對於其滾動父元素進行偏移。

  top: 10px;     // 元素頂部與參考點的距離
  right: 10px;   // 元素右側與參考點的距離
  bottom: 10px;  // 元素底部與參考點的距離
  left: 10px;    // 元素左側與參考點的距離

  z-index: 10;   // 設置元素的堆疊順序  

2. div 大小 (Size)

  width: px em %;  // 設置元素的寬度
  height: px em %;  // 設置元素的高度

  min-width: px em %;  // 設置元素的最小寬度
  max-width: px em %;  // 設置元素的最大寬度
  min-height: px em %;  // 設置元素的最小高度
  max-height: px em %;  // 設置元素的最大高度

  box-sizing: border-box;  // 包括內邊距和邊框在內的元素總寬度和高度

3. 彈性布局 (Flexbox)

  display: flex;  // 將元素設置為彈性容器，使子元素以彈性盒模型排列
  display: block ; //占滿完整行
  justify-content: space-between;  // 子元素在主軸（橫向）上的排列方式：均勻分布
  align-items: center;  // 子元素在交叉軸（縱向）上的排列方式：垂直居中


  flex-direction: row;  // 子元素沿主軸方向排列，默認為行方向
  flex-wrap: nowrap;  // 子元素不換行排列
  justify-content: flex-start;  // 子元素在主軸（橫向）上的排列方式：左對齊
  align-items: stretch;  // 子元素在交叉軸（縱向）上的排列方式：拉伸
  align-content: stretch;  // 多行子元素在交叉軸上的對齊方式

4. 內邊距與外邊距 (Padding and Margin)

  padding: 10px;  // 設置四邊內部邊距
  padding-top: 10px;  // 設置上內部邊距
  padding-right: 10px;  // 設置右內部邊距
  padding-bottom: 10px;  // 設置下內部邊距
  padding-left: 10px;  // 設置左內部邊距

  margin: 10px;  // 設置四邊外部邊距
  margin-top: 10px;  // 設置上外部邊距
  margin-right: 10px;  // 設置右外部邊距
  margin-bottom: 10px;  // 設置下外部邊距
  margin-left: 10px;  // 設置左外部邊距

5. 字體 (Font)

  font-size: px em rem;  // 設置字體大小
  font-family: Arial, sans-serif;  // 設置字體種類
  font-weight: normal;  // 設置字體粗細
  font-style: normal;  // 設置字體樣式
  line-height: 1.5;  // 設置行高
  letter-spacing: 0.1em;  // 設置字母間距
  text-align: left center;  // 設置文字對齊方式
  
6. 圖片 (Image)

  width: 100px;  // 設置圖片寬度
  height: auto;  // 設置圖片高度自動調整

  border-radius: 50%;  // 設置圖片圓角，50%會使圖片變成圓形

  object-fit: cover;  // 確保圖片完全覆蓋容器
  object-position: center;  // 設置圖片在容器中的顯示位置

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  // 設置盒子陰影
  opacity: 0.8;  // 設置圖片透明度
  border: 2px solid #333;  // 設置圖片邊框

7. 背景 (Background)

  background-color: #f0f0f0;  // 設置背景顏色
  background-image: url('path/to/image.jpg');  // 設置背景圖片
  background-size: cover;  // 設置背景圖片大小以覆蓋整個容器
  background-position: center;  // 設置背景圖片居中顯示
  background-repeat: no-repeat;  // 設置背景圖片不重複
  background-attachment: fixed;  // 設置背景圖片固定不隨滾動
  background-blend-mode: multiply;  // 設置背景圖片混合模式

8.邊框 (Borders)

  border: 1px solid #000;  // 設置邊框
  border-radius: 10px;  // 設置圓角邊框

9.顯示與可見性 (Display and Visibility)

  display: none;  // 設置元素不可見且不佔用空間
  visibility: hidden;  // 設置元素不可見但保留空間

10.溢出處理 (Overflow)

  overflow: auto;  // 設置溢出內容自動添加滾動條
  overflow-x: hidden;  // 設置橫向溢出隱藏
  overflow-y: scroll;  // 設置縱向溢出滾動

11.陰影與透明度 (Shadow and Opacity)

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  // 設置盒子陰影
  opacity: 0.5;  // 設置元素透明度

12.過渡與動畫 (Transition and Animation)

  transition: all 0.3s ease-in-out;  // 設置過渡效果
  animation-name: example;
  animation-duration: 4s;  // 設置動畫效果

13.變形 (Transforms)

  transform: rotate(45deg);  // 設置2D變形
  transform: rotateX(45deg) rotateY(45deg);  // 設置3D變形

14.濾鏡效果 (Filter Effects)

  filter: grayscale(50%);  // 設置灰度濾鏡
  filter: blur(5px);  // 設置模糊濾鏡

15.背景效果 (Background Effects)

  background: linear-gradient(to right, #ff7e5f, #feb47b);  // 設置線性漸變背景

16.字間距與詞間距 (Letter Spacing and Word Spacing)

  letter-spacing: 0.1em;  // 設置字母間距
  word-spacing: 0.2em;  // 設置詞間距

17.文本陰影 (Text Shadow)

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);  // 設置文本陰影

18.偽元素 (Pseudo-elements)

  ::before {
    content: 'Prefix';  // 在元素之前添加內容
    color: grey;
  }
  ::after {
    content: 'Suffix';  // 在元素之後添加內容
    color: grey;
  }

19.偽類 (Pseudo-classes)

  :hover {
    color: red;  // 當滑鼠懸停時改變顏色
  }
  :focus {
    border-color: blue;  // 當元素獲得焦點時改變邊框顏色
  }
*/