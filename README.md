# Streamforge

Problem: Finding a new Twitch streamer to watch is very difficult.
- Viewers rely on game categories, a thumbnail and the viewer count of a stream to determine if they want to watch them or not
- Due to its nature, it is a very slow process of watching a streamer for 5-10 minutes to determine if they are worth watching
- Overall this results in most viewers resorting to watching the very top streamers (something like top 1% have 98% of all viewers)

Solution: Implement successful discovery features from social media platforms.
- Random clips are shown of streamers that are streaming right now
- If the viewer enjoys it, they can choose to be taken to the stream
- Otherwise they skip to the next clip and continue the discovery process

As for the technical side of things:
- Fetch a certain amount of live streams
- Fetch top clips from each channel (filter clips by clips of game they are streaming at the moment)
- Shuffle the list of clips and display them visually one by one, have link to take viewer to their twitch page