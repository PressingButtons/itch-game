export default async function setTimeline(container, path) {

    const timeline = await createBody(container, path);
    const frame_body = await createFrameBody(path);

    const createFrame = ( ) => {
        const frame = frame_body.cloneNode(true);
        timeline.querySelector('.timeline-rail').append(frame);
        return frame;
    }

    const frame = createFrame( );
    console.log(frame);

}

const createBody = async (container, path) => {
    const html = await fetch(path + 'timeline/timeline.html').then(response => response.text( ));
    const timeline_wrapper = document.createElement('div');
    timeline_wrapper.classList.add('timeline-wrapper');
    timeline_wrapper.innerHTML = html;
    container.appendChild(timeline_wrapper);
    return timeline_wrapper;
}

const createFrameBody = async path => {
    const frame_wrapper = document.createElement('div');
    const html = await fetch( path + 'timeline/frame.html').then(response => response.text( ));
    frame_wrapper.classList.add('timeline-frame-wrapper')
    frame_wrapper.innerHTML = html;
    return frame_wrapper;
}