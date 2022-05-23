import Sticker from './sticker';
import { updateTeams, updateDate, updateRemainSets, updatePerson } from '../api/service';

export const StickerSet = (props) => {


    var teams = props.teams
    var people = []
    var allUnlocked = true
    const remaindailysticker = props.remaindailysticker
    console.log(remaindailysticker)
    const clickButton = async () => {
        

        people.forEach(element => {
            teams[element.teamIndex].members[element.memberIndex].locked = false;
        })

        await updateTeams(teams);

     
        if (allUnlocked == true)
            await updatePerson("reset", remaindailysticker); // tüm hepsi açılmışsa kullanıcıyı yormadan ekranı geçmek için remain setsi 0 lıyoruz
        else
            await updatePerson(null, remaindailysticker);

        
    }

    const getStickers = () => {

        var lockedPeople = []
        var stickers = []
        allUnlocked = false

        for (let i = 0; i < teams.length; i++) {
            for (let j = 0; j < teams[i].members.length; j++) {

                if (teams[i].members[j].locked == true)
                    lockedPeople.push({ 'teamIndex': i, 'memberIndex': j })
            }

        }
        if (lockedPeople.length == 0) {

            allUnlocked = true
            return <h1 style={{ color: "black", backgroundColor: "transparent" }}>CONGRATULATIONS No Stickers To Open</h1>

        }

        for (let i = 0; i < 6; i++) {
            if (lockedPeople.length == 0)
                break

            let randomIndex = Math.floor(Math.random() * lockedPeople.length)
            let person = lockedPeople[randomIndex];
            lockedPeople.splice(randomIndex, 1)
            people.push(person)
            stickers.push(
                <div key={i} className="sticker-cart">
                    <Sticker person={person} />
                </div>
            )
        }

        return stickers

    }


    return (

        <>
            <div className="content">
                {getStickers()}
            </div>

            <button onClick={() => { clickButton() }} className="paste-button">PASTE TO YOUR ALBUM</button>

        </>
    )
}

export default StickerSet
