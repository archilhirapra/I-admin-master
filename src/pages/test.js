import React, {forwardRef, useRef, useImperativeHandle} from 'react';

export default function ParentFunction() {
  const childRef = useRef();
  return (
    <div className="container">
      <div>
        Parent Component
      </div>
      <button
        onClick={() => {
          childRef.current.showAlert()
        }}
      >
        Call Function
      </button>
      <Child ref={childRef}/>
    </div>
  )
}
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
