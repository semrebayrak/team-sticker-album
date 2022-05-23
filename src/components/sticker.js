import { useContext } from "react";
import TeamsContext from "../api/context/TeamsContext";



// Yeni Sticker Açma Ekranındaki Sticker
export const Sticker = (props) => {
    const lockedImage = "../assets/anon.png"
    const teams = useContext(TeamsContext);
    const person = props.person

    return (
        <div className="sticker-content">


            {
                props.person == null ? <img style={{ width: '60%' }} src={lockedImage} alt="" />
                    :
                    <img className="sticker-photo" src={teams[person.teamIndex].members[person.memberIndex].photo} alt="" />

            }
            

            {
                props.person==null && <div className="ribbon"/>

            }
           

            <h2> trendyol </h2>
            <p className="tech">Tech</p>


            {props.person && <div className="info">

                <p>{teams[person.teamIndex].members[person.memberIndex].name}</p>
                <p>{teams[person.teamIndex].members[person.memberIndex].position}</p>

            </div>}
        </div>
    )
}

export default Sticker