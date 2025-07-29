### Leetcode 355 (Medium): Design Twitter [Practice](https://leetcode.com/problems/design-twitter)

### Description  
Design a simplified Twitter system supporting four operations:  
- **postTweet(userId, tweetId):** User posts a new tweet.  
- **getNewsFeed(userId):** Retrieve the 10 most recent tweet IDs in the user’s news feed. This feed must show tweets posted by themselves and people they follow, ordered from most recent to least recent.  
- **follow(followerId, followeeId):** Follower follows the followee.  
- **unfollow(followerId, followeeId):** Follower unfollows the followee.  
All users and tweets are identified by integer IDs. Follow relationships are unidirectional.

### Examples  

**Example 1:**  
Input:  
postTweet(1, 5)  
getNewsFeed(1)  
Output:  
[5]  
*Explanation: User 1 posts tweet 5. Their feed contains tweet 5.*

**Example 2:**  
Input:  
postTweet(1, 5)  
follow(1, 2)  
postTweet(2, 6)  
getNewsFeed(1)  
Output:  
[6,5]  
*Explanation: User 1 follows User 2. User 2 posts tweet 6. User 1's feed shows User 2's tweet first (most recent), then their own.*

**Example 3:**  
Input:  
postTweet(1, 5)  
follow(1, 2)  
postTweet(2, 6)  
unfollow(1, 2)  
getNewsFeed(1)  
Output:  
[5]  
*Explanation: User 1 follows User 2, sees User 2's tweet. After unfollowing, User 1 only sees own tweet 5.*

### Thought Process (as if you’re the interviewee)  
Start with the operations and constraints:
- **Storing tweets:** Naive approach is a global list of tweets and filter every time, but that's O(N) per feed (N: number of tweets), which is too slow.
- **Users:** Each user needs a set of users they follow.  
- **Tweets:** Each tweet must have a timestamp to sort by recency.
- **Goal:** Get the 10 most recent tweets from the user and their followees—efficiently!

**Brute-force idea:**  
- Store all tweets in a list as (user, tweet, timestamp).
- For getNewsFeed: filter by user and followees, sort by time, take 10 most recent.  
Drawback: Slow for large N since filtering/scanning through all tweets.

**Optimized approach:**  
- Store each user’s tweets as a linked list or a list (latest first), with timestamp.
- Maintain a hash map from user to their follow set and to the head of their tweet list.
- On getNewsFeed: For the user and their followees, use a min-heap to efficiently merge their latest tweets up to 10 most recent.
- Each operation except getNewsFeed is O(1); getNewsFeed is O(f log k) where f = number of followees, k = feed size (10).
This is similar to merging k sorted lists (a classic heap problem).

**Why this works:**  
- Only a fixed number (≤10) of tweets are ever needed for the feed, so never scan all tweets.  
- Heaps give the current-best tweet efficiently, per user/followee’s list.

### Corner cases to consider  
- User unfollows themselves or tries to follow themselves (should be handled as no-ops or prevent).  
- User has no tweets or doesn't follow anyone.  
- Multiple users posting tweets at the same time.
- User follows many users but still <10 tweets total.
- Unfollowing a user not currently followed.
- Querying news feed for a non-existent user (should gracefully handle).

### Solution

```python
import heapq

class Twitter:
    def __init__(self):
        self.timer = 0  # global timestamp, increases for every tweet
        self.tweets = {}  # userId -> list of (timestamp, tweetId)
        self.follows = {}  # userId -> set of userIds this user follows

    def postTweet(self, userId: int, tweetId: int) -> None:
        # Add tweet to user's tweet list
        if userId not in self.tweets:
            self.tweets[userId] = []
        self.tweets[userId].append((self.timer, tweetId))
        self.timer += 1

    def getNewsFeed(self, userId: int) -> list[int]:
        # Aggregate up to 10 most recent tweets from user and followees
        feed = []
        # Always include user self-follow
        followees = self.follows.get(userId, set()).copy()
        followees.add(userId)
        heap = []
        for uid in followees:
            if uid in self.tweets and self.tweets[uid]:
                # Get the latest tweet index and list
                index = len(self.tweets[uid]) - 1
                time, tid = self.tweets[uid][index]
                heapq.heappush(heap, (-time, tid, uid, index))
        while heap and len(feed) < 10:
            neg_time, tid, uid, idx = heapq.heappop(heap)
            feed.append(tid)
            if idx > 0:
                prev_time, prev_tid = self.tweets[uid][idx - 1]
                heapq.heappush(heap, (-prev_time, prev_tid, uid, idx - 1))
        return feed

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId == followeeId:
            return  # can't follow self
        if followerId not in self.follows:
            self.follows[followerId] = set()
        self.follows[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        if followerId == followeeId:
            return  # can't unfollow self
        if followerId in self.follows:
            self.follows[followerId].discard(followeeId)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - `postTweet`: O(1), just append to user’s tweet list.  
    - `follow`/`unfollow`: O(1), just update a set.
    - `getNewsFeed`: O(f × log f), where f is the number of users this user follows (including self). Each step pushes/pops at most one tweet per user onto the heap; heap size is at most f. Total tweets output <= 10.
- **Space Complexity:**  
    - O(T + U²), where T is total number of tweets stored, U is number of users (for follow relationships at worst U × U, but in practice far sparser). Each tweet and follow relationship is stored explicitly.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle billions of users and tweets (scalability / distribution)?
  *Hint: Partition tweet storage, cache feeds, store only tweet references, use sharding/microservices.*

- How can you implement #hashtags or trending topics in this system?
  *Hint: Maintain auxiliary structures for counting/tagging tweets with hashtags.*

- What if each tweet can have an image/media, should those be stored the same way?
  *Hint: Store metadata and pointers to external storage (e.g., CDN, blob).*

### Summary  
This problem uses a **hash map + heap** pattern, similar to “merge k sorted lists.” Each user’s tweets are stored individually. Feed retrieval relies on merging the most recent tweets efficiently with a heap—classic *k-way merge*. This approach is reusable for real-time feed problems, log aggregation, or anytime recent items need to be merged across categories/lists quickly. This is a common pattern in feed systems, log processing, and streaming apps.