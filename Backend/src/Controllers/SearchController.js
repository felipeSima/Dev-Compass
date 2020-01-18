const Dev = require('../Models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');

module.exports = {
    async index(request,response){
        const {latitude, longitude, techs } = request.query;
        techs_array = parseStringAsArray(techs);
        const devs = await Dev.find({
            techs:{
                $in: techs_array,
            },
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return response.json({devs});
    }
};