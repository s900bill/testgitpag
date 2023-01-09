//參考資料 https://blog.csdn.net/qq_43437571/article/details/121864975
export default {
  install: (app, options) => {
    app.directive('infinitescroll', (el, binding, vnode) => {
      const { expend } = binding.modifiers
      if (expend) {
        let { target, distance = 0, func } = binding.value
        if (typeof target !== 'string') return
        let targetEl = el.querySelector(target)
        if (!targetEl) {
          // console.log('target not found')
          return
        }
        binding.handler = function () {
          const { scrollTop, scrollHeight, clientHeight } = targetEl
          // let disabled = el.getAttribute('load-more-disabled')
          // disabled = vnode[disabled] || disabled;

          if (scrollHeight <= scrollTop + clientHeight + distance) {
            //  if (disabled) return

            func && func()
          }
        }

        targetEl.addEventListener('scroll', binding.handler)
      } else {
        binding.handle = function () {
          const { scrollTop, scrollHeight, clientHeight } = el
          if (scrollHeight === scrollTop + clientHeight) {
            binding.value && binding.value()
          }
        }
        el.addEventListener('scroll', binding.handler)
      }
    })
  },
}
