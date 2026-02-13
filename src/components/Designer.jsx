import { useSelector } from "react-redux";

export default function Designer({ d }) {
    const objects = useSelector((state) => state.objects.items)
    const countObjects = (designerId) =>
        objects.filter((obj) => obj.attachedDesigner === designerId).length
    return (
        <div
            key={d.id}
            className='designer-card'
        >
            <div className="designer-avatar">
                <img src={d.avatar} alt={d.fullName} />
            </div>
            <div className="designer-info">
                <h3>{d.fullName}</h3>
                <p>Working hours: {d.workingHours}</p>
                <p>Attached objects: {countObjects(d.id)}</p>
            </div>
        </div>
    );
}