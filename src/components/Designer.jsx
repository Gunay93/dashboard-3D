import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { removeDesigner } from "../redux/designer/designersSlice";
import { unassignDesignerObjects } from "../redux/object/objectsSlice";

export default function Designer({ d }) {
    const dispatch = useDispatch()
    const objects = useSelector((state) => state.objects.items);
    const countObjects = objects.filter(
        (obj) => obj.attachedDesigner == d.id
    ).length;
    const handleDelete = () => {
        dispatch(unassignDesignerObjects(d.id));
        dispatch(removeDesigner(d.id));
    };
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
            <button
                className="delete-btn"
                onClick={handleDelete}
            >
                <FiTrash2 />
            </button>

        </div>
    );
}