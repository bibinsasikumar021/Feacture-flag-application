/*******************************************************************************
* Fetch feature list
*
* Contributors: Midhun V C
*******************************************************************************/

require('dotenv').config();
const { getFeatureList } = require('../modules/featureFlag');

module.exports = async (req, res) => {
    const featureDetails = await getFeatureList();
    res.send(featureDetails);
};
