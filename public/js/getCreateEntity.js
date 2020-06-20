const lastPath = window.location.pathname.lastIndexOf('/');
// const profileId = window.location.pathname.slice(lastPath + 1)
const profileId = 1

fetch(BASE_URL + `/profile/${profileId}/list-create`)
// .then(response => console.log(response))
    .then(response => response.json())
    .then(data => {
        let mySceneEl = document.querySelector('a-scene');
        let mySceneAssets = document.querySelector('a-assets');
        data.map((item) => {
            let entity = document.createElement(item.element);
            for (let comItem in item.components) {
                entity.setAttribute(comItem, item.components[comItem])
            }
            // entity.setAttribute(item.c)
            if (item.element == "a-asset-item" || item.element == 'img' || item.element == 'audio') {
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

        fetch(BASE_URL + `/profile/${profileId}/list-update`)
        // .then(response => console.log(response))
            .then(response => response.json())
            .then(data => {
                    const entries = Object.entries(data);
                    for (const [key, val] of entries) {

                        console.log(`There are #${key}`)
                        // console.log(val)
                        let entity = document.querySelector('#' + key);
                        console.log(entity)
                        let updateComponentEntries = Object.entries(val);
                        for (const [keyCom, valCom] of updateComponentEntries) {
                            entity.setAttribute(keyCom, valCom);
                        }
                    }
                }
            );
    }, 100);

}

