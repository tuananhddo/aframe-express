// const profileId = 1
const profileId = document.getElementById('profilePersonalId').value
const DEFAULT_SYNC_URL = BASE_URL + '/sync'
// console.log(profileId2.value)
if (profileId == '999') {
    alert('')
    let myScene = document.querySelector('#mainUserScene');
    myScene.addEventListener('loaded', function () {
        myScene.setAttribute('light', "defaultLightsEnabled: false")

    });
}
fetch(DEFAULT_SYNC_URL + `/${profileId}/list-create`)
// .then(response => console.log(response))
    .then(response => response.json())
    .then(data => {
        let mySceneEl = document.querySelector('a-scene');
        let mySceneAssets = document.querySelector('#user-assets');
        // console.log(mySceneAssets)
        data.map((item) => {
            let entity = document.createElement(item.element);
            for (let comItem in item.components) {
                // console.log(item.components[comItem])
                entity.setAttribute(comItem, item.components[comItem])
            }
            // entity.setAttribute(item.c)
            if (item.element == "a-asset-item" || item.element == 'img' || item.element == 'audio' || item.element == 'video') {
                mySceneAssets.append(entity)
            } else {
                mySceneEl.append(entity)
            }
        })
    })
    .then(() => getUpdate());

function getUpdate() {
    setTimeout(function () {
        // let ids = document.querySelectorAll('a-entity');
        // for (var i = 0; i < ids.length; i++) {
        // ids[i].id == 'entity-banghoanthien6.glb' && console.log(ids[i]);
        // }
        // let ids = document.querySelectorAll("#entity-banghoanthien6.glb");

        fetch(DEFAULT_SYNC_URL + `/${profileId}/list-update`)
        // .then(response => console.log(response))
            .then(response => response.json())
            .then(data => {
                    const entries = Object.entries(data);
                    for (const [key, val] of entries) {

                        // console.log(`There are #${key}`)
                        // console.log(val)
                        let entity = document.querySelector('#' + key);
                        // console.log(entity)
                        let updateComponentEntries = Object.entries(val);
                        for (const [keyCom, valCom] of updateComponentEntries) {
                            entity.setAttribute(keyCom, valCom);
                        }
                    }
                }
            );
    }, 500);

}

