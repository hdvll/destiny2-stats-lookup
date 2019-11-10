const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

const router = express.Router();

// Initialize dotenv and set config
dotenv.config({ path: './config.env' });

// DESCRIPTION:
// Sends the membership type and membership Id to Bungie and requests the profile and characters that match
// The results contain of a Profile object and a Characters object with 1 - 3 possible characters
// The characters object contains a data object that holds all available characters, each object in the
// data object is the character id for that specific character. The data object can be converted into an array.

router.get('/:membershipType/:membershipId', async (req, res) => {
  // https://www.bungie.net/Platform/Destiny2/{membershipType}/Profile/{destinyMembershipId}?components=100,200
  // Components: 100 = Profile, 200 = Characters
  // https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType

  const baseUrl = process.env.API_Base_URL;
  const requestUrl = `${baseUrl}/Destiny2/${req.params.membershipType}/Profile/${req.params.membershipId}?components=100,200`;
  const config = {
    headers: {
      'X-API-Key': process.env.API_Key
    }
  };

  try {
    await axios
      .get(requestUrl, config)
      .then(result => res.json(result.data))
      .catch(err =>
        res.status(err.response.status).json({ error: err.response.data })
      );
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
