/*******************************************************************************
* Fetch feature list
*
* Contributors: Midhun V C
*******************************************************************************/

require('dotenv').config();
const { getClientFeatures } = require('../modules/featureFlag');

module.exports = async (req, res) => {
    let query = req.params;
    const featureDetails = await getClientFeatures(query);
    res.send(featureDetails);
};
