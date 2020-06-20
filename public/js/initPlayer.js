let scene = document.querySelector('a-scene');
// /**
//  * CINEMA MODE
//  */
// scene.lightOff = function () {
//     scene.islightOn = true;
//     scene.removeAttribute('animation__fogback');
//     scene.setAttribute('animation__fog', "property: fog.color; to: #0c192a; dur: 800; easing: easeInQuad;");
// }
// scene.lightOn = function () {
//     scene.islightOn = false;
//     scene.removeAttribute('animation__fog');
//     scene.setAttribute('animation__fogback', "property: fog.color; to: #dbdedb; dur: 800");
// }

/**
 * AVideoPlayer
 */
const videoPlayer = new AVideoPlayer();

// Play button action
document.querySelector('#control-play').addEventListener('click', function () {
    if (videoPlayer.paused) {
        scene.lightOn()
    } else {
        scene.lightOff();
        // hideCursor();
    }
});
