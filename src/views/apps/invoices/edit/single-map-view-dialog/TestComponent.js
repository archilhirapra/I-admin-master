const {forwardRef, useImperativeHandle} = require("react")

const Child = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      showAlert() {
        alert("Child Function Called")
      }
    }),
  )
  return (
    <div>Child Component</div>
  )
})

export default Child
