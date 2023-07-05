import Popular from "./Popular";
import Viewed from "./Viewed";

function Mostpopular({ blogs }) {
  return (
    <div className="side-margin grid md:grid-cols-5 gap-4">
      <div className="col-span-1 md:col-span-2">
        <Popular blogs={blogs} />
      </div>
      <div className="md:col-span-3">
        <Viewed blogs={blogs} />
      </div>
    </div>
  );
}

export default Mostpopular;
