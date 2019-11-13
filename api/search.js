const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

const router = express.Router();

// Initialize dotenv and set config
dotenv.config({ path: './config.env' });

// DESCRIPTION:
// Sends the search term to Bungie and returns an array of search results where the client
// can use "membershipId" and "membershipType" to get stats for a specific platform
// "searchTerm" = String (Bungie username) or Number (Bungie membershipId)
// "membershipId" = String
// "membershipType" = Boolean [https://bungie-net.github.io/multi/schema_BungieMembershipType.html#schema_BungieMembershipType]

router.get('/:searchTerm', async (req, res) => {
  if (!req.params.searchTerm) {
    res.status(400).json({ error: 'Search term not included' });
  }

  // /Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/
  // Add "?returnOriginalProfile=true" to search for original profiles and not current
  const baseUrl = process.env.API_Base_URL;
  const requestUrl = `${baseUrl}/Destiny2/SearchDestinyPlayer/-1/${req.params.searchTerm}`;
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
