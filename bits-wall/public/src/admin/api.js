class API {
    constructor(domain) {
        this.domain = domain
    }

    getBrickTemplateList(channelId) {
        return new Promise((resolve, reject) => {
            $.ajax(`${this.domain}/brickTemplates/${channelId}`)
                .done((result) => {
                    resolve(result)
                })
                .fail((err) => {
                    reject(err)
                })
        })
    }

    createBrickTemplate(channelId, brickTemplate) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    method: 'POST',
                    url: `${this.domain}/brickTemplates/${channelId}`,
                    data: brickTemplate
                })
                .done((result) => {
                    resolve(result);
                })
                .fail((err) => {
                    reject(err);
                })
        });
    }

    launchBrick(channelID, brickTemplate) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    method: 'POST',
                    url: `${this.domain}/launching/${channelID}`,
                    data: brickTemplate
                })
                .done((result) => {
                    resolve(result);
                })
                .fail((err) => {
                    reject(err);
                })
        })
    }

    updateTemplate(channelID, brickTemplate) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    method: 'PUT',
                    url: `${this.domain}/brickTemplates/${channelID}`,
                    data: brickTemplate
                })
                .done((result) => {
                    resolve(result);
                })
                .fail((err) => {
                    reject(err);
                })
        })
    }
    addImage(channelId, pic) {
        // $.ajax()
    }

    deleteImage() {
        // $.ajax()
    }

    getImage() {
        // $.ajax()
    }

    getImages() {
        // $.ajax()
    }
}