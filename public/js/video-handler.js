function moveVideoPlayerToCurrentVideo(videoPosition, w, h) {
    let newVolPosition = {
        x: videoPosition.x - 0.3,
        y: videoPosition.y - 0.75,
        z: videoPosition.z + 0.05
    }
    let newPlayPosition = {
        x: videoPosition.x,
        y: videoPosition.y - 0.75,
        z: videoPosition.z + 0.05
    }
    let newBackPosition = {
        x: videoPosition.x + 0.3,
        y: videoPosition.y - 0.75,
        z: videoPosition.z + 0.05
    }
    let newProgessBarPosition = {
        x: videoPosition.x,
        y: videoPosition.y - 0.8,
        z: videoPosition.z + 0.01
    }
    document.getElementById('control-volume').setAttribute("position", newVolPosition);
    document.getElementById('control-back').setAttribute("position", newBackPosition);
    document.getElementById('control-play').setAttribute('position', newPlayPosition);
    // document.getElementById('progress-bar').setAttribute('position', newProgessBarPosition);

}

AFRAME.registerComponent('video-handler', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function (e) {
            var allVideo = document.querySelectorAll('video');
            let srcId = el.getAttribute('src');
            let videoSrc = document.querySelector(srcId)
            // for (var i = 0; i < allVideo.length; i++) {
            //     allVideo[i].pause()
            //     if (srcId != allVideo[i].getAttribute('src')) {
            //         allVideo[i].currentTime = 0
            //     }
            // }
            videoPlayer.elVideo = videoSrc;
            if (videoSrc.paused) {
                document.getElementById('control-volume').setAttribute("visible", true);
                document.getElementById('control-back').setAttribute("visible", true);
                console.log('pause')
                document.getElementById('control-play').setAttribute('src', '#pause');
                videoSrc.play();
                // rig.setAttribute("wasd-controls", ""); // For IE
            } else {
                videoSrc.pause();
                document.getElementById('control-play').setAttribute('src', '#play');
                document.getElementById('control-volume').setAttribute("visible", false);
                document.getElementById('control-back').setAttribute("visible", false);
                console.log('play')
                // rig.removeAttribute("wasd-controls")

            }
        });
        el.addEventListener('mouseenter', function (e) {
            let srcId = el.getAttribute('src');
            let videoSrc = document.querySelector(srcId)
            videoPlayer.elVideo = videoSrc;

            document.getElementById('control-play').setAttribute("visible", true);
            moveVideoPlayerToCurrentVideo(el.object3D.position, el.getAttribute('width'), el.getAttribute('height'))

        });
    }
});
