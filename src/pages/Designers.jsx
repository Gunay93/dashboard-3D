import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Designer from "../components/Designer"
import { addDesigner, selectDesigner } from "../redux/designer/designersSlice"

export default function Designers() {
    const dispatch = useDispatch()
    const designers = useSelector((state) => state.designers.list)
    const [fullName, setFullName] = useState("")
    const [workingHours, setWorkingHours] = useState("")
    const [error, setError] = useState({ fullName: "", workingHours: "" })
    const handleAddDesigner = () => {
        let hasError = false
        const newError = { fullName: "", workingHours: "" }
      
        if (!fullName.trim()) {
          newError.fullName = "Full name is required"
          hasError = true
        }
      
        if (!workingHours.trim()) {
          newError.workingHours = "Working Hours is required"
          hasError = true
        }
      
        setError(newError)
      
        if (hasError) return
        const lastId = designers.length > 0 ? designers[designers.length - 1].id : 100
        const newDesigner = {
            id: lastId + 1,
            fullName,
            workingHours,
            avatar: `https://i.pravatar.cc/350?img=${Math.floor(Math.random() * 70)}`
        }
        dispatch(addDesigner(newDesigner))
        setFullName("")
        setError({ fullName: "", workingHours: "" })
    }

    const handleSelect = (id) => {
        dispatch(selectDesigner(id))
    }

    return (
        <div className="designers-page">
            <h1>Designers</h1>

            <div className="designer-form">
                <div style={{ display: "flex", flexDirection: "column", position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        name="fullName"
                        onChange={(e) => setFullName(e.target.value)}
                        className={error.fullName ? "input-error" : ""}
                    />
                    {error.fullName && <p className="error-text">{error.fullName}</p>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", position: 'relative' }}>
                    <select
                        value={workingHours}
                        name="workingHours"
                        onChange={(e) => setWorkingHours(e.target.value)}
                        className={error.workingHours ? "input-error" : ""}
                    >
                        <option value="" disabled >-- Select --</option>
                        <option value="9-6">9-6</option>
                        <option value="10-7">10-7</option>
                        <option value="11-8">11-8</option>
                    </select>
                    {error.workingHours && <p className="error-text">{error.workingHours}</p>}
                </div>
                <button onClick={handleAddDesigner}>Add Designer</button>
            </div>

            <div className="designer-cards">
                {designers.map((d) => (
                    <Designer d={d}/>
                ))}
            </div>
        </div>
    )
}