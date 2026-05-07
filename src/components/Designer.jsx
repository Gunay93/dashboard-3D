import { useSelector } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";

export default function Designer({ d }) {
    const objects = useSelector((state) => state.objects.items);
    console.log(d);
    const countObjects = objects.filter(
        (obj) => obj.attachedDesigner == d.id
    ).length;

    return (
        <div className="table-row">

            <div className="designer-cell">
                <img src={d.avatar} alt={d.fullName} />
                <span>{d.fullName}</span>
            </div>

            <span>{d.workingHours}</span>

            <span>{countObjects}</span>

            <span className={`badge ${d.status === "active" ? "active" : "deactive"}`}>
                {d.status}
            </span>

            <button className="action-btn">
                <FiMoreVertical />
            </button>

        </div>
    );
}