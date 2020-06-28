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
        // console.log(this)

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
const openModal = () => {
    let modal = document.getElementById('des_modal');
    let myScene = document.querySelector('a-scene')
    let camera = document.querySelector('#rig')
    modal.style.display = 'inline';
    myScene.style.zIndex = -1;
    camera.removeAttribute('wasd-controls')

}
const closeModal = () => {
    let modal = document.getElementById('des_modal');
    let myScene = document.querySelector('a-scene')
    let camera = document.querySelector('#rig')
    modal.style.display = 'none';
    camera.setAttribute('wasd-controls', '')
    myScene.style.zIndex = 'auto';
}
AFRAME.registerComponent('detailhandler', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let description = document.querySelector('#description')
            let text = this.getAttribute('description');
            description.innerHTML = !!text ? text : '';
            openModal()
        });
    }
});

function clickCloseModal() {
    closeModal()
}
