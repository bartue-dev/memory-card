import { SyncLoader } from "react-spinners";

export function Loader({loading}) {

  return (
    <div className="loader-container">
      <SyncLoader 
      loading={loading}
      size={15}
      color="#22d3ee"
      aria-label="Loading Spinner"
      data-testid="loader"
      />
    </div>
  )
}