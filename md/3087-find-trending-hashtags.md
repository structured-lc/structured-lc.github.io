### Leetcode 3087 (Medium): Find Trending Hashtags [Practice](https://leetcode.com/problems/find-trending-hashtags)

### Description  
You are given a table of tweets, where each tweet belongs to a user and contains the full text and date. Each tweet contains only one hashtag.  
Your task is to identify the top 3 trending hashtags that appeared **most frequently in February 2024**. If multiple hashtags have the same frequency, order them by hashtag text in descending alphabetical order.  
Return each hashtag and its frequency, ordered by count (descending), then by hashtag (descending).

### Examples  

**Example 1:**  
Input:  
Tweets =  
| user_id | tweet_id | tweet_date | tweet      |
| ------- | -------- | ---------- | ---------- |
| 1       | 10       | 2024-02-03 | I love #cat |
| 2       | 11       | 2024-02-21 | Go #dog    |
| 1       | 12       | 2024-02-15 | Hello #cat |
| 3       | 13       | 2024-02-01 | New #bird  |
| 2       | 14       | 2024-02-20 | So cute #cat |

Output:  
| hashtag | hashtag_count |
| ------- | ------------- |
| #cat    | 3             |
| #dog    | 1             |
| #bird   | 1             |

*Explanation:  
- "cat" appears 3 times in February 2024.  
- "dog" and "bird" each appear once.  
- As we want top 3, all are returned, ordered by count descending, then by hashtag desc.*

**Example 2:**  
Input:  
Tweets =  
| user_id | tweet_id | tweet_date | tweet      |
| ------- | -------- | ---------- | ---------- |
| 1       | 10       | 2024-01-11 | Nice #hello|
| 2       | 12       | 2024-02-02 | #go run    |
| 3       | 13       | 2024-02-19 | #hello you |
| 4       | 14       | 2024-02-27 | #go team   |

Output:  
| hashtag | hashtag_count |
| ------- | ------------- |
| #go     | 2             |
| #hello  | 1             |

*Explanation:  
- Only February 2024 is considered.  
- "#go" appears twice, "#hello" once, so both are returned (since there are only 2 hashtags found in Feb 2024).*

**Example 3:**  
Input:  
Tweets =  
| user_id | tweet_id | tweet_date | tweet         |
| ------- | -------- | ---------- | ------------- |
| 1       | 9        | 2023-02-08 | Hi #old       |
| 2       | 10       | 2024-03-01 | New month #go |

Output:  
(empty)

*Explanation:  
- There are no relevant tweets from February 2024, so the result is empty.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force approach:
- Check every tweet, filter for those in February 2024.
- For each tweet, extract the hashtag using string matching or regex.
- Count occurrences of each hashtag.
- Sort all hashtags by their counts descending, then by the hashtag itself descending, and take top 3.

Optimization:
- As tweet data could be large, use hashmaps (dictionaries) for O(1) counting and efficient lookups.
- Instead of sorting the whole list every time, use a heap just for top 3, but as 3 is small and counts are not in real time, a simple sort is fine.
- Extracting hashtag (since only one per tweet) can be safely done using pattern matching from the tweet string.

Final approach:
- Filter by date efficiently.
- Extract hashtag from each tweet.
- Count hashtags with a dictionary.
- Sort the counts as required.
- Output the top 3.

### Corner cases to consider  
- No tweets present.
- No tweets in February 2024.
- Hashtags with same frequency — tie-breaking by hashtag (descending order).
- Same hashtag in different cases (is case-sensitivity required? If not specified, keep as-is).
- Tweets with empty text or without a hashtag (but per problem, all tweets have one hashtag).
- Less than 3 hashtags in total.

### Solution

```python
def find_trending_hashtags(tweets):
    """
    tweets: List[Dict], each dict with keys 'user_id', 'tweet_id', 'tweet_date', 'tweet'
    Returns: List of tuples (hashtag, hashtag_count)
    """
    from collections import defaultdict
    
    hashtag_counts = defaultdict(int)
    
    # Step 1: Filter for tweets in February 2024
    for row in tweets:
        date = row['tweet_date']
        # Expect date string like 'YYYY-MM-DD'
        if not (date.startswith("2024-02-")):
            continue

        # Step 2: Extract hashtag using string search or regex
        # Each tweet has exactly one hashtag
        tweet_text = row['tweet']
        hashtag = ""
        found_hash = tweet_text.find('#')
        if found_hash != -1:
            # Start at '#', continue while part of word
            i = found_hash + 1
            while i < len(tweet_text) and (tweet_text[i].isalnum() or tweet_text[i] == '_'):
                i += 1
            hashtag = tweet_text[found_hash:i]
            if hashtag:
                hashtag_counts[hashtag] += 1

    # Step 3: Prepare list and sort as required
    result = []
    for h, c in hashtag_counts.items():
        result.append((h, c))

    # Sort by count descending, then by hashtag descending
    result.sort(key=lambda x: (x[1], x[0]), reverse=True)

    # Step 4: Take top 3
    return result[:3]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m log m), where n is the number of tweets and m is the number of unique hashtags.
    - Scanning and extracting is O(n).
    - Sorting hashtags is O(m log m), but m is generally small (top 3).
- **Space Complexity:** O(m), for storing hashtag counts and result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there could be multiple hashtags per tweet?  
  *Hint: Think about how to extract and count each hashtag found in the text.*
  
- What if the date range to filter on is dynamic or much larger?  
  *Hint: Consider date parsing/validation optimizations and larger time windows.*

- How would you efficiently find the top K trending hashtags instead of just the top 3?  
  *Hint: How could a heap help improve memory/time if K is large?*

### Summary
This problem uses the classic **hashmap (dictionary) counting pattern** combined with custom sorting.  
It’s common in social media/analytics problems — such as word frequency, trending topics, or top-K populating items.  
Key parts are filtering by date, extracting target features from data (here the hashtag), and sorting for “top-K.”  
This same pattern appears in many string and frequency analysis interview questions.


### Flashcard
Filter tweets from February 2024, extract hashtags, count frequencies using a hashmap, use a min-heap to track top 3 by count (descending) then lexicographically.

### Tags
Database(#database)

### Similar Problems
