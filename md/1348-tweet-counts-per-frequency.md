### Leetcode 1348 (Medium): Tweet Counts Per Frequency [Practice](https://leetcode.com/problems/tweet-counts-per-frequency)

### Description  
Design a class that records tweet timestamps and efficiently returns the number of tweets posted in specified frequency intervals ('minute', 'hour', 'day') within a given time window. 
Provide three methods: `recordTweet(tweetName, time)`, `getTweetCountsPerFrequency(freq, tweetName, startTime, endTime)` which returns a list where each index i = number of tweets in ⎣(endTime - startTime)/(frequency interval)⎦ + 1.

### Examples  

**Example 1:**  
Input: `recordTweet("tweet3", 0); recordTweet("tweet3", 60); recordTweet("tweet3", 10); getTweetCountsPerFrequency("minute", "tweet3", 0, 59)`  
Output: `[2]`  
*Explanation: [0,59]: Two tweets at 0 and 10, the tweet at 60 is not included.*

**Example 2:**  
Input: `getTweetCountsPerFrequency("minute", "tweet3", 0, 60)`  
Output: `[2,1]`  
*Explanation: [0,59] = 2, [60,60] = 1*

**Example 3:**  
Input: `recordTweet("tweet3", 120); getTweetCountsPerFrequency("hour", "tweet3", 0, 210)`  
Output: `[4]`  
*Explanation: [0, 210] spans one hour interval => all 4 tweets included*

### Thought Process (as if you’re the interviewee)  
We need a data structure for each tweet type that efficiently stores times and can find number of tweets in any windowed interval quickly.  A sorted list per tweet works; we can easily binary search for window bounds and count in O(log n) per query. For each query, split range into chunks per frequency interval ('minute' = 60s etc.), count tweets in each.

### Corner cases to consider  
- No tweets for the given tweetName
- startTime == endTime
- Tweets exactly on interval boundaries

### Solution

```python
from collections import defaultdict
import bisect

class TweetCounts:
    def __init__(self):
        self.tweet_times = defaultdict(list)
    
    def recordTweet(self, tweetName: str, time: int) -> None:
        # Maintain times as a sorted list for each tweetName
        bisect.insort(self.tweet_times[tweetName], time)
    
    def getTweetCountsPerFrequency(self, freq: str, tweetName: str, startTime: int, endTime: int) -> list:
        if freq == 'minute': interval = 60
        elif freq == 'hour': interval = 3600
        elif freq == 'day': interval = 86400
        else: raise ValueError('Invalid frequency')
        result = []
        times = self.tweet_times[tweetName]
        for i in range(startTime, endTime + 1, interval):
            l = bisect.bisect_left(times, i)
            r = bisect.bisect_left(times, min(i + interval, endTime + 1))
            result.append(r - l)
        return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(log n) per record (for sorted insert), O(log n) × k per get (k = number of intervals).
- **Space Complexity:** O(m), where m = total number of tweet timestamps stored.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle millions of tweets efficiently?   
  *Hint: Use bucketing or segment trees for batch counts.*

- How to support deleteTweet?   
  *Hint: Use multiset or accessible remove in sorted structure.*

- If frequency intervals can be arbitrary?   
  *Hint: Accept interval duration as a parameter not just fixed words.*

### Summary
This problem is an application of ordered statistics (binary search on sorted lists) with window aggregation. Core pattern is to keep data sorted for fast interval counting, a classic for log-structured time series problems.


### Flashcard
Store sorted times for each tweet; for each query, binary search window bounds and count tweets per frequency interval.

### Tags
Hash Table(#hash-table), String(#string), Binary Search(#binary-search), Design(#design), Sorting(#sorting), Ordered Set(#ordered-set)

### Similar Problems
- Design Video Sharing Platform(design-video-sharing-platform) (Hard)