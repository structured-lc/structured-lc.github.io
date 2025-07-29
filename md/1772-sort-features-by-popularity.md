### Leetcode 1772 (Medium): Sort Features by Popularity [Practice](https://leetcode.com/problems/sort-features-by-popularity)

### Description  
Given a list of **features** (unique strings) representing product features, and customer **responses** (a list of strings, each containing space-separated words), **sort the features by their popularity**—where popularity is defined as the number of responses in which the feature appears at least once.

If two features have the same popularity, the one that came first in the original **features** list should come first in the output.

### Examples  

**Example 1:**  
Input:  
features = `["battery", "screen", "storage", "color"]`,  
responses = `["I like battery storage", "screen battery", "color screen", "screen storage color"]`  
Output:  
`["screen", "battery", "storage", "color"]`  
*Explanation:*
- "screen": appears in responses 2, 3, 4 (3 times)
- "battery": appears in responses 1, 2 (2 times)
- "storage": appears in responses 1, 4 (2 times)
- "color": appears in responses 3, 4 (2 times)
- "screen" is most popular (3), then "battery", "storage", "color" (each 2)
- Original order used among ties.

**Example 2:**  
Input:  
features = `["cooler", "lock", "touch"]`,  
responses = `["cooler cooler lock", "touch lock", "cooler touch"]`  
Output:  
`["cooler", "lock", "touch"]`  
*Explanation:*
- "cooler": appears in 1, 3 (2)
- "lock": appears in 1, 2 (2)
- "touch": appears in 2, 3 (2)
- All have the same popularity, use original order.

**Example 3:**  
Input:  
features = `["wifi"]`,  
responses = `[]`  
Output:  
`["wifi"]`  
*Explanation:*  
- No responses. Each feature has 0 popularity. Keep original order.

### Thought Process (as if you’re the interviewee)  
To start, we need to determine how many *unique responses* mention each feature.  
- For each response, we can create a set of unique words in that response.  
- For each feature, if it exists in the set, we count +1 for that response.  
A brute-force way is for every feature, scan all responses, but this is inefficient.

Instead:
- Iterate through all responses.
- Convert each response to a set (word-level granularity).
- For each word/feature in the set that matches our `features` list, increment a corresponding count.

Finally, sort `features`:
- By descending popularity.
- By order in the original `features` list in case of ties (i.e., stable sort).

This approach is efficient and very clear. We're using an additional dictionary/array to track counts, and the final sort is stable.

### Corner cases to consider  
- `responses` is empty (all features have 0 popularity → return `features` in original order).
- Some features are never mentioned.
- A feature mentioned multiple times in a single response should only count once per response.
- Features with equal popularity (should respect the original order).
- Only one feature.

### Solution

```python
def sortFeaturesByPopularity(features, responses):
    # Track the index of each feature for tie-breaking in sort.
    feature_idx = {feature: i for i, feature in enumerate(features)}
    # Popularity counter for each feature (by name)
    popularity = {feature: 0 for feature in features}

    # For each response, count unique features present.
    for response in responses:
        words = set(response.strip().split())
        for feature in features:
            if feature in words:
                popularity[feature] += 1

    # Sort features:
    # - First by descending popularity
    # - Second by original index (ascending)
    sorted_features = sorted(
        features,
        key=lambda f: (-popularity[f], feature_idx[f])
    )
    return sorted_features
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R × F + F log F)  
  - R = number of responses, F = number of features.
  - For each response (R), iterate F features to check membership (though checking in a set is O(1)).
  - Sorting features takes O(F log F).
- **Space Complexity:** O(F + W),  
  - F for the counts and index maps, W for the largest response's set of words during iteration.

### Potential follow-up questions (as if you’re the interviewer)  

- What if features can contain two or more words (phrases)?  
  *Hint: Use substring search or token N-grams, map each feature as a phrase.*

- How would you make it case-insensitive?  
  *Hint: Normalize words and features to lower case before comparison.*

- Suppose each feature can appear multiple times in the same response. Should we count each?  
  *Hint: Clarify with interviewer, but typically each response counts only once per feature.*

### Summary
This problem demonstrates the *hash map counting* and *custom sorting* pattern: use dictionaries for counting occurrences, then sort items using a lambda that combines count and input order. This approach is robust for leaderboard, bucket sort, and task scheduling alike, where primary and secondary sorting keys are used. The code handles edge cases and is easily extensible for variants like case insensitivity or phrase features.