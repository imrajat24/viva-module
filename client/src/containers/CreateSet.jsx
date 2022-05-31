import CopySetScroll from "../components/CopySetScroll";
import QuesBody from "../components/QuesBody";
const CreateSet = () => {
  return (
    <div className="trainer1 row">
      <div className="copyset-contain">
        <div className="createSetheading ">
          <h2>use existing set</h2>
        </div>
        <div className="copyset-contain_card">
          <CopySetScroll />
        </div>
      </div>

      <div className="divider createSetheading">
        <h2>or</h2>
      </div>

      <div className="createSet_contain">
        <div className="createSetheading">
          <h2>create a new set</h2>
        </div>

        <div className="createSet_contain--set trainer2">
          <div className="createSet-inputs">
            <input type="text" className="" placeholder="Set Name" />
            <input type="text" className="" placeholder="Batch Number" />
            <input type="text" className="" placeholder="Type of training" />
          </div>
          <QuesBody />
          <div className="createSet_closing-btns">
            <button className="btn btn-light">add a new question</button>
            <button className="btn btn-secondary">complete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSet;
