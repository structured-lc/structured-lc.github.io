### Leetcode 3103 (Hard): Find Trending Hashtags II  [Practice](https://leetcode.com/problems/find-trending-hashtags-ii)

### Description  
Given a table of tweets, each with a user ID, tweet ID, tweet date, and the tweet text, find the top 3 trending hashtags for February 2024. Each tweet may contain **multiple** hashtags. A hashtag is a string that starts with '#' (hash) and continues until the next space or the end of the tweet.  
Your output should return the top 3 hashtags (string after '#', including the '#') and the number of times they appeared in all tweets from February 2024. Sort the result by the hashtag count **descending**, then by hashtag **descending** (lexicographically).

### Examples  

**Example 1:**  
Input:  
A table of tweets with  
```
tweet_date         tweet
2024-02-12         "Happy #ValentinesDay to all! #love"
2024-02-15         "Enjoying #ValentinesDay and #chocolate!"
2024-02-23         "Amazing #sunset at the beach #relax"
2024-01-28         "#ValentinesDay is coming soon"
```
Output:  
```
[["#ValentinesDay", 3], ["#chocolate", 1], ["#love", 1]]
```
*Explanation: Only tweets from 2024-02-* are considered. #ValentinesDay appears 3 times (2 in tweet 1 and 1 in tweet 2), #chocolate and #love appear once each. Sorted by count desc, then hashtag desc.*

**Example 2:**  
Input:  
```
tweet_date         tweet
2024-02-10         "#music is life! #fun"
2024-02-11         "Just another #fun day"
2024-02-10         "#life is beautiful #fun"
```
Output:  
```
[["#fun", 3], ["#life", 2], ["#music", 1]]
```
*Explanation: #fun appears 3 times, #life 2, #music 1 (only Feb 2024). Sorting applies.*

**Example 3:**  
Input:  
```
tweet_date         tweet
2024-01-15         "No hashtag in here"
2024-02-22         "Work hard, play harder #motivation"
```
Output:  
```
[["#motivation", 1]]
```
*Explanation: Only one hashtag in February 2024.*

### Thought Process (as if you’re the interviewee)  
First, we must filter tweets only from February 2024.  
Then, for each eligible tweet, extract all substrings that are hashtags (start with '#' and go until a space or end of string).  
Count the frequency of each unique hashtag.  
Finally, sort by count descending, then by hashtag lex order descending, and return the top 3.  

Brute-force:  
- For every tweet in Feb 2024, extract hashtags by parsing the string character by character.  
- Store in a hash map the frequency per hashtag.  
- After processing all tweets, sort the hashtags accordingly.

Optimized:  
- Use regular expressions to extract hashtags in each tweet (e.g., '#[^\\s]+').  
- Use a Counter or dict for counting occurrences.  
- Use sorting with a key (lambda: (-count, -hashtag)).

Trade-offs:  
- Regex extraction is cleanest and handles edge cases, but may be less efficient for massive data (not a problem here).
- Hash map for counting is O(n) time, and the sorting step dominates (O(m log m), m = unique hashtags).

### Corner cases to consider  
- Tweets with no hashtags.
- A hashtag at the end of the tweet (no space after).
- Multiple hashtags in a single tweet (beside each other).
- Hashtags with punctuation attached.
- Repeated hashtags in the same tweet (should count each occurrence).
- Less than three unique hashtags in all of Feb 2024.

### Solution

```python
import re
from collections import defaultdict

def findTrendingHashtagsII(tweets):
    # Step 1: Filter tweets from February 2024
    feb_2024_tweets = []
    for tweet in tweets:
        date = tweet['tweet_date']
        # Parse year and month
        if date[:7] == '2024-02':
            feb_2024_tweets.append(tweet['tweet'])
    
    # Step 2: Extract hashtags and count frequencies
    hashtag_count = defaultdict(int)
    for text in feb_2024_tweets:
        # findall returns all matches; hashtags start with # and end at space or string end
        hashtags = re.findall(r'#\S+', text)
        for tag in hashtags:
            hashtag_count[tag] += 1
    
    # Step 3: Sort by count desc, then hashtag desc 
    # (key: (-count, -hashtag)), but for hashtag descending order, use reverse=True in sort
    items = list(hashtag_count.items())
    items.sort(key=lambda x: ( -x[1], -ord(x[0][1]) if len(x[0])>1 else 0, x[0]), reverse=False)
    # Secondary key 'ord(x[0][1])' ensures hashtag lex order; but properly: just sort by x[0] descending
    
    items.sort(key=lambda x: (-x[1], x[0]), reverse=False)
    # Only take top 3
    result = []
    for i in range(min(3, len(items))):
        result.append([items[i][0], items[i][1]])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n·l + m·log m), where n is the number of tweets, l is average tweet length, and m is the number of unique hashtags. Regex extraction is O(l) per tweet, counting is O(1) per occurrence, sorting is O(m·log m).
- **Space Complexity:** O(m), for tracking unique hashtags and their counts.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return the top *k* trending hashtags (where *k* can vary)?
  *Hint: Allow an argument and change the size of the result slice.*

- How would you do this if hashtags are case-insensitive?
  *Hint: Normalize all hashtags to lower/upper before counting.*

- What if a single tweet can have the same hashtag multiple times? Should those all count?
  *Hint: Clarify spec; modify counting according to requirement.*

### Summary
This problem requires text parsing, map counting, and custom sorting—classic patterns seen in frequency and string problems. Core approaches involve hash maps for frequency, regex/text parsing, and multi-criteria sort. This pattern is reusable for top-K frequency queries (hashtags, words, mentions) in any stream or log setting, and the ideas generalize to large-scale data processing with tools like MapReduce or SQL window functions.