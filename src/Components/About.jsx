import { useRef, useEffect } from "react"

function About({ showDialog, onCloseDialog }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (showDialog) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }

  }, [showDialog, dialogRef])
  
  return (
    <dialog 
      className="about-container"
      ref={dialogRef} 
      style={
        {border: "none", 
        padding: "40px", 
        borderRadius: "5px", 
        fontFamily: "Verdana, Geneva, Tahoma, sans-serif"}
      }
    >
      <h1>Memory Card Game</h1>
      <div>
        <p>
          Click random image below. If you click the image twice &quot;You lose! &quot; if not you gain score until &quot; You Win! &quot;
        </p>
      </div>
      <button onClick={onCloseDialog}>back</button>
    </dialog>
  )
}

export default About