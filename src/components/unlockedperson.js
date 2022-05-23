



export const UnlockedPerson = (props) => {
    const member = props.member
    const index = props.index
    const lockedImage = props.lockedImage
    return (
        <div key={member.name} className={`person p${index}`}>

            <div className="photo">

                <img className={member.locked == true ? "discovered-image" : ""} src={member.locked ? lockedImage : member.photo} alt="" />
            </div>
            <p> {member.name ?? ""}</p>
            <p> {member.position ?? ""}</p>
            <p> {member.duration ?? ""}</p>
        </div>

    )
}

export default UnlockedPerson