开发注意事项

1. @nutui/icons-react-taro 导出的图标，无法进行事件冒泡阻止，需要在外部套一层 View，通过 View 监听事件。
