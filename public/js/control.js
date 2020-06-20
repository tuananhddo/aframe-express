// // Component to change to a sequential color on click.
//
// AFRAME.registerComponent('cursor-listener', {
//     init: function () {
//         var lastIndex = -1;
//         var COLORS = ['red', 'green', 'blue'];
//         this.el.addEventListener('click', function (evt) {
//             lastIndex = (lastIndex + 1) % COLORS.length;
//             // this.setAttribute('material', 'color', COLORS[lastIndex]);
//             var playerEl = document.querySelector('#rig');
//
//             // playerEl.object3D.position.x = 0;
//             // playerEl.object3D.position.y = 0;
//             // playerEl.object3D.position.z = 0;
//             let checkpointPos = this.getAttribute('position')
//             let newPos = {
//                 x: checkpointPos.x,
//                 y: playerEl.object3D.position.y,
//                 z: checkpointPos.z
//
//             }
//             console.log(newPos);
//             playerEl.setAttribute('position', newPos);
//
//             console.log(playerEl.object3D.position)
//
//             // textEl.setAttribute('visible', !textEl.getAttribute('visible'))
//         });
//
//     }
// });
AFRAME.registerComponent('audiohandler', {
    init: function () {
        let playing = false;
        let audio = document.querySelector('#audio');
        this.el.addEventListener('click', () => {
            var allSound = document.querySelectorAll('[sound]');
            console.log(allSound)
            for (var i = 0; i < allSound.length; i++) {
                allSound[i].components.sound.stopSound()
            }

            // this.el.components.sound.stopSound();
            this.el.components.sound.playSound();

            // if (!playing) {
            //   audio.play();
            // } else {
            //   audio.pause();
            //   audio.currentTime = 0;
            // }
            // playing = !playing;
        });
    }
});
AFRAME.registerComponent('audio-stopper', {
    init: function () {
        var lastIndex = -1;
        var COLORS = ['red', 'green', 'blue'];
        console.log(this)

        this.el.addEventListener('click', function (evt) {
            // lastIndex = (lastIndex + 1) % COLORS.length;
            // this.setAttribute('material', 'color', COLORS[lastIndex]);
            // console.log('I was clicked at: ', evt.detail.intersection.point);
            // this.el.components.sound.stopSound();
            if (!this.components.sound) {
                var allSound = document.querySelectorAll('[sound]');
                for (var i = 0; i < allSound.length; i++) {
                    allSound[i].components.sound.stopSound()
                }
            }
        });
    }
});
