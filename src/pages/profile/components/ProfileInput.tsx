import { useState } from 'react'
import { Textarea, View, Input } from '@tarojs/components'
import clsx from 'clsx'

export function ProfileInput(props: {
  className?: string
  title: string
  value: string
  maxlength: number
  row?: number
  requiredText?: string
  onChange: (value: string) => void
}) {
  const { row = 1, maxlength = 50 } = props
  const [isFocus, setIsFocus] = useState(false)
  const InputComponent = row > 1 ? Textarea : Input
  const showRequired = props.value.trim() === '' && props.requiredText
  return (
    <View className="m-[10px]">
      <InputComponent
        className={clsx(
          'rounded-[4px] px-[8px] pt-[26px] pb-[6px] relative box-content',
          'border-[1px] border-solid border-[#E5E5E5] text-[16px]',
          isFocus && 'border-primary',
          showRequired && 'border-red',
          props.className
        )}
        style={{
          height: row * 24 + 'px',
          width: `calc(100% - 16px)`
        }}
        maxlength={maxlength}
        onFocus={() => {
          setIsFocus(true)
        }}
        onBlur={() => {
          setIsFocus(false)
        }}
        value={props.value}
        onInput={(e) => {
          props.onChange(e.detail.value)
        }}
      >
        <View
          className={clsx(
            'absolute left-[8px] transition-all duration-150 z-[100] text-[#666]',
            isFocus || props.value || showRequired
              ? 'text-[12px] top-[6px]'
              : 'text-[18px] leading-[24px] top-[16px]',
            isFocus && 'text-primary',
            showRequired && 'text-red'
          )}
        >
          {props.title}
        </View>
        {isFocus && maxlength && (
          <View className="absolute right-[8px] top-[6px] text-[12px] text-[#888]">
            {props.value.length} / {maxlength}
          </View>
        )}
      </InputComponent>
      {showRequired && (
        <View className="text-[13px] text-red mt-[4px] ml-[8px] font-bold">
          {props.requiredText}
        </View>
      )}
    </View>
  )
}
