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

    createBrickTemplate(channelId, template) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    method: 'POST',
                    url: `${this.domain}/brickTemplates/${channelId}`,
                    data: template
                })
                .done((result) => {
                    resolve(result)
                })
                .fail((err) => {
                    reject(err)
                })
        });
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