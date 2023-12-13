// 此文件为模块类型，内容不能放在global.d.ts中
import type FowerCore from '@fower/core'

// 由于需要导入类型，所以要在global模块中声明
declare global {
  // 相比fower的css类型，少了可选属性，只能设置css属性，类型校验更严谨
  type CSSObject = FowerCore.FowerCSSProperties & FowerCore.PseudosObject
}
