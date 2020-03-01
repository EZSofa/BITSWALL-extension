class Action {
    constructor(state, global, api, twitch) {
        this.state = state
        this.global = global
        this.api = api
        this.twitch = twitch

        this.handleSetBackgroundImage = this.handleSetBackgroundImage.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this)
    }

    navPage = (id) => {
        this.state.pages.forEach((page) => {
            page.hide();
        });
        $(id).show();
    }

    renderTemplateList = async() => {
        this.state.brickTemplates = await this.api.getBrickTemplateList(this.state.channelId)
            .then((templates) => {
                let brickTemplates = {};
                if (templates) {
                    for (let uuid in templates) {
                        brickTemplates[uuid] = new BrickTemplate(templates[uuid]);
                    }
                }
                return brickTemplates;
            });

        console.log('this.state.brickTemplates', this.state.brickTemplates)
        let templateListElement = $('#template-list')
        templateListElement.empty();

        for (let uuid in this.state.brickTemplates) {
            let brickTemplate = new BrickTemplate(this.state.brickTemplates[uuid]);

            let templateElement = $(`
                <div class="card col-lg-3" >
                    <img src=${brickTemplate.image} class="card-img-top" alt="image alt....">
                    <div class="card-body">
                    <h5 class="card-title">${brickTemplate.title}</h5>
                    <p class="card-text">${brickTemplate.description}</p>
                    </div>
                </div>
            `);

            templateElement.on('click', () => this.handleSelectTemplate(uuid));
            templateListElement.append(templateElement);
        }

        let addTemplateElement = $(`
        <div class= "card col-lg-3" >
        ++++++++++
        </div>
        `)

        addTemplateElement.on('click', () => {
            console.log('add Template Element go go go!!');
            $('#add-tempalte-modal').modal('show');
        });
        templateListElement.append(addTemplateElement)

    }

    handleSelectTemplate = (uuid) => {
        console.log('selected uuid = ', uuid);
        this.state.selectedBrickTemplate = this.state.brickTemplates[uuid];
        console.log('this.state.selectedBrickTemplate', this.state.selectedBrickTemplate)
            // this.renderFabricCanvas();
    }

    handleCreateTemplate = () => {
        let title = $('#new-template-title').val();
        let description = $('#new-template-description').val();

        let brickTemplate = new BrickTemplate({
            title,
            description
        });

        console.log('brickTemplate', brickTemplate)
        this.api.createBrickTemplate(this.state.channelId, brickTemplate)
            .then((data) => {
                console.log(data);
                this.renderTemplateList();
                $('#add-tempalte-modal').modal('hide');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleLaunchBrick = () => {
        console.log('handle launch Brick')
        const selectedBrickTemplate = this.state.selectedBrickTemplate;
        console.log('selectedBrickTemplate', selectedBrickTemplate);

        if (!selectedBrickTemplate || selectedBrickTemplate.id === '') {
            alert('You do not select any tempalte');
            return;
        }

        this.api.launchBrick(this.state.channelId, this.state.selectedBrickTemplate)
            .then((result) => {
                console.log('launch result', result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleUpdateTemplate = () => {
        console.log('handleUpdateTemplate')
        const selectedBrickTemplate = this.state.selectedBrickTemplate;
        console.log('selectedBrickTemplate', selectedBrickTemplate);
        selectedBrickTemplate.title = `(save) ${selectedBrickTemplate.title}`;

        if (!selectedBrickTemplate || selectedBrickTemplate.id === '') {
            alert('You do not select any tempalte');
            return;
        }

        this.api.updateTemplate(this.state.channelId, this.state.selectedBrickTemplate)
            .then((result) => {
                console.log('update result', result);
                this.renderTemplateList();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSelectBrick = (info) => {
        console.log('info', info);
    }

    handleJoinBrickToCanvas = () => {
        let fObj = new fabric.BitWallsImage(this.global.brick_info['TRIANGLE'].image, {
            left: 0,
            top: 0,
            scaleX: .5,
            scaleY: .5,
            active: false,
            price: 50
        })

        this.state.fcanvas.add(fObj)
    }

    renderFabricCanvas = () => {

        this.state.fcanvas.clear();

        // push bricks on this.state.bricks to fcanvas
        console.log(this.state.bricks);
    }


    addBit = (type) => {
        let fObj = new fabric.BitWallsImage(this.global.brick_info[type].image, {
            left: 0,
            top: 0,
            scaleX: .5,
            scaleY: .5,
            active: false,
            price: 50
        })

        this.state.fcanvas.add(fObj)
    }

    loadFromSouce = (sources) => {
        fcanvas.clear()
        for (let i in sources) {
            let b = sources[i]
            let fObj = new fabric.Image(BRICK_INFO[b.type].image, {
                left: b.x,
                top: b.y,
                scaleX: b.sx,
                scaleY: b.sy,
                angle: b.angle
            })

            fcanvas.add(fObj)
        }
    }

    convert2BrickData = () => {
        let sources = fcanvas.toJSON().objects
        let result = []
        for (let i in sources) {
            let source = sources[i]
            let type = IMGSOURCE_MAPPING[hashFunction(source.src)]
            let brick = new Brick(
                i,
                source.left,
                source.top,
                source.scaleX,
                source.scaleY,
                source.angle,
                type, true, null
            )

            result.push(brick)
        }
        console.log(result)
        console.log(JSON.stringify(result))
        return result
    }



    launchBrickSetting = () => {
        const bitsWall = convert2BrickData()
        let requestData = { "channelId": channelId, "bitsWall": bitsWall }
        twitch.rig.log('requestData')
        twitch.rig.log(requestData)
        $.ajax({
            type: 'POST',
            url: 'https://twi.eztable.com/createWall',
            data: JSON.stringify(requestData),
            success: function(data) {
                console.log('ssuio');
                console.log(data);
            },
            contentType: "application/json",
            dataType: 'json'
        });
    }

    saveBrickSetting = () => {
        let setting = {
            channelId: channelId
        }
        const bitsWall = convert2BrickData()
        if (!bitsWall) {
            setting.bitsWall = []
        } else {
            setting.bitsWall = bitsWall
        }
        twitch.rig.log('setting')
        twitch.rig.log(setting)
        console.log('setting', typeof(setting), setting)
        setChannelConfig(setting)
    }

    setChannelConfig = (content) => {
        twitch.rig.log('content', content)
        const version = (config.version ? parseFloat(config.version) + 1 : 1.0).toString()
        twitch.rig.log('version', version)
        twitch.configuration.set(
            "broadcaster",
            version,
            content
        );

        config = content
        twitch.rig.log('config', config)
    }

    handleSetBackgroundImage = (e) => {
        this.state.backgroundImage = e.target.result

        this.api.addImage(this.state.channelId)
        let image = new Image()
        image.src = this.state.backgroundImage
        image.onload = () => {
            // console.log(image.height)
            // console.log(image.width)

            // fcanvas.setHeight(image.height)
            // fcanvas.setWidth(image.width)
            this.state.fcanvas.setBackgroundImage(this.state.backgroundImage, this.state.fcanvas.renderAll.bind(this.state.fcanvas), {
                backgroundImageOpacity: 0.5,
                backgroundImageStretch: false,
            })
        }
    }

    handleUploadImage = () => {
        let e = document.getElementById('file');
        var file = e.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = this.handleSetBackgroundImage
        reader.readAsDataURL(file);
        e.value = '';
    }

    handleTwitchContext = (context) => {
        if (twitch.configuration) {
            twitch.rig.log(twitch.configuration);
            twitch.rig.log('yes');

        } else {
            twitch.rig.log('nonono');
        }

        if (!config || config === '' || JSON.stringify(config) === '{}') {
            setChannelConfig(JSON.stringify({}))
        }
        twitch.rig.log('start');

        twitch.rig.log(context);
        twitch.rig.log(token);
        twitch.rig.log(userId);
        twitch.rig.log(channelId);
        twitch.rig.log(config);

        twitch.rig.log('end');
    }

    handleTwitchAuthorized = (auth) => {
        token = auth.token;
        userId = auth.userId;
        channelId = auth.channelId;
    }

    handleTwitchConfigChange = () => {
        let json;
        if (twitch.configuration.broadcaster && 'content' in twitch.configuration.broadcaster) {
            json = JSON.parse(twitch.configuration.broadcaster.content)
        } else {
            console.log('twitch.configuration', twitch.configuration)
            twitch.rig.log(twitch.configuration)

            json = {}
        }
        twitch.rig.log('json')
        twitch.rig.log(json)
        config = json
    }

    _reflashCanvs = () => {
        fcanvas.clear()
    }
}