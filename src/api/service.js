
export const updatePerson = async (reset, remaindailysticker) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ laststickerdate: Date.now().toString(), remaindailysticker: remaindailysticker - (reset == "reset" ? remaindailysticker : 1) })

    };
    await fetch("http://localhost:8000/user", requestOptions)
}



export const updateTeams = async (teams) => {


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: teams })
    };


    await fetch(`http://localhost:8000/teams`, requestOptions)



}



function diffHoursMoreThan24(date) {

    var diff = (Date.now() - date) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff)) > 24;

}


export const fetchStickerInfo = async () => {
    var data = {}
    await fetch("http://localhost:8000/user").then(res => res.json()).then(result => {  data.lastStickerDate = result.laststickerdate; data.remainDailySticker = result.remaindailysticker });

    if (diffHoursMoreThan24(data.lastStickerDate) == true)
        await updatePerson(null, 4)

    
    return data

}