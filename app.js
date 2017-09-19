const TwitterPackage = require('twitter')

var secret = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
}

var Twitter = new TwitterPackage(secret)

// Twitter.post('statuses/update', {status: 'Sent this from my terminal running at no man\'s island'}, (error, tweet, response) => {
//   if (error) {
//     console.log(error)
//   }
//   console.log(tweet)
//   console.log(response)
// })

Twitter.stream('statuses/filter', { track: '#JiokeBot' }, (stream) => {
  stream.on('data', (tweet) => {
    console.log(tweet.text)
    var statusObj = { status: `Hi @${tweet.user.screen_name}, Thanks for reaching out!` }

    Twitter.post('statuses/update', statusObj, (error, tweetReply, response) => {
      if (error) {
        console.log(error)
      }

      console.log(tweetReply.text)
    })
  })

  stream.on('error', (error) => {
    console.log(error)
  })
})