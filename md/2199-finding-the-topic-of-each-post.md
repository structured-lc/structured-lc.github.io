### Leetcode 2199 (Hard): Finding the Topic of Each Post [Practice](https://leetcode.com/problems/finding-the-topic-of-each-post)

### Description  
Given a table of social media posts and a table of keywords, where each keyword is linked to a topic by an id, determine for each post the topic(s) it relates to.  
A post is related to a topic if its content contains at least one keyword belonging to that topic (case-insensitive, and must be whole words).  
- If a post has keywords from any topic, return a comma-separated string with all distinct topic IDs (ascending order).
- If a post has no keywords from any topic, return `"Ambiguous!"` for that post.

### Examples  

**Example 1:**  
Input: 
Posts =  
|post_id|content|
|--|--|
|1|We call it soccer They call it football hahaha|

Keywords =  
|topic_id|word|
|--|--|
|1|handball|
|1|football|

Output: `1`  
*Explanation: The post contains "football", which is keyword for topic 1.*

**Example 2:**  
Input: 
Posts =  
|post_id|content|
|--|--|
|2|Americans prefer basketball while Europeans love handball and football|

Keywords =  
|topic_id|word|
|--|--|
|1|handball|
|1|football|
|3|war|

Output: `1`  
*Explanation: The post contains "handball" and "football", both are from topic 1 – topics are deduplicated and sorted.*

**Example 3:**  
Input: 
Posts =  
|post_id|content|
|--|--|
|3|stop the war and play handball|

Keywords =  
|topic_id|word|
|--|--|
|1|handball|
|3|war|

Output: `1,3`  
*Explanation: The post contains "handball" (topic 1) and "war" (topic 3). Both topics included and sorted.*

**Example 4:**  
Input: 
Posts =  
|post_id|content|
|--|--|
|4|warning I planted some flowers this morning and then got vaccinated|

Keywords =  
|topic_id|word|
|--|--|
|1|handball|
|1|football|
|3|war|
|2|vaccine|

Output: `Ambiguous!`  
*Explanation: No keywords from any topic found in the post, so output is "Ambiguous!".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each post, check EVERY keyword against its content in a case-insensitive, word-separated way. If a match is found, record the topic_id. After all checks, output sorted, deduplicated topic IDs or "Ambiguous!" if none found.

- **Optimized approach:**  
  - Preprocess all keywords by topic (map word→topic_id).
  - Normalize the content of each post, split it into words.
  - For each word in the post, in O(1), check if it's a keyword and collect associated topic_ids.
  - At the end, output sorted and deduped topic ids (comma-separated). If the set is empty, output "Ambiguous!".
  - Trade-off: Slightly higher upfront preprocessing/normalization (lower runtime overall).

- **Why not just use substring search?**  
  Because "whole word" match is required: "football" should not match "footballer". So both content and keyword matching should be based on word boundaries.

### Corner cases to consider  
- Post with no words (empty content).
- Posts or keywords with upper/lower/mixed case: should be handled in case-insensitive manner.
- Keywords that are substrings of other words (must not match unless it's an exact word boundary).
- Multiple keywords from the same topic in one post (output topic_id once).
- Keyword appearing multiple times in a post (still only output topic_id once).
- No keywords at all / empty post/keyword tables.
- Large text and large keyword lists.

### Solution

```python
def find_post_topics(posts, keywords):
    # Preprocess keywords to map lowercased word to a set of topic_ids
    from collections import defaultdict
    
    word_to_topics = defaultdict(set)
    for topic_id, word in keywords:
        word_to_topics[word.lower()].add(str(topic_id))  # topic_id as str for output
    
    res = []
    for post_id, content in posts:
        # Normalize content to lower and split into whole words
        # Use simple split, or regex if we want to be robust against punctuation
        import re
        words = set(re.findall(r'\w+', content.lower()))
        
        matched_topics = set()
        for word in words:
            matched_topics.update(word_to_topics.get(word, []))
        
        if matched_topics:
            sorted_topics = sorted(matched_topics, key=int)
            topic_str = ",".join(sorted_topics)
        else:
            topic_str = "Ambiguous!"
        res.append((post_id, topic_str))
    return res

# Example usage
posts = [
    (1, "We call it soccer They call it football hahaha"),
    (2, "Americans prefer basketball while Europeans love handball and football"),
    (3, "stop the war and play handball"),
    (4, "warning I planted some flowers this morning and then got vaccinated"),
]
keywords = [
    (1, "handball"),
    (1, "football"),
    (3, "war"),
    (2, "vaccine"),
]

print(find_post_topics(posts, keywords))
# Output: [(1, '1'), (2, '1'), (3, '1,3'), (4, 'Ambiguous!')]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N × W + K), where N is number of posts, W is average number of words per post, K is keyword count.  
  For each post, splitting and looking up each word is O(number of unique words in the post).

- **Space Complexity:**  
  O(K) for keyword map, plus O(N) output size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you scale this to millions of posts and keywords?  
  *Hint: Invert the problem to keyword-based indexing, or use distributed systems/search indices.*

- What if keyword matching needs to be fuzzy (typos allowed)?  
  *Hint: Use edit distance or trigram indices, but will require much more complex data structures.*

- How to handle posts in non-English languages/word segmentation?  
  *Hint: Preprocessing with appropriate language models/tokenizers.*

### Summary
The problem is a classic text processing and token matching challenge that fits into the general category of join/group-by problems, often seen in SQL or map-reduce settings. The solution is highly portable to other contexts: join/sort/group-by techniques, inverted keyword lookup, normalization and set operations. This pattern commonly appears in search, categorization, tagging, and information extraction tasks.