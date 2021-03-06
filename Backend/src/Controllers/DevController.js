const axios = require('axios');
const Dev = require('../Models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({github_username});
        if (!dev){
            const responseGit = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio} = responseGit.data;
            const techs_array = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                name,
                avatar_url,
                bio,
                github_username,
                techs: techs_array,
                location
            });
            console.log(dev)
        }

        return response.json(dev);
    }
};