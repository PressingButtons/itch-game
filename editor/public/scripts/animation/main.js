import setTimeline from "../timeline/timeline.js"

window.onload = async event => {

    const timeline = await setTimeline(document.querySelector('.workspace'), 'public/scripts/');


}