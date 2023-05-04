/*******************************************************************************
* Fetch feature list
*
* Contributors: Midhun V C
*******************************************************************************/

require('dotenv').config();
const { updateFeatureList } = require('../modules/featureFlag');

module.exports = async (req, res) => {
    const featureDetails = await updateFeatureList(req.body);
    res.send(featureDetails);
};
