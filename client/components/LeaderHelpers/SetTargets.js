import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveTargets, fetchTargets } from "../../store/targets";
import { useNavigate } from "react-router-dom";

const SetTargets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const targets = useSelector((state) => state.targets.data);

  const [localTargets, setLocalTargets] = useState({
    lvl1: { value: "", period: "day" },
    lvl2: { value: "", period: "day" },
    cell: { value: "", period: "day" },
  });

  useEffect(() => {
    dispatch(fetchTargets());
  }, [dispatch]);

  useEffect(() => {
    if (!targets) return;

    setLocalTargets({
      lvl1: {
        value: targets.lvl1_value || "",
        period: targets.lvl1_period || "day",
      },
      lvl2: {
        value: targets.lvl2_value || "",
        period: targets.lvl2_period || "day",
      },
      cell: {
        value: targets.cell_value || "",
        period: targets.cell_period || "day",
      },
    });
  }, [targets]);

  const handleSubmit = async () => {
    const targetsData = {
      lvl1_value: localTargets.lvl1.value,
      lvl1_period: localTargets.lvl1.period,
      lvl2_value: localTargets.lvl2.value,
      lvl2_period: localTargets.lvl2.period,
      cell_value: localTargets.cell.value,
      cell_period: localTargets.cell.period,
    };

    await dispatch(saveTargets(targetsData));

    navigate("/home");
  };

  return (
    <div className="homeLeadContainer">
      <button onClick={() => navigate("/home")}>Back</button>

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default SetTargets;