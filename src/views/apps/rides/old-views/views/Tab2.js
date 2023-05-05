import {useEffect} from "react";

const Tab2 = () => {


  useEffect(() => {
    console.log('i am from tab 2');
  }, [])

  return (
    <>Tab 2</>
  )
}

export default Tab2
