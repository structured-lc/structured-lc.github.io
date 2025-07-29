### Leetcode 3150 (Easy): Invalid Tweets II [Practice](https://leetcode.com/problems/invalid-tweets-ii)

### Description  
Given a table `Tweets` with columns `tweet_id` (int, primary key) and `content` (string), return the IDs of all **invalid tweets** in ascending order by `tweet_id`.  
A tweet is **invalid** if **any** of the following are true:
- The content **exceeds 140 characters** in length.
- The content contains **more than 3 mentions** (i.e., the `@` symbol appears more than 3 times).
- The content contains **more than 3 hashtags** (i.e., the `#` symbol appears more than 3 times).

### Examples  

**Example 1:**  
Input:  
Tweets =  
| tweet_id | content                                                      |
|----------|--------------------------------------------------------------|
| 1        | Traveling, exploring, and living my best life @JaneSmith @SaraJohnson @LisaTaylor @MikeBrown #Foodie #Fitness #Learning |
| 2        | Just had the best dinner with friends! #Foodie #Friends #Fun |
| 4        | Working hard on my new project #Work #Goals #Productivity #Fun|

Output: `1, 4`  
*Explanation:*
- tweet 1: Has 4 mentions (`@` occurs 4 times, which is invalid).
- tweet 4: Has 4 hashtags (`#` occurs 4 times, which is invalid).

**Example 2:**  
Input:  
Tweets =  
| tweet_id | content                |
|----------|------------------------|
| 10       | Just chilling          |
| 11       | @user #fun             |
| 12       | lorem ipsum...  [141 characters]|
| 13       | @a @b @c @d            |

Output: `12, 13`  
*Explanation:*
- tweet 12: Content length is 141 (>140, invalid).
- tweet 13: Number of mentions is 4 (>3, invalid).

**Example 3:**  
Input:  
Tweets =  
| tweet_id | content                                            |
|----------|---------------------------------------------------|
| 20       | none                                              |
| 21       | something #a #b #c #d                             |
| 22       | #1 #2 #3                                          |
| 23       | @x @y @z                                          |

Output: `21`  
*Explanation:*
- tweet 21: 4 hashtags (`#` occurs 4 times, which is invalid).

### Thought Process (as if you’re the interviewee)  
Start by breaking down the requirements:
- For each tweet, check three possible conditions—length, number of mentions (@), and number of hashtags (#).
- If any condition is true, the tweet is invalid.

**Brute-force/naive idea:**  
Loop through every row (tweet), check length of content, and count occurrences of `@` and `#`.
For counting, iterate character by character and tally how many times each symbol appears. If any count exceeds 3 or length >140, mark as invalid.

**Optimized idea:**  
You can check string length directly and scan the string just once, maintaining counters for `@` and `#`.  
As soon as either count exceeds 3, you can skip counting the rest for performance (early exit), since only invalidity is required.

**Why not use separate string methods?**  
To avoid using potentially expensive repeated native methods on large strings, counting both in a single scan is most efficient and interview-friendly.  
This approach is easy to implement, clear, and has deterministic O(n) for each tweet, n being the tweet length.

### Corner cases to consider  
- No tweets in input.
- Tweets with exactly 140 characters (valid).
- Tweets with exactly 3 mentions or 3 hashtags (valid).
- Empty tweet content (valid, since nothing exceeds thresholds).
- Multiple tweets are invalid for multiple reasons.
- Content includes symbols as part of email addresses or other text; still count by the character.

### Solution

```python
def invalid_tweets(tweets):
    """
    tweets: list of dicts with keys 'tweet_id' (int) and 'content' (str)
    Returns: list of invalid tweet_ids (ascending)
    """
    invalid = []
    for tweet in tweets:
        content = tweet['content']
        tweet_id = tweet['tweet_id']
        
        # Check character length
        if len(content) > 140:
            invalid.append(tweet_id)
            continue
        
        # Count mentions and hashtags
        at_count = 0
        hash_count = 0
        for c in content:
            if c == '@':
                at_count += 1
                if at_count > 3:
                    invalid.append(tweet_id)
                    break  # Early exit if already invalid
            if c == '#':
                hash_count += 1
                if hash_count > 3:
                    invalid.append(tweet_id)
                    break  # Early exit if already invalid
    # Output should be sorted by tweet_id
    return sorted(invalid)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(T \* L), where T is the number of tweets and L is the average length of content per tweet.  
  We scan each character of each tweet only once.
- **Space Complexity:** O(T), for the output list of invalid tweet_ids.  
  No extra storage except a few counters; the output list grows at most linearly with number of tweets.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if the maximum tweet length or mention/hashtag limits were dynamic or stored in another table?
  *Hint: Pass the limits as extra parameters or read from config/database.*

- What if the content is very large or streamed?  
  *Hint: Consider processing content as a generator/iterator or in chunks.*

- How would you handle unicode/emoji or language-specific characters?
  *Hint: Make sure the length/counting methods handle unicode properly; in Python, len(s) works for unicode but detailed char-by-char checks may need care.*

### Summary
This problem demonstrates the **"single-pass scan"** string checking pattern:  
- Efficiently process by scanning each element only once, using counters.
- The same technique applies for input validation, log parsing, limit enforcement, and similar line-by-line data cleansing problems.  
It's simple, fast, robust to changes, and easy to code and explain in interviews.