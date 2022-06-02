import Glider from "react-glider";
import "glider-js/glider.min.css";

const CopySetScroll = () => {
  return (
    <Glider
      draggable
      hasArrows
      hasDots
      scrollLock
      slidesToShow={4}
      slidesToScroll={1}
      responsive={[
        {
          // screens greater than >= 1201px
          breakpoint: 1201,
          settings: {
            slidesToShow: "4",
          },
        },
        {
          // screens greater than >= 769px
          breakpoint: 769,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: "3",
          },
        },
        {
          // screens greater than >= 601px
          breakpoint: 601,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: "2",
          },
        },

        {
          // screens greater than >= 376px
          breakpoint: 300,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: "1",
          },
        },
      ]}
    >
      <div className="copy-card slide">
        <h4>Set A</h4>
        <button className="btn btn-secondary btn-copy">copy set</button>
      </div>
      <div className="copy-card slide">
        <h4>Set B</h4>
        <button className="btn btn-secondary btn-copy">copy set</button>
      </div>
      <div className="copy-card slide">
        <h4>Set C</h4>
        <button className="btn btn-secondary btn-copy">copy set</button>
      </div>
      <div className="copy-card slide">
        <h4>Set d</h4>
        <button className="btn btn-secondary btn-copy">copy set</button>
      </div>
      <div className="copy-card slide">
        <h4>Set e</h4>
        <button className="btn btn-secondary btn-copy">copy set</button>
      </div>
      <div className="copy-card slide">
        <h4>Set f</h4>
        <button className="btn btn-secondary btn-copy">copy set</button>
      </div>
    </Glider>
  );
};

export default CopySetScroll;
